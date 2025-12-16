# Setup Guide - File Management System

## 📋 Overview

This is a complete VS Code-like file management system with:
- ✅ Complete JWT authentication with refresh token rotation
- ✅ Multi-user support with isolated workspaces
- ✅ Project-based file organization
- ✅ Full CRUD operations for files and directories
- ✅ Path traversal prevention and security features
- ✅ Role-based access control

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the root directory. You can copy from the example:

```bash
# Copy example if you want
# cp .env.example .env
```

**Important Environment Variables:**

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=avinash.jh
DB_NAME=file_management_system

# JWT Configuration (CHANGE THESE IN PRODUCTION!)
JWT_ACCESS_SECRET=dev_access_secret_key_12345_change_in_production
JWT_ACCESS_EXP=15m
JWT_REFRESH_SECRET=dev_refresh_secret_key_67890_change_in_production
REFRESH_TOKEN_LENGTH=64
REFRESH_TOKEN_EXP_DAYS=30

# Server Configuration
PORT=5050
NODE_ENV=development

# File Storage Configuration
ROOT_STORAGE_PATH=./userFiles
MAX_FILE_SIZE=10485760
MAX_PROJECT_NAME_LENGTH=100
```

### Step 3: Set Up Database

Make sure MySQL is running, then execute:

```bash
npm run setup-db
```

This will create:
- `users` table
- `refresh_tokens` table
- `projects` table
- `project_metadata` table
- `userFiles/` directory structure

### Step 4: Start the Server

**Development mode with hot reload:**
```bash
npm run dev:watch
```

**Regular development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

---

## 🧪 Testing the API

### 1. Register a User

```bash
curl -X POST http://localhost:5050/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5050/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Save the `accessToken` and `refreshToken` from the response!**

### 3. Create a Project

```bash
curl -X POST http://localhost:5050/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "my-first-project",
    "description": "Testing the system"
  }'
```

**Save the project `id` from the response!**

### 4. Create a File

```bash
curl -X POST http://localhost:5050/projects/1/files \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "filePath": "index.js",
    "content": "console.log(\"Hello World!\");"
  }'
```

### 5. Read the File

```bash
curl -X GET "http://localhost:5050/projects/1/files?path=index.js" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 6. Get Project Tree

```bash
curl -X GET http://localhost:5050/projects/1/tree \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 7. Create a Directory

```bash
curl -X POST http://localhost:5050/projects/1/directories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "path": "src"
  }'
```

---

## 📁 Project Structure

```
fileMangementSystem/
├── src/
│   ├── config/
│   │   ├── database.ts          # Database connection
│   │   └── pathConfig.ts        # File path utilities
│   ├── controller/
│   │   ├── auth.controller.ts   # Authentication endpoints
│   │   ├── directory.controller.ts
│   │   ├── files.controller.ts
│   │   ├── project.controller.ts
│   │   └── users.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts   # JWT verification
│   │   ├── project.middleware.ts # Project access control
│   │   ├── SimpleLog.ts         # Request logging
│   │   └── validation.middleware.ts # Input validation
│   ├── models/                  # (Future: DB models)
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── directory.routes.ts
│   │   ├── files.routes.ts
│   │   ├── project.routes.ts
│   │   └── user.routes.ts
│   ├── scripts/
│   │   └── setupDatabase.ts     # Database setup script
│   ├── services/
│   │   ├── auth.service.ts      # Authentication logic
│   │   ├── directory.service.ts # Directory operations
│   │   ├── file.service.ts      # File operations
│   │   ├── project.service.ts   # Project management
│   │   └── user.service.ts      # User management
│   ├── types/
│   │   ├── auth.ts              # Auth type definitions
│   │   ├── file.ts              # File type definitions
│   │   └── project.ts           # Project type definitions
│   ├── utils/
│   │   ├── helper.ts            # Response helpers
│   │   ├── jwt.ts               # JWT utilities
│   │   ├── password.ts          # Password hashing
│   │   └── tokens.ts            # Token generation
│   └── index.ts                 # Main application file
├── userFiles/                   # File storage (created on setup)
│   └── user_{id}/              # Per-user directories
│       └── {project_name}/     # Project directories
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── package.json
├── tsconfig.json
├── nodemon.json
├── API_DOCUMENTATION.md         # Full API reference
└── SETUP_GUIDE.md              # This file
```

---

## 🗄️ Database Schema

### Users Table
```sql
users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  roles JSON DEFAULT ('["user"]'),
  token_version INT DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Refresh Tokens Table
```sql
refresh_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  user_agent VARCHAR(500),
  ip VARCHAR(45),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

