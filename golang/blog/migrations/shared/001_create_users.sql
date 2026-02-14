-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on username for faster lookups
CREATE INDEX idx_users_username ON users(username);

-- Insert a default admin user (password: admin123)
-- Generated with: echo -n "admin123" | bcrypt
INSERT INTO users (username, password_hash) 
VALUES ('admin', '$2a$10$Xr5z7PmHHxdYvF3aU0vGG.kfQXJxJ0FKN0Pv6gLnlVZBKl7mzNPNi')
ON CONFLICT (username) DO NOTHING;
