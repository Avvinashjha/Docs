import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, AccessTokenPayload } from "../utils/jwt";

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        roles: string[];
        tokenVersion: number;
      };
    }
  }
}

/**
 * Middleware to require authentication
 * Verifies JWT token and attaches user info to request
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No authorization token provided",
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const payload = verifyAccessToken(token);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Attach user info to request
    const tokenPayload = payload as AccessTokenPayload;
    req.user = {
      id: Number(tokenPayload.sub),
      roles: tokenPayload.roles,
      tokenVersion: tokenPayload.tokenVersion,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}

/**
 * Middleware to require specific role(s)
 * Must be used after requireAuth middleware
 */
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const hasRole = roles.some((role) => req.user!.roles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions",
        requiredRoles: roles,
      });
    }

    next();
  };
}

/**
 * Optional authentication middleware
 * Extracts user if token is present but doesn't block if missing
 */
export function extractUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const payload = verifyAccessToken(token);

      if (payload) {
        const tokenPayload = payload as AccessTokenPayload;
        req.user = {
          id: Number(tokenPayload.sub),
          roles: tokenPayload.roles,
          tokenVersion: tokenPayload.tokenVersion,
        };
      }
    }

    next();
  } catch (error) {
    // Silent fail - just continue without user
    next();
  }
}
