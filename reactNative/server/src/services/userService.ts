import { pool } from "../config/database";
import { User, CreateUserRequest, UpdateUserRequest } from "../models/User";

export class UserService{
    // Get all user
    static async getAllUser() : Promise<User[]> {
        try{
            const [rows] = await pool.execute('SELECT * FROM users ORDER BY created_at DESC');
            return rows as User[];
        }catch(error){
            console.error("Error fetching users", error);
            throw error;
        }
    }

    // Get user by Id
    static async getUserById(id: number): Promise<User | null>{
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
            const users = rows as User[];
            return users.length > 0 ? users[0] : null;
        }catch(error){
            console.error("Error fetching user:", error)
            throw error;
        }
    }

    // Create a new user
    static async createUser(userData: CreateUserRequest):Promise<number> {
        try{
            const [result] = await pool.execute("INSERT INTO users (name, email) VALUES (?,?)", [userData.name, userData.email]);
            return (result as any).inertId;
        }catch(error){
            console.error("Error creating user", error);
            throw error;
        }
    }

    // Update user
    static async updateUser(id: number, userData: UpdateUserRequest): Promise<boolean> {
        try{
            const fields: string[] = [];
            const values: any[] = [];

            if(userData.name){
                fields.push('name = ?');
                values.push(userData.name);
            }

            if(userData.email){
                fields.push('email = ?');
                values.push(userData.email);
            }

            if(fields.length === 0){
                throw new Error("No Fields to update");
            }

            values.push(id);

            const [result] = await pool.execute(`UPDATE users ${fields.join(', ')} WHERE id = ?`, values);
            return (result as any).affectedRows > 0;
        }catch(error){
            console.error("Error updating user:", error);
            throw error;
        }
    }

    // Delete user
    static async deleteUser(id: number): Promise<boolean>{
        try{
            const [result] = await pool.execute('DELETE FROm users WHERE id = ?', [id]);
            return (result as any).affectedRows > 0;
        }catch(error){
            console.error("Error deleting user:", error);
            throw error;
        }
    }
}