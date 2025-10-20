## M. Callback Function

A **callback function** is a **function passed as an argument** to another function, which is then **invoked inside that function,** usually after some operation or event occurs.

Callbacks are backbone of asynchronous programming in JavaScript.

### 1. Simple Callback
```js
function gree(name) {
  console.log(`Hello ${name}`);
}
function processInput(callback){
  const name = "Avinash";
  callback(name);
}
processInput(greet);// Hello Avinash
```
`greet` is a **callback,** it’s passed to `processUserInput`, which calls it.

### 2. Anonymous Callback
```js
processUserInput(function(name){
  console.log(`Hello ${name}`);
});
```
  Same as before, but the callback is defined **inline**.

### 3. Why Callback Exits?
JavaScript is single threaded (only one task at a time), so when a task takes time (like reading a file or fetching data), you can’t block execution.

Callback let you schedule work to run later, after the slow operation finishes.

```js
console.log("start");
setTimeout(()=>{
  console.log("Callback executed after 2 sec.");
}, 2000);
console.log("end");
```
Output:

```js
Start
end
Callback executed after 2 sec
```
The callback runs **later**, after the timer finishes.

This is non-blocking behavior, essential for performance.

### 4. Callback in Real APIs
**DOM Event Listener**

```js
document.getElementById("btn").addEventListener("click", () => { 
console.log("Button Clicked!");
});
```
The function inside is a **callback** executed when the event fires.

**Array Methods (map, filter, reduce)**

```js
[1,2,3].map(num=>num * 2); //callback => num = num * 2
```
  `map()` takes a callback to process each element.

### 5. Synchronous vs Asynchronous Callbacks
|   **Type** |   **Description** |   **Example** |
| --- | --- | --- |
|   Synchronous |   Executed Immediately |   array.map(callback) |
|   Asynchronous |   Executed later (after an event or API call) |   setTimeout(callback,1000) |

### 6. Callback Hell
As programs grew complex, callbacks nested deeply. This made code **hard to read, debug, and maintain**.

```js
getUser(userId, function(user) {
  getOrders(user, function(orders) {
    getOrderDetails(orders[0], function(details) {
      console.log(details);
    });
  });
});
```
This pattern of nested callbacks is called **Callback Hell** or **Pyramid of Doom**.

### 7. Solving Callback Hell
  Modern JavaScript introduced Promise and async/await to make asynchronous code easier to read.

Using Promises

```js
getUser(userId)
  .then(getOrders)
  .then(getOrderDetails)
  .then(console.log)
  .catch(console.error);
```
Using async/await

```js
async function showDetails() {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user);
    const details = await getOrderDetails(orders[0]);
    console.log(details);
  } catch (err) {
    console.error(err);
  }
}
```
Still uses callbacks **under the hood**, but hidden behind Promises.

### 8. Error Handling with callbacks
In early Node.js, callbacks used the **error-first pattern**:

```js
function readFileCallback(err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File data:", data);
}
fs.readFile("file.txt", "utf8", readFileCallback);
```
Convention:

- `err` is the first argument.
- If `err` is truthy → something failed.
- Otherwise, `data` contains result.
### 9. Callbacks and Higher-Order Functions
Callbacks are **a use case of higher-order functions, **since they are _passed to_ or _returned from_ another function.

Example:

```js
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, i => console.log("Iteration:", i));
```
`repeat` is a **HOF** that executes a **callback** each iteration.

### 10. Practical Example — Custom Async Function
Let’s simulate an async API:

```js
function fetchData(callback) {
  console.log("Fetching data...");
  setTimeout(() => {
    const data = { id: 1, name: "Avinash" };
    callback(data);
  }, 2000);
}
fetchData(result => console.log("Received:", result));
```
Output:

```js
Fetching data...
(2 sec delay)
Received: { id: 1, name: "Avinash" }
```
### 11. Callbacks vs Promises vs async/await
|   **Feature** |   **Callbacks** |   **Promises** |   **async/await** |
| --- | --- | --- | --- |
|   Syntax |   Nested |   Chained |   Sequential |
|   Error Handling |   Manual |   `.catch()` |   `try...catch` |
|   Readability |   Poor |   Better |   Best |
|   Introduced In |   ES3 |   ES6 |   ES8 |

### 12. Summary
|   **Concept** |   **Desctiption** |
| --- | --- |
|   Callback |   Function passed to another function to be executed later |
|   Synchronous Callback |   Runs Immediately |
|   Asynchronous Callback |   Runs Later |
|   Callback Hell |   Deeply nested callbacks |
|   Solution |   Use Promise or async/await |
|   Error-First Pattern |   Node.js callback style: (err, data) |
|    |    |

>Q. What is a callback function?<br>
A callback is a function passed as an argument to another function and executed later, often after an async task completes.


>Q. Why were callbacks introduced?<br>
To handle asynchronous operations (e.g., file I/O, HTTP requests) without blocking the main thread.


>Q. What is callback hell?<br>
It’s when multiple async operations are nested in callbacks, leading to unreadable code.


>Q. How do Promises solve callback hell?<br>
They flatten nested callbacks into a chainable `.then()` structure with better error handling.


>Q. What’s the difference between synchronous and asynchronous callbacks?<br>
Sync callbacks run immediately; async callbacks run after a delay or event.

13. Best Practices

- Keep callback functions **pure,** avoid external state changes.
- Handle errors properly (use `err` argument or `.catch()`).
- Don’t over-nest, refactor into Promises or async/await.
- Avoid “anonymous callback soup”, name your functions for clarity.
- Use **higher-order abstractions** (e.g., `map`, `filter`) instead of manual loops.

<p style="text-align: 'center'">***</p>
