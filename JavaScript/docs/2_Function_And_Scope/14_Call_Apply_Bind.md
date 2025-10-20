## N. `call()`, `apply()`, and `bind()`

### 1. The Problem: Losing `this`
In JavaScript, this refers to the object that owns the function at call time, but that can change depending on how function is called.

```js
const person = {
  name: "Avinash",
  greet(){
    console.log("Hello " + this.name);
  }
}
person.greet(); // Hello Avinash
const greetFn = preson.greet;
greetFn(); // Hello undefined
```
The Problem

When we assign `person.greet` to another variable, we **lose the original context** (`this` → now `undefined` in strict mode).

### 2. The Solution: call(), apply(), bind()
All functions in JS have three methods available by default:

- `call()`
- `apply()`
- `bind()`

These let you **manually set** what `this` should refer to when a function executes.

### 3. `call()`
Call function immediately, Set `this`

```js
function greet(city) {
  console.log(`Hi, I’m ${this.name} from ${city}`);
}
const person = { name: "Avi" };
greet.call(person, "Bengalore"); 
// ✅ Hi, I’m Avi from Bengalore
```
Syntax

```js
func.call(thisArg, arg1, arg2, arg3,....)
```
- `thisArg` → what you want `this` to refer to
- Remaining args → passed individually
- Executes **immediately**
### 4. Function Borrowing
Using a single function for multiple objects is known as Function Borrowing.

```js
const user1 = { name: "Avi" };
const user2 = { name: "Sam" };

function sayHello() {
  console.log(`Hello, ${this.name}`);
}

sayHello.call(user1); // Hello, Avi
sayHello.call(user2); // Hello, Sam
```
### 5. apply()
Like `call()`, but Takes Arguments as an Array

```js
function greet(city, country) {
  console.log(`Hi, I’m ${this.name} from ${city}, ${country}`);
}
const person = { name: "Avi" };

greet.apply(person, ["BLR", "IN"]);
// Hi, I’m Avi from BLR, IN
```
Syntax

```js
func.apply(thisArg, [argsArray]);
```
- Almost identical to `call()`
- Difference: arguments passed as an **array**
  
Example: Math.max with apply

```js
const numbers = [4, 2, 9, 7];
console.log(Math.max.apply(null, nubers));//9
```
You can pass arrays where a list of arguments is expected.

_(In modern JS, use the spread operator instead: `Math.max(...numbers)`)_

### 6. bind()
Returns a New Function with `this` Fixed

Unlike `call()` or `apply()`,

`bind()` **does not execute immediately**.

It **returns a new function** with the chosen `this` permanently bound.

```js
function greet() {
  console.log(`Hello, ${this.name}`);
}
const person = { name: "Dana" };

const greetPerson = greet.bind(person);
greetPerson(); // Hello, Dana
```
Syntax

```js
const boundFunc = func.bind(thisArg, arg1, arg2, ...)
```
- Returns a **new function**
- Can be reused anytime
- Often used in event handlers, callbacks, and class methods
### 7. Difference
|   **Method** |   **Executes Immediately?** |   **Pass Args** |   **Return New Functions?** |   **Use Case** |
| --- | --- | --- | --- | --- |
|   call() |   Yes |   Individually |   No |   Quick, Immediate call |
|   apply() |   Yes |   as Array |   No |   When yo need to pass array of arguments |
|   bind() |   No |   Individually |   Yes |   Reusable function with fixed context (this) |

### 8. Real World Examples
  Example 1: Event Handler Context Fix

  In DOM event listener, `this` refers to the DOM element, not your object.

```js
const person = {
  name: "Eva",
  greet() {
    console.log(`Hi, I’m ${this.name}`);
  }
};

document.getElementById("btn").addEventListener("click", person.greet); 
// 'this' → button element

document.getElementById("btn").addEventListener("click", person.greet.bind(person)); 
// 'this' → person
```
Example 2: Partial Application (bind + preset args)

- `bind()` can “preset” arguments (like currying).
```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```
Example 3: Method Borrowing with call/apply

- Reuse the same function for different contexts.
```js
const person = { name: "John" };
const animal = { name: "Rex" };
function introduce(age) {
  console.log(`I'm ${this.name}, and I'm ${age} years old.`);
}
introduce.call(person, 30);//I'm John, and I'm 30 years old.
introduce.call(animal, 5);  // I'm Rex, and I'm 5 years old.
```
Example 4: Array-like Objects → Real Arrays

- Before the spread operator (`...`), this was a common use of `call()`.
```js
function list() {
  const args = Array.prototype.slice.call(arguments);
  console.log(args);
}
list(1, 2, 3, 4); // [1, 2, 3, 4]
```
### 9. Combining with Arrow Functions
Arrow functions **do not have their own `this`**. They inherit `this` from their lexical scope.

```js
const obj = { value: 10 };

const arrowFn = () => console.log(this.value);
arrowFn.call(obj); // undefined
```
Only **regular functions** have their own `this`.

### 10. Summary
|   **Method** |   **Description** |   **Key Point** |
| --- | --- | --- |
|   call() |   Invokes function immediately, with specified this |   Args passed individually |
|   apply() |   Invokes function immediately, with specified this |   Args passed as array |
|   bind() |   returns a new function with bound this |   args passed individually and does not executes immediately |


>Q. What’s the difference between call, apply, and bind?
>- `call()` → calls immediately, arguments individually
>- `apply()` → calls immediately, arguments as array
>- `bind()` → returns new function for later use


>Q. When would you use bind?<br>
When you want a **function to always use a specific `this`**, e.g., event handlers, callbacks, or methods detached from objects.


>Q. Why doesn’t bind work with arrow functions?<br>
Because arrow functions **capture `this` from their enclosing scope**, not the call site, you can’t rebind it.


>Q. What’s function borrowing?<br>
Using `call()` or `apply()` to execute a method from one object in the context of another.


>Q. Why does React often use .bind(this)?<br>
To ensure class methods retain the correct `this` (component instance) when passed as props or event handlers.

### 11. Best Practices

- Use `bind()` for stable context in async callbacks and event listeners.
- Prefer arrow functions when you want lexical `this` (e.g., inside class constructors).
- Avoid overusing `.call()`/`.apply()` for readability — use spread/rest instead.
- Understand how `this` behaves in strict mode vs non-strict.
- Know that `bind()` creates a **new function object** each time — memoize if used often

