import fs from "fs/promises";
import path from "path";
import { resolveProjectFilePath, isPathSafe } from "../config/pathConfig";

export class DirectoryService {
  /**
   * Create a new directory within a project
   */
  static async createDirectory(projectPath: string, directoryName: string) {
    if (!isPathSafe(directoryName)) {
      throw new Error("Invalid directory path");
    }

    const directoryPath = resolveProjectFilePath(projectPath, directoryName);
    await fs.mkdir(directoryPath, { recursive: true });
    return { message: "Directory created successfully", path: directoryName };
  }

  /**
   * Delete a directory permanently
   */
  static async deleteDirectory(projectPath: string, directoryName: string) {
    if (!isPathSafe(directoryName)) {
      throw new Error("Invalid directory path");
    }

    const directoryPath = resolveProjectFilePath(projectPath, directoryName);
    await fs.rm(directoryPath, { recursive: true, force: true });
    return { message: "Directory deleted successfully", path: directoryName };
  }

  /**
   * Rename a directory within a project
   */
  static async renameDirectory(projectPath: string, oldDirName: string, newDirName: string) {
    if (!isPathSafe(oldDirName) || !isPathSafe(newDirName)) {
      throw new Error("Invalid directory path");
    }

    const oldDirectoryPath = resolveProjectFilePath(projectPath, oldDirName);
    const newDirectoryPath = resolveProjectFilePath(projectPath, newDirName);

    await fs.rename(oldDirectoryPath, newDirectoryPath);
    return {
      message: "Directory renamed successfully",
      oldPath: oldDirName,
      newPath: newDirName,
    };
  }

  /**
   * Move a directory within a project
   */
  static async moveDirectory(projectPath: string, sourcePath: string, destPath: string) {
    if (!isPathSafe(sourcePath) || !isPathSafe(destPath)) {
      throw new Error("Invalid directory path");
    }

    const sourceFullPath = resolveProjectFilePath(projectPath, sourcePath);
    const destFullPath = resolveProjectFilePath(projectPath, destPath);

    // Ensure destination parent exists
    const destParent = path.dirname(destFullPath);
    await fs.mkdir(destParent, { recursive: true });

    await fs.rename(sourceFullPath, destFullPath);
    return {
      message: "Directory moved successfully",
      oldPath: sourcePath,
      newPath: destPath,
    };
  }

  /**
   * Copy a directory within a project
   */
  static async copyDirectory(projectPath: string, sourcePath: string, destPath: string) {
    if (!isPathSafe(sourcePath) || !isPathSafe(destPath)) {
      throw new Error("Invalid directory path");
    }

    const sourceFullPath = resolveProjectFilePath(projectPath, sourcePath);
    const destFullPath = resolveProjectFilePath(projectPath, destPath);

    await this.copyRecursive(sourceFullPath, destFullPath);
    return {
      message: "Directory copied successfully",
      sourcePath,
      destPath,
    };
  }

  /**
   * List contents of a directory
   */
  static async listDirectory(projectPath: string, directoryPath: string = ".") {
    if (directoryPath !== "." && !isPathSafe(directoryPath)) {
      throw new Error("Invalid directory path");
    }

    const fullPath = directoryPath === "." ? projectPath : resolveProjectFilePath(projectPath, directoryPath);
    const entries = await fs.readdir(fullPath, { withFileTypes: true });

    const items = await Promise.all(
      entries.map(async (entry) => {
        const itemPath = path.join(fullPath, entry.name);
        const stats = await fs.stat(itemPath);
        const relativePath = path.relative(projectPath, itemPath);

        return {
          name: entry.name,
          path: relativePath,
          type: entry.isDirectory() ? "directory" : "file",
          size: entry.isFile() ? stats.size : undefined,
          modified: stats.mtime,
        };
      })
    );

    return items;
  }

  /**
   * Helper method to recursively copy directories
   */
  private static async copyRecursive(src: string, dest: string) {
    const stats = await fs.stat(src);

    if (stats.isDirectory()) {
      await fs.mkdir(dest, { recursive: true });
      const entries = await fs.readdir(src);

      for (const entry of entries) {
        await this.copyRecursive(
          path.join(src, entry),
          path.join(dest, entry)
        );
      }
    } else {
      await fs.copyFile(src, dest);
    }
  }

  /**
   * Check if directory exists
   */
  static async directoryExists(projectPath: string, directoryPath: string): Promise<boolean> {
    try {
      if (!isPathSafe(directoryPath)) {
        return false;
      }

      const fullPath = resolveProjectFilePath(projectPath, directoryPath);
      const stats = await fs.stat(fullPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }
}
