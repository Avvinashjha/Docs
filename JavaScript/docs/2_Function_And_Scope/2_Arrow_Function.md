#

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
