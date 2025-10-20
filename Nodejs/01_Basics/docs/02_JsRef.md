## JavaScript Refresher (ES6+ Features)

### ✅ **2.1 Arrow Functions**

#### 🔹 What is it?
Arrow functions (`=>`) are a shorter syntax for writing functions in JavaScript.

#### 🔹 Syntax: `() => {}` vs `function(){}`
```js
// Traditional function
function greet(name) {
  return "Hello " + name;
}

// Arrow function
const greet = (name) => {
  return "Hello " + name;
};

// Even shorter (implicit return)
const greet = name => `Hello ${name}`;
```

> ✅ Tip: If only one parameter and one line, you can skip `{}` and `return`.

#### 🔹 Lexical `this` Binding
This is **super important** in Node.js and backend code.

- Regular functions have their own `this`.
- Arrow functions **inherit `this` from the parent scope**.

```js
function Timer() {
  this.seconds = 0;

  // ❌ Bad: 'this' inside setTimeout refers to global object
  setInterval(function() {
    this.seconds++; // this = undefined (in strict mode)
  }, 1000);

  // ✅ Good: Arrow function keeps 'this' from Timer
  setInterval(() => {
    this.seconds++; // this = Timer instance
  }, 1000);
}
```

#### 🔹 Real-World Use Case
In Express.js middleware or event handlers:
```js
app.get('/user', (req, res) => {
  // Clean, short, and 'this' won't cause issues
  res.json({ user: 'John' });
});
```

#### 🔹 Limitations
- No `arguments` object:
  ```js
  const logArgs = () => {
    console.log(arguments); // ❌ ReferenceError
  };
  ```
- Not suitable for methods in objects:
  ```js
  const user = {
    name: "Alice",
    sayHi: () => console.log(`Hi, I'm ${this.name}`) // ❌ 'this' not bound
  };
  user.sayHi(); // "Hi, I'm undefined"
  ```

> ✅ Use regular functions or method shorthand for object methods.

---

### ✅ **2.2 Promises**

#### 🔹 What is a Promise?
A **Promise** represents a value that may be available now, later, or never. It has three states:
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

#### 🔹 Creating a Promise
```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data fetched!");
      } else {
        reject(new Error("Failed to fetch"));
      }
    }, 1000);
  });
};
```

#### 🔹 Chaining: `.then()`, `.catch()`, `.finally()`
```js
fetchData()
  .then(data => {
    console.log(data); // "Data fetched!"
    return data.toUpperCase();
  })
  .then(upperData => {
    console.log(upperData); // "DATA FETCHED!"
  })
  .catch(err => {
    console.error("Error:", err.message);
  })
  .finally(() => {
    console.log("Cleanup done");
  });
```

#### 🔹 Error Handling in Async Flows
Promises prevent "callback hell" and make error handling cleaner:
```js
readFile('config.json')
  .then(parseJSON)
  .then(connectToDB)
  .then(runQuery)
  .catch(err => {
    // One place to handle any error in the chain
    console.error("Setup failed:", err);
  });
```

#### 🔹 Common Pitfall: Unhandled Rejections
If a promise rejects and there’s no `.catch()`, Node.js logs a warning:
```js
Promise.reject("Oops"); // UnhandledPromiseRejectionWarning
```

✅ Fix: Always handle errors:
```js
someAsyncOp().catch(err => console.error(err));
```

#### 🔹 Real-World Use Case
Fetching user data from an API:
```js
fetch('https://api.example.com/users/1')
  .then(res => res.json())
  .then(user => console.log(user.name))
  .catch(err => console.error("Network error:", err));
```

---

### ✅ **2.3 Async/Await**

#### 🔹 Syntactic Sugar Over Promises
`async/await` makes asynchronous code look synchronous — easier to read and debug.

#### 🔹 `async` Functions Always Return a Promise
```js
async function getUser() {
  return { id: 1, name: "John" };
}
// Same as:
// return Promise.resolve({ id: 1, name: "John" });
```

#### 🔹 `await` Pauses Execution Until Resolved
```js
async function displayUser() {
  try {
    const response = await fetch('/api/user/1');
    const user = await response.json();
    console.log(user.name);
  } catch (err) {
    console.error("Failed to load user:", err);
  }
}
```

No `.then()` chains — just linear code!

#### 🔹 Error Handling with `try/catch`
Much cleaner than `.catch()`:
```js
async function saveToFile(data) {
  try {
    await fs.promises.writeFile('data.json', JSON.stringify(data));
    console.log("Saved!");
  } catch (err) {
    console.error("Save failed:", err);
  }
}
```

#### 🔹 Parallel Execution
Run multiple async operations at once:

```js
// ❌ Sequential (slower)
const user = await getUser();
const posts = await getPosts();

// ✅ Parallel (faster)
const [user, posts] = await Promise.all([
  getUser(),
  getPosts()
]);
```

Use `Promise.allSettled()` if you want results even if some fail:
```js
const results = await Promise.allSettled([task1(), task2(), task3()]);
results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    console.log(`Task ${i} succeeded:`, result.value);
  } else {
    console.log(`Task ${i} failed:`, result.reason);
  }
});
```

#### 🔹 Real-World Use Case
In a REST API endpoint:
```js
app.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.findByUser(req.params.id);
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: "Failed to load profile" });
  }
});
```

---

### ✅ **2.4 Modules (CommonJS vs ES Modules)**

#### 🔹 CommonJS (Node.js Default)
Used in most older Node.js projects.

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3)); // 5
```

