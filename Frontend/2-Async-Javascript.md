# Phase 1: Core Concepts

## 1. Synchronous JS

Javascript is Single threaded and **Javascript runs on one call stack**.

Only one thing executes at a time.

Example:

```js
console.log("A");
console.log("B");
console.log("C");
```

Output:

```
A
B
C
```
Easy.

But now:

```js
console.log("A");

setTimeout(()=>{
    console.log("B");
}, 0)

console.log("c");
```

Output:

```
A
C
B
```
Why?

Because setTimeout is not handled by Javascript engine itself.

## Javascript Runtime Architecture

Browser:

```
JS Engine
    |
Call Stack
    |
Web APIs
    |
Callback Queue
    |
Event Loop
```

Node JS:

```
V8 Engine
    |
libuv
    |
Event loop
    |
Task Queues
```

## Understanding the Call stack

Imagine stack plates.

```js
function one(){
    two();
}

function two(){
    three();
}

function three(){
    console.log("Hello")
}
one()
```

Stack:

```
one()
two()
three()
console.log()
```

After Execution:
```
(empty)
```

Javascript can only do one thing at a time. So async behavior must happen Outside the stack.

## Browser APIs / Node APIs

When Js sees:

```js
setTimeout(fn, 100);
```

It delegates time handling to browser/node runtime.

JS does not wait.

```js
JS:
register timer
continue execution
```

That callback waits elsewhere.

## Event Loop

The event Loop continuously checks:

```
is callstack empty?
```

If yes:
- move the queued tasks into stack

## Task Queues

There are two type of task queues:

### 1. Callback Queues (Macrotask Queue)

It contains:
- setTimeout
- setInterval
- DOM events
- I/O calls

## 2. Microtask Queue

It contains:
- Promise.then
- promise.catch
- queueMicrotask
- MutationObserver

> Microtask have higher priority.

### Question to understand task queues

Predict the output:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Step 1: Synchronous task will go to call stack directly

Callstack:

```
console.log("A")
```

Call stack Executes:

Output:
```
A
```

Step 2: timeout goes to Callback queue and waits until the delay and call stack is empty

Callback Queue:

```
setTimeout(() => {
  console.log("B");
}, 0);
```

Step 3: Promise goes to microtask queue and wait until call stack is empty

Micro task queue:

```
Promise.resolve().then(() => {
  console.log("C");
});
```

Step 4: Sync call goes to call stack

Callstack
```
console.log("D");
```

Output:

```
D
```

Then event loop check first in microtask queue

callstack

```
console.log("C");
```

Output: 

```
C
```

then microtask is empty then event loop check to callback queue

Call stack
```
console.log("B");
```

Output:

```
B
```

Finally the combined output will be

```
A
D
C
B
```

# Phase 2: Promise 

## What is Promise?

A Promise is an object representing, `Future completion or failure of async work`.

Promise has 3 states:
1. Pending
2. fulfilled
3. rejected

## Basic Promise

```js
const promise = new Promise((resolve, reject)=> {
    resolved("success")
})
```

Internally:

```
pending -> fulfilled
```

## Consuming Promise

```js
promise.then((value)=> {
    console.log(value);
})
```

Output:

```
success
```

## Important Internal Behavior

Even if already resolved:

```js
Promise.resolved("done").then(console.log)
console.log("After")
```

Output:

```
After
done
```

Why?

Because `.then()` always goes to microtask queue.

Even for already resolved promise.

This guarantees predictable async behavior.

## Promise Chaining

```js
Promise.resolve(1)
    .then((a)=> a + 1)
    .then((b)=> b + 1)
    .then(console.log);
```

Output:

```
3
```

Each `.then()` returns a new promise.

## Internal Metal Model

```js
then(fn);
```

Actually behaves like:

```js
return new Promise(...)
```

That's why chaining works.

## Error Propagation

```js
Promise.resolve().then(()=>{
    throw new Error("Oops");
}).catch(console.log);
```

Error becomes rejected promises.

## Async/Await

async/await is syntax sugar

```js
async function getData(){
    return 10;
}
```

Actually return 

```js
Promise.resolve(10)
```

await internally:

```js
const value = await promise;
```

Means:

```js
promise.then(...)
```

## Lets Understand with Example

Predict the output:

```js
async function test(){
    console.log(1);
    await Promise.resolve();

    console.log(2);
}

console.log(3);
test();
console.log(4)
```

