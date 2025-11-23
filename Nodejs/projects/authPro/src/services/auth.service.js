import { pool } from "../utils/database.js";
import { signAccessToken } from "../utils/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { generateRefreshTokenString, hashToken } from "../utils/tokens.js";
const REFRESH_TOKEN_LENGTH = Number(process.env.REFRESH_TOKEN_LENGTH || 64);
const REFRESH_TOKEN_EXP_DAYS = Number(process.env.REFRESH_TOKEN_EXP_DAYS || 30);

export class AuthService {
  static async registerUser({ name, email, password }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // check existing
      const [existing] = await conn.execute(
        "SELECT id FROM users WHERE email = ? FOR UPDATE",
        [email]
      );
      if (existing.length) {
        await conn.rollback();
        throw new Error("Email already registered");
      }

      const passwordHash = await hashPassword(password);
      const [result] = await conn.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
      );
      await conn.commit();
      return { id: result.insertId, name, email };
    } catch (error) {
      try {
        await conn.rollback();
      } catch (err) {
        throw err;
      }
    } finally {
      conn.release();
    }
  }

  static async authenticate({ email, password, ip, userAgent }) {
    const conn = await pool.getConnection();
    try {
      // fetch user
      const [users] = await conn.execute(
        "SELECT id, name, email, password_hash, roles, token_version FROM users WHERE email = ?",
        [email]
      );
      if (!users.length) throw new Error("Invalid credentials");
      const user = users[0];
      const ok = await verifyPassword(user.password_hash, password);
      if (!ok) throw new Error("Invalid Credentials");

      // sign access token
      const roles = JSON.parse(user.roles || '["user"]');
      const accessToken = signAccessToken({
        sub: String(user.id),
        roles,
        tokenVersion: user.token_version,
      });

      // create a refresh token
      const plainRefresh = await generateRefreshTokenString(
        REFRESH_TOKEN_LENGTH
      );
      const tokenHash = hashToken(plainRefresh);
      const expiresAt = new Date(
        Date.now() + REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60 * 1000
      );

      await conn.execute(
        `INSERT INTO refresh_tokens (user_id, token_hash, user_agent, ip, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
        [user.id, tokenHash, userAgent || null, ip || null, expiresAt]
      );

      return {
        user: { id: user.id, name: user.name, email: user.email, roles },
        accessToken,
        refreshToken: plainRefresh,
      };
    } catch (error) {
      console.log(error);
      conn.release();
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Rotate Refresh token
   * - Locate token by hash
   * - if not found or revoked -> possible reuse -> revoke token or error
   * - Mark current token revoked and insert a new token (in a transaction)
   */
  static async rotateRefreshToken(oldPlainToken, ip, userAgent) {
    const oldHash = hashToken(oldPlainToken);
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      //find the existing token
      const [rows] = await conn.execute(
        "SELECT id, user_id, expires_at, revoked FROM refresh_tokens WHERE token_hash = ? FOR UPDATE",
        [oldHash]
      );

      if (!rows.length) {
        // no such token -> expired or potential attack
        await conn.rollback();
        throw new Error("Invalid refresh token");
      }
      const tokenRow = rows[0];

      if (tokenRow.revoked) {
        //token already revoked -> revoke all users token as safety
        await conn.execute(
          "UPDATE refresh_tokens SET revoked = TRUE WHERE user_id = ?",
          [tokenRow.user_id]
        );
        await conn.commit();
        throw new Error("Refresh token revoked");
      }

      if (new Date(tokenRow.expires_at) < new Date()) {
        await conn.rollback();
        throw new Error("Refresh token expired");
      }
      // create new refresh token
      const newPlain = await generateRefreshTokenString(REFRESH_TOKEN_LENGTH);
      const newHash = hashToken(newPlain);
      const newExpiresAt = new Date(
        Date.now() + REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60 * 1000
      );

      const [ins] = await conn.execute(
        `INSERT INTO refresh_tokens (user_id, token_hash, user_agent, ip, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
        [tokenRow.user_id, newHash, userAgent || null, ip || null, newExpiresAt]
      );

      // mark old token revoked and set replaced_by
      await conn.execute(
        "UPDATE refresh_tokens SET revoked = TRUE, replaced_by = ? WHERE id = ?",
        [ins.insertId, tokenRow.id]
      );

      // fetch user to sign access token
      const [users] = await conn.execute(
        "SELECT id, name, email, roles, token_version FROM users WHERE id = ? FOR UPDATE",
        [tokenRow.user_id]
      );
      if (!users.length) {
        await conn.rollback();
        throw new Error("User not found");
      }
      const user = users[0];
      const roles = JSON.parse(user.roles || '["user"]');

      const accessToken = signAccessToken({
        sub: String(user.id),
        roles,
        tokenVersion: user.token_version,
      });

      await conn.commit();
      return { accessToken, refreshToken: newPlain };
    } catch (error) {
      try {
        await conn.rollback();
      } catch (_) {}
      throw error;
    } finally {
      conn.release();
    }
  }
  static async revokeRefreshToken(plainToken) {
    const tokenHash = hashToken(plainToken);
    const conn = await pool.getConnection();

    try {
      await conn.execute(
        "UPDATE refresh_tokens SET revoked = TRUE WHERE token_hash = ?",
        [tokenHash]
      );
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }
}
