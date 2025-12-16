import { Router } from "express";
import { UserController } from "../controller/users.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";

export const userRouter = Router();

// All user routes require authentication
userRouter.use(requireAuth);

// Current user endpoints
userRouter.get("/me", UserController.getCurrentUser);
userRouter.get("/me/stats", UserController.getUserStats);
userRouter.put("/me", UserController.updateProfile);
userRouter.put("/me/password", UserController.changePassword);
userRouter.delete("/me", UserController.deleteAccount);

// Admin only - get all users
userRouter.get("/all", requireRole("admin"), UserController.getAllUsers);

// Get specific user by ID (self or admin)
userRouter.get("/:id", UserController.getUserInfo);
