package com.lld;

public class RateLimiter {
    private final BucketStore bucketStore= new BucketStore();
    private final long capacity;
    private final long refillRate;

    public RateLimiter(long capacity, long refillRate){
        this.capacity = capacity;
        this.refillRate = refillRate;
    }

    public boolean allowRequest(String key){
        TokenBucket tokenBucket = bucketStore.getBucket(key, capacity, refillRate);
        return tokenBucket.allowRequest();
    }
}