### Projects Table
```sql
projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  file_path VARCHAR(500) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE KEY unique_user_project (user_id, name),
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

### Project Metadata Table
```sql
project_metadata (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL UNIQUE,
  total_files INT DEFAULT 0,
  total_size BIGINT DEFAULT 0,
  last_accessed TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
)
```

---

## 🔐 Authentication Flow

1. **Register**: Create account with email and password
2. **Login**: Receive access token (15min) and refresh token (30 days)
3. **Access Protected Routes**: Include `Authorization: Bearer {accessToken}` header
4. **Token Expires**: Use refresh token to get new access token
5. **Logout**: Revoke refresh token

### Token Refresh Example

```bash
curl -X POST http://localhost:5050/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

---

## 🛡️ Security Features

### 1. Path Traversal Prevention
- All file paths are validated
- Cannot access files outside project directory
- `../` and absolute paths are blocked

### 2. Authentication
- JWT access tokens (short-lived)
- Refresh token rotation
- Password hashing with Argon2

### 3. Authorization
- Users can only access their own projects
- Role-based access control (user, admin)
- Project ownership verification

### 4. Input Validation
- File size limits (10MB default)
- Path validation
- XSS prevention
- SQL injection prevention (prepared statements)

### 5. Rate Limiting
- Middleware available for endpoint protection
- Configurable request limits

---

## 🎯 Common Use Cases

### Create a Project Structure

```bash
# 1. Create project
POST /projects
{
  "name": "my-app",
  "description": "My application"
}

# 2. Create directories
POST /projects/1/directories
{ "path": "src" }

POST /projects/1/directories
{ "path": "src/components" }

POST /projects/1/directories
{ "path": "src/utils" }

# 3. Create files
POST /projects/1/files
{
  "filePath": "src/index.js",
  "content": "console.log('App started');"
}

POST /projects/1/files
{
  "filePath": "package.json",
  "content": "{\"name\": \"my-app\"}"
}

# 4. Get full tree
GET /projects/1/tree
```

### Search and Organize

```bash
# Search for files by name
GET /projects/1/files/search?query=index

# Search by extension
GET /projects/1/files/search/ext?ext=js

# List directory contents
GET /projects/1/directories?path=src

# Move files
PUT /projects/1/files/move
{
  "oldPath": "index.js",
  "newPath": "src/index.js"
}
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: `ER_ACCESS_DENIED_ERROR` or connection refused

**Solution**:
1. Check MySQL is running: `mysql.server status` or `systemctl status mysql`
2. Verify credentials in `.env` file
3. Test connection: `mysql -u root -p`

### Port Already in Use

**Problem**: `EADDRINUSE: address already in use`

**Solution**:
1. Change PORT in `.env` file
2. Or kill process using the port:
   ```bash
   lsof -ti:5050 | xargs kill -9
   ```

### Permission Errors

**Problem**: Cannot create files/directories

**Solution**:
1. Check write permissions: `chmod -R 755 userFiles/`
2. Ensure `userFiles/` directory exists

### Token Expired

**Problem**: 401 Unauthorized on protected routes

**Solution**:
1. Use refresh endpoint to get new access token
2. Or login again to get fresh tokens

---

## 📈 Performance Tips

1. **Database Indexing**: Already optimized with indexes on user_id, email, token_hash
2. **File Caching**: Consider implementing Redis for file metadata
3. **Compression**: Add compression middleware for large responses
4. **Rate Limiting**: Implement rate limiting in production

---

## 🚀 Deployment Checklist

- [ ] Change all JWT secrets in `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS for specific origins
- [ ] Set up proper database backup
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up file storage limits per user
- [ ] Review and tighten security headers
- [ ] Set up automated backups for `userFiles/`

---

## 📞 Support & Next Steps

### Recommended Enhancements

1. **File Sharing**: Share projects/files with other users
2. **Versioning**: Track file changes over time
3. **Real-time Collaboration**: WebSocket support for live editing
4. **File Upload**: Support binary file uploads (images, PDFs)
5. **Trash/Recycle Bin**: Soft delete with restore capability
6. **Search**: Full-text search within file contents
7. **Permissions**: Fine-grained file/folder permissions
8. **Activity Logs**: Track all user actions
9. **Webhooks**: Notify external services of changes
10. **API Rate Limiting**: Per-user rate limits

### Documentation

- API Documentation: `API_DOCUMENTATION.md`
- Setup Guide: `SETUP_GUIDE.md` (this file)
- Original Plan: `complete.plan.md`

---

## ✅ All Features Implemented

- ✅ Complete authentication system (register, login, logout, refresh, verify)
- ✅ User management (profile, password change, stats)
- ✅ Project management (create, read, update, delete)
- ✅ File operations (CRUD, search, move, rename)
- ✅ Directory operations (CRUD, move, rename, copy)
- ✅ JWT authentication with refresh token rotation
- ✅ Path traversal prevention
- ✅ Input validation and sanitization
- ✅ Role-based access control
- ✅ Project file tree generation
- ✅ User-project isolation
- ✅ Database schema with proper relationships
- ✅ Error handling and validation
- ✅ CORS support
- ✅ Request logging

**The system is ready for development and testing!**

