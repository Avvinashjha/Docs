import { Router, Request, Response } from "express";
import { GetTaskProps } from "../types/task";
import { TaskService } from "../services/taskService";
import { defaultResponse } from "../utils/helper";
import { CreateTask, UpdateTask } from "../models/task";

const notesRouter = Router();


notesRouter.get("/", async (req: Request, res: Response)=>{
    try {
        const {limit, offset, search, sortBy, sortOrder, status, priority}: GetTaskProps = req.query;
        const tasks = await TaskService.getAllTasks({limit, offset, sortBy, sortOrder, priority, status, search});
        res.status(200).json(tasks);
    } catch (error) {
        console.log(" Get /tasks: ", error);
        res.status(500).json(defaultResponse(false, "Error while getting tasks", error as Error))
    }
})

notesRouter.post("/",async (req: Request, res: Response) => {
    try {
        const {title, status, priority}: CreateTask = req.body;
        if(!title || !status || !priority){
            return res.json(defaultResponse(false, "Title, status, priority are required to create a task"))
        }
        const taskId = await TaskService.addNewTask({title, status, priority}); 
        res.status(201).json(defaultResponse(true, `Task created successfully with id ${taskId}`));
    } catch (error) {
        console.error("Error in Post /task: ", error);
        res.status(500).json(defaultResponse(false, "Error while creating new task", error as Error))
    }
})

notesRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
         const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(defaultResponse(false, "Invalid task id."));
        }
        const {title, status, priority}: UpdateTask = req.body;
        const updated = await TaskService.updateTask({title, status, priority}, id);
        if(!updated){
            return res.status(404).json(defaultResponse(false, "Task not found"));
        }
        res.status(200).json(defaultResponse(true, "Updated successfully"));
    } catch (error) {
        console.error("Update /tasks/:id : ", error);
        res.status(500).json(defaultResponse(false, "Failed to update task", error as Error));
    }
})

notesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json(defaultResponse(false, "Invalid task id."));
        }
        const deleted = await TaskService.deleteTask(id);
        if(!deleted){
            return res.status(404).json(defaultResponse(false, "Task not found"));
        }
        res.status(200).json(defaultResponse(true, "Deleted successfully"));
    } catch (error) {
        console.error("Delete /tasks/:id : ", error);
        res.status(500).json(defaultResponse(false, "Failed to delete task", error as Error));
    }
})

export default notesRouter;