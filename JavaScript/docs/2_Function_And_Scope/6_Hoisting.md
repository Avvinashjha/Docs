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

>Q. Does JavaScript hoist variables?<br>
>Yes, all declarations (`var`, `let`, `const`, `function`) are hoisted. But only `var` and `function` are _initialized_ at compile time.


>Q. Why do we say arrow functions are not hoisted?<br>
>Because they’re stored in variables (`let`/`const`) that are hoisted _without initialization_, so calling them before definition throws an error.


>Q. In what order are functions and variables hoisted?<br>
>Function declarations first, then variable declarations (without assignments).

### 11. Best Practices

- Always declare variables **at the top of their scope** to avoid confusion.
- Prefer `const` and `let` over `var` to eliminate hoisting side effects.
- Never rely on hoisting behavior — write code that’s explicit and predictable.
- For clarity, define functions **before they’re called**, even if technically hoisted.
