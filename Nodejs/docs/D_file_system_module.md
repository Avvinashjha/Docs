# 📁 **Node.js `fs` Module — From Basic to Advanced**

The **`fs` (File System)** module in Node.js allows you to interact with the file system: create files, read files, write data, delete files, watch changes, work with streams, and more.

You can use it in two ways:

```js
const fs = require('fs');              // CommonJS
import fs from 'fs';                   // ES Modules
```

---

## 🟩 **1. BASIC USAGE**

### **1.1 Reading files**

#### **Synchronous**

```js
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
```

#### **Asynchronous (recommended)**

```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

---

### **1.2 Writing files**

#### **Write or overwrite**

```js
fs.writeFile('test.txt', 'Hello World!', (err) => {
  if (err) throw err;
  console.log('File created');
});
```

#### **Append to file**

```js
fs.appendFile('test.txt', 'More text\n', (err) => {
  if (err) throw err;
});
```

---

### **1.3 Deleting files**

```js
fs.unlink('test.txt', err => {
  if (err) throw err;
});
```

---

### **1.4 Checking if a file exists**

```js
fs.access('file.txt', fs.constants.F_OK, (err) => {
  console.log(err ? 'File does NOT exist' : 'File exists');
});
```

---

## 🟦 **2. WORKING WITH DIRECTORIES**

### **2.1 Create a directory**

```js
fs.mkdir('myFolder', { recursive: true }, (err) => {
  if (err) throw err;
});
```

### **2.2 Read directory contents**

```js
fs.readdir('./', (err, files) => {
  console.log(files);
});
```

### **2.3 Remove directory**

```js
fs.rmdir('myFolder', err => {
  if (err) throw err;
});
```

---

## 🟨 **3. FS WITH PROMISES (Modern)**

Node provides a **promise-based API**, ideal for `async/await`.

```js
const fs = require('fs/promises');

async function readFile() {
  const data = await fs.readFile('file.txt', 'utf8');
  console.log(data);
}

readFile();
```

---

## 🟧 **4. ADVANCED FS FEATURES**

### **4.1 File Streams (for large files)**

Streams let you read/write huge files **without loading all data into memory**.

#### Read stream

```js
const rs = fs.createReadStream('big.txt', 'utf8');
rs.on('data', chunk => console.log(chunk));
```

#### Write stream

```js
const ws = fs.createWriteStream('output.txt');
ws.write('Hello\n');
ws.end('Done');
```

#### Pipe data (copy file efficiently)

```js
fs.createReadStream('big.txt')
  .pipe(fs.createWriteStream('copy.txt'));
```

---

### **4.2 Watching files for changes**

```js
fs.watch('file.txt', (event, filename) => {
  console.log(`File changed: ${filename}`);
});
```

Useful for build tools, live servers, etc.

---

### **4.3 File Stats and Metadata**

```js
fs.stat('file.txt', (err, stats) => {
  console.log(stats.isFile());     // true/false
  console.log(stats.size);         // file size
  console.log(stats.mtime);        // last modified
});
```

---

## 🟥 **5. WORKING WITH PATHS**

You often use the `path` module with `fs`:

```js
const path = require('path');
const filepath = path.join(__dirname, 'folder', 'file.txt');
```

---

## 🟪 **6. FS EXTRA FEATURES**

## **6.1 Copy a file**

```js
fs.copyFile('source.txt', 'dest.txt', err => {
  if (err) throw err;
});
```

---

### **6.2 Rename or move files**

```js
fs.rename('old.txt', 'new.txt', err => {
  if (err) throw err;
});
```

---

## 🟦 **7. ERROR HANDLING & COMMON ERRORS**

| Error Code | Meaning                             |
| ---------- | ----------------------------------- |
| `ENOENT`   | File or directory does not exist    |
| `EACCES`   | Permission denied                   |
| `EBUSY`    | File is busy                        |
| `EISDIR`   | Expected a file but got a directory |

Example:

```js
try {
  const data = fs.readFileSync('unknown.txt');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('File not found');
  }
}
```

---

## 🟩 **8. BEST PRACTICES**

* Prefer **async** or **promises** over sync methods.
* Use **streams** for large files.
* Always handle errors properly.
* Validate input paths to avoid security issues.
* Use `fs.promises` in modern applications.

---
