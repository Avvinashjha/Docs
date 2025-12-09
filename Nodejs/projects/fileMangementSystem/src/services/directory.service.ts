import fs from "fs/promises";
import path from "path";
import { DIR_NAME, ROOT_PATH } from "../config/pathConfig";
export class DirectoryService {
  static async createNewDirectory(directoryName: string) {
    try {
      const directoryPath = path.join(ROOT_PATH, DIR_NAME, directoryName);
      console.log(directoryPath);

      const data = await fs.mkdir(directoryPath, { recursive: true });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create directory");
    }
  }

  static async deleteDirectory(directoryName: string) {
    try {
      const directoryPath = path.join(ROOT_PATH, DIR_NAME, directoryName);
      await fs.rmdir(directoryPath);
      return { message: "Directory Deleted Successfully" };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete directory");
    }
  }

  static async softDeleteDirectory(directoryName: string) {
    try {
      const binDirectoryPath = path.join(
        ROOT_PATH,
        DIR_NAME,
        "bin",
        directoryName
      );
      console.log(binDirectoryPath);

      const directoryPath = path.join(ROOT_PATH, DIR_NAME, directoryName);
      console.log(directoryPath);

      // create a bind directory if not exits
      await this.createNewDirectory("bin");
      await fs.rename(directoryPath, binDirectoryPath);
      return { message: "Directory moved to bin" };
    } catch (error) {
      console.log(error);
      return { message: "Failed to move file to bin" };
    }
  }

  static async renameDirectory(oldDirName: string, newDirName: string) {
    try {
      const oldDirectoryPath = path.join(ROOT_PATH, DIR_NAME, oldDirName);
      const newDirectoryPath = path.join(ROOT_PATH, DIR_NAME, newDirName);

      await fs.rename(oldDirectoryPath, newDirectoryPath);
      return {
        message: "Changed dir name successfully",
        oldDirName,
        newDirName,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to rename directory");
    }
  }

  static async getAllDirectory() {}
}
