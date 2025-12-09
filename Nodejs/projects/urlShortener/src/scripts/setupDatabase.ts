import mysql from "mysql2/promise";
import { dbConfig } from "../config/database";


async function setupDatabase(){
    // Connect without specifying database to create it
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });

    try {
        // create a database if not exits
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        console.log(`Database ${dbConfig.database} created or already exists`);

        // switch to database
        await connection.execute(`USE ${dbConfig.database}`);

        // create url_mapping
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS url_mapping (
                hash_id VARCHAR(8) PRIMARY KEY,
                actual_url VARCHAR(500) NOT NULL,
                expiration_date DATETIME,
                creating_date DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log("URL_MAPPING table created");
    } catch (error) {
        console.error("Database setup failed: ",error)
    }finally{
        connection.end();
    }
}

if(require.main === module){
    setupDatabase();
}

export {setupDatabase};