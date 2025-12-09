Lovely — let’s design a comprehensive **Low-Level Design (LLD)** for rate limiting in Node.js. I’ll first explain the *full set of approaches* (deeply), plus tradeoffs, implementation sketches, API shapes, testing ideas, and scaling/operational notes. After this you said we’ll implement them one-by-one; when you’re ready we’ll code each.

I’ll cover these approaches (deep dive each):

1. Fixed Window Counter
2. Sliding Window Log
3. Sliding Window Counter (approximate sliding window)
4. Token Bucket
5. Leaky Bucket
6. Redis-backed atomic counters (INCR + EXPIRE)
7. Redis Lua script (atomic check-and-set)
8. Redis Sorted Set — accurate sliding window (distributed sliding log)
9. Distributed Token Bucket (Redis + Lua / RedisGears / Redisson patterns)
10. Advanced: client-side tokens, probabilistic (Bloom filters / Rate-limiting using sketches) — brief
11. Deployment, scaling, observability, and security considerations

---

# 1) Terminology & goals (quick)

* **Rate**: requests per time unit (e.g., 100 requests / minute).
* **Burst**: ability to allow short spikes above steady rate.
* **Precision**: how close to the configured rate the algorithm enforces.
* **State cost**: memory and storage required per key (user/IP/etc).
* **Atomicity**: is the check+increment atomic? Important in distributed systems.
* **Distributed**: multiple app instances — need shared state (Redis, etc) or consistent hashing.
* **Use-cases**: per-user, per-IP, per-API-key, global, per-route, weighted requests.

---

# 2) Fixed Window Counter

## Idea

Divide time into fixed windows (e.g., minute boundaries). Keep a counter per key for the current window. Allow if `counter < limit`.

## Data structure

```
map[key] -> { windowStart: timestamp, count: int }
```

## Pseudocode

```
nowWindow = floor(now / windowSize)
if state[key].windowStart != nowWindow:
    state[key] = { windowStart: nowWindow, count: 0 }
if state[key].count + 1 <= limit:
    state[key].count += 1
    allow
else
    reject
```

## Pros

* Very simple; cheap memory; inexpensive operations.
* Easy to implement in-memory or with Redis INCR+EXPIRE.

## Cons

* **Burstiness / boundary problem**: if user makes `limit` requests at end of window and `limit` at start of next window, effective rate = 2*limit in short time.
* Not precise for sliding time semantics.

## Complexity

