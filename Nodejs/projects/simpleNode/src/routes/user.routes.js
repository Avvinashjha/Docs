import {Router} from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);

export default userRouter;