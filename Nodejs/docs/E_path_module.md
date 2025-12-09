# 🚀 **Node.js `path` Module — Basics to Advanced (with Examples)**

The **`path`** module in Node.js provides utilities for working with **file and directory paths**. It helps you handle paths in a way that works correctly on **all operating systems** (Windows, macOS, Linux).

```js
const path = require('path');
```

---

## ✅ **1. Why Use the `path` Module?**

Because file paths differ between operating systems:

| OS          | Path Separator |
| ----------- | -------------- |
| Windows     | `\`            |
| Linux/macOS | `/`            |

`path` abstracts these problems so your code works everywhere.

---

## 📌 **2. Basics of the Path Module**

### ✔ **2.1 `path.basename()`**

Returns the filename part of a path.

```js
const file = path.basename('/user/docs/file.txt');
console.log(file); // file.txt
```

### ✔ **2.2 `path.dirname()`**

Returns the directory name.

```js
path.dirname('/user/docs/file.txt');
// /user/docs
```

### ✔ **2.3 `path.extname()`**

Returns the file extension.

```js
path.extname('file.txt');
// .txt
```

---

## 📌 **3. Working with Path Components**

### ✔ **3.1 `path.join()`**

Joins path segments using the correct separator.

```js
const p = path.join('user', 'docs', 'file.txt');
console.log(p);
// user/docs/file.txt  (Linux/macOS)
// user\docs\file.txt  (Windows)
```

**Automatically removes duplicate separators:**

```js
path.join('/user/', '/docs/', 'file.txt');
// /user/docs/file.txt
```

---

### ✔ **3.2 `path.resolve()`**

Resolves a sequence of paths into an **absolute path**.

```js
path.resolve('folder', 'subfolder', 'file.txt');
```

Output example:

```txt
/Users/yourname/project/folder/subfolder/file.txt
```

**Difference from `path.join()`**:

| join()                                | resolve()                |
| ------------------------------------- | ------------------------ |
| Concatenates paths                    | Creates absolute path    |
| Does NOT consider current working dir | Uses current working dir |
| Does NOT resolve `..`                 | Resolves `..` & `.`      |

Example:

```js
path.join('/a', '/b');       // /a/b
path.resolve('/a', '/b');    // /b (because /b is absolute)
```

---

### ✔ **3.3 `path.normalize()`**

Fixes malformed paths.

```js
path.normalize('/user//docs/../file.txt');
// /user/file.txt
```

---

## 📌 **4. OS-Specific Values**

### ✔ `path.sep`

Returns the OS path separator.

```js
console.log(path.sep);
// '\' on Windows
// '/' on Linux/macOS
```

### ✔ `path.delimiter`

Used for PATH environment variable.

```js
console.log(path.delimiter);
// ';' on Windows
// ':' on Linux/macOS
```

---

## 📌 **5. Parsing & Formatting Paths**

### ✔ **5.1 `path.parse()`**

Breaks a path into its components.

```js
const info = path.parse('/home/user/file.txt');
console.log(info);
```

Output:

```js
{
  root: '/',
  dir: '/home/user',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
```

---

### ✔ **5.2 `path.format()`**

Creates a path from parsed parts.

```js
path.format({
  dir: '/home/user',
  name: 'file',
  ext: '.txt'
});
```

Output:

```
/home/user/file.txt
```

---

## 🔥 **6. Advanced Concepts**

---

### ✔ **6.1 Handling File Paths Safely for All OS**

To build paths in a cross-platform way:

```js
const filePath = path.join(__dirname, 'data', 'users.json');
```

Works on:

* Windows → `C:\project\data\users.json`
* Linux → `/home/user/project/data/users.json`

---

### ✔ **6.2 Checking if a Path Is Absolute**

```js
path.isAbsolute('/home/user'); // true
path.isAbsolute('file.txt');   // false
```

---

### ✔ **6.3 Getting Relative Path Between Two Locations**

```js
path.relative('/home/user/docs', '/home/user/images');
// ../images
```

---

### ✔ **6.4 Create File Paths Dynamically**

```js
const uploads = path.resolve(__dirname, 'uploads', Date.now() + '.txt');
console.log(uploads);
```

---

### ✔ **6.5 Using `path` with `fs` Module**

Example: read a file safely:

```js
const fs = require('fs');

const filePath = path.join(__dirname, 'data', 'info.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(JSON.parse(data));
});
```

---

## 🧠 **7. Real-World Example: Serving Static Files (Express)**

```js
const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000);
```

---

## 🧪 **8. Real-World Example: Path Validation & Normalization**

Protect against directory traversal attacks:

```js
function safeJoin(base, target) {
  const targetPath = path.resolve(base, target);
  if (!targetPath.startsWith(base)) {
    throw new Error("Invalid path!");
  }
  return targetPath;
}

const allowed = '/var/www/uploads';
console.log(safeJoin(allowed, '../etc/passwd')); // ❌ throws error
```

---

## 🎯 **Summary Table**

| Function       | Purpose                         |
| -------------- | ------------------------------- |
| `basename()`   | Get filename                    |
| `dirname()`    | Get parent directory            |
| `extname()`    | Get extension                   |
| `join()`       | Combine paths                   |
| `resolve()`    | Absolute path                   |
| `normalize()`  | Fix malformed paths             |
| `parse()`      | Break path into parts           |
| `format()`     | Build path from parts           |
| `isAbsolute()` | Check if path is absolute       |
| `relative()`   | Relative path between two paths |
| `sep`          | Path separator                  |
| `delimiter`    | OS delimiter                    |

---
