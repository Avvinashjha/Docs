# File Management System API Documentation

A VS Code-like file management system with complete authentication and project-based file organization.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory (use `.env.example` as template):
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=file_management_system

# JWT
JWT_ACCESS_SECRET=your_access_secret_here
JWT_ACCESS_EXP=15m
JWT_REFRESH_SECRET=your_refresh_secret_here
REFRESH_TOKEN_LENGTH=64
REFRESH_TOKEN_EXP_DAYS=30

# Server
PORT=5050
NODE_ENV=development

# File Storage
ROOT_STORAGE_PATH=./userFiles
MAX_FILE_SIZE=10485760
MAX_PROJECT_NAME_LENGTH=100
```

3. Set up the database:
```bash
npm run setup-db
```

4. Start the development server:
```bash
npm run dev:watch
```

The server will be available at `http://localhost:5050`

---

## 📋 API Endpoints

### Authentication

#### Register a new user
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "roles": ["user"]
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "a1b2c3d4..."
  }
}
```

#### Refresh access token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4..."
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "e5f6g7h8..."
  }
}
```

#### Verify token
```http
GET /auth/verify
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "1",
      "roles": ["user"]
    }
  }
}
```

#### Logout
```http
POST /auth/logout
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4..."
}
```

---

### User Management

All user endpoints require authentication (Bearer token).

#### Get current user info
```http
GET /users/me
Authorization: Bearer <access_token>
```

#### Update profile
```http
PUT /users/me
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

#### Change password
```http
PUT /users/me/password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

#### Get user statistics
```http
GET /users/me/stats
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "data": {
    "projectCount": 5,
    "totalStorage": 1048576
  }
}
```

#### Get all users (Admin only)
```http
GET /users/all
Authorization: Bearer <access_token>
```

---

### Projects

All project endpoints require authentication.

