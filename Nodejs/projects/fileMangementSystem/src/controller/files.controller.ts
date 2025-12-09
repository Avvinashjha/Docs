import { Request, Response } from "express";
import path from "path";
import { errorResponse, successResponse } from "../utils/helper";
import { FileService } from "../services/file.service";
import { DIR_NAME, ROOT_PATH } from "../config/pathConfig";
import { FileProps } from "../types/file";
export class FileController {
  static async readFile(req: Request, res: Response) {
    try {
      console.log(ROOT_PATH);
      const filePath = req.query.path;
      if (!filePath || typeof filePath !== "string") {
        return res
          .status(400)
          .json(errorResponse("Path is required in query prams ?path={path}"));
      }
      console.log(filePath);
      const data = await FileService.readFile(filePath);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Not able to read file",
      });
    }
  }

  static async createNewFile(req: Request, res: Response) {
    try {
      const { filePath, content } = req.body;
      if (!filePath) {
        return res
          .status(400)
          .contentType("application/json")
          .json(errorResponse("Path is a required."));
      }
      console.log(filePath, content);
      const data = await FileService.createFile({
        fileName: filePath,
        content: content,
      });
      res.status(201).contentType("application/json").json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to add new file"));
    }
  }

  static async updateFile(req: Request, res: Response) {
    try {
      const { fileName, content } = req.body;

      if (!fileName) {
        return res
          .status(400)
          .contentType("application/json")
          .json(errorResponse("Path is a required."));
      }

      if (!content) {
        return res
          .status(200)
          .contentType("application/json")
          .json(errorResponse("No Change detected"));
      }

      const data = await FileService.updateFile({ fileName, content });
      res
        .status(200)
        .contentType("application/json")
        .json(successResponse(data));
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to update file"));
    }
  }

  static async deleteFile(req: Request, res: Response) {
    try {
      const fileName = req.query.fileName;
      if (!fileName || typeof fileName !== "string") {
        return res
          .status(400)
          .contentType("application/json")
          .json(
            errorResponse(
              "Invalid Filename or Please add fileName in query prams"
            )
          );
      }
      const data = await FileService.deleteFile(fileName);
      res
        .status(200)
        .contentType("application/json")
        .json(successResponse(data));
    } catch (error) {
      res
        .status(500)
        .contentType("application/json")
        .json(errorResponse(error));
    }
  }

  static async softDeleteFile(req: Request, res: Response) {
    try {
      const fileName = req.query.fileName;
      if (!fileName || typeof fileName !== "string") {
        return res
          .status(400)
          .contentType("application/json")
          .json(
            errorResponse(
              "Invalid Filename or Please add fileName in query prams"
            )
          );
      }
      await FileService.softDelete(fileName);
      res.status(200).json(successResponse("Moved file to bin"));
    } catch (error) {
      res
        .status(500)
        .contentType("application/json")
        .json(errorResponse(error));
    }
  }

  static async renameFile(req: Request, res: Response) {
    try {
      const { oldFileName, newFileName } = req.query;
      if (
        !oldFileName ||
        !newFileName ||
        typeof oldFileName !== "string" ||
        typeof newFileName !== "string"
      ) {
        return res
          .status(400)
          .json(errorResponse("oldFileName and newFileName are required"));
      }
      await FileService.renameFile(oldFileName, newFileName);
      res.status(200).json(successResponse("File renamed successfully"));
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to rename the file"));
    }
  }

  static async searchFile(req: Request, res: Response) {
    try {
      const { search } = req.query;
      if (!search || typeof search !== "string") {
        return res
          .status(400)
          .json(errorResponse("Please enter search in query prams"));
      }
      const files = await FileService.searchFilesByName(search);
      res.status(200).json(files);
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to search"));
    }
  }

  static async searchByExt(req: Request, res: Response) {
    try {
      const { ext } = req.query;
      if (!ext || typeof ext !== "string") {
        return res
          .status(400)
          .json(errorResponse("Please Enter valid ext name"));
      }
      const files = await FileService.searchFileByExtName(ext);
      res.status(200).json(files);
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to search by ext name"));
    }
  }

  static async moveFile(req: Request, res: Response) {
    try {
      const { oldFileName, newFileName } = req.query;
      if (
        !oldFileName ||
        !newFileName ||
        typeof oldFileName !== "string" ||
        typeof newFileName !== "string"
      ) {
        return res
          .status(400)
          .json(
            errorResponse("Please enter valid oldFileName and newFileName")
          );
      }
      const data = await FileService.moveFile(oldFileName, newFileName);
      res.status(200).json(successResponse(data));
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to move file"));
    }
  }

  static async createMultipleFiles(req: Request, res: Response) {
    try {
      const { files }: { files: FileProps[] } = req.body;
      if (!files || typeof files !== "object" || files.length === 0) {
        return res
          .status(400)
          .json(errorResponse("request body must have files array"));
      }
      const data = await FileService.createMultipleFile(files);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse("Failed to create multiple files"));
    }
  }
}
