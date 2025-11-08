## D. Return values

Every JavaScript function returns something, even if you don’t explicitly write a return statement.

### 1. Default Return Value

If a function doesn’t explicitly return anything, it implicitly returns `undefined`.

```js
function sayHello(){
  console.log("Hello!");
}
const result = sayHello();
console.log(result); // undefined
```

- Every function in JS returns exactly one value, either what you return, or `undefined`.

### 2. Explicit Return

You can explicitly return a value using the `return` keyword.

```js
function add(a, b){
  return a + b;
}
console.log(add(2,5)); // 7
```

- Once return is executed, the function immediately stops running.

```js
function test() {
  console.log("Before return");
  return 42;
  console.log("After return"); // never executes
}
```

### 3. Returning Multiple Values (via Objects or Arrays)

JavaScript function can only return one value, but that value can be object or array containing multiple pieces of data.

```js
function getUser() {
  return { name: Avinash, age: 25 };
}
const user = getUser();
console.log(user.name); // Avinash
```

- Using Array Destructuring

```js
function getCoordinates() {
  return [12, 34];
}
const [x, y] = getCoordinates();
console.log(x, y); // 12 34
```

### 4. Implicit Return (Arrow Function only)

Arrow function can omit the return keyword for single expressions.

```js
const add = (a,b) => a * b;
console.log(add(2,3));
```

If your function body uses curly braces `{}`, you must use return

```js
const add = (a,b) => { a + b} // undefined
const addFixed = (a,b) => {return a + b}; // 5
```

### 5. Returning Objects from Arrow Function

If you use `{}` directly after `=>`, JavaScript treats it as a block, not an object literals.

```js
const makeUser = (name) => {name: name};// undefined
const fixedMakeUser = (name) => ({name: name})
 // Modern short hand
const shortMakeUser = (name) => ({name});
```

### 6. Returning Functions (Closures)

Function can return other functions, a core concept for closure, currying, and higher order functions.

```js
function multiplier(factor){
  return function (x){
    return factor * x;
  }
}
const double = multiplier(2);
console.log(double(5)); // 10
```

- We will go deeper into these later.

### 7. Returning Early (Guard Clauses)

A senior level style habit, use early return to make functions cleaner and flatter (avoid deep nesting).

```js
function process(user){
  if(user){
    if(user.isActive){
      console.log("Process user");
    }
  }
}
```

- Instead of nesting

```js
function process(user){
  if(!user) return;
  if(!user.isActive) return;
  console.log("Process user");
}
```

- This makes code easier to read and reduces cognitive load , one of the hallmarks of expert-level JavaScript.

### 8. Returning Promise (Async Functions)

In modern async code, you often return a Promise, explicitly or implicitly.

```js
function fetchData(){
  return fetch("https://api.example.com/users");
}
//Or with async/await
async function getUser(){
  const res = await fetch("/user");
  return await res.json(); // Return value wrapped in a Promise
}
```

- Any value return from async function is automatically wrapped in a Promise.

```js
async function foo(){
  return 42;
}
foo().then(console.log); // 42
```

### 9. Returning `this` for method chaining

Many APIs (like j Query, Lodash, etc..) return this to enable method chaining.

```js
class Counter{
  constructor(){
    this.count = 0;
  }
  inc() { this.count++; return this;}
  dec() { this.count--; return this;}
}
const c = new Counter();
c.inc().inc().dec(); //1
```

- By returning this we can follow a design pattern known as `Builder pattern`.

```js
builder.setName("Avinash").setAge(21).save();
```

### 10. Returning Nothing (Side-Effect Functions)

Some Functions exits just to cause side effects, not produce a value.

Example

- Logging Function
- Event Handler
- DOM Manipulation

```js
function logMessage(msg) {
  console.log(`[LOG]: ${msg}`);
  // implicitly returns undefined
}
```

- In these cases, the “return value” is intentionally ignored — design clarity > return semantics.

>Q. What’s the difference between an implicit and explicit return in arrow functions?
>
>- **Implicit return:** no `{}` braces, the value of the expression is automatically returned. e.g., `x => x * 2`
>- **Explicit return:** uses `{}` braces and requires `return`. e.g., `x => { return x * 2 }`
