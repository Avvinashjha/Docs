package com.redispro.redisPro.todoList.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class ProTodoService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    // key on which our todo will be stored
    public static final String TODO_LIST_KEY = "pro:todo:list";

    // Generate a Unique task id
    private String generateUniqueId() {
        return "pro:task:" + UUID.randomUUID().toString();
    }

    // Add a task with metadata
    public String addTask(String description, String priority, String dueData, String createdBy){
        String taskId = generateUniqueId();
        Map<String, String> taskData = new HashMap<>();
        taskData.put("taskId", taskId);
        taskData.put("description", description);
        taskData.put("priority", priority);
        taskData.put("dueDate", dueData);
        taskData.put("createdBy", createdBy);
        taskData.put("created_on", Instant.now().toString());
        taskData.put("status", "pending");
        
        // Store task Metadata in a hash
        redisTemplate.opsForHash().putAll(taskId, taskData);
        
        // add task ID to yhe todo list
        redisTemplate.opsForList().leftPush(TODO_LIST_KEY, taskId);
        
        return taskId;
    }
    
    // Get all tasks with pagination
    public List<Map<Object, Object>> getTasks(int page, int size){
        List<String> taskIds = redisTemplate.opsForList().range(TODO_LIST_KEY, (long) (page - 1) *size, (long) page *size-1);
        List<Map<Object, Object>> tasks =  new ArrayList<>();
        
        for(String taskId : taskIds){
            Map<Object, Object> taskData = redisTemplate.opsForHash().entries(taskId);
            taskData.put("id", taskId);  // Add task ID to the map for easy access in frontend
            tasks.add(taskData);
        }
        return tasks;
    }

    // mark a task as completed
    public void markTaskAsCompleted(String taskId){
        redisTemplate.opsForHash().put(taskId, "status", "completed");
    }
    
    // delete a task
    public void deleteTask(String taskId){
        redisTemplate.opsForList().remove(TODO_LIST_KEY, 1, taskId);
        redisTemplate.delete(taskId);
    }
    
    // set expiry time for a task
    public void setTaskExpiry(String taskId, long seconds){
        redisTemplate.expire(taskId, seconds, TimeUnit.SECONDS);
    }

    public String testRedis() {
        try {
            redisTemplate.opsForValue().set("test-key", "test-value");
            return "Redis connection successful!";
        } catch (Exception e) {
            return "Redis connection failed: " + e.getMessage();
        }
    }
}
