import { pool } from "../config/database";
import fs from "fs/promises";
import path from "path";

async function setupDatabase() {
  const connection = await pool.getConnection();

  try {
    console.log("Starting database setup...");

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        roles JSON DEFAULT ('["user"]'),
        token_version INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✓ Users table created");

    // Create refresh_tokens table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token_hash VARCHAR(255) NOT NULL,
        user_agent VARCHAR(500),
        ip VARCHAR(45),
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_token_hash (token_hash),
        INDEX idx_expires_at (expires_at),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✓ Refresh tokens table created");

    // Create projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        file_path VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_name (name),
        UNIQUE KEY unique_user_project (user_id, name),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✓ Projects table created");

    // Create project_metadata table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS project_metadata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL UNIQUE,
        total_files INT DEFAULT 0,
        total_size BIGINT DEFAULT 0,
        last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✓ Project metadata table created");

    console.log("\n✅ Database schema setup completed successfully!");

    // Setup file system structure
    await setupFileSystem();

  } catch (error) {
    console.error("❌ Error setting up database:", error);
    throw error;
  } finally {
    connection.release();
  }
}

async function setupFileSystem() {
  try {
    console.log("\nSetting up file system structure...");

    const rootPath = path.resolve("userFiles");
    
    // Create userFiles directory if it doesn't exist
    try {
      await fs.access(rootPath);
      console.log("✓ userFiles directory already exists");
    } catch {
      await fs.mkdir(rootPath, { recursive: true });
      console.log("✓ Created userFiles directory");
    }

    // Create bin directory for soft deletes
    const binPath = path.join(rootPath, "bin");
    try {
      await fs.access(binPath);
      console.log("✓ bin directory already exists");
    } catch {
      await fs.mkdir(binPath, { recursive: true });
      console.log("✓ Created bin directory");
    }

    console.log("✅ File system structure setup completed!");
  } catch (error) {
    console.error("❌ Error setting up file system:", error);
    throw error;
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log("\n🎉 Setup completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Setup failed:", error);
      process.exit(1);
    });
}

export { setupDatabase, setupFileSystem };
