# Function

## A. Function Declaration vs Expression

### 1. What is Function Declaration?

Function declaration defines a named function using function keyword, and it;s hoisted (i.e. available before it’s defined in the code)

```js
// Function Declaration
// It's available before definition
console.log(greet("Avinash");
function greet(name){
  return `Hello ${name}`);
}
```

### 2. What is Function Expression?

A function expression defines a function and assign it to a variable or constant, it’s not hoisted in the same way, the variable is hoisted, but not initialized until runtime.

```js
//Function Expression
 //This will not work because variable is hoisted but not initialized yet (TDZ)
console.log(greet("Avinash"); // Error ReferenceError: Cannot access 'greet' before initialization
const greet = function(name){
  return `Hello ${name}`;
}
```

### 3. Difference between Function Declaration vs Expression

| Feature                       | Function Declaration | Function Expression                      |
| ----------------------------- | -------------------- | ---------------------------------------- |
| Syntax                        | function foo(){}     | const foo = function(){}                 |
| Hoisted                       | Fully Hoisted        | Not Hoisted, only variable name          |
| Can be called before defined? | Yes                  | No                                       |
| Name Required                 | Yes                  | Optional (can be anonymous)              |
| When Defined                  | At Parse time        | At Run time                              |
| Use Case                      | Reusable            | Dynamic, Inline, or conditional Function |

### 4. Why Function Expression?

Function expression are powerful because

- They can be anonymous (no name needed)
- They can be passed as arguments or returned from other function (for - callback or higher-order function)
- They can be conditionally defined.

```js
let greet;
if(Math.random()>0.5){
  greet = function(){ return "Hi there"}
}else {
  greet = function(){ return "Hello!" }
}
```

### 5. Best Practice

Modern JS favors function expressions with const or arrow function for predictability and scoping.

Use Function declaration

- for Utils functions
- named function that need to be hoisted
- Recursion

---

## B. Arrow Functions

Introduce in **ES6 (ECMAScript 2015)**, arrow function provide a **shorter syntax** for writing function expression and a lexical bound `this`, unlike traditional functions.

### 1. Syntax

Basic Syntax

```js
 // Traditional Function expression
const add = function(a,b){
  return a + b;
}
 // Arrow function
const add = (a,b) => {
  return a + b;
}
```

You can be more concise

- **One expression** → implicit return
- **One Parameter** → omit parentheses

```js
const square = x => x * x;
const gree = () => "Hello!";
```

### 2. Lexical this binding

Unlike normal function, arrow function **do not have their own** `this`. Instead, they capture `this` **from the surrounding scope** at the time they are defined.

Example

```js
const person = {
  name = "Avinash",
  regularFunc: function(){
    console.log("Regular function", this.name);
  },
  arrowFunction: () => {
    console.log("Arrow Function", this.name);
  }
}
person.regularFunction(); // Avinash
person.arrowFunction(); // undefined (or window.name if not in strict mode)
```

- `regularFunc` has its own this and it points to the person object.
- `arrowFunc` take this from lexical scope ( in this case the outer/global scope)

### 3. Fixing this in callbacks

Without arrow function

```js
function Timer(){
  this.seconds = 0;
  setInterval(function(){
    this.seconds++;
    console.log(this.seconds);
  }, 1000)
}
new Timer();// NaN, because this is not the Timer instance it's functions
```

With Arrow function

```js
function Timer(){
  this.seconds = 0;
  setInterval(()=>{
    this.seconds++;
    console.log(this.seconds);
  },1000);
}
new Timer(); // Works: this comes from the timer
```

- arrow functions **inherit `this`** from their defining scope — no need for `.bind(this)` or `const self = this`.

### 4. Difference between Arrow function and Regular Function

| **Feature**                              | **Regular Function**               | **Arrow Function**                 |
| ---------------------------------------- | ---------------------------------- | ---------------------------------- |
| Syntax                                   | function(){}                   | ()=>{}                          |
| Own `this`                               | Yes                                | No (lexically bound)             |
| Own `arguments`                          | Yes                                | No                                 |
| Can be used as Constructor               | Yes                                | No                                 |
| Can be used as method in object literals | Yes                                | Avoid (it won’t point to object) |
| Best for                                 | Methods and Contructor             | Callbacks, closure                 |
| Hoisted?                                 | No (unless declaration function) | No                                 |