- ✅ Simple, synchronous
- ❌ Only works in Node.js
- ❌ No static analysis (can't detect unused exports)

#### 🔹 ES Modules (ESM) – Modern Standard
Now supported in Node.js. Uses `import`/`export`.

```js
// math.mjs or package.json with "type": "module"
export const add = (a, b) => a + b;

// app.mjs
import { add } from './math.js';
console.log(add(2, 3)); // 5
```

To use ESM:
- Rename file to `.mjs`, OR
- Add `"type": "module"` in `package.json`

#### 🔹 Dynamic Imports: `import()`
Load modules conditionally or lazily:
```js
if (user.isAdmin) {
  const adminTools = await import('./admin.js');
  adminTools.deleteUser();
}
```

Useful for performance and feature flags.

#### 🔹 Converting Between CommonJS and ESM
```js
// In ESM, to require a CommonJS module:
import express from 'express'; // Works automatically

// In CommonJS, to import ESM:
const { createRequire } = require('module');
const require = createRequire(import.meta.url);
const config = require('./config.json');
```

#### 🔹 Real-World Use Case
Building a plugin system:
```js
// plugins/email.js
export function sendWelcomeEmail(user) { ... }

// plugins/sms.js
export function sendWelcomeSMS(user) { ... }

// service.js
const loadPlugins = async () => {
  const plugins = await Promise.all([
    import('./plugins/email.js'),
    import('./plugins/sms.js')
  ]);
  plugins.forEach(p => p.init());
};
```

---

### ✅ **2.5 Callbacks & the Event Loop**

#### 🔹 What Are Callbacks?
A function passed as an argument to another function, to be called later.

```js
function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data loaded");
  }, 1000);
}

fetchData((err, data) => {
  if (err) throw err;
  console.log(data);
});
```

This pattern was common before Promises.

#### 🔹 Callback Hell / Pyramid of Doom
When callbacks are nested deeply:
```js
readFile('a.json', (err, dataA) => {
  parse(dataA, (err, parsedA) => {
    readFile('b.json', (err, dataB) => {
      parse(dataB, (err, parsedB) => {
        combine(parsedA, parsedB, (err, result) => {
          console.log(result);
        });
      });
    });
  });
});
```

Hard to read, debug, and maintain.

✅ Solution: Use **Promises** or **async/await**.

#### 🔹 Best Practices: Error-First Callbacks
Standard in Node.js core APIs:
```js
fs.readFile('file.txt', (err, data) => {
  if (err) {
    return console.error("Read failed:", err);
  }
  console.log(data.toString());
});
```

Always check `err` first.

---

### 🔁 **Event Loop Deep Dive**

Node.js runs on a single thread, but handles concurrency via the **event loop**.

#### 🔹 How It Works
Think of it like a restaurant:
- **Call Stack**: What’s currently being executed
- **Callback Queue (Macrotask)**: `setTimeout`, `setInterval`, I/O callbacks
- **Microtask Queue**: `Promise.then`, `process.nextTick`
- **Node API**: Background threads (file system, network, etc.)

#### 🔹 Phases of the Event Loop
Each "tick" goes through phases:
1. **Timers**: Run `setTimeout`, `setInterval` callbacks
2. **I/O callbacks**: Handle system events
3. **Idle, prepare**: Internal use
4. **Poll**: Retrieve new I/O events
5. **Check**: Run `setImmediate()` callbacks
6. **Close**: Clean up (e.g., socket close)

#### 🔹 `process.nextTick()` vs `setImmediate()`

```js
console.log('Start');

process.nextTick(() => console.log('nextTick'));

setImmediate(() => console.log('setImmediate'));

Promise.resolve().then(() => console.log('Promise'));

console.log('End');

// Output:
// Start
// End
// nextTick
// Promise
// setImmediate
```

- `process.nextTick()` runs **before** the next phase (highest priority)
- `Promise.then()` is also microtask (runs after `nextTick`)
- `setImmediate()` runs in the **Check** phase (later)

> ⚠️ Overusing `process.nextTick()` can starve the event loop!

#### 🔹 `setTimeout(() => {}, 0)` vs `setImmediate()`
Both schedule work, but:
- `setTimeout(..., 0)` → runs in **Timers** phase
- `setImmediate()` → runs in **Check** phase

Usually, `setImmediate()` runs first, but it depends on context.

#### 🔹 Starvation of the Event Loop
If your code runs a long loop, it blocks everything:
```js
while (true) {
  // Nothing else can run — server stops responding!
}
```

Or too many `nextTick` calls:
```js
process.nextTick(() => {
  process.nextTick(() => { /* ... */ });
});
// Starves the event loop — no I/O can happen!
```

✅ Always yield control: Use `setImmediate`, `setTimeout`, or break up work.

#### 🔹 Real-World Use Case
Handling thousands of WebSocket connections efficiently:
- Each message triggers a callback
- The event loop processes them one by one without blocking
- Non-blocking I/O ensures the server stays responsive

---

### 🧪 Summary Table

| Feature | Best For | Avoid When |
|-------|--------|-----------|
| **Arrow Functions** | Short callbacks, lexical `this` | Object methods, constructors |
| **Promises** | Async chains, error handling | Deep nesting (use `async/await`) |
| **Async/Await** | Clean, readable async code | Forgetting `try/catch` |
| **ES Modules** | Modern apps, tree-shaking | Legacy environments |
| **Event Loop** | Scalable I/O apps | CPU-heavy tasks |

---