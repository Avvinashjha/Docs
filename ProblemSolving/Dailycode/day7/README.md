# DAY 6 — Coding Interview Challenge

## 1. Easy — First Unique Character in a String

Problem:
Given a string s, return the index of the first non-repeating character.
If none exist, return -1.

Examples:
 • s = "leetcode" → 0
 • s = "loveleetcode" → 2
 • s = "aabb" → -1

⸻

## 2. Medium — Longest Subarray With Sum K (Positive + Negative allowed)

Problem:
You are given an array of integers nums and an integer k.
Find the length of the longest subarray that sums exactly to k.

Example:
nums = [1, 2, -1, 2, -2, 3], k = 3 → 4 (subarray: [1,2,-1,2])

⸻

## 3. Hard — Merge K Sorted Linked Lists

Problem:
You are given an array of k linked lists, each sorted in ascending order.
Merge them into one sorted linked list and return it.

Follow-up:
Solve it in O(N log k) using a min-heap.

⸻

⸻

## Mini Project — Day 6

📌 Build a Rate Limiter as a Reusable NPM-Style Module (Node.js)

Requirements

Build a simple but production-like rate limiter module that can be plugged into any Express app.

Features

1. Sliding window or fixed window implementation (your choice)
2. Configurable options:
   - windowMs (time window)
   - maxRequests (allowed requests)
3. In-memory storage is fine (no Redis required yet)
4. Export as a reusable function:

   ```js
   const rateLimiter = require("./rateLimiter");
   app.use(rateLimiter({ windowMs: 60000, maxRequests: 50 }));
   ```

5. Should block requests with:

{ "error": "Too many requests" }

Bonus (Optional)
 • Add key-based rate-limiting (per IP)
 • Add a cleanup routine for old entries

⸻

📝 Your Task

Submit your:
 • Solutions for the 3 coding challenges
 • Rate limiter mini project (logic + explanation + code)

You have 24 hours, and I will:
✅ Review everything
✅ Give detailed feedback
✅ Give daily rating
✅ Track your improvement over time

⸻

Ready when you are. Let’s crush Day 6 🚀🔥
