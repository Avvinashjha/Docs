import { Router } from "express";
import { ProjectController } from "../controller/project.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const projectRouter = Router();

// All project routes require authentication
projectRouter.use(requireAuth);

// Project CRUD operations
projectRouter.post("/", ProjectController.createProject);
projectRouter.get("/", ProjectController.getUserProjects);
projectRouter.get("/:id", ProjectController.getProject);
projectRouter.get("/:id/tree", ProjectController.getProjectTree);
projectRouter.put("/:id", ProjectController.updateProject);
projectRouter.delete("/:id", ProjectController.deleteProject);
