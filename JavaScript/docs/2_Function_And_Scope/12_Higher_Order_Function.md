## L. Higher-Order Functions (HOFs)

A Higher-Order Function (HOF) is a function that takes another function as an argument, returns a function, or does both.

This is what allows JS to:

- Works with callbacks
- Compose behavior
- Abstract logic elegantly

### 1. Passing A a Function as an Argument

```js
function greet(name) {
  return `Hello, ${name}!`;
}
function processUserInput(callback) {
  const name = "Avinash";
  console.log(callback(name));
}
processUserInput(greet); // "Hello, Avinash!"
```

Here, `processUserInput` is a **higher-order function,**because it **receives another function** (`greet`) as input.

### 2. Returning a Function

```js
function multiplier(factor) {
  return function(num) {
    return num * factor;
  };
}
const double = multiplier(2);
console.log(double(5)); // 10
```

`multiplier` **returns** a function → a classic HOF use.

### 3. Why Are HOFs So Important?

They allow you to:

- **Abstract patterns** (e.g., loops, event handling)
- **Reuse logic** elegantly
- **Compose behaviors**
- Write **declarative, functional code**
  
Every time you use:

```js
map(), filter(), reduce(), forEach(), sort()
```

… you’re using **higher-order functions**

### 4. HOFs Enable Composition

Composition = combining simple functions to make complex behavior.

```js
const double = x => x * 2;
const square = x => x * x;
function compose(f, g) {
  return x => f(g(x));
}
const doubleThenSquare = compose(square, double);
console.log(doubleThenSquare(3)); // (3 * 2)^2 = 36
```

`compose()` is itself a **higher-order function,**it returns a new function built from others.

### 5. HOFs with Callbacks (Asynchronous Example)

```js
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "Alice" };
    callback(data);
  }, 1000);
}
fetchData(user => console.log(user.name)); // "Alice"
```

`fetchData` is higher-order — it receives a callback function.

>Closures + HOFs + async behavior = the foundation of **Promises** and **async/await**.

### 6. HOF That Returns Another HOF (Advanced)

```js
function withLogging(fn) {
  return function(...args) {
    console.log("Calling with", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3);
```

Output:

```js
Calling with [2, 3]
Result: 5
```

We built a **function wrapper,**pattern used in:

- **Decorators**
- **Middleware**
- **React HOCs**

### 7. Real-World Example — Authentication Middleware

```js
function withAuth(fn) {
  return function(user) {
    if (!user || !user.isAdmin) {
      throw new Error("Unauthorized");
    }
    return fn(user);
  };
}
function getDashboard(user) {
  return `${user.name}'s dashboard`;
}
const secureDashboard = withAuth(getDashboard);
const admin = { name: "Avinash", isAdmin: true };
console.log(secureDashboard(admin)); // ✅ "Avinash's dashboard"
```

You can wrap business logic functions with **cross-cutting concerns,**
auth, logging, caching, etc. _without modifying the core logic_.

### 8. Combining HOFs + Closures + Purity

HOFs often rely on **closures** (for remembering arguments) and **pure functions** (for safe reuse and composition).

Example:

```js
function makeValidator(predicate) {
  return input => predicate(input);
}
const isEven = makeValidator(n => n % 2 === 0);
console.log(isEven(4)); // true
```

`makeValidator` → returns a function built from another → **HOF + closure**.

### 9. Higher-Order Function vs First-Class Function

|   **Concept** |   **Description** |
| --- | --- |
|   First-Class Function |   Function can be treated like data, passed as args,  returned, assigned to variable |
|   Higher-Order Function |   A function that uses other functions (accepts or returns them) |

### 10. Summary

|   **Concept** |   **Description** |
| --- | --- |
|   HOF |   Function that takes or returns another function |
|   Why Use |   Abstraction, composition, reusability |
|   Core Examples |   map, filter, reduce, forEach, SetTimeout |
|   Used In |   React HOCs, Express middle ware, redux, functional utities |
|   Key Mechanism |   Functions as value + closure |

>Q. What is higher-order function?<br>
A function that takes another function as an argument, returns a function, or both.

>Q. Give real examples of HOFs in JavaScript.<br>
`map`, `filter`, `reduce`, `setTimeout`, `addEventListener`.

>Q. How are higher-order functions different from first-class functions?<br>
>
>- HOFs _use_ functions as arguments or return them;
>- first-class functions mean JS _allows_ that behavior in the first place.

>Q. Why are higher-order functions important?<br>
They enable abstraction, cleaner code, composability, and declarative programming — key for scalable systems and frameworks like React or Redux.

### 11. Best Practices

- Combine HOFs with **pure functions** for predictable pipelines.
- Wrap **cross-cutting concerns** (auth, caching, logging) using HOFs.
- Write reusable HOFs to reduce boilerplate (e.g., `withErrorHandling`).
- Understand async HOFs (e.g., `setTimeout`, `Promise.then`, `useEffect`).
