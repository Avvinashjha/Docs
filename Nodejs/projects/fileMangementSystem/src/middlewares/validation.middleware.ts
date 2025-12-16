import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/helper";
import { isPathSafe, MAX_FILE_SIZE } from "../config/pathConfig";

/**
 * Validate file path to prevent path traversal attacks
 */
export function validateFilePath(req: Request, res: Response, next: NextFunction) {
  const filePath = req.body.filePath || req.body.fileName || req.query.path;

  if (filePath && typeof filePath === "string") {
    if (!isPathSafe(filePath)) {
      return res.status(400).json(errorResponse("Invalid file path: Path traversal detected"));
    }

    // Check for invalid characters in file name
    const fileName = filePath.split("/").pop() || "";
    if (/[<>:"|?*\x00-\x1f]/g.test(fileName)) {
      return res.status(400).json(errorResponse("Invalid file name: Contains illegal characters"));
    }
  }

  next();
}

/**
 * Validate directory path
 */
export function validateDirectoryPath(req: Request, res: Response, next: NextFunction) {
  const dirPath = req.body.path || req.query.path;

  if (dirPath && typeof dirPath === "string") {
    if (!isPathSafe(dirPath)) {
      return res.status(400).json(errorResponse("Invalid directory path: Path traversal detected"));
    }
  }

  next();
}

/**
 * Validate project name
 */
export function validateProjectName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json(errorResponse("Project name must be a non-empty string"));
    }

    if (name.length > 100) {
      return res.status(400).json(errorResponse("Project name is too long (max 100 characters)"));
    }

    // Check for invalid characters
    if (/[/\\:*?"<>|]/g.test(name)) {
      return res.status(400).json(errorResponse("Project name contains invalid characters"));
    }

    // Reserved names
    const reserved = [".", "..", "CON", "PRN", "AUX", "NUL", "COM1", "COM2", "LPT1", "LPT2"];
    if (reserved.includes(name.toUpperCase())) {
      return res.status(400).json(errorResponse("Project name is reserved"));
    }
  }

  next();
}

/**
 * Validate file size
 */
export function validateFileSize(req: Request, res: Response, next: NextFunction) {
  const { content } = req.body;

  if (content !== undefined) {
    const sizeInBytes = Buffer.byteLength(content, "utf8");
    if (sizeInBytes > MAX_FILE_SIZE) {
      return res.status(413).json(
        errorResponse(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE} bytes (${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB)`)
      );
    }
  }

  next();
}

/**
 * Validate email format
 */
export function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  if (email !== undefined) {
    if (typeof email !== "string") {
      return res.status(400).json(errorResponse("Email must be a string"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json(errorResponse("Invalid email format"));
    }
  }

  next();
}

/**
 * Validate password strength
 */
export function validatePassword(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;

  if (password !== undefined) {
    if (typeof password !== "string") {
      return res.status(400).json(errorResponse("Password must be a string"));
    }

    if (password.length < 8) {
      return res.status(400).json(errorResponse("Password must be at least 8 characters long"));
    }

    if (password.length > 128) {
      return res.status(400).json(errorResponse("Password is too long (max 128 characters)"));
    }

    // Optional: Check for complexity
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    //   return res.status(400).json(errorResponse("Password must contain uppercase, lowercase, and numbers"));
    // }
  }

  next();
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  // Basic XSS prevention for string inputs
  const sanitize = (obj: any): any => {
    if (typeof obj === "string") {
      return obj
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
    }
    if (typeof obj === "object" && obj !== null) {
      const sanitized: any = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        sanitized[key] = sanitize(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  // Note: Only sanitize body, not query params or file paths
  // as they might need special characters
  if (req.body && typeof req.body === "object") {
    // Skip sanitization for specific fields that need raw content
    const skipFields = ["content", "password"];
    const sanitized: any = {};
    
    for (const key in req.body) {
      if (skipFields.includes(key)) {
        sanitized[key] = req.body[key];
      } else {
        sanitized[key] = sanitize(req.body[key]);
      }
    }
    
    req.body = sanitized;
  }

  next();
}

/**
 * Rate limiting helper - tracks requests by IP
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function createRateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    let record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + windowMs };
      rateLimitStore.set(ip, record);
    }

    record.count++;

    if (record.count > maxRequests) {
      return res.status(429).json(errorResponse("Too many requests, please try again later"));
    }

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      for (const [key, value] of rateLimitStore.entries()) {
        if (now > value.resetTime) {
          rateLimitStore.delete(key);
        }
      }
    }

    next();
  };
}
