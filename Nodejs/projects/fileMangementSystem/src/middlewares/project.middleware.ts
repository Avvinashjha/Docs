import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service";
import { errorResponse } from "../utils/helper";

// Extend Express Request to include project
declare global {
  namespace Express {
    interface Request {
      project?: {
        id: number;
        userId: number;
        name: string;
        filePath: string;
      };
    }
  }
}

/**
 * Middleware to verify user owns the project in :projectId param
 * Must be used after requireAuth middleware
 */
export async function requireProjectAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(401).json(errorResponse("Authentication required"));
    }

    const projectId = parseInt(req.params.projectId || req.params.id);
    
    if (isNaN(projectId)) {
      return res.status(400).json(errorResponse("Invalid project ID"));
    }

    const project = await ProjectService.getProjectById(projectId, req.user.id);

    if (!project) {
      return res.status(404).json(errorResponse("Project not found or access denied"));
    }

    // Attach project to request
    req.project = {
      id: project.id,
      userId: project.userId,
      name: project.name,
      filePath: project.filePath,
    };

    // Update last accessed
    await ProjectService.updateLastAccessed(projectId);

    next();
  } catch (error) {
    console.error("Project access middleware error:", error);
    return res.status(500).json(errorResponse("Failed to verify project access"));
  }
}
