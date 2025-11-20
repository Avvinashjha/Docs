# Event Loop and I/O

## 1, Blocking vs Non-blocking Operations

### Blocking Operations (Synchronous)

The Program waits until the current task finishes before moving to the next task.

Example:

```js
readFileSync("data.txt");
console.log("DONE")
```

So if reading file takes 3 seconds the nothing else runs for 3 seconds -> blocked.

So you can think blocking as You are in a restaurant and there is only one cook

- Cook start preparing your meal
- Everyone else must wait till you meal is finished
- and then cook will move to next meal so this is blocking in nature

### Non-Blocking Operation (Asynchronous)

The program does not wait. Node.js starts the task, tells the OS to do it, and continues executing other code.

```js
readFile("data.txt", callback);
console.log("DONE")
```

So in this case "DONE" will be printed immediately because file read happens in the background.

No Imagine, In the restaurant at reception you gave the order and it goes to one of the staff and then other customer can give their order too. so when food is ready callback(waiter) will send you your order.

## 2. How Node.js handles blocking/async operations?

Node.js is  single threaded but uses a system called Event loops, Callback queue, Thread Pool (workers).

Node.js work flow:

1. Your Javascript code **runs on the main thread**.
2. When Node hits **async tasks** (file read, DB Calls, Network call):
   - They get **sent to background workers**
3. Node.js continues executing other code.
4. When the background task finishes
   - A callback is added to event loop queue
5. Event loop executes **when main thread is free**.

## 3. What is Event Loop in Node.js?

The Event Loop is the brain of Node.js.

Ot constantly checks:

- Do we have new callbacks?
- Are timers due?
- Are promise resolved?
- Are network task done?

The event loop decides what to run next.

## 4. Phase of Event loop

The Event Loop runs in 6 main phases:

1. Timers Phase
   - Runs callbacks from, `setTimeout`, `setInterval`
2. Pending Callbacks Phase
   - Handles system-level callbacks (rarely used in normal apps)
3. Idle/Prepare Phase
   - Internal use (You don't interact with it)
4. Poll Phase
   - Waits for new incoming data
   - Executes I/O callbacks (file read/ HTTP responses)
   - If nothing is pending stays there
5. Check Phase
   - Runs callback scheduled by `setImmediate`.
6. Close Callbacks Phase
   - Handles cleanup like
     - `res.end()`
     - `socket.on("close")`

And between each phase, Micro-task queue runs:

- Promise callbacks (`.then`, `await`)
- `process.nextTick`

Micro-tasks always run before moving to next phase.

## 5. How Event Loop Manages Callbacks?

When async task finish:

- Their callbacks are pushed to callback queue
- Event Loop picks them up **only when the call stack is empty**.

Example Order:

1. JS code runs (main thread)
2. Async task sent to workers
3. Worker finish & push the callback to callback queue
4. Event loop executes the callback when ready

## 6. What are workers in Node.js?

Workers are threads inside libuv thread pool (Not Javascript threads).

Tasks that workers handle:

- File system operations
- DNS Lookups
- Compression/Encryption
- CPU tasks (if worker thread manually used)
- Crypto operations
Javascript main thread continues executing while workers work in background.

Thread pool Default size is 4 and it can be increased via env variables.

## 7. Why Node.js is better for I/O applications?

Node.js is non-blocking, it does not wait for operations.

Event Loop + workers handles I/O efficiently, network requests and file handling are handled in background.

Thousands of connection can be handled without creating thousands of thread like java or PHP.

Lightweight memory usage, Perfect for API and Microservices.

Example of I/O apps:

- Real time chat app
- Streaming apps
- Rest APIs
- Web Sockets
- File Uploads/download service
- Realtime dashboards

## 8. Why Node.js is not ideal for CPU-Intensive tasks?

Node.js uses single thread, if you run heavy tasks like

- Image processing
- Video encoding
- Large calculations
- Machine learning
- Complex loops

The main thread becomes blocked, Event loop stops, server becomes unresponsive.

Example:

```js
for(let i = 0; i< 5000000000000000; i++){}
```

You entire Node server will freezes.

Why?

Because heavy CPU tasks can not be offloaded to workers by default.

You'd need:

- Worker Threads (manual)
- Child Processes
- Clustering

## How Node.js Event Loop is different from JS Event loop?

Javascript in browser and Javascript in Node.js both have Event loop, but they are not same. The concept is the same, but implementation, components, and capabilities are different.


| Feature             | Browser Event Loop             | Node.js Event Loop                                |
| ------------------- | ------------------------------ | ------------------------------------------------- |
| Implemented by      | Browser (Chrome → Blink + V8)  | Node.js (libuv + V8)                              |
| Handles             | UI events, timers, network     | Timers, network, filesystem, DNS, crypto, workers |
| Background threads? | YES (browser internal threads) | YES (libuv thread pool)                           |
| Phases              | Simple (Macro + Micro tasks)   | Complex (6 phases + Microtasks)                   |
| Extra APIs          | DOM, Web APIs                  | File System, Streams, Sockets                     |
| Microtask priority  | Promises first                 | `process.nextTick` first                          |


Node.js event loop is more complex and powerful because Node.js is a backend environment, not a browser.

### 1. Environment Difference

The event loop is build by the environment, not Javascript it self.

Browser:

- Event loop are built into the browser
- Uses Web APIs
- Focuses on user interactions (click, scroll)
- No direct file system or backend operations.

Node.js

- Built on libuv (a c++ Library)
- Designed for backend operations (files, networks, servers)
- Integrates with OS-level tasks and threads.

### 2. Components are different

Browser Event Loop Structure:

- Call Stack
- Web APIs (setTimeout, fetch, DOM events)
- Callback Queues (Task Queue)
- Microtask Queue (Promises)
- Rendering engine

Browser loop is mainly

```txt
Macro Task -> Microtask -> Render
```

Node.js Event Loop Structure

- Timers
- Pending Callbacks
- Idle/Prepare
- Poll (I/O callbacks)
- Check (setImmediate)
- Close Callbacks

and Microtask between phases.

Node handles:

- File system (fs module)
- Network Sockets
- Streams
- DNS
- Crypto
- Workers (Thread Pool)

Browser event loop does not have capabilities to handle these.

### 3. Microtask behavior is different

Browser:

Microtasks = Promise, MutationObserver

Always runs after each macro task.

Node.js

Two microtask queue

1. process.nextTick queue
2. Promise microtask queue

Order:

```js
process.nextTick -> Promise -> next phase
```

In browser, nextTick does not exist.

Node gives higher priority to the backend tasks -> this makes node faster for I/O.

### 4. Node.js has a Thread Pool

Node.js has libuv thread pool (default size = 4) and it's used for:

- File system operations
- DNS Lookups
- Compression
- Crypto
- Some timers

Browser event loop does not have this. It uses web apis that runs internally but not as a general thread pool for arbitrary compute tasks.

### 5. Browser has Rendering steps

Browser Must:

- Paint UI
- Handle CSS
- Handle Layout
- Re-render animation every 16ms

Node.js does not render anything, it is focused on backend operations.

### 6. fetch() vs fs.readFile()

In Browser

fetch() is async but handled by browser networking threads.

In Node

fs.readFile() is handled by libuv workers.

Browser -> No file system access
Node -> full file system access

