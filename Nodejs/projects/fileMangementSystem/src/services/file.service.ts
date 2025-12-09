import fs from "fs/promises";
import { FileProps } from "../types/file";
import path from "path";
import { DIR_NAME, ROOT_PATH } from "../config/pathConfig";
export class FileService {
  static async readFile(filePName: string) {
    const fullPath = path.join(ROOT_PATH, DIR_NAME, filePName);
    const content = await fs.readFile(fullPath, { encoding: "utf8" });
    return { data: content };
  }

  static async createFile(props: FileProps) {
    const fullPath = path.join(ROOT_PATH, DIR_NAME, props.fileName);
    await fs.writeFile(fullPath, props.content);
    return { message: "Write success" };
  }

  static async updateFile(props: FileProps) {
    const fullPath = path.join(ROOT_PATH, DIR_NAME, props.fileName);
    await fs.writeFile(fullPath, props.content, { encoding: "utf-8" });
    return { message: "File Updated" };
  }

  static async deleteFile(filePath: string) {
    try {
      const fullPath = path.join(ROOT_PATH, DIR_NAME, filePath);
      await fs.unlink(fullPath);
      return { message: "File Deleted Permanently" };
    } catch (error) {
      console.log(error);
      return { message: "Failed to delete file" };
    }
  }

  static async softDelete(fileName: string) {
    // create a bin directory if not there
    try {
      await fs.readdir(path.join(ROOT_PATH, "bin"));
    } catch (error) {
      console.log("Bin file Does not exits creating bin");
      await fs.mkdir(path.join(ROOT_PATH, "bin"));
    }

    try {
      const fullPath = path.join(ROOT_PATH, DIR_NAME, fileName);
      await fs.rename(fullPath, path.join(ROOT_PATH, "bin", fileName));
      return { message: "Moved the file to bin" };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete file");
    }
  }

  static async createMultipleFile(props: FileProps[]) {
    try {
      const success = [];
      const failed = [];
      for (let i = 0; i < props.length; i++) {
        try {
          const _data = await this.createFile(props[i]);
          success.push(props[i]);
        } catch (error) {
          failed.push(props[i]);
        }
      }
      return { success, failed };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to bulk upload");
    }
  }

  static async moveFile(oldFileName: string, newFileName: string) {
    try {
      const oldFilePath = path.join(ROOT_PATH, DIR_NAME, oldFileName);
      const newFilePath = path.join(ROOT_PATH, DIR_NAME, newFileName);
      await fs.rename(oldFilePath, newFilePath);
      return { message: "Moved file" };
    } catch (error) {
      console.log(error);
      throw new Error("Error while moving file");
    }
  }

  static async getAllFiles(filePath: string) {}

  static async renameFile(oldPath: string, newPath: string) {
    try {
      const oldFilePath = path.join(ROOT_PATH, DIR_NAME, oldPath);
      const newFilePath = path.join(ROOT_PATH, DIR_NAME, newPath);
      await fs.rename(oldFilePath, newFilePath);
      return { message: "Renamed File", oldFilePath, newFilePath };
    } catch (error) {
      throw new Error("Failed to rename the file");
    }
  }

  static async searchFilesByName(name: string) {
    try {
      const directoryPath = path.join(ROOT_PATH, DIR_NAME);
      const files = await fs.readdir(directoryPath, { encoding: "utf-8" });

      return files.filter((file) => file.includes(name));
    } catch (error) {
      console.log(error);
      return { message: "Failed to search file" };
    }
  }
  static async searchFileByExtName(ext: string) {
    try {
      const directoryPath = path.join(ROOT_PATH, DIR_NAME);
      const files = await fs.readdir(directoryPath, { encoding: "utf-8" });

      return files.filter((file) => file.split(".")[1].includes(ext));
    } catch (error) {
      console.log(error);
      return { message: "Failed to search file" };
    }
  }
}
