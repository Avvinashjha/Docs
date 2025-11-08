import mysql from "mysql2/promise";

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
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

