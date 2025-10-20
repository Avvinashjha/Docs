## Currying

Currying is the process of transforming a function that takes multiple arguments into a sequence of function that each take single augment.

Mathematically

```js
f(a, b, c) -> g(a)(b)(c)
```
So instead of calling 

```js
sum(1,2,3);
```
You call

```js
sum(1)(2)(3)
```
Each function call remembers the previous arguments via closure.

### 1. Basic Example
```js
function add(a,b){
  return a + b;
}
console.log(add(2,3));//5
```
Curried Version

```js
function curriedAdd(a){
  return function(b){
    return a + b;
  }
}
console.log(curriedAdd(2)(3));//5
```
Here:

- `curriedAdd(2)` returns a function that remembers `a = 2`
- That returned function then takes `b` and returns the sum
  This is a **closure in action**.

### 2. Why Currying?
Currying is useful for:

- Function Re usability
- Partial Application (fixing some arguments ahead of time)
- Code Composition (building complex function from simple ones)
- Declarative logic (used in functional libraries like lodash, Ramda)
### 3. Partial Application Example
Partial Application means pre filling some arguments of a function.

```js
function multiply(a){
  return function(b){
    return a * b;
  }
}
const double = multiply(2); // Partially applied
console.log(double(5)); // 10
const triple = multiply(3);
console.log(triple(5)); // 15
```
  `double` and `triple` are _specialized functions_ created by currying.

### 4. Generic Currying Function
Let’s write a **universal curry utility** that can transform _any_ multi-argument function into a curried one.

```js
function curry(fn){
  return function curried(...args){
    if(args.length >= fn.length){
      return fn(...args);
    } else {
      return (...next) => curried(...args, ...next);
    }
  };
}
function sum(a, b, c) {
  return a + b + c;
}
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```
  Supports flexible calls with one or multiple arguments each time.

### 5. Real World Example: Configuration
  Currying helps in creating **configurable functions** cleanly.

```js
function log(level) {
  return function(message) {
    console.log(`[${level}] ${message}`);
  };
}
const info = log("INFO");
const error = log("ERROR");
info("Server started");   // [INFO] Server started
error("Server crashed");  // [ERROR] Server crashed
```
  Instead of passing `level` every time, you **preset** it.

### 6. Currying + Closures + Composition
  Currying is a **bridge** between closures and function composition.

  Example — filtering arrays dynamically:

```js
const filterBy = key => value => arr => arr.filter(obj => obj[key] === value);
const filterByRole = filterBy("role");
const filterAdmins = filterByRole("admin");
const users = [
  { name: "Avinash", role: "admin" },
  { name:"Sam", role: "user" }
];
console.log(filterAdmins(users)); // [ { name: 'Avinash', role: 'admin' } ]
```
  Each level specializes the function further, keeping your logic **declarative and reusable**.

### 7. Arrow Function Currying (Compact Syntax)
  Currying shines with arrow functions:

```js
const add = a => b => c => a + b + c;
console.log(add(1)(2)(3)); // 6
```
  Each arrow returns another arrow — each capturing its variable.

### 8. Currying vs Partial Application
|   **Concept** |   **Description** |   **Example** |
| --- | --- | --- |
|   Currying |   Converts function of n arguments into n unary functions. |   `f(a,b,c)` → `f(a)(b)(c)` |
|   Partial Application |   Fixes some arguments and returns a new function. |   `f(a,b,c)` → `g(b,c)` where a fixed |

  They are related, currying is a **systematic** form of partial application

### 9. Practical Example — Event Handlers / Middleware
Currying is used in **React**, **Redux**, and **middleware systems**:

```js
const handleEvent = type => element => callback => {
  element.addEventListener(type, callback);
};
const onClick = handleEvent("click");
const onButtonClick = onClick(document.querySelector("#btn"));
onButtonClick(() => alert("Button clicked!"));
```
  You can progressively build specialized functions from general ones —

  a key technique in large-scale JS systems.

### 10. Summary
|   **Concept** |   **Description** |
| --- | --- |
|   Currying |   Transforming multi arg function into chain of single arg functions |
|   Benefit |   Partial application, cleaner composition, higher reusability |
|   Core Mechanism |   Closures + Lexical scope |
|   Used In |   React, Redux, Lodash, Ramda, middleware pattern |

>Q. What is currying?<br>
Currying transforms a function taking multiple arguments into a chain of single-argument functions, each returning the next function.


>Q. How is currying implemented in JavaScript?<br>
By returning functions from functions and using **closures** to remember arguments.


>Q. Difference between currying and partial application?<br>
Currying transforms function _structure_,Partial application fixes some arguments _of any function_.


>Q. Where do you use currying in real code?<br>
When building specialized functions (e.g. pre configured loggers, validators, middleware, or selectors).

### 11. Best Practices
- Curry **small utility functions** for composability.
- Avoid over-currying in imperative code — keep it readable.
- Combine with **function composition** for cleaner pipelines.
- Understand how **React hooks** and **Redux middleware** use currying under the hood.
