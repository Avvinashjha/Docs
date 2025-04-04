package com.redispro.redisPro.todoList.controller;

import com.redispro.redisPro.todoList.service.BasicTodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/basic-todo")
public class BasicTodoController {

    @Autowired
    private BasicTodoService basicTodoService;

    // add task endpoint
    @PostMapping("/add")
    public String addTask(@RequestParam String task){
        basicTodoService.addTask(task);
        return "Task added successfully!";
    }

    // get all task
    @GetMapping("/tasks")
    public List<String> getTasks(){
        return basicTodoService.getTasks();
    }

    // Mark task as complete
    @PutMapping("/complete/{index}")
    public String completeTask(@PathVariable int index){
        basicTodoService.markTaskAsCompleted(index);
        return "Task completed successfully!";
    }

    // delete task
    @DeleteMapping("/delete/{index}")
    public String deleteTask(@PathVariable int index){
        basicTodoService.deleteTask(index);
        return "Task deleted successfully!";
    }

    // get all completed tasks
    @GetMapping("/completed")
    public List<String> getCompletedTasks(){
        return basicTodoService.getCompletedTasks();
    }

    // Mark task as uncompleted
    @PutMapping("/uncompleted/{index}")
    public String uncompletedTask(@PathVariable int index){
        basicTodoService.markTaskAsUncompleted(index);
        return "Task marked as uncompleted successfully!";
    }
}
