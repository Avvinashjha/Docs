# Immutability

This is the heart of Redux.

Without it:

- UI won't update
- React memoization fails
- Reducers become buggy
- Time travel debugging impossible

Before we start let's solve this question.

What will be the output of the below code and why?

```js
const user = { name: "Avi" };

const copy = user;
copy.name = "John";

console.log(user.name);
```

Option: 
1. Avi
2. John

Solution:

John(1), In the above example copy will have the reference of user object and and hence changing copy.name will result in changing user.name

Why this matters in Redux?

Redux depends on detecting:

```js
oldState != newState
```

if you mutate same object:

```js
state.user.name = "John"
return state;
```

Then:

```
oldState === newState
```

React may skip re-render.

That's why immutability is critical.

## 1. What is Immutability?

Immutability means:
- Do not modify existing data
- Create new update copies instead

Mutable Example:

```js
const arr = [1, 2, 3];
arr.push(4);
```

Original array changed, so mutable

Immutable Example

```js
const arr = [1,2,3];
const newArr = [...arr, 4]
```

Original Array unchanged.

## 2. Why Redux Requires Immutability?

Redux checks if state changed using reference comparison.

```js
prevState !== newState
```

Fast and effective.

If mutation happens:

```js
prevState === newState
```

Redux/React may think nothing changed.

## Object Immutability Example

Wrong:

```js
const user = { name: "Avi", age: 25 };
user.age = 26;
```

Correct:

```js
const user = { name: "Avi", age: 25 };

const updated = {
  ...user,
  age: 26
};
```

## Array Immutability Example

Wrong:

```js
cart.push(item);
cart.pop();
cart.splice(1,1);
```

Correct:

```js
const newCart = [...cart, item];
const removed = cart.filter(x => x.id !== id);
```

## Nested Object Problem

```js
state = {
  user: {
    profile: {
      city: "Delhi"
    }
  }
}
```

Update city immutably:

```js
const newState = {
    ...state,
    user:{
        ...state.user,
        profile:{
            ...state.user.profile,
            city: "Bangalore"
        }
    }
}
```

Here if you see carefully, we need to spread, each object and it child object in the object tree, and for larger object his can be a recursive job to do it manually and `**that is why Redux uses immer**`.

## How React Uses This

```js
if (prevProps === newProps)
```

Many optimization depends on immutable references.

## Common Beginner Mistakes

1. Mutating reference is still mutation

```js
const newState = state;
newState.count++
```

2. Spreading top level object only copies only top level child

```js
const newState = {...state}
newState.user.name = "John";
```

Here we are trying to mutate states -> user -> name and user is a copy but name is still referencing the state object so you mutated the state itself.

## Practice Problems

Q1: 

```js
const a = { x: 1 };
const b = a;
b.x = 5;

console.log(a.x)
```
- Output: 5
- In this case since b is referencing to a so any change to b's property will change the property of a as-well.

Fix:

```js
const a = { x: 1 };
const b = {...a};
b.x = 5;

console.log(a.x)
```

- In this case we stored the copy of a in b and changing b's property will not impact a's.

Q2:

```js
const a = { user: { name: "Avi" } };
const b = { ...a };

b.user.name = "John";

console.log(a.user.name);
```

Output: John
- In this case we stored the copy of only top level object and nested object still references to a so changing nested property of b lead to change the property of a.

Q3: Fix this Reducer

```js
function reducer(state, action){
  if(action.type === "INC"){
     state.count++;
  }
  return state;
}
```

- So the problem here is that we are directly mutating the state, we need to change the count and return new state.

Fix:

```js
function reducer(state, action){
  if(action.type === "INC"){
     return {...state, count: state.count + 1}
  }
  return state;
}
```

Q4: Update Array Immutably

```js
const nums = [1,2,3];
```
Add 4 without mutation.

```js
const newNums = [...nums, 4];
```

Q5: Whu does Redux Prefer immutability?

Redux prefer immutability because it compares old object and new object by reference, if reference changed then re-render.

Q6: Difference between shallow copy and deep copy?

In Case of shallow copy object's top level children are copied but nested children are still referencing to parent object.

In Case of deep copy each of the nested children is copied and new object property change will not effect the original object properties.

Q7: Why Mutation Causes rendering bugs?

Since React and Redux depends of oldState and newState Comparison to re render the page, when you directly mutate the state in that case reference remains same and hence it can not tell the difference.

Q8: How Does redux toolkit allow mutation syntax safely?

Not yet discussed but based on current knowledge, Redux toolkit uses immer to copy the object and it make sure that state is not mutated directly always mutate the copy and return the new object as state.

Immer creates a draft proxy, tracks mutations, then produces immutable next state.

## Important Insight

Redux does not care about immutability morally.

Redux cares because immutable references make change detection cheap.

instead of Deep compare:

```js
old.user.profile.city === new.user.profile.city
```

It can do:

```js
oldState !== newState
```

and it is fast.

