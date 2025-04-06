package com.redispro.redisPro.chatApp.listener;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class RedisMessageSubscriber implements MessageListener {

    private final SimpMessagingTemplate messagingTemplate;

    public RedisMessageSubscriber(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void onMessage(Message message, byte[] pattern){
        String chanel = new String(message.getChannel());
        String body = new String(message.getBody());

        // Broadcast the message to web socket client subscribed to the topic
        messagingTemplate.convertAndSend("/topic/" + chanel, body);
    }
}
