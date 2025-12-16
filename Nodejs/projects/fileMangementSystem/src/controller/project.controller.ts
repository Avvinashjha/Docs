import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import { errorResponse, successResponse } from "../utils/helper";
import { CreateProjectInput, UpdateProjectInput } from "../types/project";

export class ProjectController {
  /**
   * Create a new project
   * POST /projects
   */
  static async createProject(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const { name, description } = req.body;

      if (!name || typeof name !== "string") {
        return res.status(400).json(errorResponse("Project name is required"));
      }

      if (name.length > 100) {
        return res.status(400).json(errorResponse("Project name is too long (max 100 characters)"));
      }

      const input: CreateProjectInput = {
        name,
        description: description || undefined,
      };

      const project = await ProjectService.createProject(req.user.id, input);
      res.status(201).json(successResponse(project));
    } catch (error: any) {
      console.error("Error creating project:", error);
      if (error.message === "Project with this name already exists") {
        res.status(409).json(errorResponse(error.message));
      } else {
        res.status(500).json(errorResponse("Failed to create project"));
      }
    }
  }

  /**
   * Get all projects for the authenticated user
   * GET /projects
   */
  static async getUserProjects(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const projects = await ProjectService.getUserProjects(req.user.id);
      res.status(200).json(successResponse(projects));
    } catch (error) {
      console.error("Error getting projects:", error);
      res.status(500).json(errorResponse("Failed to get projects"));
    }
  }

  /**
   * Get a specific project by ID
   * GET /projects/:id
   */
  static async getProject(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json(errorResponse("Invalid project ID"));
      }

      const project = await ProjectService.getProjectById(projectId, req.user.id);
      if (!project) {
        return res.status(404).json(errorResponse("Project not found"));
      }

      // Update last accessed
      await ProjectService.updateLastAccessed(projectId);

      res.status(200).json(successResponse(project));
    } catch (error) {
      console.error("Error getting project:", error);
      res.status(500).json(errorResponse("Failed to get project"));
    }
  }

  /**
   * Get file tree for a project
   * GET /projects/:id/tree
   */
  static async getProjectTree(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json(errorResponse("Invalid project ID"));
      }

      const tree = await ProjectService.getProjectTree(projectId, req.user.id);
      
      // Update last accessed
      await ProjectService.updateLastAccessed(projectId);

      res.status(200).json(successResponse(tree));
    } catch (error: any) {
      console.error("Error getting project tree:", error);
      if (error.message === "Project not found or access denied") {
        res.status(404).json(errorResponse(error.message));
      } else {
        res.status(500).json(errorResponse("Failed to get project tree"));
      }
    }
  }

  /**
   * Update project metadata
   * PUT /projects/:id
   */
  static async updateProject(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json(errorResponse("Invalid project ID"));
      }

      const { name, description } = req.body;

      if (name !== undefined && typeof name !== "string") {
        return res.status(400).json(errorResponse("Invalid project name"));
      }

      if (name && name.length > 100) {
        return res.status(400).json(errorResponse("Project name is too long (max 100 characters)"));
      }

      const input: UpdateProjectInput = {};
      if (name !== undefined) input.name = name;
      if (description !== undefined) input.description = description;

      if (Object.keys(input).length === 0) {
        return res.status(400).json(errorResponse("No update fields provided"));
      }

      const project = await ProjectService.updateProject(projectId, req.user.id, input);
      res.status(200).json(successResponse(project));
    } catch (error: any) {
      console.error("Error updating project:", error);
      if (error.message === "Project not found or access denied") {
        res.status(404).json(errorResponse(error.message));
      } else {
        res.status(500).json(errorResponse("Failed to update project"));
      }
    }
  }

  /**
   * Delete a project
   * DELETE /projects/:id
   */
  static async deleteProject(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponse("Authentication required"));
      }

      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json(errorResponse("Invalid project ID"));
      }

      await ProjectService.deleteProject(projectId, req.user.id);
      res.status(200).json(successResponse({ message: "Project deleted successfully" }));
    } catch (error: any) {
      console.error("Error deleting project:", error);
      if (error.message === "Project not found or access denied") {
        res.status(404).json(errorResponse(error.message));
      } else {
        res.status(500).json(errorResponse("Failed to delete project"));
      }
    }
  }
}
