# Event-Loop

## A. Fundamentals

### 1. What is Javascript Runtime Environment?

### 2. Call Stack

### 3. Memory Heap

### 4. Execution Context (Global + Function)

### 5. Synchronous vs Asynchronous Javascript

### 6. Blocking vs Non-Blocking Execution

### 7. What is Event-Driven Programming?

## B. Core Event Loop Concepts

### 1. What is Event Loop?

### 2. Call Stack and Event Loop Interaction

### 3. Task Queue (Callback Queue)

### 4. Microtask Queue (Promise/MutationObserver)

### 5. Macrotask Queue (Timers/ I/O, Events)

### 6. Microtask Priority over Macrotask

### 7. Tick vs Microtask (Node.js vs Browser differences)

## C. Web APIs (Browser Environment)

### 1. What are Web APIs?

### 2. Timer API (setTimeout, setInterval)

### 3. DOM Events API

### 4. Fetch API & Network Layer

### 5. Promise & Microtask API Implementation

### 6. Mutation Observer

### 7. IntersectionObserver

### 8. WebSocket API

### 9. Animation APIs (requestAnimationFrame)

### 10.  Storage APIs (localStorage, sessionStorage)

### 11. Geolocation API

### 12. FileReader & File API

### 13. Clipboard API

### 14. Web Crypto API

> These APIs run outside the JS engine and notify JS through the event loop

## D. Browser Concurrency & Workers

### 1. What are Web Workers?

### 2. Dedicated Workers

### 3. Shared Workers

### 4. Service Workers

### 5. Message passing Models

### 6. Worker Thread Limitations (No DOM access)

### 7. Worklet (CSS paint API, Audio Worklet)

### 8. WebAssembly in Workers

## E. Node.js Event Loop (Libuv)

### 1. What is Libuv?

### 2. Node's Event Loop Phases

   - timers
   - pending callbacks
   - idle/prepare
   - poll
   - checks
   - close callbacks

### 3. Process.nextTick()

### 4. Microtask Queue in Node

### 5. Macrotask Queue in Node

### 6. setImmediate vs setTimeout

### 7. Handling I/O with thread pool

### 8. Node.js Worker threads

### 9. Node.js Clustering (multi-process concurrency)

## F. Deep Internal Concepts

### 1. How Promise Actually Works

### 2. Job Queue vs Microtask Queue

### 3. Task Source Categories (HTML spec)

### 4. Long Task and Event Loop Lag

### 5. Event Loop Starvation

### 6. Zero-delay timers and what 0ms != 0ms

### 7. Performance.now(), queueMicrotask()

### 8. Render Queue vs Event Loop

### 9. Event loop in different JS engine (V8, SpiderMonkey)

## G. Browser Rendering Pipeline

### 1. Critical Rendering Path

### 2. Frame Lifecycle

### 3. Layout, Paint, Composite

### 4. requestAnimationFrame timing

### 5. Microtask Running Before Rendering

### 6. Main Thread vs Compositor thread

## H. High Performance Pattern

### 1. Debouncing

### 2. Throttling

### 3. Idle Callbacks (requestIdleCallback)

### 4. Web Workers for CPU-heavy tasks

### 5. Avoiding Layout thrashing

### 6. Using microtask for predictable async behavior

### 7. Avoiding event loop blocking

### 8. Capturing and Bubbling Optimization

## I. Architecture Level understanding

### 1. Event driven architecture in frontend

### 2. Event emitter in Node.js

### 3. Concurrency model differences: Browser vs Node

### 4. MicroServices and Event Loop in Distributed System

### 5. Queues + Event loop synergy (Kafka Like Pattern)

## J. System Design 

### 1. Explain Event Loop step By Step With output Prediction

### 2. Priority Between microtask and Macrotask

### 3. What Node.js uses Libuv?

### 4. Can Javascript be multithreaded?

### 5. Compare Event loop with python asyncio

### 6. How Browser Implement Parallelism
