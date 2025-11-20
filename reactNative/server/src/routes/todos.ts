import { Router, Request, Response } from "express";
import { TodoService } from "../services/todoService";
import { CreateTodo, UpdateTodo } from "../models/Todo";
import { sendResponse } from "../utils/helper";

const router = Router();

// GET /todos - Get all todo
router.get("/", async(req: Request, res: Response)=>{
    try {
        const todos = await TodoService.getAllTodo();
        res.json({
            success: true,
            data: todos,
            count: todos.length
        }); 
    } catch (error) {
        console.error("Error in GET /todos:", error);
        res.status(500).json(sendResponse(false, "Failed to fetch todos"));
    }
})

router.get("/user/:id", async (req: Request, res: Response)=> {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(sendResponse(false, "Invalid user ID"));
        }
        const todos = await TodoService.getAllTodoByUserId(id);
        if(!todos){
            return res.status(404).json(sendResponse(false, "No todos found"));
        } 
        res.json({
            success: true,
            data: todos
        })
    } catch (error) {
        console.error("Error GET /todos/:id", error);
        res.status(500).json(sendResponse(false, "Failed to fetch todos"));
    }
});

router.post("/", async (req: Request, res: Response)=>{
    try {
        const {title, description, userId} = req.body;

        if(!title || !userId){
            return res.status(400).json(sendResponse(false, "Title and userId are required"));
        }

        const todoId = await TodoService.createTodo({ title, userId, description});
        res.status(201).json(sendResponse(true, "Todo created successfully", {id: todoId}))
    } catch (error) {
        console.error("Error in POST /todos:", error);
        res.status(500).json(sendResponse(false, "Failed to create todo"))
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const {title, description, status} = req.body;

        if(isNaN(id)){
            return res.status(400).json(sendResponse(false, "Invalid todo id"));
        }

        const updateData: UpdateTodo = {};
        if(title) updateData.title = title;
        if(description) updateData.description = description;
        if(status) updateData.status = status;

        if(Object.keys(updateData).length === 0){
            return res.status(400).json(sendResponse(false, "No fields to update"));
        }

        const updated = await TodoService.updateTodo(id, updateData);
       
        if(!updated){
            return res.status(404).json(sendResponse(false, "Todo not found"));
        }

        res.json(sendResponse(true, "Todo updated successfully"));
    } catch (error) {
        console.error("Error in PUT /todos/:id:", error);
        res.status(500).json(sendResponse(false, "Failed to update todo"))
    }
});

router.delete("/:id", async (req: Request, res: Response)=>{
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(sendResponse(false, "Invalid todo id"));
        }

        const deleted = await TodoService.deleteTodo(id);
        if(!deleted){
            return res.status(404).json(sendResponse(false, "Todo not found"));
        }

        res.json(sendResponse(true, "Todo deleted successfully"));
    } catch (error) {
        console.log("Error in DELETE /todos/:id:", error);
        res.status(500).json(sendResponse(false, "Failed to delete todo"))
    }
})

export default router;