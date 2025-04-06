package com.redispro.redisPro.urlShortener.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class UrlShortenerService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private String generateShortUrl(){
        return UUID.randomUUID().toString().substring(0,8);
    }

    // Generate a short url
    public String shortenUrl(String longUrl) {
       String shortUrl = generateShortUrl();
       redisTemplate.opsForValue().set(shortUrl, longUrl);
       redisTemplate.expire(shortUrl, 7, TimeUnit.DAYS);
       return shortUrl;
    }

    // retrieve a long url for a short url
    public String getLongUrl(String shortUrl) {
        return redisTemplate.opsForValue().get(shortUrl);
    }

    // Increment click count for shorten url
    public void incrementClickCount(String shortUrl) {
        String statsKey = "url:stats:" + shortUrl;
        redisTemplate.opsForValue().increment(statsKey);
    }

    // Get click count for a short url
    public Long getClickCount(String shortUrl) {
        String statsKey = "url:stats:" + shortUrl;
        String count  = redisTemplate.opsForValue().get(statsKey);
        return count!=null ? Long.parseLong(count) : 0;
    }

}
