// ==================== Storage Interfaces ====================

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }

  async get(key) {
    const item = this.store.get(key);
    if (!item) return null;
    
    // Check if expired
    if (item.expiry && Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set(key, value, ttlMs = null) {
    const expiry = ttlMs ? Date.now() + ttlMs : null;
    this.store.set(key, { value, expiry });
    
    // Auto cleanup after TTL
    if (ttlMs) {
      setTimeout(() => this.store.delete(key), ttlMs);
    }
    
    return true;
  }

  async increment(key, ttlMs = null) {
    const current = await this.get(key);
    const newValue = (current || 0) + 1;
    await this.set(key, newValue, ttlMs);
    return newValue;
  }

  async delete(key) {
    return this.store.delete(key);
  }

  async clear() {
    this.store.clear();
  }
}

class RedisStorage {
  constructor(redisClient) {
    this.client = redisClient;
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key, value, ttlMs = null) {
    const serialized = JSON.stringify(value);
    if (ttlMs) {
      await this.client.setex(key, Math.ceil(ttlMs / 1000), serialized);
    } else {
      await this.client.set(key, serialized);
    }
    return true;
  }

  async increment(key, ttlMs = null) {
    const value = await this.client.incr(key);
    if (ttlMs && value === 1) {
      await this.client.expire(key, Math.ceil(ttlMs / 1000));
    }
    return value;
  }

  async delete(key) {
    await this.client.del(key);
    return true;
  }
}

// ==================== Rate Limiting Algorithms ====================

class TokenBucketLimiter {
  constructor(config, storage) {
    this.capacity = config.maxRequests;
    this.refillRate = config.maxRequests / (config.windowMs / 1000); // tokens per second
    this.storage = storage;
    this.windowMs = config.windowMs;
  }

  async consume(key) {
    const now = Date.now();
    const bucketKey = `token_bucket:${key}`;
    
    let bucket = await this.storage.get(bucketKey);
    
    if (!bucket) {
      bucket = {
        tokens: this.capacity - 1,
        lastRefill: now
      };
      await this.storage.set(bucketKey, bucket, this.windowMs * 2);
      return {
        allowed: true,
        remaining: bucket.tokens,
        resetTime: now + this.windowMs
      };
    }

    // Refill tokens based on time elapsed
    const timeElapsed = (now - bucket.lastRefill) / 1000;
    const tokensToAdd = timeElapsed * this.refillRate;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      await this.storage.set(bucketKey, bucket, this.windowMs * 2);
      return {
        allowed: true,
        remaining: Math.floor(bucket.tokens),
        resetTime: now + Math.ceil((this.capacity - bucket.tokens) / this.refillRate * 1000)
      };
    }

    await this.storage.set(bucketKey, bucket, this.windowMs * 2);
    return {
      allowed: false,
      remaining: 0,
      resetTime: now + Math.ceil((1 - bucket.tokens) / this.refillRate * 1000)
    };
  }

  async reset(key) {
    await this.storage.delete(`token_bucket:${key}`);
  }
}

class FixedWindowLimiter {
  constructor(config, storage) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
    this.storage = storage;
  }

  async consume(key) {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    const windowKey = `fixed_window:${key}:${windowStart}`;
    
    const count = await this.storage.increment(windowKey, this.windowMs);
    const resetTime = windowStart + this.windowMs;

    return {
      allowed: count <= this.maxRequests,
      remaining: Math.max(0, this.maxRequests - count),
      resetTime
    };
  }

  async reset(key) {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    await this.storage.delete(`fixed_window:${key}:${windowStart}`);
  }
}

class SlidingWindowLogLimiter {
  constructor(config, storage) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
    this.storage = storage;
  }

  async consume(key) {
    const now = Date.now();
    const windowKey = `sliding_log:${key}`;
    const windowStart = now - this.windowMs;
    
    let log = await this.storage.get(windowKey) || [];
    
    // Remove old entries
    log = log.filter(timestamp => timestamp > windowStart);
    
    if (log.length < this.maxRequests) {
      log.push(now);
      await this.storage.set(windowKey, log, this.windowMs * 2);
      
      return {
        allowed: true,
        remaining: this.maxRequests - log.length,
        resetTime: log[0] + this.windowMs
      };
    }

    return {
      allowed: false,
      remaining: 0,
      resetTime: log[0] + this.windowMs
    };
  }

  async reset(key) {
    await this.storage.delete(`sliding_log:${key}`);
  }
}

class SlidingWindowCounterLimiter {
  constructor(config, storage) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
    this.storage = storage;
  }

  async consume(key) {
    const now = Date.now();
    const currentWindow = Math.floor(now / this.windowMs);
    const previousWindow = currentWindow - 1;
    
    const currentKey = `sliding_counter:${key}:${currentWindow}`;
    const previousKey = `sliding_counter:${key}:${previousWindow}`;
    
    const currentCount = await this.storage.get(currentKey) || 0;
    const previousCount = await this.storage.get(previousKey) || 0;
    
    // Calculate weighted count
    const elapsedInWindow = now % this.windowMs;
    const previousWeight = 1 - (elapsedInWindow / this.windowMs);
    const estimatedCount = previousCount * previousWeight + currentCount;
    
    if (estimatedCount < this.maxRequests) {
      await this.storage.increment(currentKey, this.windowMs * 2);
      
      return {
        allowed: true,
        remaining: Math.floor(this.maxRequests - estimatedCount - 1),
        resetTime: (currentWindow + 1) * this.windowMs
      };
    }

    return {
      allowed: false,
      remaining: 0,
      resetTime: (currentWindow + 1) * this.windowMs
    };
  }

  async reset(key) {
    const now = Date.now();
    const currentWindow = Math.floor(now / this.windowMs);
    await this.storage.delete(`sliding_counter:${key}:${currentWindow}`);
    await this.storage.delete(`sliding_counter:${key}:${currentWindow - 1}`);
  }
}

