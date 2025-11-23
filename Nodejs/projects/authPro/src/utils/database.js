import mysql from "mysql2/promise";

// create a db config object

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "avinash.jh",
    database: process.env.DB_NAME || "authpro",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: false,
    timezone: "Z"
}

export const pool = mysql.createPool(dbConfig);

export const testConnection =async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection successful");
        connection.destroy();
    } catch (error) {
        console.log(error);
    }
}