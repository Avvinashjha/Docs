## H. Closures

A **closure** is created when a function “remembers” and can** access variables from it’s outer scope** even after the outer function has returned.

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