#### Create a project
```http
POST /projects
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "my-awesome-project",
  "description": "My first project"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "name": "my-awesome-project",
    "description": "My first project",
    "filePath": "./userFiles/user_1/my-awesome-project",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### List all projects
```http
GET /projects
Authorization: Bearer <access_token>
```

#### Get project details
```http
GET /projects/:id
Authorization: Bearer <access_token>
```

#### Get project file tree
```http
GET /projects/:id/tree
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "data": {
    "projectId": 1,
    "projectName": "my-awesome-project",
    "root": {
      "name": "my-awesome-project",
      "type": "directory",
      "path": ".",
      "children": [
        {
          "name": "src",
          "type": "directory",
          "path": "src",
          "children": [...]
        },
        {
          "name": "index.js",
          "type": "file",
          "path": "index.js",
          "size": 1024
        }
      ]
    }
  }
}
```

#### Update project
```http
PUT /projects/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "updated-project-name",
  "description": "Updated description"
}
```

#### Delete project
```http
DELETE /projects/:id
Authorization: Bearer <access_token>
```

---

### Files

All file endpoints require authentication and project access.

#### Read a file
```http
GET /projects/:projectId/files?path=src/index.js
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "data": {
    "data": "console.log('Hello World');",
    "path": "src/index.js"
  }
}
```

#### Create a file
```http
POST /projects/:projectId/files
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "filePath": "src/utils/helper.js",
  "content": "export const helper = () => {}"
}
```

#### Update a file
```http
PUT /projects/:projectId/files
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "filePath": "src/index.js",
  "content": "console.log('Updated!');"
}
```

#### Delete a file
```http
DELETE /projects/:projectId/files?path=src/old.js
Authorization: Bearer <access_token>
```

#### Rename a file
```http
PUT /projects/:projectId/files/rename
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "oldPath": "src/old.js",
  "newPath": "src/new.js"
}
```

#### Move a file
```http
PUT /projects/:projectId/files/move
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "oldPath": "src/file.js",
  "newPath": "src/utils/file.js"
}
```

#### Search files by name
```http
GET /projects/:projectId/files/search?query=index
Authorization: Bearer <access_token>
```

#### Search files by extension
```http
GET /projects/:projectId/files/search/ext?ext=js
Authorization: Bearer <access_token>
```

#### Get file statistics
```http
GET /projects/:projectId/files/stats?path=src/index.js
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "data": {
    "path": "src/index.js",
    "size": 1024,
    "isFile": true,
    "isDirectory": false,
    "created": "2025-01-01T00:00:00.000Z",
    "modified": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Create multiple files
```http
POST /projects/:projectId/files/batch
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "files": [
    {
      "fileName": "file1.js",
      "content": "console.log(1);"
    },
    {
      "fileName": "file2.js",
      "content": "console.log(2);"
    }
  ]
}
```

---

### Directories

All directory endpoints require authentication and project access.

#### List directory contents
```http
GET /projects/:projectId/directories?path=src
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "data": [
    {
      "name": "utils",
      "path": "src/utils",
      "type": "directory",
      "modified": "2025-01-01T00:00:00.000Z"
    },
    {
      "name": "index.js",
      "path": "src/index.js",
      "type": "file",
      "size": 1024,
      "modified": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create a directory
```http
POST /projects/:projectId/directories
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "path": "src/components"
}
```

#### Delete a directory
```http
DELETE /projects/:projectId/directories?path=src/old-folder
Authorization: Bearer <access_token>
```

#### Rename a directory
```http
PUT /projects/:projectId/directories/rename
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "oldPath": "src/old-name",
  "newPath": "src/new-name"
}
```

#### Move a directory
```http
PUT /projects/:projectId/directories/move
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "sourcePath": "src/folder",
  "destPath": "src/utils/folder"
}
```

#### Copy a directory
```http
POST /projects/:projectId/directories/copy
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "sourcePath": "src/templates",
  "destPath": "src/templates-backup"
}
```

---

## 🔒 Security Features

- ✅ JWT-based authentication with access and refresh tokens
- ✅ Password hashing using Argon2
- ✅ Refresh token rotation
- ✅ Path traversal prevention
- ✅ File size limits
- ✅ Input validation and sanitization
- ✅ User-project ownership verification
- ✅ Role-based access control

---

## 📁 File Structure

```
userFiles/
├── user_1/
│   ├── project_alpha/
│   │   ├── src/
│   │   │   └── index.js
│   │   └── package.json
│   └── project_beta/
│       └── README.md
├── user_2/
│   └── project_gamma/
└── bin/ (for soft-deleted files)
```

---

## 🧪 Testing Workflow

1. **Register a user**
   ```bash
   POST /auth/register
   ```

2. **Login to get tokens**
   ```bash
   POST /auth/login
   ```

3. **Create a project**
   ```bash
   POST /projects (with Bearer token)
   ```

4. **Create files in the project**
   ```bash
   POST /projects/1/files (with Bearer token)
   ```

5. **Get project file tree**
   ```bash
   GET /projects/1/tree (with Bearer token)
   ```

---

## 📝 Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `413` - Payload Too Large
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## 🛠️ Development Scripts

```bash
# Development with hot reload
npm run dev:watch

# Build TypeScript
npm run build

# Run production build
npm start

# Set up database
npm run setup-db

# Watch TypeScript compilation
npm run watch
```

---

## 📦 Dependencies

### Production
- `express` - Web framework
- `mysql2` - MySQL client
- `jsonwebtoken` - JWT authentication
- `argon2` - Password hashing
- `dotenv` - Environment variables
- `cors` - CORS support

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Auto-restart on changes
- `@types/*` - Type definitions

---

## 🚨 Important Notes

1. **Security**: Change all secret keys in production
2. **CORS**: Update CORS settings for production (currently allows all origins)
3. **File Limits**: Default max file size is 10MB
4. **Token Expiry**: Access tokens expire in 15 minutes, refresh tokens in 30 days
5. **Database**: Run `setup-db` script before first use
6. **Permissions**: Ensure write permissions for `userFiles/` directory

---

## 📞 Support

For issues or questions, please refer to the project repository or documentation.

