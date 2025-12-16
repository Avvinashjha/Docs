import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/helper";
import { FileService } from "../services/file.service";
import { FileProps } from "../types/file";

export class FileController {
  /**
   * Read a file from a project
   * GET /projects/:projectId/files?path=...
   */
  static async readFile(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const filePath = req.query.path;
      if (!filePath || typeof filePath !== "string") {
        return res.status(400).json(errorResponse("File path is required as query parameter (?path=...)"));
      }

      const data = await FileService.readFile(req.project.filePath, filePath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error reading file:", error);
      res.status(500).json(errorResponse(error.message || "Failed to read file"));
    }
  }

  /**
   * Create a new file in a project
   * POST /projects/:projectId/files
   */
  static async createFile(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { filePath, content } = req.body;
      if (!filePath || typeof filePath !== "string") {
        return res.status(400).json(errorResponse("filePath is required"));
      }

      const data = await FileService.createFile(
        req.project.filePath,
        filePath,
        content || ""
      );
      res.status(201).json(successResponse(data));
    } catch (error: any) {
      console.error("Error creating file:", error);
      res.status(500).json(errorResponse(error.message || "Failed to create file"));
    }
  }

  /**
   * Update a file in a project
   * PUT /projects/:projectId/files
   */
  static async updateFile(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { filePath, content } = req.body;

      if (!filePath || typeof filePath !== "string") {
        return res.status(400).json(errorResponse("filePath is required"));
      }

      if (content === undefined) {
        return res.status(400).json(errorResponse("content is required"));
      }

      const data = await FileService.updateFile(req.project.filePath, filePath, content);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error updating file:", error);
      res.status(500).json(errorResponse(error.message || "Failed to update file"));
    }
  }

  /**
   * Delete a file from a project
   * DELETE /projects/:projectId/files?path=...
   */
  static async deleteFile(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const filePath = req.query.path;
      if (!filePath || typeof filePath !== "string") {
        return res.status(400).json(errorResponse("File path is required as query parameter"));
      }

      const data = await FileService.deleteFile(req.project.filePath, filePath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error deleting file:", error);
      res.status(500).json(errorResponse(error.message || "Failed to delete file"));
    }
  }

  /**
   * Rename a file in a project
   * PUT /projects/:projectId/files/rename
   */
  static async renameFile(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { oldPath, newPath } = req.body;
      if (!oldPath || !newPath || typeof oldPath !== "string" || typeof newPath !== "string") {
        return res.status(400).json(errorResponse("oldPath and newPath are required"));
      }

      const data = await FileService.renameFile(req.project.filePath, oldPath, newPath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error renaming file:", error);
      res.status(500).json(errorResponse(error.message || "Failed to rename file"));
    }
  }

  /**
   * Move a file within a project
   * PUT /projects/:projectId/files/move
   */
  static async moveFile(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { oldPath, newPath } = req.body;
      if (!oldPath || !newPath || typeof oldPath !== "string" || typeof newPath !== "string") {
        return res.status(400).json(errorResponse("oldPath and newPath are required"));
      }

      const data = await FileService.moveFile(req.project.filePath, oldPath, newPath);
      res.status(200).json(successResponse(data));
    } catch (error: any) {
      console.error("Error moving file:", error);
      res.status(500).json(errorResponse(error.message || "Failed to move file"));
    }
  }

  /**
   * Search files by name in a project
   * GET /projects/:projectId/files/search?query=...
   */
  static async searchFile(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { query } = req.query;
      if (!query || typeof query !== "string") {
        return res.status(400).json(errorResponse("Search query is required"));
      }

      const files = await FileService.searchFilesByName(req.project.filePath, query);
      res.status(200).json(successResponse(files));
    } catch (error: any) {
      console.error("Error searching files:", error);
      res.status(500).json(errorResponse(error.message || "Failed to search files"));
    }
  }

  /**
   * Search files by extension in a project
   * GET /projects/:projectId/files/search/ext?ext=...
   */
  static async searchByExt(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { ext } = req.query;
      if (!ext || typeof ext !== "string") {
        return res.status(400).json(errorResponse("File extension is required"));
      }

      const files = await FileService.searchFileByExtName(req.project.filePath, ext);
      res.status(200).json(successResponse(files));
    } catch (error: any) {
      console.error("Error searching by extension:", error);
      res.status(500).json(errorResponse(error.message || "Failed to search by extension"));
    }
  }

  /**
   * Create multiple files at once
   * POST /projects/:projectId/files/batch
   */
  static async createMultipleFiles(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const { files }: { files: FileProps[] } = req.body;
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json(errorResponse("files array is required"));
      }

      const data = await FileService.createMultipleFiles(req.project.filePath, files);
      res.status(201).json(successResponse(data));
    } catch (error: any) {
      console.error("Error creating multiple files:", error);
      res.status(500).json(errorResponse(error.message || "Failed to create multiple files"));
    }
  }

  /**
   * Get file stats
   * GET /projects/:projectId/files/stats?path=...
   */
  static async getFileStats(req: Request, res: Response) {
    try {
      if (!req.project) {
        return res.status(400).json(errorResponse("Project context required"));
      }

      const filePath = req.query.path;
      if (!filePath || typeof filePath !== "string") {
        return res.status(400).json(errorResponse("File path is required"));
      }

      const stats = await FileService.getFileStats(req.project.filePath, filePath);
      res.status(200).json(successResponse(stats));
    } catch (error: any) {
      console.error("Error getting file stats:", error);
      res.status(500).json(errorResponse(error.message || "Failed to get file stats"));
    }
  }
}
