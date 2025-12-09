Here’s a **complete, structured guide on Node.js with MySQL**, covering **basic to advanced concepts**, with examples, best practices, and scalable patterns. This will take you from connecting Node.js to MySQL to building **production-ready applications**.

---

# 🚀 **1. Introduction: Node.js + MySQL**

Node.js is a **JavaScript runtime** for server-side applications.
MySQL is a **relational database**.

Combining them allows you to build **full-stack applications**:

* REST APIs
* CRUD apps
* Data-driven dashboards
* E-commerce platforms

---

# 🟢 **2. Setup MySQL**

### 1️⃣ Install MySQL

* Windows/Mac/Linux: [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
* Create a database:

```sql
CREATE DATABASE node_mysql_db;
```

* Create a user:

```sql
CREATE USER 'node_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON node_mysql_db.* TO 'node_user'@'localhost';
FLUSH PRIVILEGES;
```

---

### 2️⃣ Install Node.js

* Install Node: [https://nodejs.org/](https://nodejs.org/)

---

# 🟡 **3. Connecting Node.js to MySQL**

### Install MySQL driver

```bash
npm install mysql2
```

### Basic Connection Example

```js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "node_user",
  password: "password",
  database: "node_mysql_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

connection.query("SELECT 1 + 1 AS solution", (err, results) => {
  if (err) throw err;
  console.log("Result:", results[0].solution);
});
```

---

# 🟢 **4. CRUD Operations**

Assume a table `users`:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);
```

---

### 1️⃣ CREATE

```js
connection.query(
  "INSERT INTO users (name, email) VALUES (?, ?)",
  ["Alice", "alice@example.com"],
  (err, result) => {
    if (err) throw err;
    console.log("User inserted:", result.insertId);
  }
);
```

---

### 2️⃣ READ

```js
connection.query("SELECT * FROM users", (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

---

### 3️⃣ UPDATE

```js
connection.query(
  "UPDATE users SET name=? WHERE id=?",
  ["Alice Updated", 1],
  (err, result) => {
    if (err) throw err;
    console.log("Rows affected:", result.affectedRows);
  }
);
```

---

### 4️⃣ DELETE

```js
connection.query("DELETE FROM users WHERE id=?", [1], (err, result) => {
  if (err) throw err;
  console.log("Deleted rows:", result.affectedRows);
});
```

---

# 🟡 **5. Using Promises / Async-Await**

`mysql2` supports promises:

```bash
npm install mysql2
```

```js
const mysql = require("mysql2/promise");

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "node_user",
    password: "password",
    database: "node_mysql_db",
  });

  const [rows] = await connection.execute("SELECT * FROM users");
  console.log(rows);
}

main();
```

✅ Cleaner than callbacks.

---

# 🔵 **6. Using a Connection Pool (Recommended for Production)**

```js
const pool = mysql.createPool({
  host: "localhost",
  user: "node_user",
  password: "password",
  database: "node_mysql_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.query("SELECT * FROM users", (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

Benefits:

* Reuse connections
* Handle many simultaneous requests

---

# 🔴 **7. Node.js + Express + MySQL (REST API)**

### Install Express

```bash
npm install express
```

### Project Structure (Basic)

```
project/
├── controllers/
│   └── user.controller.js
├── routes/
│   └── user.routes.js
├── db.js
├── app.js
└── server.js
```

---

### db.js

```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "node_user",
  password: "password",
  database: "node_mysql_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
```

---

### controllers/user.controller.js

```js
const pool = require("../db");

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

### routes/user.routes.js

```js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
```

---

### app.js

```js
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use("/users", userRoutes);

module.exports = app;
```

---

### server.js

```js
const app = require("./app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

# 🟢 **8. Advanced Concepts**

### 1️⃣ Transactions

```js
const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  await conn.query("INSERT INTO users (name, email) VALUES (?, ?)", ["John", "john@example.com"]);
  await conn.query("INSERT INTO orders (user_id, total) VALUES (?, ?)", [123, 100]);
  await conn.commit();
} catch (err) {
  await conn.rollback();
} finally {
  conn.release();
}
```

### 2️⃣ Stored Procedures

Call a procedure:

```js
await pool.query("CALL GetUserOrders(?)", [userId]);
```

### 3️⃣ ORM (Optional)

* Sequelize
* TypeORM
* Prisma

They provide models, migrations, and relationships.

---

# 🟡 **9. Best Practices**

* Use **connection pool**
* Use **async/await**
* Use **prepared statements** to prevent SQL injection
* Structure code into **MVC or layered architecture**
* Use **environment variables** for DB credentials
* Handle errors and logging properly
* Use transactions for multi-step operations

---

# 🔵 **10. Scalable Node + MySQL Project Structure**

```
project/
├── src/
│   ├── config/           # DB config, env variables
│   ├── controllers/      # Request → Response
│   ├── services/         # Business logic
│   ├── models/           # Table schemas / ORM models
│   ├── repositories/     # Direct DB queries (optional)
│   ├── routes/           # API routes
│   ├── middlewares/      # Auth, validation
│   ├── utils/            # Helpers
│   ├── app.js            # Express app
│   └── server.js         # Entry point
├── package.json
├── .env
└── tests/
```

---

# 🎯 Summary

**Node + MySQL Key Points:**

* Use `mysql2/promise` for async/await
* Use **connection pools** for production
* Structure project with **MVC + services**
* Handle errors, validation, and transactions properly
* For large projects, use ORM like Sequelize or Prisma

---

If you want, I can provide a **complete real-world Node + MySQL project** with:

* Users + Posts CRUD
* REST API
* JWT Authentication
* Pagination & filtering
* Transactions & error handling

Do you want me to do that next?
