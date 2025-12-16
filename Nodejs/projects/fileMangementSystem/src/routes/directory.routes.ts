import { Router } from "express";
import { DirectoryController } from "../controller/directory.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireProjectAccess } from "../middlewares/project.middleware";

export const directoryRouter = Router();

// All directory routes require authentication and project access
// Note: These routes are mounted under /projects/:projectId/directories in the main app

directoryRouter.use(requireAuth);
directoryRouter.use(requireProjectAccess);

// Directory operations
directoryRouter.get("/", DirectoryController.listDirectory); // ?path=...

directoryRouter.post("/", DirectoryController.createDirectory);
directoryRouter.post("/copy", DirectoryController.copyDirectory);

directoryRouter.put("/rename", DirectoryController.renameDirectory);
directoryRouter.put("/move", DirectoryController.moveDirectory);

directoryRouter.delete("/", DirectoryController.deleteDirectory); // ?path=...
