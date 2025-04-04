package com.redispro.redisPro.todoList.service;

import com.redispro.redisPro.todoList.RedisKeys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasicTodoService {
    @Autowired
    private StringRedisTemplate redisTemplate;

    // Add task to the List
    public void addTask(String task){
        redisTemplate.opsForList().leftPush(RedisKeys.TODO_LIST_KEY, task);
    }

    // Get all tasks
    public List<String> getTasks(){
        return redisTemplate.opsForList().range(RedisKeys.TODO_LIST_KEY, 0, -1);
    }

    // Mark task as completed
    public void markTaskAsCompleted( int index){
        List<String> tasks = getTasks();
        if(index >= 0 && index < tasks.size()){
            String task = tasks.get(index);
            redisTemplate.opsForList().leftPush(RedisKeys.COMPLETED_LIST_KEY, task);
            redisTemplate.opsForList().remove(RedisKeys.TODO_LIST_KEY, 0, task);
        }else{
            throw new IllegalArgumentException("Invalid Task Index");
        }
    }

    // Delete task from the todo list
    public void deleteTask(int index){
        List<String> tasks = getTasks();
        if(index >= 0 && index < tasks.size()){
            String task = tasks.get(index);
            redisTemplate.opsForList().remove(RedisKeys.TODO_LIST_KEY, 0, task);
        }else{
            throw new IllegalArgumentException("Invalid Task Index");
        }
    }

    // Get all completed tasks
    public List<String> getCompletedTasks(){
        return redisTemplate.opsForList().range(RedisKeys.COMPLETED_LIST_KEY, 0, -1);
    }

    // Mark task as uncompleted
    public void markTaskAsUncompleted(int index){
        List<String> completedTasks = getCompletedTasks();
        if(index >= 0 && index < completedTasks.size()){
            String task = completedTasks.get(index);
            redisTemplate.opsForList().leftPush(RedisKeys.TODO_LIST_KEY, task);
            redisTemplate.opsForList().remove(RedisKeys.COMPLETED_LIST_KEY, 0, task);
        }else{
            throw new IllegalArgumentException("Invalid Task Index");
        }
    }

    // Clear all tasks
    public void clearAllTasks(){
        redisTemplate.delete(RedisKeys.TODO_LIST_KEY);
        redisTemplate.delete(RedisKeys.COMPLETED_LIST_KEY);
    }
}
