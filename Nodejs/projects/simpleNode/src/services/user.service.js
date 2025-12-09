import { pool } from "../configs/database.js";

export class UserService {
    static cachedUsers = [];
    static async getUserByUsername(username){
        const [users] = await pool.execute("SELECT * from users where username = ?", [username]);
        console.log(users);
        
        return users; 
    }

    static async getAllUser(){
        try {
            const res = await pool.execute("SELECT * from users");
            const [users] = res;
            return users;
        } catch (error) {
            console.error("Failed to get all user in user service", error);
            throw error;
        }
    }

    static async getUserById(id){
        try {
            const [users] = await pool.execute("SELECT * from users where id = ?", [id]);
            return users;
        } catch (error) {
            console.log(error);
            
        }
    }

    static async addUser(user){
        try {
            const [res] = await pool.execute("INSERT INTO users (username, email, password) values (?, ?, ?)", [user.name, user.email, user.password]);
            return {isCreated: res.affectedRows > 0, id: res.insertId};
        } catch (error) {
            throw error;
        }
    }
}