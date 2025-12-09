import { pool } from "../config/database";

export class TokenService{
    static async addRefreshToken(userId: number, token: string): Promise<void>{
        try {
            await pool.execute(`INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)`, [userId, token]);
        } catch (error) {
            console.error("Error while refreshing token: ", error);
            throw error;
        }
    }

    static async removeRefreshToken (token: string ): Promise<void>{
        try {
            await pool.execute(`DELETE FROM refresh_tokens WHERE token = ?`, [token]);
        } catch (error) {
            console.error("Error while deleting refresh token: ", error);
            throw error;
        }
    }

    static async hasRefreshToken (userId: number, token: string): Promise<boolean | undefined>{
        try {
            const [rows] = await pool.execute(`SELECT id FROM refresh_tokens WHERE user_id = ? AND token = ?`, [userId, token]);
            return (rows as any[]).length > 0;
        } catch (error) {
            console.error("Error while checking valid refresh token: ", error);
            throw error;
        }
    }

    static async removeAllRefreshTokensForUser(userId: number): Promise<void>{
        try {
            await pool.execute(`DELETE FROM refresh_tokens WHERE user_id = ?`, [userId]);
        } catch (error) {
            console.error("Error while deleting all refresh token: ", error);
            throw error;
        }
    }
}