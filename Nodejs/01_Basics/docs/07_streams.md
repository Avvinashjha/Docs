## `streams` Module

Streams are one of Node.js’s most **powerful features** — they let you process data **in chunks**, not all at once.

> 🔗 Docs: [https://nodejs.org/api/stream.html](https://nodejs.org/api/stream.html)

### ✅ 3.6.1 Why Use Streams?

Imagine a 1GB video file:
- **Without streams**: Load entire file into memory → high RAM usage
- **With streams**: Process 64KB at a time → low memory, faster start

Used in:
- File uploads/downloads
- Video/audio processing
- Large dataset transformations

---

### ✅ 3.6.2 Four Types of Streams

| Type | Description | Example |
|------|-----------|--------|
| **Readable** | Data source (you read from it) | `fs.createReadStream()` |
| **Writable** | Data destination (you write to it) | `fs.createWriteStream()` |
| **Duplex** | Both readable and writable | TCP sockets |
| **Transform** | Modify data as it passes | Compressing, encoding |

---

### ✅ 3.6.3 Piping: `readableStream.pipe(writableStream)`

The easiest way to use streams:

```js
const fs = require('fs');

// Copy a large file efficiently
const readStream = fs.createReadStream('big-file.zip');
const writeStream = fs.createWriteStream('copy.zip');

// Pipe data chunk by chunk
readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('Copy complete!');
});
```

> 🚀 This uses minimal memory and starts immediately.

---

### ✅ 3.6.4 Event-Based Streaming

Streams are also **EventEmitters**:

```js
const readStream = fs.createReadStream('data.txt');

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
  // Process each chunk (e.g., search, transform)
});

readStream.on('end', () => {
  console.log('All data read');
});

readStream.on('error', (err) => {
  console.error('Stream error:', err);
});
```

---

### ✅ 3.6.5 Backpressure & Flow Control

If the writable stream is slow, Node.js **pauses** the readable stream automatically.

But you can also handle it manually:

```js
const readStream = fs.createReadStream('huge.log');
const writeStream = fs.createWriteStream('processed.log');

readStream.on('data', (chunk) => {
  if (!writeStream.write(chunk)) {
    readStream.pause(); // Slow down
  }
});

writeStream.on('drain', () => {
  readStream.resume(); // Resume when ready
});
```

> 💡 `pipe()` handles this automatically — so use it unless you need custom logic.

---

### ✅ 3.6.6 Transform Stream Example: Uppercase Filter

Create a custom **Transform** stream:

```js
const { Transform } = require('stream');

const upperStream = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

process.stdin.pipe(upperStream).pipe(process.stdout);
```

Run:
```bash
echo "hello world" | node uppercase.js
```
Output: `HELLO WORLD`

> 🛠 Use Case: Real-time log processors, data sanitizers, compressors.

---

## 🧩 Summary: Core Modules Overview

| Module | Purpose | Real-World Use |
|-------|--------|----------------|
| `fs` | Read/write files | Logs, configs, uploads |
| `path` | Safe file paths | Cross-platform apps |
| `http` | Create servers | APIs, web apps |
| `os` | System info | Monitoring, CLI tools |
| `events` | Custom events | Logging, notifications |
| `streams` | Chunked data | Large files, real-time |

---

You’ve now mastered the **core Node.js modules** that power every backend application.

### ✅ What’s Next?

Now that you understand the **foundation**, you’re ready to move to **Phase 2: Backend Development** with **Express.js**, **REST APIs**, and **databases**.