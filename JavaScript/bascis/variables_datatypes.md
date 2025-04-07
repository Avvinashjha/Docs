## Variables and Datatypes

### **1. Variables**
Variables are containers for storing data (values) in JavaScript. They allow you to store, retrieve, and manipulate data throughout your program.

#### **Three Ways to Declare Variables:**
- `var`  
- `let`  
- `const`

#### **Key Differences Between `var`, `let`, and `const`:**

| Feature          | `var`                  | `let`                    | `const`                 |
|------------------|------------------------|--------------------------|-------------------------|
| **Scope**        | Function or global     | Block scope (`{}`)       | Block scope (`{}`)      |
| **Re-declaration**| Allowed               | Not allowed in same scope| Not allowed             |
| **Re-assignment** | Allowed               | Allowed                  | Not allowed             |
| **Hoisting**     | Hoisted and initialized with `undefined` | Hoisted but uninitialized (temporal dead zone) | Hoisted but uninitialized (temporal dead zone) |

```js
# TEMPRORAL DEAD ZONE
In JavaScript, the Temporal Dead Zone (TDZ) is a period where variables declared with let or const are hoisted but inaccessible, meaning you cannot access them before their declaration in the code, resulting in a ReferenceError if you try. 
```
#### **Examples:**

- var
```javascript
// var (function-scoped)
function varScopeExpmple(){
    function test(){
        var x = 10;
        console.log("Inside test function of varScopeExpmple x = ", x);
        // lets create a block 
        if(x > 5){
            var y = 20;
            console.log("Inside if block in test of varScopeExpmple X = ", x , " Y = ", y);
        }
        // now we are out of the if block
        console.log("Inside Test function of varScopeExpmple x = ", x, " Y = ", y);
        
    }
    // call test
    test()
    // Now we are outside test
    console.log("Inside varScopeExpmple x = ", x, "and Y = " , y );   
}

varScopeExpmple()
```

- let

```js
function letScopeExample(){
    // delare a let variable on function block
    let functionBlockLet = 1;

    // use declaredAfterUse before declaration
    //Uncaught ReferenceError: can't access lexical declaration 'decalredAfterUse' before initialization
    // console.log("Trying to access declareAfter use", decalredAfterUse);
    

    // create a block inside function
    if(functionBlockLet > 0){
        let insideFunctionBlockAnotherBlockLet = 2;

        // log functionBlockLet and insideFunctionBlockAnotherBlockLet
        console.log("Function Block Let = ", functionBlockLet, "and insideFunctionBlockAnotherBlockLet = ", insideFunctionBlockAnotherBlockLet);
    }

    // now try to access insideFunctionBlockAnotherBlockLet
    //Uncaught ReferenceError: insideFunctionBlockAnotherBlockLet is not defined
    // console.log("Trying insideFunctionBlockAnotherBlockLet outside the block", insideFunctionBlockAnotherBlockLet);

    let decalredAfterUse = 10;
    
}ole.log(y); // ReferenceError: y is not defined
}
```
- const 
```js
// const (block-scoped, cannot be reassigned)
const z = 30;
z = 40; // TypeError: Assignment to constant variable.
```

---

### **2. Data Types**
JavaScript is a **dynamically typed** language, meaning you don’t need to explicitly declare the type of a variable. The type is determined automatically at runtime.

#### **Primitive Data Types**:
These are immutable (cannot be changed once created). There are 7 primitive types:

1. **String**: Represents textual data.  
   ```javascript
   let name = "John Doe";
   let greeting = 'Hello, world!';
   ```

2. **Number**: Represents both integers and floating-point numbers.  
   ```javascript
   let age = 25;
   let price = 99.99;
   ```

3. **BigInt**: Represents integers larger than `Number.MAX_SAFE_INTEGER` (2^53 - 1).  
   ```javascript
   let bigNumber = 123456789012345678901234567890n;
   ```

4. **Boolean**: Represents `true` or `false`.  
   ```javascript
   let isLoggedIn = true;
   let isAdmin = false;
   ```

5. **Undefined**: Represents a variable that has been declared but not assigned a value.  
   ```javascript
   let username;
   console.log(username); // Output: undefined
   ```

6. **Null**: Represents an intentional absence of any object value.  
   ```javascript
   let user = null; // Explicitly set to "no value"
   ```

7. **Symbol**: Represents a unique and immutable value, often used as object keys.  
   ```javascript
   let id = Symbol("id");
   let obj = {};
   obj[id] = "Unique ID";
   ```

---

#### **Non-Primitive Data Types**:
These are mutable (can be changed). There is only one non-primitive type:

1. **Object**: Represents a collection of key-value pairs (properties).  
   ```javascript
   let person = {
     name: "Alice",
     age: 30,
     isStudent: false
   };
   ```

   Objects can also include arrays and functions:
   - **Array**: An ordered list of values.  
     ```javascript
     let colors = ["red", "green", "blue"];
     ```
   - **Function**: A reusable block of code.  
     ```javascript
     function greet(name) {
       return `Hello, ${name}!`;
     }
     ```

---

### **3. Type Coercion**
JavaScript automatically converts one type to another in certain situations. This is called **type coercion**.

#### **Implicit Coercion**:
- When using operators like `+`, `-`, `==`, etc., JavaScript may convert types automatically.
  ```javascript
  console.log(5 + "5"); // Output: "55" (string concatenation)
  console.log(5 * "5"); // Output: 25 (number multiplication)
  ```

#### **Explicit Coercion**:
- You can manually convert types using functions like `String()`, `Number()`, or `Boolean()`.
  ```javascript
  let num = String(42); // Converts 42 to "42"
  let str = Number("42"); // Converts "42" to 42
  let bool = Boolean(""); // Converts empty string to false
  ```

---

### **4. Checking Data Types**
Use the `typeof` operator to determine the type of a variable.

```javascript
console.log(typeof 42); // Output: "number"
console.log(typeof "hello"); // Output: "string"
console.log(typeof true); // Output: "boolean"
console.log(typeof undefined); // Output: "undefined"
console.log(typeof null); // Output: "object" (quirk in JavaScript)
console.log(typeof {}); // Output: "object"
console.log(typeof []); // Output: "object"
console.log(typeof function() {}); // Output: "function"
```

---

### **5. Key Notes on Variables and Data Types**
1. **Default Values**: If a variable is declared but not initialized, its value is `undefined`.  
   ```javascript
   let x;
   console.log(x); // Output: undefined
   ```

2. **Global vs. Local Scope**:  
   - `var` creates global variables when declared outside a function.  
   - `let` and `const` avoid polluting the global scope unless explicitly attached to the `window` object.

3. **Immutability**:  
   - Primitive types are immutable (e.g., strings cannot be changed in place).  
   - Non-primitive types (objects, arrays) are mutable.  

4. **Equality Checks**:  
   - Use `===` (strict equality) instead of `==` to avoid unexpected type coercion.  
     ```javascript
     console.log(5 == "5"); // Output: true (coerced to number)
     console.log(5 === "5"); // Output: false (checks both value and type)
     ```

---

### **Summary**
- **Variables**: Use `let` for reassignable variables, `const` for constants, and avoid `var` due to its quirks.  
- **Data Types**: Understand the differences between primitives (`string`, `number`, `boolean`, etc.) and objects.  
- **Type Coercion**: Be cautious with implicit coercion and prefer explicit conversions when necessary.  
- **Best Practices**: Always use `const` by default and switch to `let` only when reassignment is needed. Avoid `var`.

By mastering these concepts, you’ll have a solid foundation for working with JavaScript effectively! 😊