Execution:

```
3
1
4
2
```

Because, await pauses function and schedules continuation in microtask queue.

## Browser vs Node.js Promise

Core Promise mechanism are same.

Difference is runtime APIs.

Browser:

- fetch
- DOM events
- rendering

Node:
- fs
- streams
- networks
- libuv thread pool

## Node.js Event Loop Phases

Simplified:

```
Timers
Pending callbacks
Idle
Poll
Check
close
```

Special Queues:
- NextTick queue
- microtask Queue

process.nextTick() runs before promise microtasks.

Example:

```js
Promise.resolve().then(()=>{
    console.log("promise")
})

process.nextTick(()=>{
    console.log("nextTick");
});
```

Output:

```
nextTick
promise
```

## Frontend Promise Usages

Common frontend async operations:
- API calls
- animations
- lazy loading
- user interactions
- caching
- service workers

Example:

```js
const res = await fetch("/api/users");
const users = await res.json();
```

## Backend Promise Usages

Node.js uses promises for:
- DB Queries
- file system
- Redis
- queues
- streams
- microservice

Example:

```js
const data = await fs.promises.readFile("a.txt", "utf8");
```

## Promise Lifecycle

```
new Promise()

pending
    |
    +--- resolved ---> fulfilled
    |
    +--- rejected(error) ---> rejected
```

`.then()` attaches listeners

## The Biggest Promise Misconception

Many think: **Promise make code asynchronous**. Not exactly.

The async operation is done by:
- Browser API
- Node APIs

Promise is just:
- a coordination mechanism
- future value container

## Promise Internals

Internally promises stores:

```js
{
    state: "pending",
    value: undefined,
    handlers: []
}
```

When resolved:
- state changes
- queued handlers executes in microtask queue

## Promise Methods

Promise method can be divided into two category:
- Instance method
- Static method

### 1. Promise Instance Methods

These operate on a Promise instance.

```js
promise.then()
promise.catch()
promise.finally()
```

### Promise.then()

Most important method.

```js
promise.then(onFulfilled, onRejected);
```

Example:

```js
Promise.resolve(10)
    .then((value) => {
        console.log(value);
    })
```

Output:

```
10
```

## Very Important Behavior

`.then()` Always returns a NEW promise.

```js
const p = Promise.resolve(1);

const p2 = p.then((x) => x + 1);

console.log(p === p2);
```

Output:

```
false
```
This is core of chaining.

## Chain Flow

```js
Promise.resolve(1)
    .then((x)=> x + 1)
    .then((x) => x + 1)
    .then(console.log);
```

Flow:

```
1
|
2
|
3
```

Each `.then()` creates a new promise.

## What if the Returns Promise

```js
Promise.resolve(1)
    .then((x) => {
        return Promise.resolve(x + 10);
    })
    .then(console.log);
```

Output:

```
11
```

This behavior is called **Promise Flattening**, Promise automatically unwraps returned promises.

Internally:

```
Promise<Promise<T>>
```

Becomes:

```
Promise<T>
```

This is one of the hardest parts of custom implementation.

## Error Handling in then()

```js
Promise.resolve()
    .then(()=>{
        throw new Error("boom");
    })
    .catch(console.log);
```
Thrown error becomes rejection.

## Missing handler

```js
Promise.resolve(5)
    .then()
    .then(console.log);
```

Output:

```
5
```

If harder missing:
- value passes through

Same for errors.

## Promise.catch()

Sugar syntax:

```js
promise.catch(fn)
```

Example:

```js
Promise.reject("failed")
    .catch(console.log);
```

## Error Bubbling

```js
Promise.resolve()
    .then(()=>{
        throw "A";
    })
    .then(()=>{
        throw "B"
    })
    .catch(console.log);
```

Output:

```
A
```

Once Rejected 
- skip fulfillment handler
- jumps to nearest rejection handler

## Promise.finally()

Runs regardless of success/failure.

```js
Promise.resolve("ok")
    .finally(()=>{
        console.log("cleanup")
    })
```

Output:

```
cleanup
```

### Important finally Behavior

```js
Promise.resolve(10)
    .finally(()=>100)
    .then(console.log);
```

Output:

```
10
```
- finally does not modify value.

## Exception

Unless finally throws:

