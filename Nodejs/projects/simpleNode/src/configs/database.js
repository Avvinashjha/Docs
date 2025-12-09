import mysql from "mysql2/promise";

// We have to give the config to mysql package

export const connectionConfig = {
    host: "localhost",
    user: "root",
    password: "avinash.jh",
    database: "task_manager",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

export const pool = mysql.createPool(connectionConfig);

export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("DB Connection successful");
    } catch (error) {
        console.error("DB connection failed");
        throw error;
    }
}

