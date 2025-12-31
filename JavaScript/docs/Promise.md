# Promise

## What is a promise?

A promise is an object that represent the future result of an asynchronous operation.

A Promise can have 3 state:

1. pending - still running
2. fulfilled - completed successfully
3. rejected - failed

## Methods of Promise

1. Instance Methods

    Instance methods are used on the existing promise.

    - then(onFulfilled, onReject) : runs when promise resolve/reject
    - catch(onRejected): Runs only on rejection
    - finally(onFinally): Runs after settle (resolve or reject)

2. Static Methods

    Used on `Promise` class.

    - `Promise.resolve(value)`: Wraps value into a resolve Promise.
    - `Promise.reject(error)`: Returns a rejected Promise.
    - `Promise.all(promises)`: Return when all succeed or reject Fast (if any reject the it will reject)
    - `Promise.allSettled(promises)`: Waits for all to settle, it never rejects
    - `Promise.race(promises)`: Resolves/rejects with first settle (so it only waits for first promise resolve/reject)
    - `Promise.any(promises)`: Resolved with first successful, rejects only if all fails.
    - _`Promise.withResolver()`_: Gives manual resolve/reject from outside. This is new static member.
    - _`Promise.try(fn)`_: Wraps sync errors into Promise rejection.  This is proposed not yet used.

## Ways to create Promise

1. Using `new Promise()`

    ```js
    const p = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("In set timeout");
            resolve("Done!")
        }, 1000);
    });
    p.then((data)=> console.log(data));
    ```

2. Using `Promise.resolve()`

   ```js
    Promise.resolve(42);
   ```

3. Using `Promise.reject()`

    ```js
    Promise.reject("Error");
    ```

4. Using `async` functions

   ```js
    async function foo(){
        return 10; // equivalent to Promise.resolve(10)
    }
   ```

5. Using `Promise.withResolvers()` (2024+)

    ```js
    const {promise, resolve, reject} = Promise.withResolvers();
    resolve(5);
    ```

6. Turning callback APIs into Promise

    ```js
    const promisified = () => new Promise((resolve => {
        setTimeout(() => resolve(10), 1000);
    }))
    ```

## Questions

### What is microtask Queue and Macro-task queue?

- Promise callbacks (then, catch. finally) runs in microtasks.
- setTimeout, web APIs runs in macro task.
- event loop checks microtask tasks then if nothing is there then it will take the callbacks from macr-task and send it to callstack.

```js
console.log(1);
setTimeout(()=> console.log(2));
Promise.resolve().then(()=> console.log(3));
console.log(4);
```

```txt
1 - sync
4 - sync
3 - promise callback will go in micro task
2 - setTimeout callback goes to macro task
```

### Why does return inside `.then()` matter?

Because it changes the Promise chain resolution.

### What happens if you don't return a Promise inside a `then()`?

It resolves with undefined -> breaking chaining.

### Why Promise.all() fails fast?

Because it rejects as soon as first Promise rejects.

### Why Promise.any() is useful?

It waits for first success instead of first settle.

### Does finally() receive arguments?

No. It does not get resolved value or the error.

### Can Promises be cancelled?

Not directly - You must use:

- abortController
- External resolve/reject
- Wrapper logic ("cancelable promise")

### Promise.all Polyfill

```js
Promise.myAll = function(promises){
    return new Promise((resolve, reject)=>{
        const results = [];
        let count = 0;

        promises.forEach((p, i)=>{
            Promise.resolve(p).then(value => {
                result[i] = value;
                count++;
                if(count === promise.length) resolve(results);
            }).catch(reject); // fail fast
        })
    })
}
```

### Promise.race Polyfill

```js
Promise.myRace = function(promises) => {
    return new Promise((resolve, reject)=>{
        promises.forEach((p, i)=>{
            Promise.resolve(p).then(resolve).catch(reject);
        });
    });
}
```

### Promise.allSettled Polyfill

```js
Promise.myAllSettled = function(promises){
    return new Promise((resolve)=>{
        const results = [];
        let count = 0;

        promises.forEach((p, i)=>{
            Promise.resolve(p)
            .then(value => result[i] = {status: "fulfilled", value})
            catch(reason => results[i] = {status: "rejected", reason})
            .finally(()=>{
                count++;
                if(count === promise.length){
                    resolve(results);
                }
            })
        })
    })
}
```

### Promise.any Polyfill

```js
Promise.myAny = function (promises){
    return new Promise((resolve, reject)=>{
        let errors = [];
        let count = 0;

        promises.forEach((p, i)=>{
            Promise.resolve(p).then(resolve).catch(err=>{
                error[i] = err;
                count++;
                if(count === promise.length){
                    reject (new AggregateError(errors, "All Promise Failed"));
                }
            })
        })
    })
}
```

## Promise Pool

A promise pool (also called concurrency limiter or task pool) is:

A mechanism to run only N Promise concurrently out of a larger list.

Why Do we need it?

- Prevent API rate limit exhaustion
- Avoid memory overload
- Avoid overwhelming servers
- Browser/network limits

```js
/**
 * 
 * @param {*} tasks list of promises
 * @param {*} limit no of concurrent promise run
 * @returns 
 */

function promisePool(tasks, limit){
    let active = 0;
    let index = 0;

    return new Promise(resolve=>{
        function runNext(){
            if(index === tasks.length && active === 0){
                return resolve();
            }

            while(active < limit && index < tasks.length){
                const task = tasks[index++];
                active++;
                task().finally(()=>{
                    active--;
                    runNext();
                });
            }
        }
        runNext();
    })
}
```

## async/await

