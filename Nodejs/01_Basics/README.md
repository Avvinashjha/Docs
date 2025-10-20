## 📅 **Chapter 1: Core Node.js Basics**

### **1. Introduction to Node.js**

#### **1.1 What is Node.js?**
- Definition: JavaScript runtime built on Chrome’s V8 engine
- Purpose: Run JavaScript outside the browser (server-side)
- Created by Ryan Dahl (2009)
- Use cases: APIs, microservices, real-time apps, CLI tools, etc.
- Architecture: Single-threaded, event-driven, non-blocking I/O

#### **1.2 Event-Driven, Non-blocking I/O**
- Understanding blocking vs non-blocking operations
- How Node.js handles asynchronous operations
- The role of the **event loop** in managing callbacks
- Benefits: High scalability, efficient handling of concurrent requests
- Limitations: Not ideal for CPU-intensive tasks

#### **1.3 Node.js vs. Traditional Servers (e.g., Apache)**
- Traditional servers: One thread per connection (synchronous, blocking)
- Node.js: Single-threaded with event loop (asynchronous, non-blocking)
- Comparison: Throughput, concurrency, memory usage
- When to use Node.js vs other backends (e.g., Python, Java, PHP)

#### **1.4 Installing Node.js & NPM**
- Downloading Node.js from [nodejs.org](https://nodejs.org/)
- LTS vs Current versions
- Verifying installation: `node --version`, `npm --version`
- Using Node Version Manager (nvm) for version control (macOS/Linux)
- Using nvm-windows (for Windows)
- Setting up a basic project: `node app.js`

---

### **2. JavaScript Refresher (ES6+ Features)**

#### **2.1 Arrow Functions**
- Syntax: `() => {}` vs `function(){}`
- Lexical `this` binding
- Implicit return
- Limitations: No `arguments`, not suitable for methods

#### **2.2 Promises**
- What is a Promise? (Pending, Fulfilled, Rejected states)
- Creating promises: `new Promise((resolve, reject) => {})`
- Chaining: `.then()`, `.catch()`, `.finally()`
- Error handling in async flows
- Common pitfalls: Unhandled rejections

#### **2.3 Async/Await**
- Syntactic sugar over promises
- `async` functions always return a promise
- `await` to pause execution until promise resolves
- Error handling with `try/catch`
- Parallel execution: `Promise.all()`, `Promise.allSettled()`

#### **2.4 Modules (CommonJS vs ES Modules)**
- **CommonJS (Node.js default)**
  - `require()` and `module.exports`
  - Synchronous loading
  - File extensions optional
- **ES Modules (ESM)**
  - `import` / `export` syntax
  - Asynchronous by design
  - Requires `"type": "module"` in `package.json` or `.mjs` extension
- Converting between CommonJS and ESM
- Dynamic imports: `import()` function

#### **2.5 Callbacks & the Event Loop**
- What are callbacks? Functions passed as arguments
- Callback hell / pyramid of doom
- Best practices: Error-first callbacks
- **Event Loop Deep Dive**
  - Call stack, Callback queue (Macrotask), Microtask queue
  - Phases of the event loop: timers, I/O callbacks, idle, poll, check, close
  - `process.nextTick()` vs `setImmediate()`
  - How `setTimeout(() => {}, 0)` differs from `setImmediate()`
  - Starvation of the event loop due to long-running tasks

---

### **3. Node.js Core Modules**

#### **3.1 fs (File System)**
- Synchronous vs Asynchronous methods
  - `fs.readFileSync()` vs `fs.readFile()`
  - `fs.writeFileSync()` vs `fs.writeFile()`
- Reading and writing files
- Working with directories: `fs.mkdir()`, `fs.readdir()`, `fs.rmdir()`
- File stats: `fs.stat()`
- Streams: `fs.createReadStream()`, `fs.createWriteStream()`
- File paths: Using `path` module with `fs`
- Error handling in file operations

#### **3.2 http & https (Creating Servers)**
- Creating a basic HTTP server: `http.createServer()`
- Handling requests and responses
  - Request object: `req.method`, `req.url`, `req.headers`
  - Response object: `res.writeHead()`, `res.write()`, `res.end()`
- Routing based on URL/method
- Serving static files manually
- Redirects and status codes (200, 404, 301, etc.)
- HTTPS server setup (requires SSL certificates)
- Limitations of raw `http` module (leads to Express.js)

#### **3.3 path**
- `path.join()` – platform-safe path concatenation
- `path.resolve()` – resolve to absolute path
- `path.dirname()`, `path.basename()`, `path.extname()`
- Normalizing paths across OS (Windows vs Unix)

#### **3.4 os (Operating System)**
- `os.platform()`, `os.arch()`, `os.hostname()`
- `os.freemem()`, `os.totalmem()`
- `os.cpus()`, `os.networkInterfaces()`
- Use cases: System monitoring, environment checks

#### **3.5 events**
- EventEmitter class: `require('events')`
- Creating custom events: `.on()`, `.emit()`
- Removing listeners: `.removeListener()`, `.off()`
- Once-only listeners: `.once()`
- Error events and best practices
- Inheritance: Making objects emit events

#### **3.6 streams**
- What are streams? Efficient data handling in chunks
- Four types:
  - **Readable** (e.g., file read, HTTP request)
  - **Writable** (e.g., file write, HTTP response)
  - **Duplex** (both readable and writable)
  - **Transform** (modify data while streaming)
- Piping: `readableStream.pipe(writableStream)`
- Backpressure and flow control
- Practical example: Streaming large files without memory overload
- Event-based streaming: `'data'`, `'end'`, `'error'` events

---

### **4. NPM & Package Management**

#### **4.1 Installing Packages**
- Using `npm install <package>` (local)
- Using `npm install -g <package>` (global)
- Dev vs production dependencies: `--save-dev` vs `--save`
- Semantic versioning: `^`, `~`, exact versions
- Installing specific versions: `npm install express@4.18.0`

#### **4.2 package.json & Scripts**
- Structure of `package.json`
  - `name`, `version`, `description`, `main`, `scripts`, `dependencies`, `devDependencies`
- Initializing project: `npm init`, `npm init -y`
- Running scripts: `npm run <script-name>`
- Built-in scripts: `start`, `test`, `prestart`, `postinstall`
- Custom scripts: e.g., `dev`, `build`, `lint`

#### **4.3 Global vs Local Packages**
- **Local packages**
  - Installed in `node_modules/` of project
  - Accessible via `require()`
  - Version isolation per project
- **Global packages**
  - Installed system-wide
  - Used for CLI tools (e.g., `nodemon`, `npm`, `create-react-app`)
  - Not accessible via `require()`
- Managing global packages: `npm list -g --depth=0`
- Best practices: Prefer local packages when possible

#### **4.4 Additional NPM Concepts**
- `node_modules/` folder structure
- `package-lock.json` – ensures consistent installs
- `npm ci` vs `npm install` (for CI/CD)
- Publishing packages to npm (optional for beginners)
- Security: `npm audit`, `npm audit fix`
- Using `.npmrc` for configuration

---

### ✅ **Bonus: Tools & Best Practices (Recommended in Week 2)**

- **Nodemon**: Auto-restart server on file changes (`npm install -g nodemon`)
- **Prettier & ESLint**: Code formatting and linting setup
- **Debugging Node.js**: Using `console.log`, `debugger`, and VS Code debugger
- **Error Handling**: Try-catch, error events, graceful shutdown
- **Project Structure**: Organizing files (e.g., `app.js`, `routes/`, `utils/`)

---

### 🧪 **Hands-On Practice Suggestions**

1. Build a CLI tool that reads a file and prints stats (using `fs`, `os`, `path`)
2. Create a simple HTTP server that serves different responses based on URL
3. Implement a file watcher using `fs.watch()` and `EventEmitter`
4. Stream a large file (e.g., video) using `fs.createReadStream().pipe(res)`
5. Simulate async operations with `setTimeout` and manage with `async/await`
6. Write a custom event emitter for a "logger" that emits 'warn', 'error', 'info'

