import {pool} from "../config/database";
import { CreateTodo, Todo, UpdateTodo } from "../models/Todo";

export class TodoService{

    static async getAllTodo():Promise<Todo[]>{
        try {
            const [rows] = await pool.execute(`SELECT * FROM todos ORDER BY created_at DESC`);
            return rows as Todo[];
        } catch (error) {
            console.error("Error Fetching Todos:", error);
            throw error;
        }
    }

    static async getAllTodoByUserId(userId: number): Promise<Todo[]>{
        try {
            const [rows] = await pool.execute(`SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
            return rows as Todo[];
        } catch (error) {
            console.error("Error Fetching Todos by user_id:", error);
            throw error;
        }
    }

    static async createTodo(todoData: CreateTodo):Promise<number>{
        try {
            const [result] = await pool.execute("INSERT INTO todos (user_id, title, description) values (?, ?, ?)", [todoData.userId, todoData.title, todoData.description || null]);
            return (result as any).insertId;
        } catch (error) {
            console.error("Error creating todo:", error);
            throw error;
        }
    }

    // Update todo
    static async updateTodo(id: number, todoData: UpdateTodo): Promise<boolean>{
        try {
            const fields: string[] = [];
            const values: any[] = [];

            if(todoData.description){
                fields.push("description = ?");
                values.push(todoData.description);
            }

            if(todoData.status){
                fields.push("status = ?");
                values.push(todoData.status);
            }

            if(todoData.title){
                fields.push("title = ?");
                values.push(todoData.title);
            }

            if(fields.length === 0){
                throw new Error ("No fields to update.")
            }

            values.push(id);

            const [result] = await pool.execute(`
                UPDATE todos SET ${fields.join(", ")} WHERE id = ?
                `, values);
                return (result as any).affectedRows > 0;
        } catch (error) {
            console.error("Error updating todo:", error);
            throw error;
        }
    }

    static async deleteTodo(id: number): Promise<boolean>{
        try {
            const [result] = await pool.execute(`DELETE FROM todos WHERE id = ?`, [id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            console.error("Error deleting todo:", error);
            throw error;
        }
    }
}