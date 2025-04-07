package com.redispro.redisPro.cricInfo.utils;

import com.redispro.redisPro.cricInfo.dto.PlayerDTO;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RedisUtil {

    private RedisTemplate<String, Object> redisTemplate;
    private final String PLAYER_KEY_PREFIX = "PLAYER::";

    public void cachePlayer(PlayerDTO player) {
        redisTemplate.opsForValue().set(PLAYER_KEY_PREFIX + player.getId(), player, Duration.ofHours(1));
    }

    public PlayerDTO getCachedPlayer(String id) {
        return (PlayerDTO) redisTemplate.opsForValue().get(PLAYER_KEY_PREFIX + id);
    }

    public boolean isPlayerCached(String id) {
        return redisTemplate.hasKey(PLAYER_KEY_PREFIX + id);
    }
}
