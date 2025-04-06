package com.redispro.redisPro.chatApp.config;

import com.redispro.redisPro.chatApp.listener.RedisMessageSubscriber;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;

public class RedisConfig {
    @Bean
    RedisMessageListenerContainer redisContainer(RedisConnectionFactory connectionFactory, RedisMessageSubscriber subscriber) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        // subscribe to all chat-related channel
        container.addMessageListener(subscriber, new PatternTopic("room:*"));
        container.addMessageListener(subscriber, new PatternTopic("user:*"));
        return container;
    }
}
