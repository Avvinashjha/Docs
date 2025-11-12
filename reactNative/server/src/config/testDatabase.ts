import mysql from 'mysql2/promise';

export const dbConfig = {
  host: process.env.TEST_DB_HOST || 'localhost',
  user: process.env.TEST_DB_USER || 'root',
  password: process.env.TEST_DB_PASSWORD || 'avinash.jh',
  database: process.env.TEST_DB_NAME || 'express_app_test', // Different DB for tests
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const pool = mysql.createPool(dbConfig);