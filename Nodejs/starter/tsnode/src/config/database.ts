import mysql from "mysql2/promise";

export const dbConfig = {
  host: 'localhost',
  user:  'root',
  password:  'avinash.jh',
  database:  'url_shortener',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const pool = mysql.createPool(dbConfig);

export const testConnection = async (): Promise<void> =>{
  try {
    const connection = await pool.getConnection();
    console.log("Connected success fully");
  } catch (error) {
    console.error("Database Connection failed");
    throw error;
    
  }
}