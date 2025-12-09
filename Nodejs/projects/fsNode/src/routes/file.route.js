import { Router } from "express";
import { FilesController } from "../controllers/files.controller.js";

export const fileRouter = Router();

// - read a file:        /files/rea
fileRouter.get("/read", FilesController.readFile);

// - edit a file         /files/edit
fileRouter.put("/edit", FilesController.editFile);

// - create a file       /files/create
fileRouter.post("/create", FilesController.createFile)

// - rename a file       /files/rename
fileRouter.put("/rename", FilesController.renameFile);

// - delete a file       /files/delete
fileRouter.delete("/delete", FilesController.deleteFile);

// - soft delete a file  /files/soft/delete
fileRouter.delete("/delete/soft", FilesController.softDeleteFile)

// - move a file         /files/move
fileRouter.put("/move", FilesController.moveFile);