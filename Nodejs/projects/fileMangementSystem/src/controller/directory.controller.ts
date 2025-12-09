import { Request, Response } from "express";
import { DirectoryService } from "../services/directory.service";
import { errorResponse, successResponse } from "../utils/helper";
export class DirectoryController {
  static async addDirectory(req: Request, res: Response) {
    try {
      const { name } = req.query;
      if (!name || typeof name !== "string") {
        return res
          .status(400)
          .json("Please enter the directory name as ?name=directoryName");
      }
      const data = await DirectoryService.createNewDirectory(name);
      res.status(201).json(successResponse("Directory created successfully"));
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to add new directory"));
    }
  }

  static async deleteDirectory(req: Request, res: Response) {
    try {
      const { name } = req.query;
      if (!name || typeof name !== "string") {
        return res
          .status(400)
          .json("Please enter the directory name as ?name=directoryName");
      }
      const data = await DirectoryService.deleteDirectory(name);
      res.status(200).json(successResponse(data));
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to delete directory"));
    }
  }

  static async softDeleteDirectory(req:Request, res: Response) {
    try {
        const {dir} = req.query;
        if(!dir || typeof dir !== "string"){
            return res.status(400).json(errorResponse("Please enter the dir name as ?dir="))
        }
        const data = await DirectoryService.softDeleteDirectory(dir);
        res.status(200).json(successResponse(data));
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse("Failed to delete directory"));
    }
  }

  static async renameDirectory(req: Request, res: Response){
    try {
        const {oldDirName, newDirName} = req.query;
        if(!oldDirName || !newDirName || typeof oldDirName !== "string" || typeof newDirName !== "string"){
            return res.status(400).json(errorResponse("oldDirName, newDirName are required"));
        }
        const data = await DirectoryService.renameDirectory(oldDirName, newDirName);
        res.status(200).json(successResponse(data));
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(error));
    }
  }

  static async copyDirectory() {}

  static async moveDirectory() {}
}