### 5. No arguments Object

Arrow function do no have their own arguments object.

```js
const showArgs = () => {
  console.log(arguments);
}
showArgs(1,2,3);//Reference Error: arguments are not defined
```

Workaround: use rest parameters instead

```js
const showArgs = (...args) => {
  console.log(args);
}
showArgs(1,2,3); // [1,2,3]
```

### 6. Implicit Return

When the body has **single expression**, you can omit `return` and `{}`.

```js
const double = x => x * 2;
const getUser = () => ({name: "Avinash"});// must wrap object in ()
```

Without parentheses, JS thinks {} stats a block, not a object literal.

### 7. Arrow Function and Methods

Never use arrow function for object method that rely on this.

```js
const person = {
  name: "Avinash",
  sayHi: () => console.log("HI " + this.name)
}
preson.sayHi(); // HI undefined
```

Use a normal function instead

```js
const preson = {
  name: "Avinash",
  sayHi(){
    console.log("Hi " + this.name);
  },
  sayHi2: function(){
    console.log("HI " + this.name);
  }
}
person.sayHi(); // Hi Avinash
preson.sayHi2(); // HI Avinash
```

### 8. Arrow Function and Constructors

Arrow functions cannot be used with `new` because they don’t have `[[Construct]]` or their own `this`.

```js
const User = (name) => {
  this.name = name;
}
const u = new User("Avinas"); // TypeError: User is not a contructor
```

Use a normal function or class for constructor

```js
function User(name){
  this.name = name;
}
```

### 9. Arrow Function in Array Methods (Functional Style)

Arrow function shine in array operations

```js
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
const evens = nums.filter(n => n % 2 === 0);
const sum = nums.reduce((acc, n) => acc + n, 0);

console.log(doubled, evens, sum);
```

They make functional programming patterns like **map/filter/reduce** cleaner and more expressive.

### 10. Common Pitfalls

- Misusing this in object method

```js
const obj = {
  count: 0,
  inc: () => this.count++; // this is not of object
}
```

- Implicit return with objects

```js
const getUser = () => {name: "Avinas"}; // undefined
const getUserFixed = ()=> ({name: "Avinash"});
```

- Needing `arguments`

```
const fn = () => console.log(arguments); // Ref Error
```

### 11. Performance Difference

Arrow functions are not inherently faster or slower — JS engines optimize both similarly. However, their **lexical `this`** can avoid unnecessary `.bind(this)` calls, improving clarity and reducing function creation overhead in callbacks.

> Q. What’s the main difference between a regular function and an arrow function in terms of `this`?
>
>- Regular functions define their own `this` depending on how they’re called.
>- Arrow functions capture `this` lexically from the surrounding scope where they are defined

---

## 3. Function Parameters & Default Values

### 1. Basic Function Parameters

A parameter is a variable in a function definition, and an argument is the actual value passed when the function is called.

```js
function greet(name){
  console.log("Hello " + name);
}
greet("Avinash"); // Hello Avinash
greet(); // Hello undefined
```

- By Default, parameters not passed are undefined

### 2. Default Parameter value (ES6 Feature)

Default parameter allow you to assign a fallback value directly in the function signature.

```js
function greet(name="user") {
  console.log("Hello "+ name);
}
greet("Avinash);//Hello Avinash
greet(); // Hello user
```

- when no argument is passed or if the the argument is explicitly undefined, the default value will be used.

```js
greet(undefined);// Hello User
greet(null);// Hello null (default is not applied)
```

- Default values are applied only when the argument is **undefined**, not **null**

### 3. Expression as default value

