import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database";
import { AuthInput, AuthResponse, RegisterUserInput, TokenRotateResponse } from "../types/auth";
import { hashPassword, verifyPassword } from "../utils/password";
import { signAccessToken } from "../utils/jwt";
import { generateRefreshTokenString, hashToken } from "../utils/tokens";
import dotenv from "dotenv";

dotenv.config();

const REFRESH_TOKEN_LENGTH = Number(process.env.REFRESH_TOKEN_LENGTH ?? 64);
const REFRESH_TOKEN_EXP_DAYS = Number(process.env.REFRESH_TOKEN_EXP_DAYS ?? 30);


interface UserRow extends RowDataPacket{
    id: number,
    name: string,
    email: string,
    password_hash: string,
    roles: string | null,
    token_version: number
}
export class AuthService{
    static async registerUser(input: RegisterUserInput){
        const {name, email, password } = input;
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // check existing 
            const [existing] = await conn.execute<RowDataPacket[]>("SELECT id FROM users WHERE email = ? FOR UPDATE", [email]);

            if(existing.length > 0){
                console.log("here");
                throw new Error("Email already registered");
            }
            const passwordHash = await hashPassword(password);

            const [result] = await conn.execute<ResultSetHeader>(
                "INSERT INTO users (name, email, password_hash) VALUES (?,?,?)", [name, email, passwordHash]
            );
            await conn.commit();
            return {
                id: result.insertId,
                name,
                email
            };
        } catch (error) {
            await conn.rollback();
            throw error;
        }finally{
            conn.release();
        }
    }

    static async authenticate({email, password, ip, userAgent}: AuthInput): Promise<AuthResponse>{
        const conn = await pool.getConnection();
        try {
            const [users] = await conn.execute<UserRow[]>("SELECT id, name, email, password_hash, roles, token_version FROM users WHERE email = ?", [email]);
            if(users.length === 0){
                throw new Error("Invalid credentials");
            }
            const user = users[0];
            const valid = await verifyPassword(user.password_hash, password);

            if(!valid){
                throw new Error("Invalid credentials");
            }

            const roles: string[] = JSON.parse(user.roles ?? '["user"]');
            const accessToken = signAccessToken({
                sub: String(user.id),
                roles,
                tokenVersion: user.token_version
            });

            const plainRefresh = await generateRefreshTokenString(REFRESH_TOKEN_LENGTH);
            const tokenHash = hashToken(plainRefresh);
            const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60 * 1000);

            await conn.execute("INSERT INTO refresh_tokens (user_id, token_hash, user_agent, ip, expires_at) VALUES (?,?,?,?,?)", [user.id, tokenHash, userAgent ?? null, ip ?? null, expiresAt ]);
            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roles,
                },
                accessToken,
                refreshToken: plainRefresh
            };
        } catch (error) {
            console.error("Error while authenticating", error);
            throw new Error("Error While Authenticating");
        }finally{
            conn.release();
        }
    }

    static async refreshAccessToken(refreshToken: string, ip?: string, userAgent?: string): Promise<TokenRotateResponse>{
        const conn = await pool.getConnection();
        try {
            const tokenHash = hashToken(refreshToken);
            
            // Find and validate refresh token
            const [tokens] = await conn.execute<RowDataPacket[]>(
                "SELECT rt.id, rt.user_id, rt.expires_at, u.token_version, u.roles FROM refresh_tokens rt JOIN users u ON rt.user_id = u.id WHERE rt.token_hash = ? AND rt.expires_at > NOW()",
                [tokenHash]
            );

            if(tokens.length === 0){
                throw new Error("Invalid or expired refresh token");
            }

            const tokenData = tokens[0];
            
            // Delete old refresh token
            await conn.execute("DELETE FROM refresh_tokens WHERE id = ?", [tokenData.id]);

            // Generate new tokens
            const roles: string[] = JSON.parse(tokenData.roles ?? '["user"]');
            const accessToken = signAccessToken({
                sub: String(tokenData.user_id),
                roles,
                tokenVersion: tokenData.token_version
            });

            const newRefreshToken = await generateRefreshTokenString(REFRESH_TOKEN_LENGTH);
            const newTokenHash = hashToken(newRefreshToken);
            const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60 * 1000);

            // Store new refresh token
            await conn.execute(
                "INSERT INTO refresh_tokens (user_id, token_hash, user_agent, ip, expires_at) VALUES (?,?,?,?,?)",
                [tokenData.user_id, newTokenHash, userAgent ?? null, ip ?? null, expiresAt]
            );

            return {
                accessToken,
                refreshToken: newRefreshToken
            };
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw new Error("Failed to refresh token");
        } finally {
            conn.release();
        }
    }

    static async revokeRefreshToken(refreshToken: string): Promise<void>{
        const conn = await pool.getConnection();
        try {
            const tokenHash = hashToken(refreshToken);
            await conn.execute("DELETE FROM refresh_tokens WHERE token_hash = ?", [tokenHash]);
        } catch (error) {
            console.error("Error revoking token:", error);
            throw new Error("Failed to revoke token");
        } finally {
            conn.release();
        }
    }

    static async revokeAllUserTokens(userId: number): Promise<void>{
        const conn = await pool.getConnection();
        try {
            await conn.execute("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
        } catch (error) {
            console.error("Error revoking all user tokens:", error);
            throw new Error("Failed to revoke all tokens");
        } finally {
            conn.release();
        }
    }

    static async incrementTokenVersion(userId: number): Promise<void>{
        const conn = await pool.getConnection();
        try {
            await conn.execute("UPDATE users SET token_version = token_version + 1 WHERE id = ?", [userId]);
        } catch (error) {
            console.error("Error incrementing token version:", error);
            throw new Error("Failed to increment token version");
        } finally {
            conn.release();
        }
    }
}