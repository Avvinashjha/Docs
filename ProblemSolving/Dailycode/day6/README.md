# DAY 6 — Coding + Mini Project Challenge

## 🧩 Coding Problem 1 — Easy: Valid Parentheses

Given a string containing only '()[]{}', return true if the parentheses are valid.

A string is valid if:

 1. Open brackets are closed by the same type of bracket
 2. Open brackets close in correct order

Example:

Input: "()[]{}"
Output: true

Input: "(]"
Output: false

Requirements:
 • Use a stack
 • Time: O(n)
 • Space: O(n)

Solution:

```js
function isValidParenthesis(s){
    if(s.length === 0) return true;
    const openingBracket = ["(", "{", "["];
    const closingBracket = [")", "}", "]"];
    let stack = [];
    for(ch of s){
        if(stack.length === 0){
            if(closingBracket.includes(ch)){
                return false;
            }
            stack.push(ch);
        }else if(openingBracket.includes(ch)){
            stack.push(ch);
        }else {
            const lastChar = stack.pop();
            if((lastChar === "(" && ch === ")") || (lastChar === "{" && ch === "}") || (lastChar === "[" && ch === "]")){
                continue;
            }else{
                return false;
            }
        }
    }

    return stack.length === 0;
}
```

⸻

## ⚙️ Coding Problem 2 — Medium: Group Anagrams

Given an array of strings, group the anagrams together.

Example:

Input: ["eat","tea","tan","ate","nat","bat"]
Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

Requirements:
 • Use a hash map
 • Key should be sorted string OR character-frequency signature
 • Time: O(n *k log k) or O(n* k)

Solution:

```js
function groupAnagrams(words) {
    const map = new Map();

    for (const word of words) {
        const key = word.split('').sort().join('');

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key).push(word);
    }

    return Array.from(map.values());
}
```

⸻

## 🚀 Coding Problem 3 — Hard: Minimum Window Substring

Given two strings s and t, return the smallest substring in s that contains all characters of t.

Example:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Requirements:
 • Sliding window
 • Time: O(n)
 • Space: O(1) (since character set is fixed)

This problem is a classic for FAANG interviews.

solution:

```js
function minimumWindowSubstring(s, t){
    if(t.length > s.length) return "";

    const need = new Map();
    const have = new Map();

    for(const ch of t){
        need.set(ch, (need.get(ch) || 0)  +1);
    }

    let required = need.size;
    let formed = 0;

    let left = 0; 
    let minLen = Infinity;
    let minStart = 0;

    for(let right = 0; right < s.length; right++){
        const ch = s[right];
        have.set(ch, (have.get(ch) || 0) + 1);

        if(need.has(ch) && have.get(ch) === need.get(ch)){
            formed++;
        }

        while(formed === required){
            if(right - left + 1 < minLen){
                minLen = right - left + 1;
                minLen = left;
            }

            const leftChar = s[left];
            have.set(leftChar, have.get(leftChar) -1);
            if(need.has(leftChar) && have.get(leftChar) < need.get(leftChar)){
                formed--;
            }

            left++;
        }
    }
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
```

⸻

## 💻 Mini Project — Day 6

🚀 Build “JWT Authentication + Protected Routes” (Backend)

This extends the difficulty from Day 5 by adding authentication, a very common interview requirement.

Tech: Node.js (JS/TS) preferred

⸻

🎯 Requirements

1️⃣ POST /auth/register

Body:

{
  "username": "avinash",
  "password": "123456"
}

Rules:
 • Store users in memory (array/map)
 • Hash password using bcrypt
 • Validate duplicate username
 • Return JWT token after registration

⸻

2️⃣ POST /auth/login

Body:

{
  "username": "avinash",
  "password": "123456"
}

Rules:
 • Compare hashed password
 • If valid → return JWT token
 • If invalid → 401

⸻

3️⃣ Middleware: verifyToken
 • Extract token from Authorization header (Bearer xxx)
 • Validate using jwt.verify
 • Attach req.user = { id, username }

⸻

4️⃣ GET /profile (Protected Route)
 • Only accessible with valid JWT
 • Returns user info

Example response:

{
  "username": "avinash",
  "message": "Welcome back!"
}

⸻

⭐ Bonus (Optional)

Add token expiry:
 • Access token expires in 15 minutes
 • Add POST /auth/refresh to generate a new token

⸻

🔥 Output You Should Submit

Same as previous days:

 1. Code solutions for problems (1, 2, 3)
 2. Full backend code:
    - routes
    - services
    - middleware
    - data structures
 3. If TypeScript → include interfaces
 4. Postman screenshots optional

⸻

solution:

Folder structure:

