import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const ROOT_PATH = path.resolve("");
export const DIR_NAME = "myFiles";
export const ROOT_STORAGE_PATH = process.env.ROOT_STORAGE_PATH || "./userFiles";
export const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 10485760; // 10MB default

/**
 * Get the base path for a user's projects
 * @param userId - The user's ID
 * @returns Path to user's project directory
 */
export function getUserProjectsPath(userId: number): string {
  return path.join(ROOT_STORAGE_PATH, `user_${userId}`);
}

/**
 * Get the full path for a specific project
 * @param userId - The user's ID
 * @param projectName - The project name
 * @returns Full path to the project directory
 */
export function getUserProjectPath(userId: number, projectName: string): string {
  return path.join(ROOT_STORAGE_PATH, `user_${userId}`, projectName);
}

/**
 * Resolve a file path within a project
 * @param projectPath - The base project path
 * @param filePath - The relative file path within the project
 * @returns Full resolved file path
 */
export function resolveProjectFilePath(projectPath: string, filePath: string): string {
  const resolved = path.join(projectPath, filePath);
  
  // Security: Ensure the resolved path is within the project directory
  if (!resolved.startsWith(projectPath)) {
    throw new Error("Invalid file path: Path traversal detected");
  }
  
  return resolved;
}

/**
 * Validate that a path is safe (no path traversal)
 * @param inputPath - The path to validate
 * @returns true if safe, false otherwise
 */
export function isPathSafe(inputPath: string): boolean {
  const normalized = path.normalize(inputPath);
  return !normalized.includes("..") && !path.isAbsolute(inputPath);
}

/**
 * Sanitize project name to prevent path traversal
 * @param name - The project name to sanitize
 * @returns Sanitized project name
 */
export function sanitizeProjectName(name: string): string {
  // Remove any path separators and special characters
  return name.replace(/[/\\:*?"<>|]/g, '_').trim();
}