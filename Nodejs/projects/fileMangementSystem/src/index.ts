import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { simpleLog } from "./middlewares/SimpleLog";
import { filesRouter } from "./routes/files.routes";
import { directoryRouter } from "./routes/directory.routes";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { projectRouter } from "./routes/project.routes";
import { testConnection } from "./config/database";
import { errorResponse } from "./utils/helper";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// CORS Configuration
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*"); // In production, specify actual origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging
app.use(simpleLog);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ 
    success: true, 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);

// Project-scoped file and directory routes
app.use("/projects/:projectId/files", filesRouter);
app.use("/projects/:projectId/directories", directoryRouter);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "File Management System API",
    version: "1.0.0",
    endpoints: {
      auth: {
        register: "POST /auth/register",
        login: "POST /auth/login",
        logout: "POST /auth/logout",
        refresh: "POST /auth/refresh",
        verify: "GET /auth/verify"
      },
      users: {
        me: "GET /users/me",
        updateProfile: "PUT /users/me",
        changePassword: "PUT /users/me/password",
        stats: "GET /users/me/stats",
        all: "GET /users/all (admin)"
      },
      projects: {
        create: "POST /projects",
        list: "GET /projects",
        get: "GET /projects/:id",
        tree: "GET /projects/:id/tree",
        update: "PUT /projects/:id",
        delete: "DELETE /projects/:id"
      },
      files: {
        read: "GET /projects/:projectId/files?path=...",
        create: "POST /projects/:projectId/files",
        update: "PUT /projects/:projectId/files",
        delete: "DELETE /projects/:projectId/files?path=...",
        rename: "PUT /projects/:projectId/files/rename",
        search: "GET /projects/:projectId/files/search?query=..."
      },
      directories: {
        list: "GET /projects/:projectId/directories?path=...",
        create: "POST /projects/:projectId/directories",
        delete: "DELETE /projects/:projectId/directories?path=...",
        rename: "PUT /projects/:projectId/directories/rename"
      }
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json(errorResponse("Endpoint not found"));
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error handler:", err);
  
  // Handle specific error types
  if (err.name === "SyntaxError" && "body" in err) {
    return res.status(400).json(errorResponse("Invalid JSON in request body"));
  }
  
  if (err.name === "UnauthorizedError") {
    return res.status(401).json(errorResponse("Invalid or expired token"));
  }
  
  // Generic error response
  res.status(500).json(errorResponse("Internal server error"));
});

// Initialize database connection and start server
async function startServer() {
  try {
    // Test database connection
    console.log("Testing database connection...");
    await testConnection();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 File Management System API Server                    ║
║                                                            ║
║   Status: Running                                          ║
║   Port: ${PORT}                                         ║
║   Environment: ${process.env.NODE_ENV || "development"}                                   ║
║   URL: http://localhost:${PORT}                         ║
║                                                            ║
║   Database: Connected ✓                                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

📚 API Documentation: http://localhost:${PORT}/

Available endpoints:
  - Authentication: /auth
  - Users: /users
  - Projects: /projects
  - Files: /projects/:projectId/files
  - Directories: /projects/:projectId/directories
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});

// Start the server
startServer();

export default app;
