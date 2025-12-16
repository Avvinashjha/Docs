import { RowDataPacket } from "mysql2";

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
}

export interface Project {
  id: number;
  userId: number;
  name: string;
  description: string | null;
  filePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectRow extends RowDataPacket {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  file_path: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectMetadata {
  id: number;
  projectId: number;
  totalFiles: number;
  totalSize: number;
  lastAccessed: Date;
}

export interface FileNode {
  name: string;
  type: "file" | "directory";
  path: string;
  size?: number;
  children?: FileNode[];
}

export interface ProjectTree {
  projectId: number;
  projectName: string;
  root: FileNode;
}
