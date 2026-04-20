# Observer Pattern

This is the idea behind:

```js
store.subscribe(listener);
```

When state changes, listener got notified.

## What is Observer Pattern?

One Object(Subject) maintains list of subscribers (Observer).

When state changes:

```
notify all subscribers
```

## In Term Of Redux

```js
store.subscribe(()=>{
    console.log("state changed");
})
```

When dispatch happens:

- State updated
- all listener called

## Question

Suppose 3 components subscribe to store:

- HeaderCart
- ProductList
- SidebarSummary

Cart updates.

Should Redux manually call each component directly OR notify subscribers list generically? Why?

Ans:

Manually calling each component will be a non scalable architecture, since in that case if new component is added then they have to be added in redux logic so instead of manually calling each component in redux we can notify subscribers and based on the event each of the component will change their state. Our system will remain decoupled.

## Core Idea

Instead of this:

```
Store:
call Header()
call Sidebar()
call ProductList()
```

use this:

```
Store keeps listeners[]

When state changes:

for each listener -> call it
```

## Real Redux Flow

```js
const unsubscribe = store.subscribe(listener);
```

Later:

```js
unsubscribe()
```

That removes listener.

## Observer Pattern from Scratch

```js
function createEmitter(){
    let listener = [];
    return {
        subscribe(fn){
            listener.push(fn);
            return function unsubscribe(){
                listener = listener.filter(x => x !== fn);
            };
        },
        emit(){
            listener.forEach(fn => fn());
        }
    }
}
```

Usage:

```js
const emitter = createEmitter();

const unsub = emitter.subscribe(() => console.log("A"));
emitter.subscribe(() => console.log("B"));

emitter.emit();
```

Output:

```
A
B
```

## How Redux Uses this

```js
dispatch(action)
→ reducer returns newState
→ notify all subscribers
```

Then React-Redux subscribers re-check selected data.

## Why this pattern is Powerful

Decoupling

Store does not know:
- React
- Header component
- Sidebar component

Anyone can subscribe.

Even vanilla JS app can subscribe.

That's why Redux works without React too.

## Common Mistakes

1. No unsubscribe: Leads to memory leak
2. Mutating listener while iterating: Advanced issue, redux handles safely
3. Assuming subscriber gets action automatically: Redux subscriber usually gets no action argument.

## Problems

Q1: Predict Output

```js
const emitter = createEmitter();

emitter.subscribe(() => console.log("X"))
emitter.subscribe(() => console.log("Y"));

emitter.emit();
```

Output:

```
X
Y
```

Q2: Why return unsubscribe function from subscribe()?

Returning unsubscribe gives caller control to:

- stop future notifications
- prevent memory leaks
- avoid duplicate subscriptions
- cleanup when component unmounts

Q3: What problem happens if component subscribes but never unsubscribes?

- since a component need to unsubscribe so there must be a way to do so because other wise emitter will always emit events to that listener and it will call the function.

```
Unmounted component still notified
Memory leak
Duplicate renders
Unexpected bugs
Performance issues
```

Q4: Complete this

```js
function subscribe(fn){
    listener.push(fn);

    return function(){
        //code
    };
}
```

Ans:

```js
function subscribe(fn){
    listeners.push(fn);

    return function(){
        listeners = listeners.filter(x => x !== fn);
    };
}
```



