# Closure (Foundation for Redux)

If you understand closure deeply, Redux internal become much easier:
- `store` hiding private state
- middleware wrapping
- subscribers remembering `dispatch`
- Selectors memoization
- async thunks capturing state/functions

## 1. What is Closure?

A closure happens when a function `remembers` variables from the scope where it was created, even after that outer function has finished.

Example:

```js
function outer(){
    let count = 0;
    function inner(){
        count++;
        console.log(count);
    }
    return inner;
}

const fn = outer();
fn(); // 1
fn(); // 2
fn(); // 3
```

**Why?**

Even though `outer()` finished, `inner()` still remembers `count`.

That memory = closure

## 2. How Javascript internally works?

When `inner()` is created:

Javascript stores reference to outer lexical environment:

```
inner --> [[Environment]] --> Outer variable
```

So Later:

```js
fn()
```

Still accesses count.

## 3. Why Closure Matter in Redux?

Redux store uses closure to keep state private.

Example:

```js
function createStore(){
    let state = {
        count: 0
    };
    return {
        getState(){
            return state;
        }
    }
}

const store = createStore();
console.log(store.getState());
```

`state` is private. Only exposed methods can access it. That's closure.

## 4. Private Variables

```js
function bankAccount(initial){
    let balance = initial;
    return {
        deposit(amount){
            balance += amount;
        },
        getBalance(){
            return balance;
        }
    };
}

const acc = bankAccount(100);
acc.deposit(50);
console.log(acc.getBalance()); // 150
```

You can not directly do:

```js
acc.balance // undefined
```

Because balance is protected by closure.

## 5. Why closure instead of global variables?

Because closure gives:

- Encapsulation
- Private state
- Controlled access
- Cleaner architecture

## 6. Shared variable confusion

```js
for(var i = 0; i < 3; i++){
    setTimeout(()=> console.log(i), 100);
}
```

Output:

```
3
3
3
```
Because `var` has function scope.

Fix:

```js
for(let i = 0; i < 3; i++){
    setTimeout(()=> console.log(i), 100);
}
```
Output:

```
0
1
2
```

## 7. Redux Middleware uses closure

Example:

```js
const logger = store => next => action => {
    console.log("Before", store.getState());
    next(action);
    console.log("After", store.getState());
}
```

This works because nested function remember:
- `store`
- `next`

That is closure chain.

## 8. Practice Problems

Q1. Predict output

```js
function test(){
    let x = 5;
    return function(){
        console.log(x);
    }
}
const a = test();
a(); // 5
```

Q2:

```js
function counter() {
  let c = 0;
  return () => ++c;
}

const fn = counter();

console.log(fn()); // 1
console.log(fn()); // 2
```

Q3: Create a counter factory

```js
const c1 = createCounter();
c1.increment();
c1.increment();
c1.getValue(); // 2
```

Solution:

```js
function createCounter(){
    let count = 0;
    function increment(){
        count++;
    }
    function decrement(){
        count--;
    }
    function reset(){
        count = 0;
    }
    function getValue(){
        return count;
    }
    return {
        increment, decrement, reset, getValue
    }
}
```

Q4: Build a mini redux store using closure

```js
const store = createStore();
store.getState();
store.dispatch();
```

With Private state

Solution:

```js
function createStore(){
    let state = {}
}
```

Q5: What exactly is remembered in closure: value or variable reference?
Q6: Why does count keep changing in counter example?
Q7: Why is closure useful in Redux store?
Q8: Why does middleware need closure?
Q9: Implement

```js
function createBankAccount(initial)
```

Methods:

- deposit()
- withdraw()
- getBalance()

Using closure only.

