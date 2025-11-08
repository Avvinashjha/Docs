import mysql from "mysql2/promise";
import { dbConfig } from "../config/testDatabase";

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });

    try{
        // create a database if not exists
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        console.log(`Database ${dbConfig.database} created or already exists `);
        await connection.execute(`USE ${dbConfig.database}`);

        await connection.execute(
            `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
            `
        );
        console.log("Users table created or already exists");

        // Create a table todo
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS todos (
                id INT  AUTO_INCREMENT PRIMARY KEY,
                user_id INT  NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                closed_at TIMESTAMP NULL DEFAULT NULL,
                INDEX idx_title (title),
                INDEX idx_description (description(255)),
                CONSTRAINT fk_todos_user
                  FOREIGN KEY (user_id) REFERENCES users(id)
                  ON DELETE CASCADE
            );
            `
        );
        console.log("Create todo table");

    }catch(error){
        console.log('Database setup failed:', error);
        throw error;
    }finally{
        await connection.end();
    }
    
}

// Run setup if this file is executed directly

if(require.main === module){
    setupDatabase();
}

export {setupDatabase};