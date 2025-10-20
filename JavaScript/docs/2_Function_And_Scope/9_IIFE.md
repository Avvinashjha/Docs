## I. IIFE — Immediately Invoked Function Expression

An Immediately Invoked Function Expression (IIFE) is a function that is defined and executed immediately after it’s created.

Syntax

```js
(function(){
  //code runs immediately
})();
```
You can think of it as, Define a function → run it right away.

### 1. The Basic IIFE Example

```js
(function(){
  console.log("IIFE runs immediately!");
})();
```
Output:

```js
IIFE runs immediately!
```
This function executes as soon as it’s defined, without needing to be called separately.

### 2. Why the Parentheses?

In JavaScript, a function keyword alone starts a declaration, not an expression.

So if you write

```js
function (){console.log("hi);}() // syntax error
```
JS expects a function name (declaration), not immediate invocation.

Wrapping in parentheses makes it an expression:

```js
(function(){
  console.log("Hi");
})();
```
### 3. Alternative Syntaxes

All of these are valid IIFEs:

```js
(function(){ console.log("A");})(); // Common
(()=>console.log("B"))(); // Arrow function IIFE
(function test(){console.log("C")})(); //Named IIFE
!function(){console.log("D")}();//Rare, but valid
+function(){ console.log("E");}();// Rare, also valid
```
Parentheses or unary Operator (!, +, ~) are just ways to force JavaScript to treat it as an expression.

### 4. Why Use IIFEs?

Before ES6 modules existed, IIFEs were a powerful way to create private scope.

Problem:

Global Variables pollute the namespace.

```js
var count = 0;
```
Solution:

Wrap in an IIFE to isolate:

```js
(function(){
  let count = 0;
  console.log("Inside IIFE:", count);
})();
console.log(typeof count); // undefined
```
So code inside the IIFE can use variable privately without affecting global.

### 5. IIFE + Closures (Private State)

You can create persistent private state using IIFEs + closures.

```js
const counter = (function() {
  let count = 0; // private
  return {
    inc() { count++; },
    get() { return count; }
  };
})();
counter.inc();
counter.inc();
console.log(counter.get()); // 2
console.log(counter.count); // undefined (private)
```
This is the foundation of the **Module Pattern** used in pre-ES6 JavaScript and many libraries (like jQuery).

### 6. IIFE with Parameters

You can pass arguments into an IIFE:

```js
(function(name) {
  console.log(`Hello, ${name}!`);
})("Avinash");// Hello, Avinash!
```
### 7. IIFE in Modern JavaScript (Still Useful!)

Even though ES6 introduced **modules**, IIFEs still have valid use cases:

- Run setup code without leaking variables
- Avoid polluting the global scope in browser scripts
- Create **isolated scopes** inside loops or event handlers
- Wrap configuration or initialization logic
Example

```js
(() => {
  const apiKey = "SECRET-KEY";
  const baseUrl = "https://api.example.com";
  console.log("App initialized!");
})();
```
### 8. IIFE with Async/Await

You can use async IIFEs for **top-level async code**, especially in environments that don’t support top-level `await`.

```js
(async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const json = await data.json();
  console.log(json);
})();
```
This is a common pattern in Node.js and frontend bootstrapping code.

### 9. Named IIFE (for Debugging)

Naming the IIFE helps with stack traces and debugging:

```js
(function initApp() {
  console.log("App starting...");
})();
```
While anonymous IIFEs are shorter, **named IIFEs** make logs and stack traces clearer in production systems.

### 10. Combining IIFEs with Module Patterns

Example: A small self-contained feature module.

```js
const UserModule = (function() {
  let users = [];
  function add(user) { users.push(user); }
  function list() { return [...users]; }
  return { add, list };
})();
UserModule.add("Alice");
console.log(UserModule.list()); // [ 'Alice' ]
```
This pattern isolates internal state and exposes only what’s needed, exactly how modern ES6 modules or React hooks work under the hood.

### 11. Summary

| **Concept** | **Description** |
| --- | --- |
| IIFE | Function the runs immediately after creating |
| Sytax | `(function(){...})();` |
| Purpose | Create private scope, avoid global pollution |
| Used For | Initialization, configuration, modularization |
| Still Usefull? | Yes, for isolated scopes and async bootstrapping |

>Q. What’s an IIFE?<br>
An Immediately Invoked Function Expression — a function expression that executes immediately after being defined.

>Q. Why do we wrap IIFEs in parentheses?<br>
To make the function a _function expression_ instead of a _declaration,_ JavaScript only allows immediate invocation of expressions.

>Q. What problem did IIFEs solve before ES6?<br>
They provided **private scope** and **modularization** before `let`, `const`, and ES modules existed.

>Q. Are IIFEs still relevant today?<br>
Yes, especially for **isolating code**, **async initialization**, or **executing setup code immediately** without side effects on global scope.

### 12. Best Practices

- Prefer `(() => { ... })();` for short, modern IIFEs.
- Use named IIFEs for debugging complex startup logic.
- Use async IIFEs for top-level async code.
- Still valuable in script-based codebases, plugins, or environments without ES modules.
