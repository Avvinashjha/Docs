import { Router, Request, Response }  from "express";
import { errorResponse } from "../utils/helper";
import { FileController } from "../controller/files.controller";

export const filesRouter = Router();


filesRouter.get("/", FileController.readFile);

filesRouter.get("/search", FileController.searchFile);

filesRouter.get("/search/ext", FileController.searchByExt);

filesRouter.put("/rename", FileController.renameFile);

filesRouter.post("/create", FileController.createNewFile);

filesRouter.post("/create/multi", FileController.createMultipleFiles);

filesRouter.post("/update", FileController.updateFile);

filesRouter.post("/move", FileController.moveFile);

filesRouter.delete("/delete", FileController.deleteFile);

filesRouter.delete("/delete/soft", FileController.softDeleteFile);