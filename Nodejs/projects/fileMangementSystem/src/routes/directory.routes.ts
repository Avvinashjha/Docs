import { Router } from "express";
import { DirectoryController } from "../controller/directory.controller";

export const directoryRouter = Router();

directoryRouter.post("/create", DirectoryController.addDirectory);

directoryRouter.put("/rename", DirectoryController.renameDirectory);

directoryRouter.delete("/delete", DirectoryController.deleteDirectory);

directoryRouter.delete("/delete/soft", DirectoryController.softDeleteDirectory);