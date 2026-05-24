# ref and useRef

Both ref and useRef are tools React designed to do one main thing: remember information between renders without triggering a new render.

Normally, when you want react to remember something and update whats on screen, you use `useState`. But changing state forces component to re-render. If you just need to keep track of a value behind the scenes, or if you need to talk directly to browser's DOM (the actual html element), state is wrong tool. That's where refs come in.

## 1. What exactly is a `Ref` ?

In React, a Ref is just a plain, Javascript object with a single property: `current`.

```js
// What a ref looks like under the hood
{current: initialValue}
```

When you use `useRef(initValue)`. React gives you this object. You can read from it or write it by accessing `ref.current`.

A ref is basically a persisted mutable container, usually holding:
- DOM node
- component instance
- mutable value


### Rules for refs:
- **Changing a ref does not cause re-render.** The component won't blink, reload or update its UI just because you changed `ref.current`.
- **Do not read or write ref.current during rendering**, React expects your rendering code to be pure (meaning its just calculate the UI based on the props and state). You should only read write ref Event Handlers (like `onClick`) or inside a `useEffect`.

## 2. Use Case 1: Interacting with the DOM (most common)

Sometimes you need to tell browser to do something directly to an HTML element, like focusing an input box. scrolling to a specific part of the page, or measuring an element's size.

### Example: Auto-focusing an input on button click

To like a ref to DOM node, you pass your ref object to the HTML element's `ref` attribute. React will automatically set `ref.current` to the actual HTML element once loaded.

```js
import {useRef} from 'react';

function FormFocus(){
    // 1. Create a ref container (start as null)
    const inputRef = useRef(null);

    function handleFocusClick(){
        // 3. Talk directly to HTML input element using native browser methods
        inputRef.current.focus();
    }

    return (
        <div>
            {/* 2. Tell react to attach this input element to our ref */}
            <input ref = {inputRef} type="text" placeholder="Type Something here..."/>
            <button onClick={handleFocusClick}>Click to Focus Input </button>
        </div>
    )
}
```

## 3. Use Case 2: Storing behind the scene variables

If you change a standard Javascript variable (like `let counter = 0`) inside React component, the variable gets wiped out and reset to 0 every single time the component re renders.

If you want a variable to survive re-renders without causing new one, use `useRef`.

### Example: Building a Stopwatch (Storing a Timer ID)

When you start an interval using `setInterval`, the browser gives you numeric ID so you can stop it later with `clearInterval`. If you store this ID in state, it triggers an extra render. If you store it in regular variable it gets lost on the next render. `useRef` is perfect here.

```js
import {useState, useRef} from 'react';

function Stopwatch(){
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);

    // we use a ref to hold the time ID because changing it does not trigger re-render
    //but we absolutely need to remember it across renders so we can stop it.
    const timerRef = useRef(null);

    function handleStart(){
        setStartTime(Date.now());
        setNow(Date.now());

        clearInterval(timeRef.current);

        // store the interval if in our ref
        timeRef.current = setInterval(()=>{
            setNow(Date.now());
        }, 10);
    }

    function handleStop(){
        // retrieve the interval id from ref to stop it
        clearInterval(timeRef.current);
    }

    let secondElapsed = 0;
    if(startTime !== null && now !== null){
        secondElapsed = (now - startTime) / 1000;
    }

    return (
        <div>
            <h1> Time elapsed: {secondElapsed.toFixed(3)}s</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    );
}
```

## 4. Use Case 3: Tracking Previous state

Because refs don;t trigger re-render, you can use them inside useEffect to hold onto a value from the last time, the component was rendered.

### Example: Keeping track of what the last value was

```js
import {useState, useEffect, useRef} from 'react';

function CounterHistory(){
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(0);

    // This runs after the render is already on the screen.
    // so it stores the current count, which becomes the prev count on next render.
    useEffect(()=>{
        prevCountRef.current = count;
    }, [count]);

    return (
        <div>
            <h2>Now: {count}</h2>
            <h2>Before: {prevCountRef.current}</h2>
            <button onClick={()=> setCount(count + 1)}>Increment</button>
        </div>
    )
}
```

## State vs Refs

|Feature|useState|useRef|
|-----|-----|-----|
|What it returns|"A state value and a setter function [value, setValue]."|An object with a .current property { current: value }.|
|Triggers re-render?|Yes. Changing state forces the UI to update.|No. Changing .current happens silently in the background.|
|When to use it|For data that appears on the screen or alters layout.|"For DOM access, timer IDs, or tracking data behind the scenes."|

## DOM ref Example

```ts
const inputRef = useRef(null);

return (
    <input ref={inputRef}/>
)
```

After render:

```
inputRef.current
```

Becomes actual dom node. `<input/>`

Why this is powerful?

Now you can:

```
inputRef.current.focus();
```

This is, **imperative DOM access**.

### Declarative vs Imperative DOM access

Declarative React

```
<Input autoFocus />
```

Describes desired UI behavior.

Imperative

```
inputRef.current.focus()
```

Directly manipulates DOM.

> Use imperative access only when necessary, Too much imperative code fights React.

### What useRef Actually does?

Question: Why not just

```
const obj = {current: null}
```

Because react re-render components.

**Normal variable reset, useRef persists across renders.**

## Refs in Component Systems

Refs become extremely important in reusable components.

Example:

- focus trap in modal
- scroll container in table
- anchor positioning in tooltip
- measurement in select
- animation systems

Refs are foundational frontend infrastructure.

## forwardRef

Normally, ref stops at component boundary, meaning

```
<Button ref{...}/>
```

Won't react DOM automatically.

forwardRef, allows:
- Parent component to access internal DOM node

