import mysql from "mysql2/promise";

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'avinash.jh',
  database: process.env.DB_NAME || 'express_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const pool = mysql.createPool(dbConfig);

export const testConnection = async (): Promise<void> => {
    try {
        const connection = await pool.getConnection();
        console.log("connected to MySQL, database successfully.")
    }catch(error){
        console.log("Database connection failed:", error);
        throw error;
    }
}

