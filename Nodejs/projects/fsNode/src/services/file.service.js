import path from "path";
import fs from "fs/promises";
import { DIR_NAME, ROOT_DIR } from "../utils/config.js";

export class FileService {
  static async readFile(filePath) {
    try {
      ///Users/avinash.jh/Desktop/Private/Docs/Nodejs/projects/fsNode/files/raunak/code/test.java
      const fullFilePath = path.join(ROOT_DIR, DIR_NAME, filePath);
      const data = await fs.readFile(fullFilePath, { encoding: "utf-8" });
      return { data };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to read file");
    }
  }

  static async createFile(filePath, content) {
    try {
      const fullFilePath = path.join(ROOT_DIR, DIR_NAME, filePath);
      await fs.writeFile(fullFilePath, content);
      return { message: "File Created" };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create file");
    }
  }

  static async editFile() {
    try {
      const fullFilePath = path.join(ROOT_DIR, DIR_NAME, filePath);
      await fs.writeFile(fullFilePath, content);
      return { message: "File Edited" };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to Edit file");
    }
  }

  static async renameFile() {}

  static async deleteFile() {}

  static async softDeleteFile() {}

  static async moveFile() {}
}
