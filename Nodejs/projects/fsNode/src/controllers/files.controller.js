import { FileService } from "../services/file.service.js";
import { errorResponse, successResponse } from "../utils/helper.js";

export class FilesController {
  static async readFile(req, res) {
    try {
      // file's relative path
      const { filePath } = req.query;
      if (!filePath || typeof filePath !== "string") {
        return res.status(400).json(errorResponse("filePath is required."));
      }
      const data = await FileService.readFile(filePath);
      res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse("Failed to read file"))
        
    }
  }

  static async editFile(req, res) {
    console.log("Here");
    
    try {
        const {filePath, content} = req.body;
        if(!filePath || !content || typeof filePath !== "string"){
            return res.status(400).json(errorResponse("Please enter valid filePath"))
        }
        const data = await FileService.createFile(filePath, content);
        res.status(201).json(successResponse(data));
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse("Filed to Edit file"));
    }
  }

  static async createFile(req, res) {
    try {
        const {filePath, content} = req.body;
        if(!filePath || !content || typeof filePath !== "string"){
            return res.status(400).json(errorResponse("Please enter valid filePath"))
        }
        const data = await FileService.createFile(filePath, content);
        res.status(201).json(successResponse(data));
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse("Filed to create file"));
    }
  }

  static async renameFile(req, res) {}

  static async deleteFile(req, res) {}

  static async softDeleteFile(req, res) {}

  static async moveFile(req, res) {}
}
