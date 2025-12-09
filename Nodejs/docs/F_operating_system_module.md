Below is a **clear, complete, beginner-to-advanced explanation of the Node.js `os` module**, including examples for every concept.

---

# 🚀 **Node.js `os` Module — Basics to Advanced (with Examples)**

The **`os` module** in Node.js provides methods for interacting with the **operating system**.
It allows you to get system information like CPU details, memory, platform type, network interfaces, etc.

```js
const os = require('os');
```

---

# 🟢 **1. Basic Information Methods**

## ✔ **1.1 `os.hostname()`**

Returns the device’s hostname.

```js
console.log(os.hostname());
```

---

## ✔ **1.2 `os.platform()`**

Returns the OS platform.

```js
console.log(os.platform());
// win32, linux, darwin (macOS)
```

---

## ✔ **1.3 `os.type()`**

Returns OS name.

```js
console.log(os.type());
// Windows_NT, Linux, Darwin
```

---

## ✔ **1.4 `os.release()`**

OS version.

```js
console.log(os.release());
```

---

# 🔵 **2. CPU Information**

## ✔ **2.1 `os.cpus()`**

Returns details of each CPU core.

```js
console.log(os.cpus());
```

Output example (simplified):

```js
[
  {
    model: 'Intel i5',
    speed: 2400,
    times: { user: 1000, idle: 2000, ... }
  }
]
```

## ✔ **2.2 `os.arch()`**

Returns processor architecture.

```js
console.log(os.arch());
// x64, arm, ia32
```

---

# 🟣 **3. Memory Information**

## ✔ **3.1 `os.totalmem()`**

Total system memory (in bytes).

```js
console.log(os.totalmem());
```

## ✔ **3.2 `os.freemem()`**

Free system memory.

```js
console.log(os.freemem());
```

### Convert bytes to human-readable format

```js
const convert = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';

console.log('Total:', convert(os.totalmem()));
console.log('Free:', convert(os.freemem()));
```

---

# 🟠 **4. User and System Uptime**

## ✔ **4.1 `os.userInfo()`**

```js
console.log(os.userInfo());
```

Example:

```js
{ 
  username: 'john',
  homedir: '/home/john'
}
```

---

## ✔ **4.2 `os.uptime()`**

Returns seconds since the system started.

```js
console.log(os.uptime() + ' seconds');
```

---

# 🔴 **5. Network Information**

## ✔ **5.1 `os.networkInterfaces()`**

Shows details about network adapters.

```js
console.log(os.networkInterfaces());
```

Example output:

```js
{
  eth0: [
    { address: '192.168.1.2', family: 'IPv4', internal: false }
  ]
}
```

---

# 🟡 **6. File Paths & OS Constants**

## ✔ **6.1 `os.homedir()`**

Returns the current user’s home directory.

```js
console.log(os.homedir());
```

---

## ✔ **6.2 `os.tmpdir()`**

Default temp directory.

```js
console.log(os.tmpdir());
```

---

## ✔ **6.3 `os.EOL`**

End-of-line marker (platform-specific).

```js
console.log(JSON.stringify(os.EOL));
// "\n" on Linux/Mac
// "\r\n" on Windows
```

---

# 🧠 **7. Other Useful Properties**

## ✔ **7.1 `os.endianness()`**

CPU endianness.

```js
console.log(os.endianness());
// LE or BE
```

---

## ✔ **7.2 `os.constants`**

System-level constants (mostly for `fs` & process signals).

```js
console.log(os.constants.signals);
console.log(os.constants.errno);
```

---

# 🔥 **8. Practical Examples**

---

## 🚀 **Example 1: System Information Dashboard**

```js
const os = require('os');

console.log("===== SYSTEM INFO =====");
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Hostname:", os.hostname());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("Uptime:", os.uptime());
console.log("Home Directory:", os.homedir());
```

---

## 🚀 **Example 2: Network Interface Extractor**

Get all IPv4 addresses:

```js
const nets = os.networkInterfaces();
const results = {};

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      results[name] = net.address;
    }
  }
}

console.log(results);
```

---

## 🚀 **Example 3: Memory Monitor**

```js
setInterval(() => {
  const used = (os.totalmem() - os.freemem()) / os.totalmem() * 100;
  console.log('Memory Usage:', used.toFixed(2) + '%');
}, 2000);
```

---

## 🚀 **Example 4: Build a Temp File Path**

```js
const path = require('path');

const tempFile = path.join(os.tmpdir(), 'myfile-' + Date.now() + '.txt');

console.log(tempFile);
```

---

# 🎯 Summary Table

| Method                   | Purpose             |
| ------------------------ | ------------------- |
| `os.hostname()`          | Computer name       |
| `os.platform()`          | OS platform         |
| `os.arch()`              | CPU architecture    |
| `os.cpus()`              | CPU core details    |
| `os.totalmem()`          | Total RAM           |
| `os.freemem()`           | Free RAM            |
| `os.homedir()`           | User home folder    |
| `os.tmpdir()`            | Temp directory      |
| `os.uptime()`            | System uptime       |
| `os.networkInterfaces()` | Network info        |
| `os.EOL`                 | End-of-line         |
| `os.userInfo()`          | Logged-in user info |

---
