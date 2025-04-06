package com.redispro.redisPro.chatApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @Autowired
    private StringRedisTemplate redisTemplate;

    // Handle Incoming websocket messages
    @MessageMapping("/sendMessage")
    public void sendMessage(String message) {
        // parse the message to determine the target channel
        String[] parts = message.split(":", 3);
        String channel = parts[0];
        String content = parts[1] + ":" + parts[2];

        // publish the message to Redis
        redisTemplate.convertAndSend(channel, content);
    }

}
