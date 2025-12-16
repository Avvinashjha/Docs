import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database";
import {
  CreateProjectInput,
  UpdateProjectInput,
  Project,
  ProjectRow,
  FileNode,
  ProjectTree,
} from "../types/project";
import { getUserProjectPath, sanitizeProjectName } from "../config/pathConfig";
import fs from "fs/promises";
import path from "path";

export class ProjectService {
  /**
   * Create a new project for a user
   */
  static async createProject(
    userId: number,
    input: CreateProjectInput
  ): Promise<Project> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Sanitize project name
      const sanitizedName = sanitizeProjectName(input.name);
      if (!sanitizedName || sanitizedName.length === 0) {
        throw new Error("Invalid project name");
      }

      // Check if project with same name exists for user
      const [existing] = await conn.execute<RowDataPacket[]>(
        "SELECT id FROM projects WHERE user_id = ? AND name = ?",
        [userId, sanitizedName]
      );

      if (existing.length > 0) {
        throw new Error("Project with this name already exists");
      }

      // Create project directory
      const projectPath = getUserProjectPath(userId, sanitizedName);
      await fs.mkdir(projectPath, { recursive: true });

      // Insert project record
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO projects (user_id, name, description, file_path) VALUES (?, ?, ?, ?)",
        [userId, sanitizedName, input.description || null, projectPath]
      );

      // Create project metadata record
      await conn.execute(
        "INSERT INTO project_metadata (project_id) VALUES (?)",
        [result.insertId]
      );

      await conn.commit();

      return {
        id: result.insertId,
        userId,
        name: sanitizedName,
        description: input.description || null,
        filePath: projectPath,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      await conn.rollback();
      console.error("Error creating project:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Get all projects for a user
   */
  static async getUserProjects(userId: number): Promise<Project[]> {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.execute<ProjectRow[]>(
        "SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC",
        [userId]
      );

      return rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        description: row.description,
        filePath: row.file_path,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } catch (error) {
      console.error("Error getting user projects:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Get a single project by ID with ownership check
   */
  static async getProjectById(
    projectId: number,
    userId: number
  ): Promise<Project | null> {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.execute<ProjectRow[]>(
        "SELECT * FROM projects WHERE id = ? AND user_id = ?",
        [projectId, userId]
      );

      if (rows.length === 0) {
        return null;
      }

      const row = rows[0];
      return {
        id: row.id,
        userId: row.user_id,
        name: row.name,
        description: row.description,
        filePath: row.file_path,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } catch (error) {
      console.error("Error getting project:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Update project metadata
   */
  static async updateProject(
    projectId: number,
    userId: number,
    input: UpdateProjectInput
  ): Promise<Project> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Check ownership
      const project = await this.getProjectById(projectId, userId);
      if (!project) {
        throw new Error("Project not found or access denied");
      }

      const updates: string[] = [];
      const values: any[] = [];

      if (input.name) {
        const sanitizedName = sanitizeProjectName(input.name);
        if (!sanitizedName) {
          throw new Error("Invalid project name");
        }
        updates.push("name = ?");
        values.push(sanitizedName);

        // Rename directory
        const oldPath = project.filePath;
        const newPath = getUserProjectPath(userId, sanitizedName);
        await fs.rename(oldPath, newPath);
        updates.push("file_path = ?");
        values.push(newPath);
      }

      if (input.description !== undefined) {
        updates.push("description = ?");
        values.push(input.description);
      }

      if (updates.length > 0) {
        values.push(projectId, userId);
        await conn.execute(
          `UPDATE projects SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
          values
        );
      }

      await conn.commit();

      return (await this.getProjectById(projectId, userId))!;
    } catch (error) {
      await conn.rollback();
      console.error("Error updating project:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Delete a project
   */
  static async deleteProject(
    projectId: number,
    userId: number
  ): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Get project to get file path
      const project = await this.getProjectById(projectId, userId);
      if (!project) {
        throw new Error("Project not found or access denied");
      }

      // Delete from database (cascade will delete metadata)
      await conn.execute("DELETE FROM projects WHERE id = ? AND user_id = ?", [
        projectId,
        userId,
      ]);

      // Delete directory
      try {
        await fs.rm(project.filePath, { recursive: true, force: true });
      } catch (fsError) {
        console.error("Error deleting project directory:", fsError);
        // Continue even if directory deletion fails
      }

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      console.error("Error deleting project:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Get file tree structure for a project
   */
  static async getProjectTree(
    projectId: number,
    userId: number
  ): Promise<ProjectTree> {
    const project = await this.getProjectById(projectId, userId);
    if (!project) {
      throw new Error("Project not found or access denied");
    }

    const rootNode = await this.buildFileTree(project.filePath, project.filePath);

    return {
      projectId: project.id,
      projectName: project.name,
      root: rootNode,
    };
  }

  /**
   * Recursively build file tree
   */
  private static async buildFileTree(
    fullPath: string,
    basePath: string
  ): Promise<FileNode> {
    const stats = await fs.stat(fullPath);
    const name = path.basename(fullPath);
    const relativePath = path.relative(basePath, fullPath) || ".";

    if (stats.isDirectory()) {
      const entries = await fs.readdir(fullPath);
      const children = await Promise.all(
        entries.map((entry) =>
          this.buildFileTree(path.join(fullPath, entry), basePath)
        )
      );

      return {
        name: name || project.name,
        type: "directory",
        path: relativePath,
        children: children.sort((a, b) => {
          // Directories first, then alphabetically
          if (a.type !== b.type) {
            return a.type === "directory" ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        }),
      };
    } else {
      return {
        name,
        type: "file",
        path: relativePath,
        size: stats.size,
      };
    }
  }

  /**
   * Update project access time
   */
  static async updateLastAccessed(projectId: number): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.execute(
        "UPDATE project_metadata SET last_accessed = CURRENT_TIMESTAMP WHERE project_id = ?",
        [projectId]
      );
    } catch (error) {
      console.error("Error updating last accessed:", error);
      // Don't throw, this is non-critical
    } finally {
      conn.release();
    }
  }
}
