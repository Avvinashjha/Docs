import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database";
import { hashPassword, verifyPassword } from "../utils/password";

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  roles: string | null;
  token_version: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export class UserService {
  /**
   * Get user by ID
   */
  static async getUserById(userId: number): Promise<User | null> {
    const conn = await pool.getConnection();
    try {
      const [users] = await conn.execute<UserRow[]>(
        "SELECT id, name, email, roles, created_at, updated_at FROM users WHERE id = ?",
        [userId]
      );

      if (users.length === 0) {
        return null;
      }

      const user = users[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: JSON.parse(user.roles ?? '["user"]'),
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      };
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers(): Promise<User[]> {
    const conn = await pool.getConnection();
    try {
      const [users] = await conn.execute<UserRow[]>(
        "SELECT id, name, email, roles, created_at, updated_at FROM users ORDER BY created_at DESC"
      );

      return users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: JSON.parse(user.roles ?? '["user"]'),
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      }));
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(userId: number, input: UpdateUserInput): Promise<User> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const updates: string[] = [];
      const values: any[] = [];

      if (input.name) {
        updates.push("name = ?");
        values.push(input.name);
      }

      if (input.email) {
        // Check if email already exists
        const [existing] = await conn.execute<RowDataPacket[]>(
          "SELECT id FROM users WHERE email = ? AND id != ?",
          [input.email, userId]
        );

        if (existing.length > 0) {
          throw new Error("Email already in use");
        }

        updates.push("email = ?");
        values.push(input.email);
      }

      if (updates.length === 0) {
        throw new Error("No fields to update");
      }

      values.push(userId);
      await conn.execute(
        `UPDATE users SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        values
      );

      await conn.commit();

      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error("User not found after update");
      }

      return user;
    } catch (error) {
      await conn.rollback();
      console.error("Error updating user:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Change user password
   */
  static async changePassword(userId: number, input: ChangePasswordInput): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Verify current password
      const [users] = await conn.execute<UserRow[]>(
        "SELECT password_hash FROM users WHERE id = ?",
        [userId]
      );

      if (users.length === 0) {
        throw new Error("User not found");
      }

      const isValid = await verifyPassword(users[0].password_hash, input.currentPassword);
      if (!isValid) {
        throw new Error("Current password is incorrect");
      }

      // Hash new password
      const newPasswordHash = await hashPassword(input.newPassword);

      // Update password and increment token version (invalidate all existing tokens)
      await conn.execute(
        "UPDATE users SET password_hash = ?, token_version = token_version + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [newPasswordHash, userId]
      );

      // Revoke all refresh tokens
      await conn.execute("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      console.error("Error changing password:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Delete user account
   */
  static async deleteUser(userId: number): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Delete user (cascade will delete projects, refresh tokens, etc.)
      await conn.execute("DELETE FROM users WHERE id = ?", [userId]);

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Get user statistics
   */
  static async getUserStats(userId: number): Promise<{
    projectCount: number;
    totalStorage: number;
  }> {
    const conn = await pool.getConnection();
    try {
      const [stats] = await conn.execute<RowDataPacket[]>(
        `SELECT 
          COUNT(p.id) as project_count,
          COALESCE(SUM(pm.total_size), 0) as total_storage
        FROM users u
        LEFT JOIN projects p ON u.id = p.user_id
        LEFT JOIN project_metadata pm ON p.id = pm.project_id
        WHERE u.id = ?
        GROUP BY u.id`,
        [userId]
      );

      if (stats.length === 0) {
        return { projectCount: 0, totalStorage: 0 };
      }

      return {
        projectCount: stats[0].project_count || 0,
        totalStorage: stats[0].total_storage || 0,
      };
    } catch (error) {
      console.error("Error getting user stats:", error);
      throw error;
    } finally {
      conn.release();
    }
  }
}
