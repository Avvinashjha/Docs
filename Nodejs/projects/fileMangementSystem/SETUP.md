# File Management System - Setup Guide

A complete VS Code-like file management system with authentication, project management, and file operations.

## Features

✅ **Complete Authentication System**
- User registration and login with JWT
- Refresh token rotation
- Password hashing with Argon2
- Token verification

✅ **Multi-User Project Management**
- Create multiple isolated projects per user
- Project metadata tracking
- File tree visualization
- Project CRUD operations

✅ **Project-Scoped File Operations**
- Create, read, update, delete files
- File search by name and extension
- Batch file operations
- Soft delete (recycle bin)
- Rename/move files

✅ **Directory Management**
- Create nested directories
- Rename and move directories
- List directory contents
- Soft delete directories

✅ **Security Features**
- Path traversal prevention
- Input validation and sanitization
- Role-based access control
- File size limits
- User-project isolation

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

### 1. Clone and Install Dependencies

```bash
cd fileMangementSystem
npm install
```

### 2. Install Additional Dependencies

```bash
npm install cors
npm install --save-dev @types/cors
```

### 3. Configure Environment Variables

The `.env` file should already be created. Update it with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=file_management_system

# JWT Configuration
JWT_ACCESS_SECRET=your_access_secret_key_change_this_in_production
JWT_ACCESS_EXP=15m
JWT_REFRESH_SECRET=your_refresh_secret_key_change_this_in_production
REFRESH_TOKEN_LENGTH=64
REFRESH_TOKEN_EXP_DAYS=30

# Server Configuration
PORT=5050
NODE_ENV=development

# File Storage Configuration
ROOT_STORAGE_PATH=./userFiles
MAX_FILE_SIZE=10485760
```

### 4. Setup Database

Run the database setup script to create all necessary tables:

```bash
npm run setup-db
```

This will create:
- `users` table
- `refresh_tokens` table
- `projects` table
- `project_metadata` table
- Required filesystem directories

### 5. Build the Project

```bash
npm run build
```

### 6. Start the Server

For development:
```bash
npm run dev
```

For development with auto-reload:
```bash
npm run dev:watch
```

For production:
```bash
npm start
```

## API Documentation

Once the server is running, visit:
```
http://localhost:5050/
```

This will show all available endpoints.

### Health Check
```
GET http://localhost:5050/health
```

## Project Structure

```
fileMangementSystem/
├── src/
│   ├── config/
│   │   ├── database.ts         # Database configuration
│   │   └── pathConfig.ts       # Path utilities
│   ├── controller/
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   ├── files.controller.ts
│   │   ├── directory.controller.ts
│   │   └── users.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   ├── file.service.ts
│   │   ├── directory.service.ts
│   │   └── user.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── project.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── SimpleLog.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── project.routes.ts
│   │   ├── files.routes.ts
│   │   ├── directory.routes.ts
│   │   └── user.routes.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── project.ts
│   │   └── file.ts
│   ├── utils/
│   │   ├── helper.ts
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── tokens.ts
│   ├── scripts/
│   │   └── setupDatabase.ts
│   └── index.ts
├── userFiles/                   # User project storage
├── bin/                        # Soft deleted files
├── api-test.http              # API test file
├── .env                       # Environment variables
└── package.json
```

## Testing the API

### Using REST Client (VS Code Extension)

1. Install the "REST Client" extension in VS Code
2. Open `api-test.http`
3. Update the variables at the top with your values
4. Click "Send Request" above each endpoint

### Using Postman

Import the endpoints from `api-test.http` or use the following workflow:

1. **Register a user**
   ```
   POST /api/auth/register
   ```

2. **Login**
   ```
   POST /api/auth/login
   ```
   Save the `accessToken` and `refreshToken`

3. **Create a project**
   ```
   POST /api/projects
   Header: Authorization: Bearer <accessToken>
   ```
   Save the project `id`

4. **Create files in the project**
   ```
   POST /api/projects/:projectId/files
   Header: Authorization: Bearer <accessToken>
   ```

5. **Get project file tree**
   ```
   GET /api/projects/:projectId/tree
   Header: Authorization: Bearer <accessToken>
   ```

## Common Operations

### Create a Complete Project Structure

```bash
# 1. Register and login to get access token
# 2. Create project
# 3. Create directories
POST /api/projects/1/directories
{
  "path": "src"
}

# 4. Create files
POST /api/projects/1/files
{
  "path": "src/index.js",
  "content": "console.log('Hello');"
}
```

### File Operations

```bash
# Read file
GET /api/projects/1/files?path=src/index.js

# Update file
PUT /api/projects/1/files
{
  "path": "src/index.js",
  "content": "console.log('Updated');"
}

# Search files
GET /api/projects/1/files/search?query=index

# Delete file (soft)
DELETE /api/projects/1/files/soft?path=src/index.js
```

## Troubleshooting

### Database Connection Issues

1. Ensure MySQL is running
2. Check credentials in `.env`
3. Verify database exists or run `npm run setup-db`

### Port Already in Use

Change the PORT in `.env` file:
```env
PORT=3000
```

### Permission Errors

Ensure the application has write permissions for:
- `./userFiles/` directory
- `./bin/` directory

### Token Errors

If you get "Invalid token" errors:
1. Make sure you're sending the token in the header: `Authorization: Bearer <token>`
2. Check if the token has expired (default: 15 minutes)
3. Use the refresh endpoint to get a new token

## Security Considerations

🔒 **Production Deployment:**

1. Change all secret keys in `.env`
2. Set `NODE_ENV=production`
3. Configure proper CORS origins
4. Use HTTPS
5. Set up rate limiting
6. Regular database backups
7. Keep dependencies updated

## Database Schema

### users
- id, name, email, password_hash, roles, token_version, created_at, updated_at

### refresh_tokens
- id, user_id, token_hash, user_agent, ip, expires_at, created_at

### projects
- id, user_id, name, description, file_path, created_at, updated_at

### project_metadata
- id, project_id, total_files, total_size, last_accessed

## File System Structure

```
userFiles/
├── user_1/
│   ├── my-first-project/
│   │   ├── src/
│   │   │   ├── index.js
│   │   │   └── utils.js
│   │   └── README.md
│   └── another-project/
└── user_2/
    └── test-project/

bin/
├── 1234567890_deleted_file.js
└── 1234567891_old_folder/
```

## Next Steps

1. **Frontend Development**: Build a React/Next.js frontend
2. **Real-time Updates**: Add WebSocket support for collaboration
3. **File Sharing**: Implement file sharing between users
4. **Version Control**: Add file versioning
5. **Code Execution**: Add code execution capabilities
6. **Syntax Highlighting**: Add language detection and syntax highlighting

## Support

For issues or questions, check:
- API documentation at `http://localhost:5050/`
- Test file at `api-test.http`
- This setup guide

## License

ISC

