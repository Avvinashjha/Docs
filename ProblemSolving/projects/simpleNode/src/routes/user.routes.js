import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.registerUser);


export default router;