Default values aren’t limited to literals, they can be expressions(even function calls.

```js
function randomId(){
  return Math.floor(Math.random()*1000);
}
function createdUser(name="Anonymous", id= randomId()){
  console.log(name, id);
}
createUser("Sam", 1); //{name: "Sam", id:1}
createUser("Avinash"); //{name: "Avinash", id: 456}
createUser(); // {name: "Anonymous", id: 876}
```

- The function expressions are evaluated at call time, not function definition time.

### 4. Dependent Default Parameter

Default parameter can reference earlier parameter, but not later ones.

```js
function introduce(firstName, lastName="Jha", fullName=`${firstName} ${lastName}`){
  console.log(fullName);
}
introduce("Avinash")// Avinash Jha
introduce("Hritik","Raj")// Hritik Raj
```

- Using later parameters inside a default value will cause a `ReferenceError`

```js
function invalid(a = b, b = 5){} // Refrence Error can not access 'b' before initialization
```

### 5. Parameter Scope and TDZ(Temporary Dead Zone)

Each parameter has its own scope, you can not reference a parameter before it’s defined (inside the same parameter list)

```js
function example(a = b, b = 5){
  console.log(a,b);
}
example()// ReferenceError
```

- Here, `b` is not initialized when `a's` default is being computed, this is a TDZ issue.
- Correct version

```js
function example(b = 5, a = b){
  console.log(a, b);
}
example();// 5, 5
```

### 6. Using Default value with Destructuring

Default parameters pair beautifully with destructuring, especially for configuration objects.

```js
function createUser({name="Guest", age=18, active=true}) = {}) {
  console.log(name, age, active);
}
createUser({name: "Avinash", age: 21});// Avinash 21 true
createUser();// guest, 18, true
```

**Why `={}` after destructuring?**

If you call `createUser()` with no argument, destructuring undefined would throw an error. The outer default (`= {}`) prevents that

### 7. Rest Parameters (`...args`)

Rest parameters gather all remaining arguments into an array.

```js
function sum(...numbers){
  return numbers.reduce((acc, n) => acc+n, 0);
}
let sum1 = sum(1,2,3,4,5);//15
let sum2 = sum(1,2,3); // 6
```

You can mix rest and normal parameters

```js
function log(type, ...messages){
  console.log(`[${type.toUpperCase()}]:`, ...messages);
}
log("info", "server started", "port 9000");
 // [INFO]: server started port 9000
```

### 8. Default values + Rest Parameters

Default values work fine alongside rest parameters.

```js
function greetAll(greeting="Hi", ...names){
  names.forEach(name => console.log(`${greeting}, ${name}`);
}
greetAll("Hello", "Avinash", "Sam");
greetAll(undefined, "Avinash", "Sam", "Ravi");
```

### 9. Common Pitfalls

- Default value evaluated every call

```js
function addItem(item, list=[]){
  list.push(item);
  return list;
}
console.log(addItem("Apple"));// ["Apple"]
console.log(addItem("Banana")); // ["Banana"]
//Each call get a new array
```

- Confusing undefined vs null

```js
function show(val = 10){console.log(val);}
show(undefined); // 10 default values applies
show(null) // null Default value ignored
```

### 10. Advanced Use: Lazy Initialization

Because default expressions are evaluated lazily, they’re perfect for expensive computations that they may not always needed.

```js
function compute(value = factorial(100)){
  console.log("Computed:", value);
}
function factorial(num){
  if(num === 0 || num === 1){ return 1;}
  return n * factorial(num -1);
}
compute(42); // 42
compute(); // 9.332621544394418e+157 this might take time

```

>Q. When are default parameter value evaluated?
>
>- At call time and only if the argument is undefined.

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

## E. Scope (global/local/block)

### 1. What is Scope?

Scope defines where a variable or function is accessible in your code.

Think of it as the visibility zone or lifetime of variables.

When you reference a variable, the JS engine looks for it **within the current scope**, and if not found, moves outward, this is called **scope chaining**.

**JS uses lexical (static) scope**, the structure of the code determines the scopes, not how function are called.

### 2. Types of Scope in JavaScript

| **Type** | **Definition** | **Created by** |
| --- | --- | --- |
| Global Scope | Accessible everywhere | Declared outside all fuctions/blocks |
| Function (Local) Scope | Accessible only inside that function | function keyword |
| Block Scope | Accessible only inside `{}` block | let, const or class |

### 3. Global Scope

A variable declared **outside any function or block** becomes _global_.

```js
let appName = "MyApp"; // Global scope
function showApp() {
  console.log(appName); // Accessible here
}
showApp();
console.log(appName); // Accessible here too
```

In browsers, global variables are also properties of the `window` object:

```js
var version = "1.0";
console.log(window.version); // "1.0"
```

> `let` and `const` in global scope are _not attached_ to `window`

### 4. Function (Local) Scope

Variables declared **inside a function** are local to that function.

```js
function greet() {
  let message = "Hello";
  console.log(message); // Works
}
greet();
// console.log(message); // ReferenceError
```

Local scope isolates variables to prevent pollution of the global namespace.

### 5. Block Scope (`let` & `const`)

Introduced in **ES6**, `let` and `const` provide **block-level scoping,**meaning they only exist within the `{}` they’re defined in.

```js
{
  let x = 10;
  const y = 20;
  var z = 30;
}
console.log(typeof x); // undefined 
console.log(typeof y); // undefined 
console.log(z);        // 30  (var is function-scoped)
```

- `var` ignores block scope — it’s function-scoped only.

### 6. Scope Chain

When you access a variable, JavaScript looks for it in a **chain of nested scopes**:

1. Local (current function/block)
2. Parent function
3. Global scope

```js
let a = 10;
function outer() {
  let b = 20;
  function inner() {
    let c = 30;
    console.log(a, b, c); // 10, 20, 30
  }
  inner();
}
outer();
```

- The JS engine resolves variables by walking _outward_ until it finds the first match. If not found → `ReferenceError`

### 7. Shadowing

If a variable in an inner scope has the **same name** as one in an outer scope, the inner one **shadows** (overrides) it.

```js
let x = 1;
function test() {
  let x = 2;
  console.log(x); // 2 (local shadows global)
}
test();
console.log(x); // 1
```

Shadowing can cause subtle bugs if not intentional — especially when using nested scopes.

### 8. Illegal Shadowing

Shadowing `let` or `const` variables with `var` in the same or inner scope is **not allowed**.

```js
let count = 1;
{
  // var count = 2; //SyntaxError
  let count = 2; // Allowed
}
```

- Reason: `var` is function-scoped, so it would conflict with the existing block-scoped variable.

### 9. Nested Scope

```js
let a = 1;  // global
function outer() {
  let b = 2; // outer scope
  {
    let c = 3; // block scope
    console.log(a, b, c); // 1 2 3
  }
  // console.log(c); //ReferenceError
}
outer();
```

- Each scope has access to variables _defined above it_, but not below.

### 10. Function vs Block Scope with `var`

`var` is **not block-scoped**, which can create tricky bugs.

```js
if (true) {
  var x = 10;
}
console.log(x); //10 (still accessible)
```

Whereas with `let`/`const`:

```js
if (true) {
  let y = 20;
}
console.log(y); //ReferenceError
```

### 11. Lexical (Static) Scoping

JavaScript uses **lexical scoping**, meaning, The scope of a variable is determined by _where it is declared in the code_, not where it’s called from.

```js
function outer() {
  const outerVar = "outer";
  function inner() {
    console.log(outerVar);
  }
  return inner;
}
const fn = outer();
fn(); // "outer"(still remembers lexical scope)
```

- Even though `fn` runs outside of `outer()`, it still has access to `outerVar`, this is the foundation for **closures** (which we’ll explore soon).

### 12. Execution Context + Scope Chain Visualization

When the JS engine runs code:

1. It creates a **Global Execution Context** (for global variables/functions).
2. Each function call creates its **own Execution Context**.
3. Each context has a **Lexical Environment** (scope), which links to its outer scope.

```js
Global Scope
 └── outer()
      └── inner()
```

When resolving a variable, JS checks:

- Current function → Outer function → Global.
This is the **scope chain**.

### 13. Summary

| **Type** | **Created By** | **Accessible From** | **Notes** |
| --- | --- | --- | --- |
| Global | Outside all blocks/ functions | Everywhere | var, let, const |
| Function(local) | Inside a function | Only inside that function | var, let, const |
| Block | Inside `{}` | Only inside that block | let, const only |
| Lexical Scope | Determined by code position | Inner can access outer | Basis of closure |
| Shadowing | Redefining variable in inner space | Inner hides outer | Avoid accidental shadowing |

> Q. What’s the difference between function scope and block scope?
>
>Function scope applies to variables declared with `var`; block scope applies to `let`/`const` inside `{}`.

>Q. What is lexical scope?
>
>Lexical scope means variables are resolved based on where functions are **defined**, not where they are **called**.

---

## Hoisting

Hoisting is a JavaScript’s behavior of moving declaration ( not initialization) to the top of their scope during the **compilation phase**.

- Variables and function declaration are hoisted (recognized early)
- Their **assignment** are not.

### 1. Basic Variable Hoisting

```js
console.log(x); // undefined
var x = 5;
console.log(x); // 5
```

Behind the scenes, JavaScript interprets this as

```js
var x;
console.log(x);
x = 5;
console.log(x);
```

Only the declaration (var x) is hoisted, not the initialization.

### 2. Function Hoisting

Function declaration are hoisted completely, both their name and body.

```js
gree(); // HI There
function gree(){
  console.log("Hi there");
}
```

After hoisting JS Interprets it as

```js
function gree(){console.log("Hi there");}
gree(); // HI There
```

### 3. Function Expression Hoisting

Function expressions ( and arrow functions) are not fully hoisted, only the variable name is hoisted (if declared with var), not the function assignment.

```js
sayHi(); // TypeError: SayHi is not a function
var sayHI = function(){
  console.log("Hi");
}
```

Why?

Because during hoisting

```js
var sayHi;
sayHi(); // sayHi is a var and it's undefined
sayHi = function(){...}
```

### 4. Hoisting with let and const

let and const are hoisted , but they’re not initialized until the declaration is evaluated. This creates the TDZ( Temporal Dead Zone).

```js
console.log(x);
let x = 10;
```

So even though a is technically hoisted, it’s in a dead zone until execution reaches the declaration line.

### 5. var vs let/const Hoisting

| **Keyword** | **Hoisted?** | **Initialized** | **Default Value** | **Access before declaration** |
| --- | --- | --- | --- | --- |
| var | Yes | Yes | undefined | Allowed |
| let | Yes | No | TDZ | ReferenceError(TDZ) |
| const | Yes | No | TDZ | ReferenceError(TDZ) |

### 6. Function vs Variable Hoisting Priority

Function declaration are hoisted before variables.

```js
console.log(foo()); // Function
function foo(){return "Function";}
var foo = "Variable";
console.log(foo);// "Variable"
```

Behind the scenes

- The Function is hoisted first.
- The `var foo` declaration is hoisted but does not overwrite the function
- The assignment `foo = "variable"` happens at run time
- After assignment you will not be able to call the foo(), `TypeError: foo is not a function`

### 7. Hoisting Inside Function

Hoisting applies inside every scope, not just globally.

```js
function demo() {
  console.log(x); // undefined
  var x = 10;
  console.log(x); // 10
}
demo();
```

Evaluated to:

```js
function demo() {
  var x;
  console.log(x);
  x = 10;
  console.log(x);
}
```

Each Function has its own hoisting.

### 8. Hoisting and Arrow Functions

Arrow function are like function expression, they are not hoisted with their body.

```js
sayHi(); // Reference error
const sayHi = ()=> console.log("Hi");
```

`const` + arrow = no initialization before declaration → TDZ → `ReferenceError`

### 9. Complex Hoisting Order Example

```js
var x = 1;
function test() {
  console.log(x); // undefined
  var x = 2;
  console.log(x); // 2
}
test();
console.log(x); // 1
```

Why undefined first?

Inside the function, a new local `x` (var) is hoisted.

```js
function test() {
  var x; // hoisted
  console.log(x); // undefined
  x = 2;
  console.log(x); // 2
}
```

So the inner `x` shadows the global `x`.

### 10. Hoisting + TDZ Example

```js
{
  console.log(value); //ReferenceError
  let value = 5;
}
```

Between the start of the block `{` and the actual `let value = 5;` line,

the variable exists but is in the **Temporary Dead Zone** (TDZ).

>Q. Does JavaScript hoist variables?
>
>Yes, all declarations (`var`, `let`, `const`, `function`) are hoisted. But only `var` and `function` are _initialized_ at compile time.

>Q. Why do we say arrow functions are not hoisted?
>
>Because they’re stored in variables (`let`/`const`) that are hoisted _without initialization_, so calling them before definition throws an error.

>Q. In what order are functions and variables hoisted?
>
>Function declarations first, then variable declarations (without assignments).

### 11. Best Practices

- Always declare variables **at the top of their scope** to avoid confusion.
- Prefer `const` and `let` over `var` to eliminate hoisting side effects.
- Never rely on hoisting behavior — write code that’s explicit and predictable.
- For clarity, define functions **before they’re called**, even if technically hoisted.

---

## G. TDZ (Temporary Dead Zone)

The **Temporary Dead Zone (TDZ)** is a period **between** a variable’s **hoisting** and it’s **initialization** when it **exits in memory** but **can not be accessed**.

In other words

- `let` and `const` are hoisted, but not initialized.
- Accessing them **before** the declaration line causes `RefrenceError`

### 1. Basic TDZ Example

```js
console.log(a); // RefrenceError
let a = 10;
```

Internally:

- During Hoisting JS knows there is a variable `a`.
- But until the line `let a = 10;` runs, a is in the **TDZ**.
- Any attempt to access it during this time → **RefrenceError**

### 2. var vs let vs const (TDZ Comparison)

| **Keyword** | **Hoisted?** | **Init. before decl.** | **TDZ Exists?** | **Access before decl.** |
| --- | --- | --- | --- | --- |
| var | Yes | Yes (to undefined) | No | Yes |
| let | Yes | No | Yes | No |
| const | Yes | No | Yes | No |

### 3. TDZ Example with const

```js
console.log(user); // Reference error
const user = "Avinash";
```

Even though, the declaration is hoisted, user is uninitialized until `const user = "Avinash"`. executes.

### 4. TDZ inside Blocks

The TDZ also applies to block-scope variables

```js
{
  console.log(x); // ReferenceError
  let x = 5;
}
```

The TDZ starts at the beginning of the block `{` and ends at the actual time where variable is declared.

### 5. TDZ Example with Function Scope

```js
function demo(){
  console.log(value); // ReferenceError
  let value = 42;
}
demo();
```

Even within a function, TDZ exists from start of the function until the variable’s declaration line executes.

### 6. TDZ and `typeof`

Before ES6, you could safely use `typeof` before declaration

```js
console.log(typeof foo); //undefined
var foo = 10;
```

But with let or const, it’s no longer safe

```js
console.log(typeof bar); // ReferenceError
let bar = 20;
```

Why?

Because the variable `bar` is hoisted but uninitialized — it’s in the TDZ, so even `typeof` cannot touch it.

### 7. TDZ and Default Parameters

Default parameter values are evaluated in their own scope, if you reference a variable that hasn’t been initialized yet, you will hit a TDZ.

```js
let a = 10;
function test(a = b, b = 20){ // b is used before declaration
  console.log(a,b);
}
test();
```

Here `a = b` tries to access `b` before it’s initialization → **TDZ** error.

### 8. TDZ in Loops

Each iteration of a `for` loop with let creates a **new block scope** with **it’s own TDZ**.

```js
for(let i = 0; i < 3; i++){
  setTimeOut(()=> console.log(i), 0);
}
```

Output:

```js
0
1
2
```

If you used var, it wouldn’t create a new scope, all callbacks would see i = 3

```js
for(var i = 0; i < 3; i++){
  setTimeOut(()=> console.log(i), 0);
}
```

Output:

```js
3
3
3
```

### 9. Why Does TDZ Exists?

TDZ exits to **prevent accidental access** to variables before they are defined.

Without TDZ, code like this could behave unpredictability.

```js
function example() {
  console.log(counter); // undefined — if var
  counter++; // NaN
  var counter = 1;
}
```

With TDZ (let / const) you get a clear error instead of silent bugs.

### 10. Edge Case - Function Inside TDZ

Functions can also reference variables that are in the TDZ.

```js
{
  console.log(fn()); // ReferenceError
  let x = 2;
  function fn(){
    return x;
  }
}
```

The Function `fn` exits but when called before `x` is initialized, the variable `x` is still in TDZ, triggering a runtime error.

>Q. What is TDZ?<br>
>TDZ (Temporary Dead Zone) is the time between when a variable is hoisted and when it’s initialized, during which any reference to it causes a `ReferenceError`.

>Q. Is `let`/`const` hoisted?<br>
>Yes, but **uninitialized**.<br>
TDZ is the result of hoisting _without_ initialization.

>Q. Why does TDZ exist?<br>
To catch bugs early, accessing a variable before its definition is almost always a programming mistake.

### 11. Best Practices

- Always declare variables **at the top of the block** to minimize TDZ confusion.
- Never rely on **execution order** quirks, declare before use.
- Understand TDZ deeply to reason about closures, hoisting, and async code confidently.
- Avoid shadowing variables that are still in TDZ, it creates hard-to-debug errors.

---

## H. Closures

A **closure** is created when a function “remembers” and can**access variables from it’s outer scope** even after the outer function has returned.

In simple terms, **A closure fives a function persistent access to it’s surrounding(lexical) scope.**

### 1. Basic Closure

```js
function outer(){
  let message = "Hello!";
  function inner(){
    consloe.log(message);//inner function uses variable from outer
  }
  return inner;
}
const greet = outer(); // Outer has finished execution
greet(); // Hello!
```

Even though `outer()` finished running, `inner()` still has access to the `message` because it closed over the scope.

greet holds a **closure**, a combination of function inner + its **lexical environment.**

### 2. How Closure works internally?

When a function is defined, JavaScript stores the reference to it’s **lexical environment**, all the variables that were in the scope at the time it was created. so when you call it later, it can still access those variables.

### 3. Lexical Scoping Recap (Foundation of Closure)

JS uses lexical scoping, meaning Scope is determined by **where a function is declared, not where it’s called.**

```js
let x = 10;
function outer(){
  let y = 20;
  function inner() {
    return x + y;
  }
  return inner;
}
const fn = outer();
fn(); // 30
```

Even though `fn` is called in the global scope, it “remembers” both `x` and `y`.

### 4. Real-World Example - Data Privacy

Closure let us encapsulate data, making variables private and accessible only via specific functions.

```js
function createCounter(){
  let count = 0;
  return {
    increment: function() { count++;},
    decrement: function() { count--;},
    getValue: function() {return count;}
  };
}
const counter = createCounter();
counter.increment();
counter.decrement();
counter.getValue();
console.log(counter,getValue());// 0
console.log(counter.count);// undefined private
```

This is the foundation of **Module pattern** and Modern **React Hook design**.

### 5. Closure and State Persistence

Closures keep variables alive in memory as long as the inner function reference exits.

```js
function counter() {
  let value = 0;
  return () => ++value;
}
const inc = counter();
console.log(inc()); // 1
console.log(inc()); // 2
console.log(inc()); // 3
```

Even though counter() executed once, value persists because it’s enclosed in the returned function.

### 6. Multiple Closures Have Independent State

Each invocation of outer function **creates a new closure.**

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const c1 = makeCounter();
const c2 = makeCounter();
c1(); // 1
c1(); // 2
c2(); // 1
```

Each `makeCounter()` call creates a separate lexical environment, isolated from others.

### 7. Closure Inside Loops (Classing Pitfall)

Consider

```js
for(var i = 0; i <= 3; i++){
  setTimeout(()=> console.log(i), 1000);
}
```

Output:

```js
4
4
4
```

Why?

Because var is a function scoped, not blocked scoped, so all callbacks share same i ( which becomes 4 after the loop)

Fix it with block scope (let)

```js
for(let i = 0; i<= 3; i++){
  setTimeout(()=>console.log(i), 1000);
}
```

Now Output:

```js
1
2
3
```

Each iteration will get it’s own closure with a new i.

### 8. Using Closure for Function Factories

Closures let you build customized function dynamically:

```js
function multipler(factor){
  return function (num) {
    return num * factor;
  }
}
const double = multipler(2);
const triple = multiplier(3);
console.log(double(4));//8
console.log(triple(4)); //12 
```

double and triple remember their unique factor value via closures.

### 9. Closure Memory and Garbage Collection

Closures keep variables alive **only as long as the function is referenced**.

```js
function outer(){
  let data = "Important data";
  return function(){ console.log(data);}
}
const fn = outer();
fn(); // uses data
// when fn = null ->  data is garbage-collected
```

JS engine are smart, They don’t leak memory as long as unused closures are dereferenced.

### 10. Common Use Cases

| **Use Case** | **Example** |
| --- | --- |
| Data Privacy | Module Pattern, React Hooks |
| Stateful Function | Counters, accumulators |
| Callbacks | Event handlers, async logic |
| Function Factories | Customizable reusable functions |
| Currying | Breaking multi-arg function into single arg ones |

### 11. Summary

| **Concept** | **Description** |
| --- | --- |
| Closure | A function + its preserved lexical scope |
| When created | Every-time a function is defined |
| Purpose | Maintain access to outer variables |
| Lives Until | No reference remain |
| Applicatons | Data privacy, state management, factories, callbacks |

>Q. What is closure?<br>
A closure is a function that retains access to variables from its lexical scope, even after that scope has exited.

>Q. Why are closures useful?<br>
They enable **data privacy**, **persistent state**, and **function customization** — critical for advanced patterns like hooks, memoization, and currying.

>Q. Do closures cause memory leaks?<br>
Not inherently. They only keep variables alive while the closure is referenced. Garbage collection cleans up once it’s no longer reachable.

>Q. How does lexical scoping relate to closures?<br>
Closures _depend on_ lexical scoping — because they capture variables based on where they’re **defined**, not where they’re **called**.

### 12. Best Practices

- Use closures for **encapsulation**, not hidden complexity.
- Avoid accidental closures in loops (especially with `var`).
- Be mindful of **memory** in long-lived closures (event listeners, intervals).
- Understand closure lifetimes when debugging stale or shared state in React or async code.

---

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

---

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

---

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

The Key idea is to**Isolate side effects,** keep impure logic at the boundaries, pure logic in the core.

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

---

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

---

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

Callbacks are **a use case of higher-order functions,**since they are _passed to_ or _returned from_ another function.

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

>Q. What is a callback function?
>
>A callback is a function passed as an argument to another function and executed later, often after an async task completes.

>Q. Why were callbacks introduced?
>
>To handle asynchronous operations (e.g., file I/O, HTTP requests) without blocking the main thread.

>Q. What is callback hell?
>
>It’s when multiple async operations are nested in callbacks, leading to unreadable code.

>Q. How do Promises solve callback hell?
>
>They flatten nested callbacks into a chainable `.then()` structure with better error handling.

>Q. What’s the difference between synchronous and asynchronous callbacks?
>
>Sync callbacks run immediately; async callbacks run after a delay or event.

### 13. Best Practices

- Keep callback functions **pure,** avoid external state changes.
- Handle errors properly (use `err` argument or `.catch()`).
- Don’t over-nest, refactor into Promises or async/await.
- Avoid “anonymous callback soup”, name your functions for clarity.
- Use **higher-order abstractions** (e.g., `map`, `filter`) instead of manual loops.

---

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
>
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

---
