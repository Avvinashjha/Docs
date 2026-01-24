package com.lld;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Hello world!
 *
 */
public class App 
{
    private static final int USERS = 10;
    private static final int REQUEST_PER_USER = 10;

    public static void main( String[] args ) throws InterruptedException
    {
        RateLimiter limiter = new RateLimiter(5, 5); // 5 req, 1 req/sec
        ExecutorService executor = Executors.newFixedThreadPool(USERS);
        CountDownLatch startLatch = new CountDownLatch(1);

        for(int i = 0; i < USERS; i++){
            String userId = "user-1";
            executor.submit(()->{
                try{
                    // wait until all threads are ready
                    startLatch.await();
                    for(int j = 1; j < REQUEST_PER_USER; j++){
                        boolean allowed = limiter.allowRequest(userId);
                        System.out.println(Thread.currentThread().getName() + " | " + userId + " | request " + j + " | allowed = " + allowed);
                        Thread.sleep(1000);
                    }
                }catch(InterruptedException e){
                    Thread.currentThread().interrupt();
                }
            });
        }
        startLatch.countDown();
        executor.shutdown();
    }
}
