package com.lld;

import java.util.concurrent.ConcurrentHashMap;

public class BucketStore {
    private final ConcurrentHashMap<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    public TokenBucket getBucket(String key, long capacity, long refillRate){
        return buckets.computeIfAbsent(key, k -> new TokenBucket(capacity, refillRate));
    }
}