* Time: O(1)
* Memory: O(#active keys)

## When to use

* Low precision required; easy throttling; protection for simple endpoints.

---

# 3) Sliding Window Log

## Idea

Store timestamps of each request per key. On new request, remove timestamps older than `now - windowSize`, then count remaining timestamps.

## Data structure

```
map[key] -> deque/timestamp list (sorted)
```

## Pseudocode

```
timestamps = state[key] or []
truncated = drop timestamps < now - windowSize
if len(truncated) < limit:
    append now; allow
else
    reject
```

## Pros

* Exact (accurate enforcement).
* Handles bursts smoothly.

## Cons

* High memory: up to `limit` timestamps per key.
* Expensive to maintain / remove old entries (but deque helps).
* Distributed implementation requires storage (Redis sorted set works).

## Complexity

* Time: O(log n) for sorted set removal/insertion (if using balanced structure); O(1) amortized with deque + index.
* Memory: O(limit * #keys)

## When to use

* When exact rate limiting is required and `limit` is small or keys are few.

---

# 4) Sliding Window Counter (approximate sliding window)

## Idea

Keep counts for current window and previous window; compute weighted sum by how far into the window we are. This reduces burstiness vs fixed window and is approximate.

## Data structure

```
map[key] -> { windowStart: timestamp, countCurrent, windowPrevStart, countPrev }
```

## Calculation

```
elapsed = now - currentWindowStart
weightPrev = (windowSize - elapsed) / windowSize
effectiveCount = countCurrent + countPrev * weightPrev
```

If `effectiveCount < limit` allow.

## Pros

* Lower memory than sliding log.
* Much better than fixed window for bursts.

## Cons

* Approximate — can be off by a bit.
* Slightly more complex.

## Complexity

* Time: O(1)
* Memory: O(#keys) but small per key

## When to use

* Production systems where memory matters, and small approximations are acceptable.

---

# 5) Token Bucket

## Idea

Bucket with capacity `C`. Tokens are added at rate `r` (tokens/second). Each request consumes tokens (1 token per request or weighted). If tokens available, allow; otherwise reject. Allows smoothing and bursts up to capacity.

## Data structure

```
map[key] -> { tokens: float, lastRefillTime: timestamp }
```

## Refill logic

```
delta = now - lastRefillTime
tokens = min(capacity, tokens + delta * r)
if tokens >= cost:
    tokens -= cost
    lastRefillTime = now
    allow
else
    reject
```

## Pros

* Controls steady rate + bursts.
* Intuitive for “leaky bucket”-like behavior but supports bursts (up to capacity).
* O(1), modest memory.

## Cons

* Needs accurate clock; floating arithmetic.
* Distributed usage requires an atomic update — e.g., Lua on Redis.

## Complexity

* Time: O(1)
* Memory: O(#keys)

## When to use

* API quotas with burst allowance; expensive operations that should be smoothed.

---

# 6) Leaky Bucket

## Idea

Requests are queued and drained at fixed rate. If queue overflow, drop (reject). Works like a fixed outflow: constant rate service.

## Data structure

* Can be implemented as a queue or as an approximation with a timestamp of last processed request and a queue counter.

## Behavior

* Makes actual output rate constant; smooths jitter but doesn’t allow bursts beyond queue capacity.

## Pros

* Guarantees the output rate exactly.
* Useful when downstream capacity is fixed.

## Cons

* Can add latency due to queueing.
* Implementation complexity for distributed systems (shared queue).

## When to use

* To protect downstream systems with fixed throughput.

---

# 7) Redis INCR + EXPIRE (Distributed Fixed Window)

## Idea

Use Redis atomic INCR on a key per window, set TTL = windowSize. `INCR` is atomic so works across instances.

## Key format

`rate:{userId}:{windowStart}` or `rate:{userId}:{windowSizeInSec}`

## Flow

1. `count = INCR(key)`
2. If `count == 1` then `EXPIRE(key, windowSizeSec)`
3. Allow if `count <= limit`

## Pros

* Simple, distributed-safe (atomic INCR).
* Low code changes.

## Cons

* Shares fixed window cons (boundary burst).
* Need to set TTL carefully: network latency can cause `count == 1` check to race with setting EXPIRE (but typical pattern is safe: set EXPIRE whenever key created — use `SET key 1 EX seconds NX` or `INCR` then `EXPIRE` if `TTL == -1`).
* Many keys for high cardinality.

## When to use

* Simple distributed rate limiting with acceptable boundary behavior.

---

# 8) Redis Lua Script (atomic check-and-increment)

## Idea

Run atomic script that does: trim sorted set / list or update token bucket, and returns allow/reject — all in one atomic operation.

## Examples

* Token bucket: load tokens based on time delta, check tokens >= cost, subtract and update timestamp — done in one Lua script.
* Sliding window log: use ZADD with timestamp as score, ZREMRANGEBYSCORE to purge old, ZCARD to check count, allow if <= limit.

## Pros

* Atomicity guaranteed in Redis single-node.
* Efficient (few round trips).
* Deterministic.

## Cons

* Lua complexity and maintainability.
* Scalability on Redis cluster: keys should be in same slot (single hash slot) — use one key per limiter.

## When to use

* Distributed systems requiring precise enforcement and atomic operations.

---

# 9) Redis Sorted Set (accurate sliding window, distributed)

## Idea

Use `ZADD key now score`, `ZREMRANGEBYSCORE key 0 (now - window)`, then `ZCARD key`. Use TTL to expire if empty.

## Flow (one or more Redis commands, or combine with Lua)

1. `ZADD key now now`
2. `ZREMRANGEBYSCORE key 0 (now - window)`
3. `cnt = ZCARD key`
4. `if cnt <= limit` allow else reject
5. optionally `EXPIRE key windowSizeSec`

## Pros

* Accurate sliding-window enforcement.
* Distributed and reasonably efficient.

## Cons

* Needs sorted set per key: memory cost = O(#events).
* Multiple commands — best to wrap in Lua for atomicity.

## When to use

* When exact sliding semantics are required in distributed system.

---

# 10) Distributed Token Bucket (Redis + Lua or algorithmic variants)

## Idea

Represent token bucket state in Redis hash: `{tokens, lastRefill}`. Use a Lua script to atomically compute refill and subtract tokens.

## Lua pseudocode

```
local key = KEYS[1]
local capacity, rate, now, cost = tonumber(ARGV[1]), tonumber(ARGV[2]), tonumber(ARGV[3]), tonumber(ARGV[4])
local state = redis.call('HMGET', key, 'tokens','ts')
-- compute refill tokens based on now - ts, cap limit
-- if tokens >= cost: update HMSET tokens, ts; return allow
-- else return reject
```

## Pros

* Distributed-safe token bucket with bursts and steady refill.
* Efficient single script call per request.

## Cons

* Complexity; needs care with time units and data types.
* On Redis Cluster ensure the key maps to a single hash slot.

## When to use

* When you want token-bucket semantics across many nodes.

---

# 11) Weighted rate limiting & costs

* Requests may have different weights (e.g., expensive DB write cost 5 tokens, read cost 1).
* Token bucket and leaky bucket easily support weighted costs.
* Fixed-window and sliding windows can be extended to count weighted sums (increment by weight).

---

# 12) Implementation API designs (Node.js)

Design a consistent interface so implementations are swappable.

```ts
type Key = string
type RateLimitResult = {
  allowed: boolean
  remaining: number // tokens or requests left
  resetAt?: number // timestamp when reset/next token
  reason?: string
}

interface RateLimiter {
  /**
   * Try to consume `cost` units for `key`.
   * returns RateLimitResult
   */
  consume(key: Key, cost?: number): Promise<RateLimitResult> | RateLimitResult
}
```

We can implement `InMemoryFixedWindow`, `InMemoryTokenBucket`, `RedisFixedWindow`, `RedisLuaTokenBucket`, `RedisSlidingLogSet`, all implementing the interface. Then expose middleware for Express:

```js
function rateLimitMiddleware(rateLimiter, options) {
  return async function (req, res, next) {
    const key = options.keyGenerator(req) // e.g., req.ip or req.user.id
    const result = await rateLimiter.consume(key)
    res.setHeader('X-RateLimit-Limit', options.limit)
    res.setHeader('X-RateLimit-Remaining', result.remaining)
    res.setHeader('X-RateLimit-Reset', result.resetAt)
    if (!result.allowed) {
      res.status(429).send('Too Many Requests')
    } else next()
  }
}
```

---

# 13) Node.js implementation notes (practical)

* For in-memory: use `Map` or `LRU` caches (e.g., `lru-cache`) to avoid unbounded memory growth; set TTL for entries; use `setInterval` cleanup or event-driven cleanup when reading.
* For concurrency: Node.js single thread means in-memory operations are atomic per process — but across multiple processes/instances you need shared store.
* For distributed: Redis is the usual choice. Use `ioredis` or `node-redis`.
* Lua scripts: keep them small, well-tested, and cache SHA to avoid overhead.
* Time unit: use milliseconds consistently. Convert rates to tokens/sec where needed.
* Clock skew: rely on Redis server time (`TIME`) if strong accuracy required instead of app server clocks. Alternatively pass client time but be aware of skew.

---

# 14) Handling edge cases

* **Clock skew**: Use Redis `TIME` for authority in distributed token buckets/Lua scripts.
* **Race conditions**: wrap multi-command sequences in Lua scripts.
* **Network partitions**: if Redis unavailable, decide policy (fail-open vs fail-closed). Fail-open may let DDOS through; fail-closed blocks legit traffic.
* **Key explosion**: use TTLs, LRU eviction, aggregated keys where possible.
* **High-throughput**: batch operations where possible; use local cache for low-latency checks and eventual sync to Redis (but must accept weaker guarantees).
* **Hot keys**: single user hitting very high rate may stress Redis. Consider per-user sharding or rate-limiting upstream proxies.
* **Distributed lock / consistency**: avoid heavy locking; prefer atomic operations in Redis.

---

# 15) Metrics & Observability

* Expose counters: allowed, rejected, queued, error.
* Emit per-key drop rates, 429 rate, top offenders.
* Trace Redis latency, Lua execution time.
* Add headers in responses: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`.
* Log decisions with sampling.

---

# 16) Testing strategies

* Unit tests for each algorithm (simulate time progression to refill).
* Property tests: generate random sequences, assert total allowed over long period ≈ limit.
* Integration tests with Redis (mock or real local Redis).
* Load tests: benchmarking (k6, artillery) to observe behavior under burst and sustained load.
* Chaos tests: Redis failover, network latency, clock skew.

---

# 17) Performance & Memory comparison (high-level)

* **Fixed window (in-memory)**: lowest CPU/memory.
* **Sliding log (in-memory)**: highest memory per key (O(limit)).
* **Sliding counter approx**: very low memory, good tradeoff.
* **Token bucket (in-memory)**: low memory, flexible burst.
* **Redis INCR**: low memory per key; fast.
* **Redis ZSET sliding log**: memory ~ O(requests stored), expensive at high QPS.

---

# 18) Implementation order I recommend (we can follow this exact sequence to build & test)

1. In-memory Fixed Window (simplest) — Express middleware.
2. In-memory Sliding Window Counter (approx) — demonstrates better behavior.
3. In-memory Token Bucket — demonstrates bursts + refill.
4. Redis Fixed Window (`INCR` + `EXPIRE`) — distributed simple.
5. Redis Sorted Set sliding window (with Lua wrapper for atomicity) — accurate distributed.
6. Redis Lua Token Bucket — precise distributed token bucket.
7. Optional: hybrid approach — local token bucket with periodic synchronization to Redis (for performance).
8. Advanced: integrate with Redis cluster & sharding patterns, rate-limiter service/gateway.

---

# 19) Detailed Node.js sketches & data structures

Below I give concise sketches you’ll find useful when we start implementing.

### In-memory Fixed Window sketch

```js
class InMemoryFixedWindow {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.store = new Map(); // key -> { windowStart, count }
  }

  consume(key, cost = 1) {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    let entry = this.store.get(key);
    if (!entry || entry.windowStart !== windowStart) {
      entry = { windowStart, count: 0 }
      this.store.set(key, entry);
    }
    if (entry.count + cost <= this.limit) {
      entry.count += cost;
      return { allowed: true, remaining: this.limit - entry.count, resetAt: entry.windowStart + this.windowMs }
    } else {
      return { allowed: false, remaining: 0, resetAt: entry.windowStart + this.windowMs }
    }
  }
}
```

### In-memory Token Bucket sketch

```js
class InMemoryTokenBucket {
  constructor(ratePerSec, capacity) {
    this.rate = ratePerSec
    this.capacity = capacity
    this.store = new Map() // key -> { tokens, last }
  }

  consume(key, cost = 1) {
    const now = Date.now()
    const entry = this.store.get(key) || { tokens: this.capacity, last: now }
    const delta = (now - entry.last) / 1000
    entry.tokens = Math.min(this.capacity, entry.tokens + delta * this.rate)
    entry.last = now
    if (entry.tokens >= cost) {
      entry.tokens -= cost
      this.store.set(key, entry)
      return { allowed: true, remaining: entry.tokens }
    } else {
      this.store.set(key, entry)
      return { allowed: false, remaining: entry.tokens }
    }
  }
}
```

### Redis fixed window (pseudocode calling Redis)

```js
// using ioredis
async function redisFixedConsume(redis, key, limit, windowSec) {
  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, windowSec)
  }
  return { allowed: current <= limit, remaining: Math.max(0, limit - current) }
}
```

### Redis sliding window (ZSET) (pseudocode)

```js
-- Lua script approach (atomic):
-- KEYS[1] = key
-- ARGV[1] = nowMillis
-- ARGV[2] = windowMillis
-- ARGV[3] = limit

redis.call('ZREMRANGEBYSCORE', KEYS[1], 0, ARGV[1] - ARGV[2])
local count = redis.call('ZCARD', KEYS[1])
if tonumber(count) < tonumber(ARGV[3]) then
  redis.call('ZADD', KEYS[1], ARGV[1], ARGV[1])
  redis.call('PEXPIRE', KEYS[1], ARGV[2])
  return {1, tonumber(ARGV[3]) - count - 1}
else
  return {0, 0}
end
```

---

# 20) Security / Abuse considerations

* Avoid exposing internal keys in headers.
* Rate limiting as a defense can be bypassed if identity is spoofed — pair with authentication and IP heuristics.
* Combine with CAPTCHA or progressive penalties for repeated abuse.
* Consider gradual backoff (increase penalty time for repeated violations).

---

# 21) Next steps — implementation plan (when you say “go”)

We’ll implement in this sequence (each step will include code, tests, Express middleware, and a small demo script):

1. In-memory Fixed Window (Node.js + tests + Express middleware).
2. In-memory Sliding Window Counter (approx).
3. In-memory Token Bucket (include weighted requests).
4. Redis Fixed Window (INCR+EXPIRE).
5. Redis sliding window sorted set (Lua script).
6. Redis Token Bucket (Lua script).
7. Integration tests & load tests.

