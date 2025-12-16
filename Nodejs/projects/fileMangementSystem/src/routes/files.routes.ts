import { Router } from "express";
import { FileController } from "../controller/files.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireProjectAccess } from "../middlewares/project.middleware";

export const filesRouter = Router();

// All file routes require authentication and project access
// Note: These routes are mounted under /projects/:projectId/files in the main app

filesRouter.use(requireAuth);
filesRouter.use(requireProjectAccess);

// File operations
filesRouter.get("/", FileController.readFile); // ?path=...
filesRouter.get("/stats", FileController.getFileStats); // ?path=...
filesRouter.get("/search", FileController.searchFile); // ?query=...
filesRouter.get("/search/ext", FileController.searchByExt); // ?ext=...

filesRouter.post("/", FileController.createFile);
filesRouter.post("/batch", FileController.createMultipleFiles);

filesRouter.put("/", FileController.updateFile);
filesRouter.put("/rename", FileController.renameFile);
filesRouter.put("/move", FileController.moveFile);

filesRouter.delete("/", FileController.deleteFile); // ?path=...