```js
Promise.resolve(1)
    .finally(()=>{
        throw "error";
    })
    catch(console.log)
```

Output:

```
error
```

## Promise Static Methods

These belongs to Promise class itself.

```js
Promise.resolve()
Promise.reject()
Promise.all()
Promise.race()
Promise.any()
Promise.allSettled()
```

### Promise.resolve()

Creates a fulfilled promise.

```js
Promise.resolve(5);
```

Equivalent:

```js
new Promise((resolve)=> resolve(5));
```

#### Important Resolve Behavior

```js
Promise.resolve(Promise.resolve(10));
```

Flattens automatically.

Results:

```
Promise<18>
```

Not:

```
Promise<Promise<18>>
```

### Promise.reject()

Creates rejected Promise.

```js
Promise.reject("error");
```

Equivalent:

```js
new Promise((_, reject)=> reject("error"));
```

### Promise.all()

Waits all promise.

```js
Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
])
.then(console.log)
```

Output:

```
[1, 2, 3]
```

#### Important Properties

1. Preserves order
   
   ```js
   Promise.all([
    slow(),
    fast()
   ])
   ```

   Result order matches input order.
   Not completion order.

2. Fail fast
   
   ```js
   Promise.all([
    Promise.resolve(1),
    Promise.reject("boom"),
    Promise.resolve(3)
   ])
   .catch(console.log)
   ```

   Output:

   ```
   boom
   ```

   Immediately rejects

### Promise.race()

First settled promise wins.

```js
Promise.race([
    slow(),
    fast()
]);
```

Could resolve or reject.

Example:

```js
Promise.race([
    new Promise(r => setTimeout(()=> r("A"), 100)),
    new Promise(r => setTimeout(()=> r("B"), 50))
])
.then(console.log)
```

Output:

```
B
```

### Promise.any()

First success wins. Ignores rejections.

```js
Promise.any([
    Promise.reject("A"),
    Promise.resolve("B"),
    Promise.resolve("C")
])
.then(console.log);
```

Output:

```
B
```

If all rejected:

```js
Promise.any([
  Promise.reject("A"),
  Promise.reject("B")
]);
```

Rejects with aggregated errors:

```
Aggregated Error
```

### Promise.allSettled()

Never fails.

Waits all promises.

```js
Promise.allSettled([
    Promise.resolve(1),
    Promise.reject("error")
])
.then(console.log);
```

Output:

```
[
  { status: "fulfilled", value: 1 },
  { status: "rejected", reason: "error" }
]
```

Very useful for bulk api calls/dashboard jobs

### Promise Method Comparison

| Method     | Waits All? | Rejects Fast?    | Returns       |
| ---------- | ---------- | ---------------- | ------------- |
| all        | Yes        | Yes              | values        |
| race       | No         | First settle     | first result  |
| any        | No         | Only if all fail | first success |
| allSettled | Yes        | Never            | statuses      |

### Hidden Internal Rules

To implement custom Promise correctly, we need to reproduce:

1. State Immutability
   
   Promise can settle only once.

   ```js
   resolve(1);
   resolve(2);
   resolve(3);
   ```

   Only first call matters.

2. Async then()
   
   Even resolved promises execute handlers asynchronously.

   ```js
   const p = Promise.resolve(1);

   p.then(console.log);

   console.log("end")
   ```

   Output:

   ```
   end
   1
   ```

3. Thenable Resolution
   
   Promise resolved recursively.

   ```js
   resolve({
    then(resolve){
        resolve(10);
    }
   })
   ```

   This works like promise.

   These are called:
   - thenable
 
4. Error Capturing
   
   ```js
   new Promise(()=>{
    throw new Error("boom")
   })
   ```

   Automatically becomes rejection.

5. Queueing Handler
   
   You can attach handlers before or after resolution.

   ```js
   const p = new Promise((resolve) => {
    setTimeout(()=>resolve(10), 1000)
   });
   p.then(console.log)
   p.then(console.log)
   ```

   Both executes, So Promise internally stores subscribers.

   


# Phase 3: Advance Async Systems

## 1. Custom Promise

## 2. Promise.all

## 3. Promise.race

## 4. Retry + exponential Backoff

## 5. Request Cancellation

## 6. Concurrency Control

## 7. Request Pools

## 8. Streaming systems

## 9. Websocket/SSE

## 10. Async Iterators

