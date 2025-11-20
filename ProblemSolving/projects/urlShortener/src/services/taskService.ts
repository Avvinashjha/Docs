import { pool } from "../config/database";
import { CreateTask, Priority, Status, Task, UpdateTask } from "../models/task";
import { GetTaskProps } from "../types/task";



export class TaskService {
  static async getAllTasks({
    limit = 10,
    offset = 0,
    sortBy = "createdAt",
    sortOrder = "DESC",
    priority,
    status,
    search
  }: GetTaskProps) {
    try {
      // 1. Whitelist sortable columns
      const validSortBy = [
        "id",
        "title",
        "priority",
        "status",
        "createdAt",
        "updatedAt",
      ];
      if (!validSortBy.includes(sortBy)) {
        sortBy = "createdAt";
      }

      // 2. Whitelist sort order
      const validSortOrder = ["ASC", "DESC"];
      if (!validSortOrder.includes(sortOrder.toUpperCase())) {
        sortOrder = "DESC";
      }

      // 3. Build WHERE clause dynamically
      const filters: string[] = [];
      const params: any[] = [];

      if (priority) {
        filters.push("priority = ?");
        params.push(priority);
      }

      if (status) {
        filters.push("status = ?");
        params.push(status);
      }

      if (search) {
        filters.push("title LIKE ?");
        params.push(`%${search}%`);
      }

      const whereClause = filters.length
        ? `WHERE ${filters.join(" AND ")}`
        : "";

      // 4. Final SQL
      const sql = `
      SELECT *
      FROM tasks
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ?
      OFFSET ?
    `;

      params.push(limit, offset);

      const [rows] = await pool.execute(sql, params);
      return rows as Task[];
    } catch (error) {
      console.error("Error Fetching Tasks: ", error);
      throw error;
    }
  }

  static async addNewTask(props: CreateTask) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO tasks (title, priority, status) values (?, ?, ?)",
        [props.title, props.priority, props.status]
      );
      return (result as any).insertId;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  static async updateTask(props: UpdateTask, id: number) {
    try {
      const fields: string[] = [];
      const values: any[] = [];

      if (props.title) {
        fields.push("title = ? ");
        values.push(props.title);
      }

      if (props.status) {
        fields.push("status = ? ");
        values.push(props.status);
      }

      if (props.priority) {
        fields.push("priority = ? ");
        values.push(props.priority);
      }

      if (fields.length === 0) {
        throw new Error("No field to update");
      }
      values.push(id);
      const [result] = await pool.execute(
        `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
      return (result as any).affectedRows > 0;
    } catch (error) {
      console.log("Error while updating tasks: ", error);
      throw error;
    }
  }

  static async deleteTask(id: number) {
    try {
      const [result] = await pool.execute("DELETE FROM tasks where id = ?", [
        id,
      ]);
      return (result as any).affectedRows > 0;
    } catch (error) {
      console.error("Error while deleting task: ", error);
      throw error;
    }
  }
}
