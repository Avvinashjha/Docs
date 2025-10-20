## Function Declaration vs Expression

### 1. What is Function Declaration?

Function declaration defines a named function using function keyword, and it;s hoisted (i.e. available before it’s defined in the code)

```js
// Function Declaration
// It's available before defination
console.log(greet("Avinash");
function greet(name){
  return `Hello ${name}`);
}
```

### 2. What is Function Expression?

A function expression defines a function and assign it to a variable or constant, it’s not hoisted in the same way, the variable is hoisted, but not initialized until runtime.

```js
//Function Expression
 //This will not work because varible is hoited but not initialized yet (TDZ)
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
| Use Case                      | Reuasable            | Dynamic, Inline, or conditional Function |

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