├── controllers
│   └── auth.controller.js
├── middlewares
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── routes
│   ├── auth.routes.js
│   └── user.routes.js
├── server.js
├── services
│   └── auth.service.js
└── utils
    ├── database.js
    ├── jwt.js
    ├── password.js
    └── tokens.js

Server.js

```js
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { pool } from "./utils/database.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// quick DB connectivity check
(async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log("MySQL pool connected");
  } catch (err) {
    console.error("MySQL connection failed", err);
    process.exit(1);
  }
})();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```

Auth.service.js

```js
import { pool } from "../utils/database.js";
import { signAccessToken } from "../utils/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { generateRefreshTokenString, hashToken } from "../utils/tokens.js";
const REFRESH_TOKEN_LENGTH = Number(process.env.REFRESH_TOKEN_LENGTH || 64);
const REFRESH_TOKEN_EXP_DAYS = Number(process.env.REFRESH_TOKEN_EXP_DAYS || 30);

export class AuthService {
  static async registerUser({ name, email, password }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // check existing
      const [existing] = await conn.execute(
        "SELECT id FROM users WHERE email = ? FOR UPDATE",
        [email]
      );
      if (existing.length) {
        await conn.rollback();
        throw new Error("Email already registered");
      }

      const passwordHash = await hashPassword(password);
      const [result] = await conn.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
      );
      await conn.commit();
      return { id: result.insertId, name, email };
    } catch (error) {
      try {
        await conn.rollback();
      } catch (err) {
        throw err;
      }
    } finally {
      conn.release();
    }
  }

  static async authenticate({ email, password, ip, userAgent }) {
    const conn = await pool.getConnection();
    try {
      // fetch user
      const [users] = await conn.execute(
        "SELECT id, name, email, password_hash, roles, token_version FROM users WHERE email = ?",
        [email]
      );
      if (!users.length) throw new Error("Invalid credentials");
      const user = users[0];
      const ok = await verifyPassword(user.password_hash, password);
      if (!ok) throw new Error("Invalid Credentials");

      // sign access token
      const roles = JSON.parse(user.roles || '["user"]');
      const accessToken = signAccessToken({
        sub: String(user.id),
        roles,
        tokenVersion: user.token_version,
      });

      // create a refresh token
      const plainRefresh = await generateRefreshTokenString(
        REFRESH_TOKEN_LENGTH
      );
      const tokenHash = hashToken(plainRefresh);
      const expiresAt = new Date(
        Date.now() + REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60 * 1000
      );

      await conn.execute(
        `INSERT INTO refresh_tokens (user_id, token_hash, user_agent, ip, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
        [user.id, tokenHash, userAgent || null, ip || null, expiresAt]
      );

      return {
        user: { id: user.id, name: user.name, email: user.email, roles },
        accessToken,
        refreshToken: plainRefresh,
      };
    } catch (error) {
      console.log(error);
      conn.release();
      throw error;
    } finally {
      conn.release();
    }
  }

  /**
   * Rotate Refresh token
   * - Locate token by hash
   * - if not found or revoked -> possible reuse -> revoke token or error
   * - Mark current token revoked and insert a new token (in a transaction)
   */
  static async rotateRefreshToken(oldPlainToken, ip, userAgent) {
    const oldHash = hashToken(oldPlainToken);
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      //find the existing token
      const [rows] = await conn.execute(
        "SELECT id, user_id, expires_at, revoked FROM refresh_tokens WHERE token_hash = ? FOR UPDATE",
        [oldHash]
      );

      if (!rows.length) {
        // no such token -> expired or potential attack
        await conn.rollback();
        throw new Error("Invalid refresh token");
      }
      const tokenRow = rows[0];

      if (tokenRow.revoked) {
        //token already revoked -> revoke all users token as safety
        await conn.execute(
          "UPDATE refresh_tokens SET revoked = TRUE WHERE user_id = ?",
          [tokenRow.user_id]
        );
        await conn.commit();
        throw new Error("Refresh token revoked");
      }

      if (new Date(tokenRow.expires_at) < new Date()) {
        await conn.rollback();
        throw new Error("Refresh token expired");
      }
      // create new refresh token
      const newPlain = await generateRefreshTokenString(REFRESH_TOKEN_LENGTH);
      const newHash = hashToken(newPlain);
      const newExpiresAt = new Date(
        Date.now() + REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60 * 1000
      );

      const [ins] = await conn.execute(
        `INSERT INTO refresh_tokens (user_id, token_hash, user_agent, ip, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
        [tokenRow.user_id, newHash, userAgent || null, ip || null, newExpiresAt]
      );

      // mark old token revoked and set replaced_by
      await conn.execute(
        "UPDATE refresh_tokens SET revoked = TRUE, replaced_by = ? WHERE id = ?",
        [ins.insertId, tokenRow.id]
      );

      // fetch user to sign access token
      const [users] = await conn.execute(
        "SELECT id, name, email, roles, token_version FROM users WHERE id = ? FOR UPDATE",
        [tokenRow.user_id]
      );
      if (!users.length) {
        await conn.rollback();
        throw new Error("User not found");
      }
      const user = users[0];
      const roles = JSON.parse(user.roles || '["user"]');

      const accessToken = signAccessToken({
        sub: String(user.id),
        roles,
        tokenVersion: user.token_version,
      });

      await conn.commit();
      return { accessToken, refreshToken: newPlain };
    } catch (error) {
      try {
        await conn.rollback();
      } catch (_) {}
      throw error;
    } finally {
      conn.release();
    }
  }
  static async revokeRefreshToken(plainToken) {
    const tokenHash = hashToken(plainToken);
    const conn = await pool.getConnection();

    try {
      await conn.execute(
        "UPDATE refresh_tokens SET revoked = TRUE WHERE token_hash = ?",
        [tokenHash]
      );
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }
}

```

auth.route.js

```js
import express from "express";
import * as AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);

export default router;

```

authMiddleware.js

```js
import { pool } from "../utils/database.js";
import { verifyAccessToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {
  try {
    const auth = req.get("Authorization") || req.get("authorization");
    if (!auth || !auth.statsWith("Bearer "))
      return res.status(401).json({ error: "Unauthorized" });

    const token = auth.slice(7);
    const payload = verifyAccessToken(token);
    if (!payload)
      return res.status(401).json({ error: "Invalid or expire token" });

    // fetch user to ensure still exits and check token version
    const [rows] = await pool.execute(
      "SELECT id, email, name, roles, token_version FROM users WHERE id = ?",
      [payload.sub]
    );
    if (!rows || !rows.length)
      return res.status(401).json({ error: "User not found" });

    const user = rows[0];
    if (payload.tokenVersion !== user.token_version)
      return res.status(401).json({ error: "Token revoked" });

    req.user = {
      id: String(user.id),
      roles: JSON.parse(user.roles || '["user"]'),
      raw: { email: user.email, name: user.name },
    };
    next();
  } catch (error) {
    next(err);
  }
}

```

Role middle ware

```js
export function  authorizeRoles(...allowedRoles){
    return (req, res, next) => {
        if(!req.user) return res.status(401).json({error: "Unauthorized"});
        const has = req.user.roles.some(r => allowedRoles.includes(r));
        if(!has) return res.status(401).json({error: "Forbidden"});
        next();
    }
}
```

Auth.controller.js

```js
import {AuthService} from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
    const user = await AuthService.registerUser({ name, email, password });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const ip = req.ip;
    const ua = req.get("user-agent");
    const { accessToken, refreshToken, user } = await AuthService.authenticate({ email, password, ip, userAgent: ua });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge: Number(process.env.REFRESH_TOKEN_EXP_DAYS || 30) * 24 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: "/auth/refresh"
    });

    res.json({ accessToken, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function refresh(req, res) {
  try {
    const plain = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!plain) return res.status(401).json({ error: "No refresh token" });

    const ip = req.ip;
    const ua = req.get("user-agent");
    const { accessToken, refreshToken } = await AuthService.rotateRefreshToken(plain, ip, ua);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge: Number(process.env.REFRESH_TOKEN_EXP_DAYS || 30) * 24 * 60 * 60 * 1000,
      path: "/auth/refresh"
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function logout(req, res) {
  try {
    const plain = req.cookies?.refreshToken || req.body?.refreshToken;
    if (plain) await AuthService.revokeRefreshToken(plain);

    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

```

token.js

```js
import crypto from "crypto";
import { promisify } from "util";
const randomBytesAsync = promisify(crypto.randomBytes);

export async function generateRefreshTokenString(len = 64){
    const bytes = await randomBytesAsync(Math.ceil(len/2));
    return bytes.toString("hex").slice(0,len);
}

export function hashToken(token){
    return crypto.createHash("sha256").update(token).digest("hex");
}
```

password.js

```js

import argon2 from "argon2";

export async function hashPassword(password){
    return argon2.hash(password, {type: argon2.argon2id})
}

export async function  verifyPassword(hash, password){
    return argon2.verify(hash, password);
}

```

jwt.js

```js
import jwt from "jsonwebtoken";
const accessSecret = process.env.JWT_ACCESS_SECRET;
const accessExp = process.env.JWT_ACCESS_EXP;

export function signAccessToken(payload){
    return jwt.sign(payload, accessSecret, {expiresIn: accessExp});
}

export function verifyAccessToken(token){
    try {
        return jwt.verify(token, accessSecret);
    } catch (error) {
        console.log(error);
        return null;
    }
}
```