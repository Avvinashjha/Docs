import { Router, Request, Response } from "express";
import { UserService } from "../services/userService";
import { CreateUserRequest, UpdateUserRequest } from "../models/User";
import { sendResponse } from "../utils/helper";

const router = Router();

// Get /users - get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUser();
    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error("Error in GET /users", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

// Get /users/:id - Get user by id

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in Get /users/:id", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user.",
    });
  }
});

// POST /users - Creates a new user
router.post("/", async (req: Request, res: Response) =>{
    try {
        const {name, email} = req.body;
        if(!name || !email){
            return res.status(400).json(sendResponse(false, "Name and email are required."))
        }
        const userId = await UserService.createUser({name, email});
        res.status(201).json(sendResponse(true, "User created successfully",  { id: userId}));
    } catch (error:any) {
        if(error.code === "ER_DUP_ENTRY"){
            console.error("Error POST /users:", error);
            return res.status(409).json(sendResponse(false, "Email already exists"));
        }

        res.status(500).json(sendResponse(false, 'Failed to create user'));
    }
})

// PUT /users/:id - Update user
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const {name, email} = req.body;

        if(isNaN(id)){
            return res.status(400).json(sendResponse(false, "Invalid user ID"));
        }

        const updateData: UpdateUserRequest = {};
        if(name) updateData.name = name;
        if(email) updateData.email = email;

        if(Object.keys(updateData).length === 0){
            return res.status(400).json(sendResponse(false, "No fields to update"));
        }

        const updated = await UserService.updateUser(id, updateData);

        if(!updated){
            return res.status(404).json(sendResponse(false, "User not found"));
        }

        res.json(sendResponse(true, "User updated successfully"))
    } catch (error:any) {
        console.error("Error in PUT /users/:id:", error);
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json(sendResponse(false, "Email already exists"));
        }
        res.status(500).json(sendResponse(false, "Failed to update user"));
    }
})

// DELETE /users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    const deleted = await UserService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /users/:id:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

export default router;
