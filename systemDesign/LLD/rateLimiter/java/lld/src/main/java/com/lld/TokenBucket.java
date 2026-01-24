package com.lld;

import java.util.concurrent.locks.ReentrantLock;

public class TokenBucket {
    private final long capacity;
    private final long refillRatePerSecond;

    private final ReentrantLock lock = new ReentrantLock();

    private long tokens;
    private long lastRefillTimestamp;

    public TokenBucket(long capacity, long refillRatePerSecond){
        this.capacity = capacity;
        this.refillRatePerSecond = refillRatePerSecond;
        this.tokens = capacity;
        this.lastRefillTimestamp = System.currentTimeMillis();
    }

    private void refill(){
        long now = System.currentTimeMillis();
        long elapsedSecond = (now -  lastRefillTimestamp) / 1000;

        if(elapsedSecond > 0){
            long tokenToAdd = elapsedSecond* refillRatePerSecond;
            tokens = Math.min(capacity, tokens + tokenToAdd);
            lastRefillTimestamp = now;
        }
    }

    public boolean allowRequest(){
        lock.lock();
        try{
            refill();
            if(tokens > 0){
                tokens--;
                return true;
            }
            return false;
        }finally{
            lock.unlock();
        }
    }
}
