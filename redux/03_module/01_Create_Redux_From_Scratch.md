## Starter Question (Important)

If we build store like this:


```js
let state = { count: 0 };
```

Why is this bad?

Why not just export this variable and mutate anywhere?

Think architecturally.

Ans:

If we do:

```js
export let state = {count: 0};
```

then anywhere:

```js
state.count++;
```

Now Problems:

1. No Control Layer: Any one can change state any time
2. No Predictability: Why changed, When and why will be very difficult to know.
3. No Notification: UI doesn't automatically know state changed.
4. No History: No action log
5. No Business Rules: No reducer validation path

This is why redux store exists

Not just to hold state.

But to enforce:

```
dispatch(action)
-> reducer
-> new state
-> notify listener
```

Controlled mutation pipeline.

## Create Redux Store from Scratch

We start simple.

### Goal

Build 

```js
const store = createStore();
store.setState()
store.getState()
```

### Step 1: Basic Store

```js
function createStore(){
    let state = {
        count: 0
    }

    return {
        getState(){
            return state;
        },
        setState(newState){
            state = newState;
        }
    }
}
```

Usage:

```js
const store = createStore();

console.log(store.getState());
// {count: 0}
store.setState({count: 5});
console.log(store.getState());
// {count: 5}
```

Why this is better than Export Variable?

Because:

- State is private
- only store methods can modify
- centralized access point
- easier to enhance later

Closure + encapsulation

### But still Problems Remain

This store still bad because:

```js
store.setState({random: 999})
```

Anyone can set anything.

No Rules.

### Practice Problem

Q1: Predict Output:

```js
const store = createStore();

const s1 = store.getState();

store.setState({ count: 10 });

console.log(store.getState().count);
```

Output:

```
10
```

Q2: Why is state private here?

Since we have defined state in create reducer, and exposed method to get and set state, state is private to create reducer function and we are able to read and modify it using the getter and setter method, state is private because we can not directly modify state anywhere, we need to use exposed method to do so, it is happening because we encapsulated the state and using closure we are able to access it and modify it.

Q3: What concept allows getState() to access state?

Closure

Q4: What is biggest flaw of setState(newState)?

In current implementation the biggest flaw is that user can set state as anything, there is no rules.

## Reducer Concept

THis is where Redux becomes elegant.

### Problem with setState()

Current system:

```js
store.setState(anything)
```

To dangerous. Need controlled state transition.

### What is a Reducer?

A reducer is a function that decides:

```
currentState + action -> nextState
```

Syntax:

```js
function reducer(state, action){
    //return new state
}
```

Example:

```js
function reducer(state, action){
    if(action.type === "INC"){
        return {
            ...state,
            count: state.count + 1
        };
    }
    return state;
}
```

Why this is better

Instead of:

```js
setState({count: 999})
```

We do:

```js
dispatch({type: "INC"})
```

Reducer decides legal next state.

### Update store

```js
function createStore(reducer){
    let state = {count: 0};
    return {
        getState(){
            return state;
        },
        dispatch(action){
            state = reducer(state, action);
        }
    }
}
```

Usages:
