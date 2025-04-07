## Control Structures

### **1. What Are Control Structures?**
Control structures determine how and when certain blocks of code are executed. They include:
1. **Conditional Statements**: Execute code based on a condition.
2. **Loops**: Repeat code multiple times.
3. **Switch Statements**: Handle multiple conditions more cleanly than `if...else`.

---

### **2. Conditional Statements**
These allow you to execute code only if certain conditions are met.

#### **1. `if` Statement**
Executes a block of code if a condition is `true`.

```javascript
let age = 20;

if (age >= 18) {
  console.log("You are an adult.");
}
```

#### **2. `if...else` Statement**
Executes one block of code if the condition is `true`, and another if it’s `false`.

```javascript
let age = 16;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
```

#### **3. `if...else if...else` Statement**
Handles multiple conditions.

```javascript
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
```

#### **4. Ternary Operator (Shorthand for `if...else`)**
A concise way to write simple conditional logic.

```javascript
let isLoggedIn = true;
let message = isLoggedIn ? "Welcome back!" : "Please log in.";
console.log(message); // Output: "Welcome back!"
```

---

### **3. Switch Statements**
The `switch` statement is used to evaluate a single value against multiple cases.

```javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the work week.");
    break;
  case "Friday":
    console.log("End of the work week.");
    break;
  default:
    console.log("Midweek days.");
}
```

**Key Notes:**
- Use `break` to exit the `switch` after a match is found. Without `break`, execution will "fall through" to subsequent cases.
- The `default` case handles any unmatched values.

---

### **4. Loops**
Loops allow you to repeat a block of code multiple times.

#### **1. `for` Loop**
Iterates a specific number of times.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}
// Output:
// Iteration 0
// Iteration 1
// Iteration 2
// Iteration 3
// Iteration 4
```

#### **2. `while` Loop**
Executes as long as a condition is `true`.

```javascript
let count = 0;

while (count < 5) {
  console.log(`Count: ${count}`);
  count++;
}
// Output:
// Count: 0
// Count: 1
// Count: 2
// Count: 3
// Count: 4
```

#### **3. `do...while` Loop**
Executes at least once, then continues as long as the condition is `true`.

```javascript
let num = 5;

do {
  console.log(`Number: ${num}`);
  num--;
} while (num > 0);
// Output:
// Number: 5
// Number: 4
// Number: 3
// Number: 2
// Number: 1
```

#### **4. `for...of` Loop**
Iterates over iterable objects like arrays or strings.

```javascript
let colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color);
}
// Output:
// red
// green
// blue
```

#### **5. `for...in` Loop**
Iterates over the properties of an object.

```javascript
let user = { name: "Alice", age: 25 };

for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
// Output:
// name: Alice
// age: 25
```

---

### **5. Break and Continue**
- **`break`**: Exits the loop immediately.
- **`continue`**: Skips the current iteration and moves to the next.

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip iteration when i is 2
  }
  if (i === 4) {
    break; // Exit loop when i is 4
  }
  console.log(i);
}
// Output:
// 0
// 1
// 3
```


