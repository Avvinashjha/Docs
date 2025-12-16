import { Request, Response } from "express";
import { DirectoryService } from "../services/directory.service";
import { errorResponse, successResponse } from "../utils/helper";

export class DirectoryController {
  /**
   * Create a new directory in a project
   * POST /projects/:projectId/directories
   */
  static async createDirectory(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { path: dirPath } = req.body;
      if (!dirPath || typeof dirPath !== "string") {
        return res.status(400).json(errorResponse("Directory path is required"));
      }

      const data = await DirectoryService.createDirectory(req.project.filePath, dirPath);
      res.status(201).json(successResponse(data));
    } catch (error: any) {
      console.error("Error creating directory:", error);
      res.status(500).json(errorResponse(error.message || "Failed to create directory"));
    }
  }

  /**
   * Delete a directory from a project
   * DELETE /projects/:projectId/directories?path=...
   */
  static async deleteDirectory(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const dirPath = req.query.path;
      if (!dirPath || typeof dirPath !== "string") {
        return res.status(400).json(errorResponse("Directory path is required as query parameter"));
      }

      const data = await DirectoryService.deleteDirectory(req.project.filePath, dirPath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error deleting directory:", error);
      res.status(500).json(errorResponse(error.message || "Failed to delete directory"));
    }
  }

  /**
   * Rename a directory in a project
   * PUT /projects/:projectId/directories/rename
   */
  static async renameDirectory(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { oldPath, newPath } = req.body;
      if (!oldPath || !newPath || typeof oldPath !== "string" || typeof newPath !== "string") {
        return res.status(400).json(errorResponse("oldPath and newPath are required"));
      }

      const data = await DirectoryService.renameDirectory(req.project.filePath, oldPath, newPath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error renaming directory:", error);
      res.status(500).json(errorResponse(error.message || "Failed to rename directory"));
    }
  }

  /**
   * Move a directory within a project
   * PUT /projects/:projectId/directories/move
   */
  static async moveDirectory(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { sourcePath, destPath } = req.body;
      if (!sourcePath || !destPath || typeof sourcePath !== "string" || typeof destPath !== "string") {
        return res.status(400).json(errorResponse("sourcePath and destPath are required"));
      }

      const data = await DirectoryService.moveDirectory(req.project.filePath, sourcePath, destPath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error moving directory:", error);
      res.status(500).json(errorResponse(error.message || "Failed to move directory"));
    }
  }

  /**
   * Copy a directory within a project
   * POST /projects/:projectId/directories/copy
   */
  static async copyDirectory(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { sourcePath, destPath } = req.body;
      if (!sourcePath || !destPath || typeof sourcePath !== "string" || typeof destPath !== "string") {
        return res.status(400).json(errorResponse("sourcePath and destPath are required"));
      }

      const data = await DirectoryService.copyDirectory(req.project.filePath, sourcePath, destPath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error copying directory:", error);
      res.status(500).json(errorResponse(error.message || "Failed to copy directory"));
    }
  }

  /**
   * List contents of a directory
   * GET /projects/:projectId/directories?path=...
   */
  static async listDirectory(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const dirPath = (req.query.path as string) || ".";
      const items = await DirectoryService.listDirectory(req.project.filePath, dirPath);
      res.status(200).json(successResponse(items));
    } catch (error: any) {
      console.error("Error listing directory:", error);
      res.status(500).json(errorResponse(error.message || "Failed to list directory"));
    }
  }
}
