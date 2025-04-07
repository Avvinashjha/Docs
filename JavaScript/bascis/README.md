## 1. [Variables and Datatypes](./variables_datatypes.md)

### **Summary of Variables and Data Types in JavaScript**
We covered the fundamentals of variables and data types in JavaScript, including how to declare variables (`var`, `let`, `const`), the differences between primitive and non-primitive data types, type coercion, and best practices for working with them.

---

### **Key Takeaways**
1. **Variables**:
   - Use `const` by default for variables that won’t change.
   - Use `let` for variables that need reassignment.
   - Avoid `var` due to its function scope and hoisting quirks.

2. **Data Types**:
   - JavaScript has **7 primitive types**: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, and `symbol`.
   - The only **non-primitive type** is `object` (includes arrays and functions).

3. **Type Coercion**:
   - Be cautious with implicit coercion (e.g., `5 + "5"` results in `"55"`).
   - Use `===` (strict equality) instead of `==` to avoid unexpected behavior.

4. **Best Practices**:
   - Always initialize variables to avoid `undefined`.
   - Use `typeof` to check the type of a variable.
   - Prefer immutability where possible (use `const` and avoid modifying objects/arrays unless necessary).



## 2. [Operators](./operators.md)

### **Summary of JavaScript Operators**
We covered the main categories of operators in JavaScript:
1. **Arithmetic**: Perform math operations (`+`, `-`, `*`, `/`, etc.).
2. **Assignment**: Assign values to variables (`=`, `+=`, `-=`, etc.).
3. **Comparison**: Compare values (`==`, `===`, `>`, `<`, etc.).
4. **Logical**: Combine or negate boolean values (`&&`, `||`, `!`).
5. **Ternary**: Shorthand for `if...else`.
6. **Bitwise**: Operate on binary numbers (`&`, `|`, `<<`, etc.).
7. **Type**: Determine the type of a variable (`typeof`, `instanceof`).

---

### **Key Takeaways**
1. **Use `===` and `!==`**: Prefer strict equality/inequality to avoid unexpected type coercion.
2. **Logical Operators**: Use `&&` for "AND", `||` for "OR", and `!` for "NOT".
3. **Ternary Operator**: A concise way to write simple conditional logic.
4. **Avoid Overusing Bitwise Operators**: They’re rarely needed unless working with low-level data.
5. **Type Checking**: Use `typeof` for primitives and `instanceof` for objects.

## 3. [Control Structures](./control_structures.md)


### **Summary of Control Structures**
We covered the main types of control structures in JavaScript:
1. **Conditional Statements**: `if`, `if...else`, `if...else if...else`, and ternary operators.
2. **Switch Statements**: Handle multiple conditions cleanly.
3. **Loops**: `for`, `while`, `do...while`, `for...of`, and `for...in`.
4. **Break and Continue**: Control loop execution.

---

### **Key Takeaways**
1. **Use `if...else` for Simple Conditions**: It’s straightforward and easy to read.
2. **Prefer `switch` for Multiple Cases**: Cleaner than multiple `if...else if` statements.
3. **Choose the Right Loop**:
   - Use `for` for known iterations.
   - Use `while`/`do...while` for dynamic conditions.
   - Use `for...of` for arrays and `for...in` for objects.
4. **Use `break` and `continue` Wisely**: Avoid overly complex loops.

## 4. [Functions](./functions.md)

### **Summary of Functions in JavaScript**
We covered the following key aspects of functions:
1. **Function Declaration vs. Expression**: Use `function` for declarations and assign to variables for expressions.
2. **Arrow Functions**: Concise syntax, but beware of `this` behavior.
3. **Parameters and Arguments**: Default parameters and rest parameters (`...`) make functions flexible.
4. **Return Statement**: Always specify what a function should output.
5. **Scope**: Functions create their own scope, limiting variable access.
6. **Higher-Order Functions**: Functions can take other functions as arguments or return them.
7. **IIFE**: Run functions immediately after defining them.
8. **`this` Keyword**: Depends on how the function is called.

---

### **Key Takeaways**
1. **Use Arrow Functions Carefully**: They’re great for short, anonymous functions but lack their own `this` binding.
2. **Leverage Default and Rest Parameters**: Make your functions more flexible and robust.
3. **Understand Scope**: Variables inside a function are local unless explicitly declared globally.
4. **Practice Higher-Order Functions**: They’re powerful for functional programming patterns.
5. **Be Mindful of `this`**: Its value changes based on the context in which the function is called.

