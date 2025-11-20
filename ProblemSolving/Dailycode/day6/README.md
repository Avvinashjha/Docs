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

