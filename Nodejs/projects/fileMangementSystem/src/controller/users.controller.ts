import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { errorResponse, successResponse } from "../utils/helper";

export class UserController {
  /**
   * Get current user's info
   * GET /users/me
   */
  static async getCurrentUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const user = await UserService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }

      const stats = await UserService.getUserStats(req.user.id);

      res.status(200).json(successResponse({
        user,
        stats
      }));
    } catch (error) {
      console.error("Error getting current user:", error);
      res.status(500).json(errorResponse("Failed to get user info"));
    }
  }

  /**
   * Get user info by ID
   * GET /users/:id
   */
  static async getUserInfo(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json(errorResponse("Invalid user ID"));
      }

      // Users can only view their own info unless they're admin
      if (req.user.id !== userId && !req.user.roles.includes("admin")) {
        return res.status(403).json(errorResponse("Access denied"));
      }

      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }

      res.status(200).json(successResponse(user));
    } catch (error) {
      console.error("Error getting user info:", error);
      res.status(500).json(errorResponse("Failed to get user info"));
    }
  }

  /**
   * Get all users (admin only)
   * GET /users/all
   */
  static async getAllUsers(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      if (!req.user.roles.includes("admin")) {
        return res.status(403).json(errorResponse("Admin access required"));
      }

      const users = await UserService.getAllUsers();
      res.status(200).json(successResponse(users));
    } catch (error) {
      console.error("Error getting all users:", error);
      res.status(500).json(errorResponse("Failed to get users"));
    }
  }

  /**
   * Update current user's profile
   * PUT /users/me
   */
  static async updateProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const { name, email } = req.body;

      if (!name && !email) {
        return res.status(400).json(errorResponse("No fields to update"));
      }

      const input: any = {};
      if (name) input.name = name;
      if (email) input.email = email;

      const user = await UserService.updateUser(req.user.id, input);
      res.status(200).json(successResponse(user));
    } catch (error: any) {
      console.error("Error updating profile:", error);
      if (error.message === "Email already in use") {
        res.status(409).json(errorResponse(error.message));
      } else {
        res.status(500).json(errorResponse("Failed to update profile"));
      }
    }
  }

  /**
   * Change password
   * PUT /users/me/password
   */
  static async changePassword(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json(errorResponse("Current and new password are required"));
      }

      if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
        return res.status(400).json(errorResponse("Passwords must be strings"));
      }

      if (newPassword.length < 8) {
        return res.status(400).json(errorResponse("New password must be at least 8 characters"));
      }

      await UserService.changePassword(req.user.id, { currentPassword, newPassword });
      res.status(200).json(successResponse({ message: "Password changed successfully" }));
    } catch (error: any) {
      console.error("Error changing password:", error);
      if (error.message === "Current password is incorrect") {
        res.status(400).json(errorResponse(error.message));
      } else {
        res.status(500).json(errorResponse("Failed to change password"));
      }
    }
  }

  /**
   * Delete current user's account
   * DELETE /users/me
   */
  static async deleteAccount(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const { password } = req.body;
      if (!password) {
        return res.status(400).json(errorResponse("Password confirmation required"));
      }

      // Verify password before deletion
      const user = await UserService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }

      await UserService.deleteUser(req.user.id);
      res.status(200).json(successResponse({ message: "Account deleted successfully" }));
    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json(errorResponse("Failed to delete account"));
    }
  }

  /**
   * Get user statistics
   * GET /users/me/stats
   */
  static async getUserStats(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const stats = await UserService.getUserStats(req.user.id);
      res.status(200).json(successResponse(stats));
    } catch (error) {
      console.error("Error getting user stats:", error);
      res.status(500).json(errorResponse("Failed to get user stats"));
    }
  }
}
