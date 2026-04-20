# Pure Function

This is the soul of reducers.

Redux reducer must be pure functions.

Without pure functions:
- unpredictable state
- impossible debugging
- replay/time travel broken
- tests become painful

Predict the output:

```js
let count = 0;

function addOne(x){
   count++;
   return x + 1;
}

console.log(addOne(5));
console.log(addOne(5));
```

Output:

```
6
6
```

It it a pure function?

- addedOn is not a pure function because a pure function does not mutate the value inside it ti just returns the value based on the prams but in this case count is being mutated and that might have any other significance which may occur so it's not a pure function.

## What is Pure Function?

A function is pure if:

1. Same input -> same output always
2. No Side effects, meaning it does not
   - modify external variable
   - call API
   - changed DOM
   - mutate input
   - write file
   - log important state change
   - use random/time value directly 

Example Pure Function

```js
function add(a, b){
    return a + b;
}
```

Input:

```js
add(2, 3);
```
Always gives 5, No side effect.

Example Impure function

```js
let tax = 10;

function total(price){
   return price + tax;
}
```

Why impure?

Because if tax changes later:

```js
tax = 20;
```

Same input gives different output.

Example impure with Randomness

```js
function lucky(){
   return Math.random();
}
```

Same call, different output.

## Why Redux Reducers Must be pure?

Reducer:

```js
(state, action) => newState
```

Redux expects:

Same state + same action = same nextState

That gives:
- Predictable updates
- debugging
- time travel
- replay actions
- testing easy

Example Pure Reducer:

```js
function reducer(state, action){
    if(action.type === "INC"){
        return {
            ...state,
            count = state.count + 1
        };
    }
    return state;
}
```

Example of Bad Reducer:

```js
function reducer(state, action){
   state.count++;
   return state;
}
```

Mutates state

Example of Worse Reducer:

```js
function reducer(state, action){
   return {
      count: Math.random()
   };
}
```

Impossible to debug.

## Why Pure function are easy to test

Answer is simple, for a given input, pure function always return the same output and hence easy to test.

```js
expect(add(2,3)).toBe(5)
```

Done, No Setup

## Problems

Q1. Pure or Impure?

```js
function square(x){
   return x * x;
}
```

- This function is pure, because for a given input 
  - It will always return the same value
  - It does not mutate anything else

Q2: Pure or Impure?

```js
let bonus = 5;

function salary(base){
   return base + bonus;
}
```

- This function is impure, since it depends on bonus to calculate salary, and if bonus changes then for a given input it will return different value

Q3: Pure or Impure?

```js
function updateUser(user){
   user.name = "John";
   return user;
}
```
- Impure
- Because it mutates input argument. Even if output looks consistent, purity also requires no side effects. Inputs must be treated as read-only.

Correct pure version:

```js
function updateUser(user){
   return {
      ...user,
      name: "John"
   };
}
```
  
Q4: Fix reducer

```js
function reducer(state, action){
   if(action.type === "ADD"){
      state.items.push(action.payload);
   }
   return state;
}
```

- in this case we are directly mutating the state, and which breaks immutability and function is impure.

Fix:

```js
function reducer(state, action){
   if(action.type === "ADD"){
      return {
        ...state, items: [...state.items, action.payload]
      }
   }
   return state;
}
```

Q5: What is pure function?

A function which given same out for same input each time, which does not mutate it props and any other variable that might cause side effect, which does not mutate external variable.

Q6: Why Reducer must be pure?

By making reducer pure, It is easy to debug, we can test easily, we can use time travel and predictable updates.

Q7: Is using Date.now() in reducer allowed?

If you are using Data.now() then each time you call the function you will get different date value, which violets the pure function principle, so it is not allowed.

Q8: Why API call inside reducer is bad?

API call response is not guaranteed and fixed, and pure function does not allow api calls inside it so using api calls inside reducer is bad.

Q9: Can pure function mutate local variable?

Pure function can mutate local variable that are in it's block, Pure function should not mutate local variable in it closure, mutating local variable means there is a side effect in your function and hence it is not pure.

## Important Insight

A function can mutate local temporary variable and still be pure if no outside observable effect occurs.

Example:

```js
function sum(arr){
   let total = 0;
   for(let x of arr) total += x;
   return total;
}
```

Still pure, Because external world unaffected.


Purity means: No observable side effects and not No variable changes anywhere.

