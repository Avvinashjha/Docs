## K. Pure Function

A **pure function** is a function that, **given the same inputs, always returns the same output**, and **does not cause any side effects**.

In other words:

- No **external dependencies** (everything it needs is passed in)
- No **state modification** (doesn’t change global variables, DOM, or inputs)
- No **randomness**, **time**, or **I/O** influence

### 1. Example of an Impure function
```js
let count = 0;
function increment(){
  count++;
  return count;
}
console.log(incement()); // depends on external variable
```
- Depends on count (external state)
- Changes that variable (side effect)
- so it’s impure
### 2. Example of Pure Function
```js
function add(a, b){
  return a+b;
}
console.log(add(3,2)); //5
console.log(add(3,2)); // 5 same input - same output
```
- It depends only on it arguments.
- It does not modify anything outside itself.
- So it’s pure
### 3. Two Code Rules of Purity
1. Deterministic Output
    
    Same input → same output

```js
square(2) === square(2) // true -> Pure
Math.random() === Math.random() //false -> Impure
```
2. No Side Effects

    Does not modify external data, global state, DOM or Perform I/O

```js
//impure - modifies globa variable
let data = []
function addItem(item){
  data.push(item);
}
//pure - return new array instead
function addItemPure(arr, item){
  return [...arr, item];
}
```
### 4. What are Side Effects
  Side effects are any observable interaction with the outside world other than returning a value.

Examples:

- Modifying global variables
- Mutating function arguments
- Writing to files, console, or DOM
- Making API/network calls
- Using `Math.random()` or `Date.now()`
  Pure:

```js
function multiply(a,b){
  return a*b;
}
```
Impure:

```js
function multiplyAndLog(a, b) {
  console.log(a * b); // side effect (I/O)
  return a * b;
}
```
### 5. Benefits of Pure Function
|   **Benefit** |   **Description** |
| --- | --- |
|   Predictable |   Same input → same output |
|   Testable |   Easy to test; no mocks or setup needed |
|   Composable |   Combine easily with other pure function |
|   Parallelizable |   Safe for concurrent execution (no shred state) |
|   Debuggable |   No Hidden mutation, easier trace |

  Pure functions are the backbone of **functional programming** and **React’s philosophy** (pure UI = function of state).

### 6. Referential Transparency
A key property of pure functions. A function is _referentially transparent_ if it can be replaced with its output value **without changing the behavior of the program**.

Example:

```js
const result = add(2,3); //5
//You can safely replace add(2,3) with 5 everywhere.
```
Impure function breaks this property:

```js
const result = getTime(); // depends on now
// can not replace with a fixed value
```
### 7. Avoiding Mutation (Immutability)
Pure functions **never mutate input data** — instead, they return a _new_ copy.

Example:

```js
// ❌ impure
function pushItem(arr, item) {
  arr.push(item);
  return arr;
}
// ✅ pure
function addItem(arr, item) {
  return [...arr, item];
}
const nums = [1, 2];
const newNums = addItem(nums, 3);
console.log(nums); // [1, 2]
console.log(newNums); // [1, 2, 3]
```
### 8. Pure Functions in React
React components are **pure** by design, A component should render the same output for the same props.

Example:

```js
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```
Given the same `name`, it always renders the same result — no side effects.

### 9. When Impurity Is Necessary
Not all impurity is bad, sometimes side effects are **necessary** (e.g., logging, network requests, DOM updates).

The Key idea is to** Isolate side effects,** keep impure logic at the boundaries, pure logic in the core.

Example pattern:

```js
function calculateTotal(price, taxRate) {
  return price + price * taxRate; // pure
}
function showTotal(price, taxRate) {
  const total = calculateTotal(price, taxRate);
  console.log(`Total: ${total}`); // impure (I/O)
}
```
Here, computation (pure) and effect (impure) are **cleanly separated**.

### 10. Composing Pure Functions
Pure functions combine beautifully — this is **function composition**.

```js
const double = x => x * 2;
const square = x => x * x;
const doubleThenSquare = x => square(double(x));
console.log(doubleThenSquare(3)); // 36
```
- Predictable
- No side effects
- Easy to reason about and test
### 11. Summary
|   **Concept** |   **Description** |
| --- | --- |
|   Pure Function |   Always same output for same input, no side effects |
|   Deterministic |   Behavior Predictable |
|   No Side Effects |   Does not changes anything outside its scope |
|   Immutability |   Does not mutate input |
|   Testability |   Easy to test and compose |

>Q. What is a pure function?<br>
A function that always produces the same output for the same input and doesn’t cause any side effects.

>Q. Why are pure functions important?<br>
They make programs predictable, testable, and composable — key for scalable and maintainable systems.

>Q. Are React components pure?<br>
Yes — functional components are designed to be pure (same props → same output).

>Q. Can a pure function modify a global variable?<br>
No. That’s a side effect.

>Q. Is returning a new object/array from a function pure?<br>
Yes — as long as it doesn’t mutate external state.

### 12. Best Practice

- Keep your **business logic pure**, handle side effects at boundaries.
- Avoid mutating shared state; use immutable updates (`...spread`, `map`, `filter`).
- Compose pure functions for cleaner pipelines.
- Use currying + pure functions together for powerful, declarative code.
