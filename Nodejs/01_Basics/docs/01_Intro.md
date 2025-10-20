### ✅ **1.1 What is Node.js?**

#### 🔹 **Definition: JavaScript runtime built on Chrome’s V8 engine**
- **Node.js** is not a programming language. It’s a **runtime environment** that allows you to run **JavaScript code outside the web browser**.
- It uses **Google’s V8 JavaScript engine** — the same powerful engine that runs JavaScript in Google Chrome.
- This means Node.js can execute JavaScript very quickly because V8 compiles JS directly into machine code.

#### 🔹 **Purpose: Run JavaScript outside the browser (server-side)**
- Traditionally, JavaScript only ran in browsers (for things like animations, form validation, etc.).
- With Node.js, developers can now use JavaScript to:
  - Build **backend servers**
  - Create **APIs**
  - Write **command-line tools**
  - Automate tasks with **scripts**

> 💡 Think of it this way:  
> Before Node.js → JavaScript = Frontend only  
> After Node.js → JavaScript = Frontend **and** Backend

#### 🔹 **Created by Ryan Dahl (2009)**
- Ryan Dahl introduced Node.js at a conference in 2009.
- His goal was to create a platform for building **fast, scalable network applications** using an event-driven, non-blocking model.

#### 🔹 **Use cases: APIs, microservices, real-time apps, CLI tools, etc.**
Here are some real-world examples:
- 🌐 **Web Servers & APIs**: Power backends for websites and mobile apps.
- 🔁 **Real-Time Apps**: Chat apps, live notifications, gaming (e.g., using WebSockets).
- ⚙️ **CLI Tools**: Tools like `npm`, `create-react-app`, or custom scripts.
- 📦 **Microservices**: Small services that communicate over HTTP or messaging.
- 🤖 **Automation Scripts**: File processing, data scraping, backups.

#### 🔹 **Architecture: Single-threaded, event-driven, non-blocking I/O**
Let’s break this down:
- **Single-threaded**: Node.js uses one main thread to handle requests.
- **Event-driven**: Code responds to events (like a user visiting a page or a file finishing loading).
- **Non-blocking I/O**: When Node needs to read a file or talk to a database, it doesn’t wait — it moves on and comes back when the operation is done.

This architecture makes Node.js **very efficient** for handling many simultaneous connections — perfect for modern web apps!

---

### ✅ **1.2 Event-Driven, Non-blocking I/O**

#### 🔹 **Understanding blocking vs non-blocking operations**

Imagine you're at a coffee shop:

- **Blocking (Synchronous)**:
  - You order coffee → stand there waiting → can't do anything else until it's ready.
  - In code: One task must finish before the next starts.
  ```js
  // Blocking example (DON'T do this in Node!)
  const fs = require('fs');
  const data = fs.readFileSync('huge-file.txt'); // Pauses everything!
  console.log('File read!');
  ```

- **Non-blocking (Asynchronous)**:
  - You order coffee → sit down and work → get notified when it’s ready.
  - In code: Start a task, then keep going. Handle the result later via a **callback**, **promise**, or **async/await**.
  ```js
  // Non-blocking example (This is how Node.js works!)
  const fs = require('fs');
  fs.readFile('huge-file.txt', (err, data) => {
    if (err) throw err;
    console.log('File read!');
  });
  console.log('Doing something else...'); // This runs immediately!
  ```

#### 🔹 **How Node.js handles asynchronous operations**
Node.js uses **callbacks** and an internal system called the **event loop** to manage async work:
- You start an operation (e.g., reading a file).
- Node.js tells the OS to do it in the background.
- Once it's done, your **callback function** runs.

This keeps the main thread free to handle other requests.

#### 🔹 **The role of the Event Loop in managing callbacks**
The **event loop** is the magic behind Node.js performance.

Here’s how it works:
1. Your code runs line by line.
2. Async operations (like `setTimeout`, `fs.readFile`) are sent to the background.
3. When they finish, their **callbacks** go into a queue.
4. The event loop checks this queue and executes callbacks **one at a time**, when the main thread is free.

> 🔄 It's like a waiter taking orders from multiple tables and serving food as it comes out of the kitchen — never idle.

