import { pool } from "../config/database";
import { DbUser } from "../types/user";
import bcrypt from "bcrypt";

export class UserService {
    static async insertUser(username: string, password: string): Promise<DbUser | undefined>{
        try {
            // check for duplicates
            const existing = await this.findByUsername(username);
            if(existing){
                const e: any = new Error("User name already exists");
                throw e;
            }
            const passwordHash = await bcrypt.hash(password, 10 );
            const [result] = await pool.execute(`
            INSERT INTO users (username, password_hash) VALUES (?, ?)
            `,[username, passwordHash]);
            const insertId = (result as any).insertId as number;
            const [rows] = await pool.execute(
                `SELECT * FROm users where id = ?`, [ insertId]
            );
            return (rows as any)[0] as DbUser;
        } catch (error) {
            console.error("Error while inserting user to db: ", error);
            throw error;
        }
    }

    static async findUserById(id: number): Promise<DbUser|undefined>{
        try {
            const [rows] = await pool.execute(`SELECT username, password_hash, created_at, updated_at FROM users WHERE id = ?`, [id]);
            return (rows as any)[0];
        } catch (error) {
            console.error("Error while find user by id: ", error);
            throw error;
        }
    }

    static async findByUsername(username: string):Promise<DbUser | undefined>{
        try {
            const [rows] = await pool.execute(`SELECT id, username, password_hash, created_at, updated_at FROM users where username = ?`, [username]);
            const user = (rows as any)[0];
            if(!user) return undefined;
            return user;
        } catch (error) {
            console.error("Error while finding user by username: ", error);
            throw error;
        }
    }

    static async verifyPassword(password: string, passwordHash: string){
        return await bcrypt.compare(password, passwordHash);
    }
}