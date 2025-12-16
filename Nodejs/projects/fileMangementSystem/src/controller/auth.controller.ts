import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/helper";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        res.status(400).json(errorResponse("Email and password are required"));
        return;
      }

      const ip = req.ip || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];

      const authData = await AuthService.authenticate({
        email,
        password,
        ip,
        userAgent
      });

      res.status(200).json(successResponse(authData));
    } catch (error) {
      console.error("Error while /auth/login:", error);
      res.status(401).json(errorResponse("Invalid credentials"));
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken || typeof refreshToken !== "string") {
        res.status(400).json(errorResponse("Refresh token is required"));
        return;
      }

      await AuthService.revokeRefreshToken(refreshToken);
      res.status(200).json(successResponse("Logged out successfully"));
    } catch (error) {
      console.error("Error while /auth/logout:", error);
      res.status(500).json(errorResponse("Failed to logout"));
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      
      if (
        !name ||
        !email ||
        !password ||
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        res.status(400).json(errorResponse("Invalid name, email, or password"));
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json(errorResponse("Invalid email format"));
        return;
      }

      // Password strength validation
      if (password.length < 8) {
        res.status(400).json(errorResponse("Password must be at least 8 characters long"));
        return;
      }

      const user = await AuthService.registerUser({ name, email, password });
      res.status(201).json(successResponse({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }));
    } catch (error: any) {
      console.error("Error while /auth/register:", error);
      if (error.message === "Email already registered") {
        res.status(409).json(errorResponse("Email already registered"));
      } else {
        res.status(500).json(errorResponse("Failed to register user"));
      }
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      // User info is already attached by requireAuth middleware
      if (!req.user) {
        res.status(401).json(errorResponse("Not authenticated"));
        return;
      }

      res.status(200).json(successResponse({
        user: {
          id: req.user.id,
          roles: req.user.roles
        },
        valid: true
      }));
    } catch (error) {
      console.error("Error while /auth/verify:", error);
      res.status(401).json(errorResponse("Token verification failed"));
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken || typeof refreshToken !== "string") {
        res.status(400).json(errorResponse("Refresh token is required"));
        return;
      }

      const ip = req.ip || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];

      const tokens = await AuthService.refreshAccessToken(refreshToken, ip, userAgent);
      res.status(200).json(successResponse(tokens));
    } catch (error) {
      console.error("Error while /auth/refresh:", error);
      res.status(401).json(errorResponse("Failed to refresh token"));
    }
  }
}