#### 🔹 **Benefits: High scalability, efficient handling of concurrent requests**
- Can handle **thousands of simultaneous connections** with low memory usage.
- Great for I/O-heavy apps (e.g., APIs talking to databases, file systems, networks).

#### 🔹 **Limitations: Not ideal for CPU-intensive tasks**
- Because it's single-threaded, heavy computations (like video encoding, large data analysis) can **block the main thread**.
- Solution: Offload CPU-heavy work to other processes or use **worker threads**.

> ⚠️ Example: Don’t use Node.js to render a 4K video. Use Python or C++ instead.

---

### ✅ **1.3 Node.js vs. Traditional Servers (e.g., Apache)**

Let’s compare how **Apache** (a traditional server) and **Node.js** handle web requests.

| Feature | Apache (Traditional) | Node.js |
|-------|------------------------|--------|
| **Threading Model** | One thread per connection | Single thread + Event Loop |
| **Concurrency** | Limited by number of threads | Handles thousands of connections efficiently |
| **Memory Usage** | High (each thread uses memory) | Low (shared single thread) |
| **I/O Handling** | Blocking (waits for each request) | Non-blocking (handles many at once) |
| **Best For** | CPU-heavy apps, PHP sites | Real-time apps, APIs, microservices |

#### 🔍 Analogy:
- **Apache** = Restaurant with one waiter per customer → expensive and limited.
- **Node.js** = One efficient waiter serving many tables → scalable and fast.

> So, Node.js wins in **throughput** and **scalability**, especially for apps with lots of I/O (like chat apps or APIs).

---

### ✅ **1.4 Installing Node.js & NPM**

#### 🔹 **Downloading Node.js from [nodejs.org](https://nodejs.org/)**
- Go to [https://nodejs.org](https://nodejs.org/)
- You’ll see two versions:
  - **LTS (Long Term Support)**: Stable, recommended for most users.
  - **Current**: Latest features, but may have bugs (best for testing).

👉 Always choose **LTS** unless you need new features.

#### 🔹 **LTS vs Current versions**
| Version | Stability | Use Case |
|-------|-----------|---------|
| **LTS** | ✅ High | Production apps, learning, companies |
| **Current** | ⚠️ Medium | Experimenting, early adopters |

#### 🔹 **Verifying installation: `node --version`, `npm --version`**
After installing, open your terminal and type:
```bash
node --version
```
You should see something like: `v20.15.1`

Then check npm (Node Package Manager):
```bash
npm --version
```
You should see a number like: `10.7.0`

If both commands show versions → Success! 🎉

#### 🔹 **Using Node Version Manager (nvm) for version control (macOS/Linux)**
Sometimes you need different Node.js versions for different projects.

**nvm** lets you switch between versions easily.

Install nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Then install and use a version:
```bash
nvm install 18
nvm use 18
nvm install 20
nvm use 20
```

#### 🔹 **Using nvm-windows (for Windows)**
On Windows, use **nvm-windows**:
- Download from: [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- Install it and use the same commands in Command Prompt or PowerShell.

#### 🔹 **Setting up a basic project: `node app.js`**
Let’s create your first Node.js app!

1. Create a file called `app.js`:
```js
console.log("Hello from Node.js!");
```

2. Run it:
```bash
node app.js
```

Output:
```
Hello from Node.js!
```

🎉 You just ran your first Node.js program!

---

### 🧪 Try This: Build a Simple HTTP Server

Using the example from the Node.js homepage:

Create a file called `server.mjs`:
```js
// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// Start the server on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000');
});
```

Run it:
```bash
node server.mjs
```

Now go to [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser → You’ll see: `Hello World!`

✅ Congrats! You’ve built a real web server with just 10 lines of code.

---

### Summary: What You’ve Learned

| Concept | Key Takeaway |
|-------|--------------|
| **Node.js** | Run JavaScript on the server using V8 |
| **Non-blocking I/O** | Never wait — handle many things at once |
| **Event Loop** | The engine that powers async behavior |
| **vs Apache** | Node.js scales better for I/O-heavy apps |
| **Installation** | Use LTS version, verify with `node --version` |
| **First App** | `node app.js` runs your script |
| **HTTP Server** | Built-in modules make it easy to create servers |
