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
