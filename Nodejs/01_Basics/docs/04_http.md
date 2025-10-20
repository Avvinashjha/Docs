## 🌐 `http` & `https` (Creating Servers)

Node.js has a built-in `http` module — no need for external libraries to create a server.

### ✅ 3.2.1 Creating a Basic HTTP Server

From the official example:
```js
// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000');
});
```

Run with:
```bash
node server.mjs
```

> 🌍 Visit [http://127.0.0.1:3000](http://127.0.0.1:3000) → You’ll see "Hello World!"

---

### ✅ 3.2.2 Handling Requests and Responses

#### Request Object (`req`)
```js
createServer((req, res) => {
  console.log('Method:', req.method);     // 'GET', 'POST'
  console.log('URL:', req.url);           // '/api/users', '/favicon.ico'
  console.log('Headers:', req.headers);   // { 'user-agent': '...', 'content-type': '...' }
});
```

#### Response Object (`res`)
```js
res.writeHead(200, { 'Content-Type': 'application/json' });
res.write('{"message": "Hello"}');
res.end(); // Required!
```

> ⚠️ Always call `res.end()` — otherwise the browser waits forever.

---

### ✅ 3.2.3 Simple Routing Based on URL

```js
createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'John' }]));
  } else if (req.method === 'POST' && req.url === '/api/users') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end('User created');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
```

> 🛠 Use Case: Build a minimal REST API without Express.

---

### ✅ 3.2.4 Serving Static Files Manually

Serve HTML, CSS, JS files:

```js
const fs = require('fs');
const path = require('path');

createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(content);
    }
  });
}).listen(3000);

function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.png': return 'image/png';
    default: return 'text/html';
  }
}
```

> 🛠 Use Case: Custom static file server or SPA host.

---

### ✅ 3.2.5 Redirects and Status Codes

```js
if (req.url === '/old-page') {
  res.writeHead(301, { 'Location': '/new-page' });
  res.end();
}
```

Common codes:
- `200`: OK
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

---

### ✅ 3.2.6 HTTPS Server Setup

For secure connections (SSL/TLS):

```js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Secure Hello!');
}).listen(443);
```

> 🔐 You need SSL certificates (from Let’s Encrypt, AWS, etc.)

---

### ✅ 3.2.7 Limitations of Raw `http` Module

While powerful, `http` is **low-level**:
- No built-in routing (like `/users/:id`)
- No middleware (logging, auth, parsing)
- Manual request body parsing
- No error handling helpers

> ✅ That’s why we use **Express.js** — it simplifies all of this!

---

We’ve now covered:
- ✅ `fs` – reading/writing files
- ✅ `path` – safe file paths
- ✅ `http` – creating servers and APIs
