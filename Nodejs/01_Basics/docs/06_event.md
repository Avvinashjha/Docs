## `events` Module

The `events` module is the **foundation of Node.js event-driven architecture**.

> 🔗 Docs: [https://nodejs.org/api/events.html](https://nodejs.org/api/events.html)

### ✅ 3.5.1 EventEmitter Basics

Everything in Node.js that emits events (like `http.Server`, `fs.ReadStream`) uses `EventEmitter`.

```js
const EventEmitter = require('events');

// Create a custom event emitter
class Logger extends EventEmitter {
  log(msg) {
    this.emit('message', { data: msg });
  }
}

const logger = new Logger();

// Listen for 'message' event
logger.on('message', (data) => {
  console.log('Log:', data.data);
});

// Trigger event
logger.log('User logged in');     // Output: Log: User logged in
logger.log('File uploaded');      // Output: Log: File uploaded
```

### ✅ 3.5.2 Event Listener Methods

| Method | Purpose |
|------|--------|
| `.on(event, fn)` | Listen for an event |
| `.once(event, fn)` | Listen **once** (auto-removes) |
| `.emit(event)` | Trigger an event |
| `.removeListener(event, fn)` | Remove a listener |
| `.off(event, fn)` | Same as removeListener (Node.js >=10) |

#### Example: One-Time Initialization
```js
server.once('ready', () => {
  console.log('Server initialized — will not repeat');
});
```

#### Example: Cleanup
```js
function handleConnection(socket) {
  function onData(data) { /* ... */ }
  socket.on('data', onData);

  socket.on('close', () => {
    socket.removeListener('data', onData); // Clean up
  });
}
```

### 🔧 Real-World Use Cases

- **Logging systems**
- **WebSocket events** (user connected/disconnected)
- **File upload progress**
- **Microservices communication**

> 💡 Express.js, Socket.IO, and many libraries are built on `EventEmitter`.

---