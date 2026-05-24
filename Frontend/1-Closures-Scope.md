# Closure and Scope

What is Closure?

Javascript function can hold the reference of a state for the inner function and inner function can use that state and this behavior is called closure.

## 1. Implement once()

## 2. Implement memoize()

The question is about how do you cache the result and how will you call the function.

- We are storing result of each function call in a map cache and when next time same arguments cums the memoize will return the value from cache without needing it to call the function
- We use 

```js
function memoize(callback){
    const cache = new Map();

    return function(...args){
        const key = JSON.stringify(args);
        if(cache.has(key)){
            return cache.get(key);
        }
        const res =  callback.apply(this, args);
        cache.set(key, res);
        return res;
    }
}
```

## 3. Implement debounce()

Debounce basically delays the function call by certain delay, so each time before the delay achieved if there is a function call then the delay will reset and then caller will have to wait for that delay then function will be called, interrupt between the delay interval will lead to another new delay.

So every new call:

- cancels the previous timer
- starts a new timer
- only the last call survives long enough to execute

```js
function debounce(callback, delay){
    let timeOutId = null;

    return function(...args){
        clearTimeout(timeOutId);
        timeOutId = setTimeout(()=>{
            callback.apply(this, args)
        }, delay);
    }
}
```

## 4. Implement throttle()

```js
function throttle(callback, delay){
    let timeoutId = null;
    return function(...args){
        if(timeoutId){
            return;
        }
        callback.apply(this, args);
        timeoutId = setTimeout(()=>{
            timeoutId = null;
        }, delay);
    }
}
```

## 5. Explain Closure Memory leaks

## 6. var vs let vs const

## 7. Temporal Dead Zone

## 8. Event loop deep dive

## 9. microtask vs macrotask

## 10. Promise Execution order