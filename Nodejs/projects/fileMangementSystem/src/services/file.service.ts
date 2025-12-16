import fs from "fs/promises";
import { FileProps } from "../types/file";
import path from "path";
import { resolveProjectFilePath, isPathSafe, MAX_FILE_SIZE } from "../config/pathConfig";

export class FileService {
  /**
   * Read a file within a project
   */
  static async readFile(projectPath: string, filePath: string) {
    if (!isPathSafe(filePath)) {
      throw new Error("Invalid file path");
    }

    const fullPath = resolveProjectFilePath(projectPath, filePath);
    const content = await fs.readFile(fullPath, { encoding: "utf8" });
    return { data: content, path: filePath };
  }

  /**
   * Create a file within a project
   */
  static async createFile(projectPath: string, fileName: string, content: string = "") {
    if (!isPathSafe(fileName)) {
      throw new Error("Invalid file path");
    }

    // Check file size
    const sizeInBytes = Buffer.byteLength(content, "utf8");
    if (sizeInBytes > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE} bytes`);
    }

    const fullPath = resolveProjectFilePath(projectPath, fileName);
    
    // Ensure parent directory exists
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(fullPath, content);
    return { message: "File created successfully", path: fileName };
  }

  /**
   * Update a file within a project
   */
  static async updateFile(projectPath: string, fileName: string, content: string) {
    if (!isPathSafe(fileName)) {
      throw new Error("Invalid file path");
    }

    // Check file size
    const sizeInBytes = Buffer.byteLength(content, "utf8");
    if (sizeInBytes > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE} bytes`);
    }

    const fullPath = resolveProjectFilePath(projectPath, fileName);
    await fs.writeFile(fullPath, content, { encoding: "utf-8" });
    return { message: "File updated successfully", path: fileName };
  }

  /**
   * Delete a file permanently
   */
  static async deleteFile(projectPath: string, filePath: string) {
    if (!isPathSafe(filePath)) {
      throw new Error("Invalid file path");
    }

    const fullPath = resolveProjectFilePath(projectPath, filePath);
    await fs.unlink(fullPath);
    return { message: "File deleted permanently", path: filePath };
  }

  /**
   * Rename or move a file within a project
   */
  static async renameFile(projectPath: string, oldPath: string, newPath: string) {
    if (!isPathSafe(oldPath) || !isPathSafe(newPath)) {
      throw new Error("Invalid file path");
    }

    const oldFilePath = resolveProjectFilePath(projectPath, oldPath);
    const newFilePath = resolveProjectFilePath(projectPath, newPath);

    // Ensure parent directory exists for new path
    const newDir = path.dirname(newFilePath);
    await fs.mkdir(newDir, { recursive: true });

    await fs.rename(oldFilePath, newFilePath);
    return { message: "File renamed successfully", oldPath, newPath };
  }

  /**
   * Move a file within a project (alias for rename)
   */
  static async moveFile(projectPath: string, oldFileName: string, newFileName: string) {
    return this.renameFile(projectPath, oldFileName, newFileName);
  }

  /**
   * Search files by name within a project
   */
  static async searchFilesByName(projectPath: string, searchTerm: string) {
    const results: string[] = [];
    
    async function searchDir(dirPath: string, basePath: string) {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.relative(basePath, fullPath);
        
        if (entry.isDirectory()) {
          await searchDir(fullPath, basePath);
        } else if (entry.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(relativePath);
        }
      }
    }

    await searchDir(projectPath, projectPath);
    return results;
  }

  /**
   * Search files by extension within a project
   */
  static async searchFileByExtName(projectPath: string, ext: string) {
    const results: string[] = [];
    const searchExt = ext.startsWith(".") ? ext : `.${ext}`;

    async function searchDir(dirPath: string, basePath: string) {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.relative(basePath, fullPath);
        
        if (entry.isDirectory()) {
          await searchDir(fullPath, basePath);
        } else if (path.extname(entry.name) === searchExt) {
          results.push(relativePath);
        }
      }
    }

    await searchDir(projectPath, projectPath);
    return results;
  }

  /**
   * Create multiple files at once
   */
  static async createMultipleFiles(projectPath: string, files: FileProps[]) {
    const success: FileProps[] = [];
    const failed: { file: FileProps; error: string }[] = [];

    for (const file of files) {
      try {
        await this.createFile(projectPath, file.fileName, file.content);
        success.push(file);
      } catch (error: any) {
        failed.push({ file, error: error.message });
      }
    }

    return { success, failed };
  }

  /**
   * Get file stats (size, modified date, etc.)
   */
  static async getFileStats(projectPath: string, filePath: string) {
    if (!isPathSafe(filePath)) {
      throw new Error("Invalid file path");
    }

    const fullPath = resolveProjectFilePath(projectPath, filePath);
    const stats = await fs.stat(fullPath);

    return {
      path: filePath,
      size: stats.size,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      created: stats.birthtime,
      modified: stats.mtime,
    };
  }
}
