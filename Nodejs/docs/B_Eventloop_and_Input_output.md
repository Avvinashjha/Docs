# Event Loop and I/O

## 1. Blocking vs Non-blocking Operations

### Blocking Operations (Synchronous)

The Program waits until the current task finishes before moving to the next task.

Example:

```js
readFileSync("data.txt");
console.log("DONE")
```

So if reading file takes 3 seconds then nothing else runs for 3 seconds -> blocked.

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

Now Imagine, In the restaurant at reception you gave the order and it goes to one of the staff and then other customer can give their order too. so when food is ready callback(waiter) will send you your order.

## 2. [The Node.js Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick?utm_source=chatgpt.com)

Event Loop is the mechanism (implemented by c++ library libuv under node) that lets a single threaded Javascript runtime handle many async operations. Its repeatedly takes work from various queues (timers, I/O callbacks, etc.) runs callbacks, and interleaves that with the microtask queues (process.nextTick() and Promise.callbacks). The detailed ordering matter for correctness and performance.


### Anatomy

- libuv provides the underlying event loop (handles I/O, timers, poll, check, the thread pool, etc). Node's JS Layer schedules callbacks into the appropriate libuv phase/queue.
- The event loop cycles through several phases. In each phase Node runs all callbacks scheduled for that phase (or up to some limit) then moves on. Between and inside phases, Node also drains microtask queues: `process.nextTick()` and `Promise` reactions. `process.nextTick()` has higher priority than Promise in Node.

### The Phase (Order of Execution In Event Loop)

#### 1. Timer Phase

**What runs**: callback scheduled by setTimeout() and setInterval() whose time has expired.

**Important:** Expired timers are executed in this phase, but timers with 0ms delay are still subject to scheduling and may run later than you expect (depending on when the loop reaches this phase).

Example:

```js
setTimeout(()=>console.log("timer 1"), 0);
console.log("sync");
```

Output: 

```bash
sync
timer 1
```

**Explanation:** sync code runs first, then the event loop reaches timers and runs expired timeouts.

#### 2. Pending Callbacks or I/O callback

What runs: some system level callbacks (e.g. error from TCP, some types of deferred network callbacks). This phase is implementation-specific, many callbacks commonly associated with I/O land in the pool phase instead.

Developer usually don't schedule directly into this queue, in this phase mostly some of the os triggered callbacks are completed.

#### 3. Idle, Prepare (internal)

What runs: internal libuv handles used for bookkeeping and to let native code run prepared callbacks, These are mostly internal and not directly exposed to typical node programs. They Give libuv finer control between I/O and the poll phase.

#### 4. Poll Phase

What runs: **the heart of libuv**, the pool phase will

- Retrieve new I/O events (e.g. Incoming network data) and 
- Execute I/O callbacks for events that are ready. If there are no timers scheduled and no callbacks to run, poll may block waiting for I/O (for efficiency). If setImmediate() callback are scheduled and poll becomes idle, the loop may end early and go to check phase.

Example:

```js
const fs = require("fs");
fs.readFile(__filename, ()=> {
    setTimeout(()=> console.log("timeout from I/O", 0);
    setImmediate(()=> console.log("Immediate from I/O"));
})
```

Output:

```bash
Immediate from I/O
timeout from I/O
```

Explanation: setImmediate() scheduled inside an I/O callback usually runs in the check phase following poll, setTimeout(...,0) goes to timers and typically runs in the next timers phase  (order depends on timing).

#### 5. Check Phase

What runs: Callback scheduled by setImmediate(). This phase is guaranteed to run after the poll phase completes. setImmediate() is useful to run something after I/O callbacks have been processed.

Example:

```js
setTimeout(() => console.log('timeout 0'), 0);
setImmediate(() => console.log('setImmediate'));
```

Output depends on timing:

```bash
timeout 0
setImmediate
```

or

```bash
setImmediate
timeout 0
```

If the script reaches the poll phase and there's I/O, setImmediate is more likely to run before timers, if not timers may run first. This is why setImmediate is recommended when you want to run a callback right after I/O operations.

#### 6. Close callbacks

What runs: callbacks for closed handles, e.g. `socket.on("close", ...)`. if a handle is closed with `socket.destroy()`, its close event is emitted in the phase.

### Microtasks - Process.nextTick() and Promises

Microtasks are drained between phases (and also after each callback). Node has two microtask-like queues:

1. **process.nextTick() queue**: Highest Priority, callbacks added with `process.nextTick()` will run immediately after the current running operation finishes and before the event loop continues to the next phase. Because `nextTick` callback run before other microtask. they can starve the loop if miss used.
2. **Promise (microtask) queue**: Promise callbacks (`.then`, `await` continuations) are drained after the `nextTick` queue but still before moving on to the next event-loop phase.

Example:

```js
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
console.log('sync');
```

Output:

```bash
sync
nextTick
promise
```

Explanation: sync runs, then nextTick queue is drained, the promises.

Caveat/nuance: There are edge cases (different placement inside callbacks, order of where things were scheduled) where behavior can look surprising, but process.nextTick() always runs before promise that are scheduled for same tick.

### Some Important Behavior

- **`setTimeout(..., 0)` vs `setImmediate()`**, `setTimeout(...,0)` runs in the timers phase, `setImmediate()` runs in the check phase. when scheduled from top-level code, their order is not strictly guaranteed (depends on whether poll runs before timer). But if you call withing I/O callback, `setImmediate()` often runs first. Use `setImmediate()` for "run after I/O" semantics.
- **Blocking the event loop** (e.g. Heavy CPU work) prevent the loop from processing any callbacks, avoid long sync work, **use worker threads or offload to native module if needed**.
- **Thread Pool (libuv)**: some async operation (file system, crypto, DNS lookups depending on flags) are performed in a thread pool, when finished they queue callbacks back onto event loop. That's why long file ops can still finish async without blocking Javascript execution.

### Use case

- Use process.nextTick() to run something immediately after current function completes (but be aware of starvation)
- Use Promise.resolve().then(...) or queueMicrotask() for standard microtask sematic (chained async logic)
- Use setImmediate() to run a task after the current pill phase (useful after I/O)
- Use setTimeout(...,0) when you want to schedule a callback for next timer phase (useful but less predictable than setImmediate for after I/O scheduling)

### Simplified Flow

1. Run script (sync code executes first)
2. Drain process.nextTick() queue (after sync this queue will be checked by event loop)
3. Drain Promise microtask queue
4. Timer Phase (expired setTimeout/setInterval) runs those callbacks
5. Pending callbacks (some system callbacks)
6. Poll phase (I/O Callbacks, setImmediate)
7. Close callbacks (connection close callbacks etc.)
8. Repeat.

## 3. process.setTick() and setImmediate()