// ==================== Main Rate Limiter Class ====================

class RateLimiter {
  constructor(options = {}) {
    const defaults = {
      algorithm: 'token-bucket', // 'token-bucket', 'fixed-window', 'sliding-log', 'sliding-counter'
      windowMs: 60000, // 1 minute
      maxRequests: 100,
      storage: 'memory', // 'memory' or Redis client instance
      keyGenerator: (req) => req.ip || req.connection.remoteAddress,
      handler: null, // Custom handler for rate limit exceeded
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      skip: () => false // Function to skip rate limiting for certain requests
    };

    this.config = { ...defaults, ...options };
    
    // Initialize storage
    if (this.config.storage === 'memory') {
      this.storage = new MemoryStorage();
    } else {
      this.storage = new RedisStorage(this.config.storage);
    }

    // Initialize algorithm
    this.limiter = this._createLimiter();
  }

  _createLimiter() {
    switch (this.config.algorithm) {
      case 'token-bucket':
        return new TokenBucketLimiter(this.config, this.storage);
      case 'fixed-window':
        return new FixedWindowLimiter(this.config, this.storage);
      case 'sliding-log':
        return new SlidingWindowLogLimiter(this.config, this.storage);
      case 'sliding-counter':
        return new SlidingWindowCounterLimiter(this.config, this.storage);
      default:
        throw new Error(`Unknown algorithm: ${this.config.algorithm}`);
    }
  }

  // Express/Connect middleware
  middleware() {
    return async (req, res, next) => {
      try {
        // Check if request should be skipped
        if (this.config.skip(req)) {
          return next();
        }

        const key = this.config.keyGenerator(req);
        const result = await this.limiter.consume(key);

        // Set rate limit headers
        res.setHeader('X-RateLimit-Limit', this.config.maxRequests);
        res.setHeader('X-RateLimit-Remaining', result.remaining);
        res.setHeader('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

        if (!result.allowed) {
          res.setHeader('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000));

          if (this.config.handler) {
            return this.config.handler(req, res, next);
          }

          return res.status(429).json({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
          });
        }

        // Handle skipSuccessfulRequests and skipFailedRequests
        if (this.config.skipSuccessfulRequests || this.config.skipFailedRequests) {
          const originalSend = res.send;
          res.send = function(data) {
            const statusCode = res.statusCode;
            const shouldSkip = 
              (this.config.skipSuccessfulRequests && statusCode < 400) ||
              (this.config.skipFailedRequests && statusCode >= 400);
            
            if (shouldSkip) {
              // Refund the request
              this.limiter.reset(key);
            }
            
            return originalSend.call(res, data);
          }.bind(this);
        }

        next();
      } catch (error) {
        console.error('Rate limiter error:', error);
        next(); // Fail open - allow request if rate limiter fails
      }
    };
  }

  // Manual rate limit check
  async check(key) {
    return await this.limiter.consume(key);
  }

  // Reset rate limit for a key
  async reset(key) {
    return await this.limiter.reset(key);
  }

  // Get current status for a key
  async getStatus(key) {
    return await this.limiter.consume(key);
  }
}

// ==================== Usage Examples ====================

// Example 1: Basic usage with memory storage
const basicLimiter = new RateLimiter({
  algorithm: 'token-bucket',
  windowMs: 60000, // 1 minute
  maxRequests: 10
});

// Example 2: Fixed window with custom key generator
const apiLimiter = new RateLimiter({
  algorithm: 'fixed-window',
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  keyGenerator: (req) => {
    // Rate limit by API key
    return req.headers['x-api-key'] || req.ip;
  }
});

// Example 3: Sliding window with Redis
// const redis = require('redis').createClient();
// const redisLimiter = new RateLimiter({
//   algorithm: 'sliding-counter',
//   windowMs: 60000,
//   maxRequests: 50,
//   storage: redis
// });

// Example 4: Different limits for different endpoints
function createEndpointLimiter(endpoint, maxRequests, windowMs) {
  return new RateLimiter({
    algorithm: 'token-bucket',
    maxRequests,
    windowMs,
    keyGenerator: (req) => `${req.ip}:${endpoint}`
  });
}

const searchLimiter = createEndpointLimiter('/api/search', 30, 60000);
const uploadLimiter = createEndpointLimiter('/api/upload', 5, 60000);

// Example 5: Skip rate limiting for certain users
const premiumLimiter = new RateLimiter({
  algorithm: 'token-bucket',
  windowMs: 60000,
  maxRequests: 100,
  skip: (req) => {
    // Skip rate limiting for premium users
    return req.user && req.user.tier === 'premium';
  }
});

// ==================== Express App Example ====================

// Uncomment to use with Express:
/*
const express = require('express');
const app = express();

// Global rate limiter
app.use(basicLimiter.middleware());

// Specific route limiters
app.get('/api/search', searchLimiter.middleware(), (req, res) => {
  res.json({ results: [] });
});

app.post('/api/upload', uploadLimiter.middleware(), (req, res) => {
  res.json({ success: true });
});

// Custom error handler
const strictLimiter = new RateLimiter({
  windowMs: 60000,
  maxRequests: 5,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'You have made too many requests. Please wait before trying again.'
    });
  }
});

app.get('/api/strict', strictLimiter.middleware(), (req, res) => {
  res.json({ data: 'sensitive data' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
*/

module.exports = {
  RateLimiter,
  MemoryStorage,
  RedisStorage,
  TokenBucketLimiter,
  FixedWindowLimiter,
  SlidingWindowLogLimiter,
  SlidingWindowCounterLimiter
};