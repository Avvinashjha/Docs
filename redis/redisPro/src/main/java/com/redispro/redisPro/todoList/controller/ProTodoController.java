package com.redispro.redisPro.todoList.controller;

import com.redispro.redisPro.todoList.service.ProTodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/todo")
public class ProTodoController {

    @Autowired
    private ProTodoService todoService;

    // Add a task with metadata
    @PostMapping("/add")
    public String addTask(
            @RequestParam String description,
            @RequestParam String priority,
            @RequestParam String dueDate,
            @RequestParam String createdBy
    ){
        return todoService.addTask(description,priority,dueDate,createdBy);
    }

    // Get all tasks with pagination
    @GetMapping("/tasks")
    public List<Map<Object, Object>> getTasks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return todoService.getTasks(page, size);
    }

    // Mark task as completed
    @PostMapping("/completed/{taskId}")
    public String markTaskAsCompleted(@PathVariable String taskId){
        todoService.markTaskAsCompleted(taskId);
        return "Task marked as completed successfully!";
    }

    // Delete a task
    @DeleteMapping("/delete/{taskId}")
    public String deleteTask(@PathVariable String taskId){
        todoService.deleteTask(taskId);
        return "Task deleted successfully!";
    }

    // Get all completed tasks
    @PostMapping("/set-expiry/{taskId}")
    public String setTaskExpiry(@PathVariable String taskId, @RequestParam long seconds){
        todoService.setTaskExpiry(taskId, seconds);
        return "Task expiry set successfully!";
    }

    @GetMapping("/test-redis")
    public String testRedis() {
        return todoService.testRedis();
    }
}
