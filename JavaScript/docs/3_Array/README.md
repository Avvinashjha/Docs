# 3. Array

- [x] Fundamentals Of Array
- [x] Memory and Internal Representation
- [x] Array Class
- [x] Array Operations
- [x] Array Iteration
- [x] Spread and Rest
- [x] Array-Like and Iterables
- [ ] Advance Array Methods and Techniques
- [ ] Performance and Optimization
- [ ] Multi Dimensional Arrays
- [ ] Flattening and Deep flattening
- [ ] Immutable Array Pattern
- [ ] Arrays in Functional Programming
- [ ] Array is async operation
- [ ] Typed Array and ArrayBuffers
- [ ] SharedArrayBuffer and Atomics
- [ ] V8 internals
- [ ] Immutable and new ES2023 array methods
- [ ] Memory models in JS engines
- [ ] Cross-language comparisons
- [ ] Array-heavy use cases
- [ ] Integration with Data Structures
- [ ] Comparative performance vs other data structures
- [ ] Real-world system patterns (like batching, streaming, immutability for state management)

## A. Fundamentals Of Array

An Array in JavaScript is a special type of object designed to store ordered collections of values, such as number, string, object, or even other arrays.

Unlike arrays in low-level language (like C or Java), JavaScript arrays are dynamic:

- They can hold mixed data types.
- They can resize automatically.
- They can have holes (missing index / sparse array)
- They are not guaranteed to be contiguous in memory (depends on the engine).

### 1. Arrays and Objects

Arrays are not primitive types, they are a subtype of Object.

```js
const arr = [1,2,3];
console.log(typeof arr); // "object"
console.log(arr instanceof Array); // true
console.log(Array.isArray(arr)); // true
```

Under the hood:

- `arr[0]` is essentially a property with key `0`.
- Arrays have a special internal slot for `length`.
- Arrays also inherit from `Array.prototype`.

So, internally:

```js
const arr = [1,2,3];
arr["0"] === arr[0]; //true
```

### 2. Indexing and Keys

JavaScript converts array indices into string keys behind the scenes.

```js
const arr = [10, 20, 30];
arr["1"]; // same as arr[1]
arr["foo"] = 99; // adds a normal object property
console.log(arr.length); // still 3, 'foo' is ignored
```

- only non-negative integer affect length and indexing.

### 3. The `length` Property

- Always one or more than the highest numeric index.
- Can be manually set to truncate or extend an array.

```js
const arr = [1, 2, 3, 4];
arr.length = 2; // Truncates
console.log(arr); // [1,2]

arr.length = 5; // Extends and add holes
console.log(arr); // [1,2, <3 empty items>]
```

### 4. Array are Heterogenous

They can store any types of value, even mixed.

```js
const mixed = [1, 'two", true, {name: "Avinash"}, [5,6]];
console.log(mixed[3].name); // avinash
```

In contrast, typed arrays (Uint8Array, etc.) enforce a single type.

### 5. Dynamic and Resizable

You can freely add/remove elements, arrays auto expand.

```js
const arr = [1];
arr[5] = 42;
console.log(arr); // [1, <4 empty item>, 5]
console.log(arr.length); // 6
```

>However, this creates holes, making array sparse (affecting performance later).

### 6. Array Creation Methods

#### a. Using Literals

```js
const arr = [10, 20, 30];
```

#### b. Using Constructor

```
const arr = new Array(3); // creates array with length 3, empty slots
const arr2 = new Array(1,2,3); // creates [1,2,3]
```

#### c. Using Factory Methods

```js
const arr = Array.of(3); // [3]
const arr2 = Array.from("JS"); // ['J', 'S']
```

### 7. Array vs Object

| Feature         | Array                           | Object                 |
| --------------- | ------------------------------- | ---------------------- |
| Key Type        | Numeric (0,1,2…)                | String or Symbol       |
| Order           | Ordered                         | Unordered (by spec)    |
| Length Property | Auto-managed                    | Manual                 |
| Performance     | Optimized for sequential access | Not optimized          |
| Methods         | `push`, `pop`, `map`, etc.      | Generic object methods |

### 8. Array Can Have Holes

Empty slots are allowed (but not good for performance).

```js
const arr = [1, , 3];
console.log(arr.length); // 3
console.log(arr[1]); // undefined
console.log(i in arr) // false - key does not exist
```

`Holes != undefined` : Holes means the property itself does not exist.

### 9. Copy by Reference

Arrays are reference types, assigning copies the reference, not the value.

```js
const a = [1,2,3];
const b = a;
b[0] = 99;

console.log(a); // [99, 2, 3] - both points to the same memory
```

To clone:

```js
const copy = [...a];
```

### 10. Array Identity and Equality

```js
[1,2,3] === [1,2,3]; // false
```

**Different reference**, even if same content.

To Compare the value:

```js
JSON.stringify([1,2,3]) === JSON.stringify([1,2,3]); // true
```

### 11. Differences

| Concept                   | Explanation                                          | Example                                                   |
| ------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| `undefined` vs hole       | `undefined` is an existing value; hole = missing key | `[1, , 3]` has a hole; `[1, undefined, 3]` has a value    |
| `Array()` vs `Array.of()` | Constructor behaves differently with 1 arg           | `Array(3)` → `[ <3 empty items> ]`, `Array.of(3)` → `[3]` |
| Dense vs Sparse           | Dense = all contiguous indices; Sparse = holes       | `[1,2,3]` (dense), `[1,,3]` (sparse)                      |
| Value vs Reference copy   | Arrays copy by reference                             | `a = [1]; b = a; b[0]=9;` changes `a`                     |

### 12. Summary

- JavaScript arrays are dynamic, ordered, object-based collections.
- They are indexed by integer-like strings.
- The length property auto-adjusts.
- Arrays can be dense (contiguous) or sparse (with holes).
- They are reference types, not value types.
- Performance depends heavily on memory density and engine optimization (covered later).

### 13. Common Questions

- Is an array in JS truly an array like in C?
  - No, it’s a specialized object optimized for numeric keys.

- What happens if you set arr.length = 0?
  - It clears the array (all elements are removed).

- What’s the difference between delete arr[1] and arr.splice(1,1)?
  - delete leaves a hole; splice removes and shifts.

- How does Array.isArray() differ from instanceof Array?
  - Array.isArray() works across frames; instanceof doesn’t.

- Can arrays have non-integer properties?
  - Yes, but they behave like object keys and don’t affect length.

- Why is [1, , 3].map(x => 2) returning [2, , 2]?
  - Because holes are skipped in iteration methods.
- How are holes represented internally?
  - As “missing elements” — engines use a HOLEY_ELEMENTS representation.

## B. Memory and Internal Representation of Arrays

JavaScript arrays are high-level objects, but JavaScript engines live V8 attempt to optimize them into low-level memory structure resembling real arrays if possible.

They change their internal storage layout based on

- What values you put inside them.
- Whether the array has holes
- Whether you mix types
- How often you mutate them.

This is called the `Element Kinds`, which directly influence speed.

### 1. How JavaScript Stores Arrays in Memory?

JS Arrays are stored as object with special hidden representation:

```sql
Array Object
 ├── elements pointer → Backing Store (array storage)
 ├── length
 └── prototype → Array.prototype
```

Example:

```js
const arr = [10, 20, 30];
```

Internally:

- arr is an object
- arr.elements points to a contiguous storage buffer
- indexes are stored like dense memory.

Behind the scenes:

```text
Index: 0   1   2
value: 10  20  30
```

### 2. Elements Kinds in V8

Element Kind = How V8 categorizes array storage.

Order from fastest -> slowest:

```cpp
PACKED_SMI_ELEMENTS            // packed integers
PACKED_DOUBLE_ELEMENTS         // packed floating numbers
PACKED_ELEMENTS                // packed mixed values
HOLEY_SMI_ELEMENTS             // integers with holes
HOLEY_DOUBLE_ELEMENTS          // floats with holes
HOLEY_ELEMENTS                 // mixed values with holes
DICTIONARY_ELEMENTS            // sparse dictionary-based
```

Meaning:

- **Packed**: no holes, predictable memory
- **Holey**: missing indices -> slower
- **Dictionary**: extremely slow sparse array.

Example: **auto-downgrade from SMI to DOUBLE**

```js
const arr = [1, 2, 3]; // PACKED_SMI
arr.push(1.5);  // becomes PACKED_DOUBLE_ELEMENTS
```

Example: **downgrade to HOLEY**

```js
const arr =  [ 1, 2, 3];
delete arr[1]; // creates a hole 
```

V8 transition:

```java
PACKED_SMI -> HOLEY_SMI
```

### 3. Packed vs Holey Arrays

Packed array

```js
const a = [1, 2, 3];
```

No holes -> Fast element access.

Holey arrays

```js
const a = [1, , 3];
```

Holes force V8 to:

1. Check if element exists
2. check the prototype chain
3. Possibly check Array.prototype for inherited values **Huge Slowdown**.

### 4. Elements Kind Transition

Element kind only downgrades, never upgrades.

Example:

```js
const arr  = [1, 2, 3]; // PACKED_SMI
arr.push(3.14); // PACKED_DOUBLE
arr.push("hi"); // PACKED_ELEMENTS
delete arr[1]; // HOLEY_ELEMENTS
```

Once holey -> can not go back to packed.

#### What if I change the element and fill the holes will it upgrade?

Short Ans: **No — once an array becomes HOLEY, it can NEVER go back to PACKED.**

- V8 allows only downward transitions (fast → slow), never upward.

#### Why V8 does not upgrade?

This is a design choice for performance and simplicity.

Upgrading requires:

- Scanning entire backing store
- Rewriting representation
- Reallocating memory
- Repairing hidden classes
- Changing inline caches

These are expensive.

### 5. Hidden Classes & Inline Caches

Arrays use hidden classes to optimize property access.

Example:

```js
const arr = [1,2,3];
arr[5] = 99;
```

This introduces holes -> new hidden class -> de-optimization.

Inline caches use monomorphic access:

- First seen shape -> FAST
- Mixed shapes (object with different structures) -> SLOW

### 6. What happens when you delete items

```js
const arr [ 1, 2, 3 ];
delete arr[1];
console.log(arr); [1, , 3];
```

Effects:

- Creates a hole
- Changes element kind
- Breaks packed optimization
- Forces expensive chain lookups.

Better use:

`arr.splice(1,1);` keeps the array packed.

### 2.7 Dense vs Sparse Arrays

Dense Array:

```js
const arr = [1,2,3,4];
```

- Stored in contiguous buffer.

Sparse Array:

```js
const arr = [];
arr[5000] = 1;
``

V8 uses dictionary mode:

```text
key: 5000 -> 1
```

Dictionary Mode:

- slow
- high memory usages
- used for massive sparse arrays

### 8. GC Impact & Memory Usage

Arrays with holes produce more garbage because:

- deleted elements becomes eligible for GC
- transition force new backing stores.
- hidden class transition creates unused shapes.

Example:

```js
let arr = new Array(100000);
arr.length = 0;
```

- Backing store freed during GC stop-the-world phase.

### 9. Why Array Operation De-optimize

These patterns break V8 optimizations:

- mixing types:

    ```js
    const arr = [1, 2, 3];
    arr.push("hi");
    ```

- Storing floating + int + object
- holes using delete or skipping indexes
- huge index jumps
- converting to dictionary mode

Best Practice:

- keep array packed
- keep element type consistent
- Avoid delete

### 10. Summary

- JavaScript arrays are optimized objects with hidden memory layouts.

- V8 uses Elements Kinds to decide the internal layout.

- Arrays degrade in performance when:
  - You introduce holes
  - You mix types
  - You delete elements
  - You create sparse arrays
- Transitions between kinds only go from fast → slow, never reverse.
- Packed arrays are the fastest; dictionary arrays are the slowest.
- Keeping arrays dense and consistent preserves engine-level optimizations.

### 11. Common Questions

1. How does V8 store arrays internally?
   - Talk about elements kind, backing stores, packed vs holey.

2. What are packed and holey arrays?
   - Packed = no holes → optimized.
   - Holey = missing elements → deoptimized.

3. Why is delete arr[i] discouraged?
   - Creates holes, deoptimizes the array, breaks packed representation.

4. Explain elements kinds and transitions.
   - SMI → DOUBLE → ELEMENTS → HOLEY → DICTIONARY
   - Only downgrade allowed.

5. Why is storing mixed types harmful?
   - Forces array to most generic representation → slowest.

6. What happens if you do arr[100000] = 5?
   - Array becomes sparse → dictionary mode → slow property lookup.

7. Why is Array.from() slower than spread?
   - More internal steps, coercion, and iterator checks.

8. Why is length not equal to number of elements sometimes?
   - Because holes don’t count as values.

## C. The Array Class in JavaScript

JavaScript Array is a built-n-class defined by the ECMAScript specification.

Arrays are not just collections of values, they are special exotic objects with extra internal behaviors:

- Auto updating length
- Integer index handling rules
- Prototype inheritance from `Array.prototype`
- Special optimization is JS engines.

Understanding the Array class is critical because:

- Every array method is defined on its prototype.
- Inheritance chains explain method lookup
- Sub-classing arrays is used in advance framework/ libraries.

### 1. What is the Array Class?

The Array class is defined as:

```js
class Array{ ... }
```

But under the hood, it's implemented in C++ inside V8 (not in JS).

An Array instance is created in two ways:

```js
const a = []; // array literal
const b = new Array() // array constructor
```

Both create an object linked to `Array.prototype`.

### 2. Array Constructor Behavior

Calling with No Arguments

```js
new Array(); // []
```

Calling with one numeric argument

```js
new Array(5)// creates array with length = 5(holes)
```

This is different from:

```js
Array.of(3) // [3]
```

Calling with Multiple Values

```js
new Array(1,2,3); [1,2,3]
```

This is intuitive but single args case is special.

### 3. Array Prototype chain

Every array inherits from

```js
arr -> Array.prototype -> Object.prototype -> null
```

Check for yourself:

```js
const arr = [];
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true
console.log(arr.__proto__.__proto__ == Object.prototype); // true
```

Why this matters?

- All Array methods (map, filter, reduce) live on Array.prototype
- Property lookup climbs the chain if needed
- Prototype pollution effects arrays.

### 4. Exotic Array Behavior

Arrays are exotic objects because they have  special rules:

1. The `length` property updates automatically.

    ```js
    const arr = [];
    arr[2] = 10;
    console.log(arr.length); // 3
    ```

2. Setting length truncates the array

   ```js
    arr.length = 1; // remove extra elements
   ```

3. Numeric indices are treated differently

   ```js
    arr["100"] = "x";// becomes actual array element
    arr["foo"] = "y"; // becomes a normal object property 
   ```

### 5. Static Methods vs Instance

Static Method (called on Array)

- `Array.isArray()`
- `Array.from()`
- `Array.of()`
- `Array.prototype` (a property not a function)

Example:

```js
Array.isArray([1,2]) // true
Array.from("Abc"); // ["A", "b", "c"]
```

Instance Methods (called on array instance)

- `push`, `pop`, `map`, `filter`, `forEach`,..
- Defined on `Array.prototype`
- Shareable  across all arrays.

Example:

```js
[1,2,3].map(x => x * 2);
```

### 6. Sub-classing Array

A powerful but often under used feature:

```js
class MyArray extends Array {
    sum(){
        return this.reduce((a, b)=> a + b, 0);
    }
}
const nums = new MyArray(1,2,3);
console.log(nums.sum());
```

extends Array means:

- You get inherited methods
- But overridden methods preserve array behavior like length

Example:

```js
const a = new MyArray(1, 2);
a.push(3);
console.log(a.length); // 3 (still works)
```

### 7. How Methods Are Resolved (Prototype Lookup)

When you do:

```js
arr.map(...)
```

JS look up:

1. Does arr object have `.map`?
2. Does Array.prototype have `.map`? Yes
3. Execute it.

Visualization:

```js
arr -> Arr.prototype -> Object.prototype -> null
```

### 8. Property Description On Arrays

Array indices are data properties:

```js
const arr = [10];
console.log(Object.getOwnPropertyDescriptor(arr, "0"))
```

Output:

```js
{
    value: 10,
    writable: true,
    enumerable: true,
    configurable: true
}
```

The Special descriptor is `length`

- You can not delete length
- Changing it may delete elements

### 9. How length Property works internally?

Setting length smaller:

```js
const arr = [1,2,3,4];
arr.length = 2;
console.log(arr); // [1,2]
```

Setting length larger:

```js
arr.length = 5;
console.log(arr); // [1,2, <3 empty items>]
```

Js creates holes: but no actual slot are created.

### 10. Differences

| Topic                               | Explanation                                | Example                                   |
| ----------------------------------- | ------------------------------------------ | ----------------------------------------- |
| `Array()` vs `Array.of()`           | Constructor treats 1 numeric arg as length | `Array(5)` → holes; `Array.of(5)` → `[5]` |
| numeric indices vs non-numeric keys | Only numeric affect length                 | `arr["foo"]` doesn't change length        |
| array literal vs constructor        | Literal is faster and safer                | `[]` is preferred                         |
| subclassed arrays vs normal arrays  | Subclass keeps array behavior              | extends Array                             |

### 11. Summary

- Array is a class with special internal behaviors.
- Every array inherits from Array.prototype.
- Constructor behaves differently depending on arguments.
- The prototype chain controls method lookup.
- Arrays are exotic objects because:
  - They auto-update length
  - Numeric indices behave differently from normal keys
- You can subclass arrays to extend functionality.
- Array methods are split into:
  - Static methods (Array.*)
  - Instance methods (Array.prototype.*)

## D. Array Operations

### 1. Adding Elements

- `push()` - Add elements at the end.
  
  ```js
  const arr = [1,2];
  arr.push(3); // [1,2,3]
  ```

  - Fastest way to add
  - O(1) amortized
  - Keeps array packed

- `unshift()` - Add at the beginning
  
  ```js
  arr.unshift(4); //[4,1,2,3]
  ```

  - Very expensive O(n)
  - Moves every element one spot
- Direct Index Assignment
  
  ```js
  arr[5] = 6; // [4,1,2,3, <1 empty item>, 6]
  ```

  - Create holes if not assigned based on length
  - De-optimizes the array

### 2. Removing Elements

- **pop() - Remove last element**
  
  ```js
  const arr = [1,2,3,4];
  arr.pop() // 4
  ```

  - O(1) - fastest removal
- **delete operator (Very Bad)**
  
  ```js
  delete arr[1];
  console.log(arr); // [1, ,3]
  ```

  - Leaves a hole
  - convert packed array to holey array
  - slow property deletion
  - Always avoid
- shift() - removes first element
  
  ```js
  arr.shift()// 1
  ```

  - O(n) - shifts everything
  - Breaks packed structure
- splice() - add/remove at any position
  
  ```js
  const arr = [1,2,3];
  arr.splice(1,1); // removes 2
  console.log(arr); // [1,2]
  ```

  - Powerful
  - Does not leave holes
  - Preservers packed array

### 3. Updating elements

- Simple Assignment
  
  ```js
  arr[1] = 50;
  ```

- Updating multiple values
  
  ```js
  arr.splice(1,2, "a", "b")
  ```

- fill()
  
  ```js
  const arr = new Array(5).fill(0);
  ```

### 4. Copying Arrays (Shallow vs Deep)

#### Shallow Copy methods

Only copy top level nested objects are shared by reference.

- `const copy = [...arr]`
- `const copy = arr.slice()`
- `const copy = Array.from(arr)`
- `const copy = arr.concat()`

Example:

```js
const original = [{a: 1}]
const copy = [...original];

copy[0].a = 9;
console.log(original[0].a) // 9 (same reference)
```

#### Deep Copy methods

```js
JSON.parse(JSON.stringify(arr));
structuredClone(arr); // Best modern method
```

### 5. Slice vs Splice

| Feature  | slice()    | splice()           |
| -------- | ---------- | ------------------ |
| Mutation | ❌ No       | ✅ Yes              |
| Return   | New array  | Removed elements   |
| Use case | Copying    | Inserting/removing |
| Holes    | Keeps them | Fixes them         |

### 6. Searching elements

- `indexOf`
  
  ```js
  const arr = [1,2,3];
  arr.indexOf(2); // 1
  ```

- `includes`
  
  ```js
  const arr = [1,2,3];
  arr.includes(2); // true
  ```

- find
  
  ```js
  const arr = [1,2, 3];
  arr.find(x => x === 2); // 2
  ```

- findIndex
  
  ```js
  arr.findIndex(x => x.id === 5)
  ```

- some
  
  ```js
  arr.some(x => x > 10)
  ```

- every
  
  ```js
  arr.every(x => x < 100)
  ```

### 7. Sorting Arrays

- **Default sort is lexicographical**
  - **Lexicographical** order is a method of ordering strings or other sequences based on dictionary or alphabetical order. It compares items character by character from left to right, and the first position where characters differ determines the order
  
  ```js
  [10, 2, 5].sort(); // [10, 2, 5]
  ```

- Numeric sort
  
  ```js
  arr.sort((a, b) => a - b);
  ```

- Sorting Objects
  
  ```arr
  arr.sort((a, b) => a.age - b.age);
  ```

### 8. Filling and Over-writing

- fill()
  
  ```js
  new Array(5).fill(0)// [0,0,0,0,0]
  ```

- copyWithin()

  ```js
  [1,2,3,4,5].copyWithin(0,3); [4,5,3,4,5]
  ```

### 9. Combining and Merging

- concat()
  
  ```js
  [1,2].concat([3,4]); // [1,2,3,4]
  ```

- spread
  
  ```js
  [...a, ...b]
  ```

- push + spread
  
  ```js
  a.push(...b);
  ```

### 10. Converting Arrays

- toString()
  
  ```js
  [1,2,3].toString(); // "1,2,3"
  ```

- join()
  
  ```js
  [1,2,3].join("-") // "1-2-3"
  ```

- Array.from()
  - converts array-like objects.
  
  ```js
  Array.from("Hello"); // ["H","e","l","l","o"]
  ```

### 11. Summary of Array Operations

- Array operations fall into CRUD + slicing + spreading + merging.
- Keep arrays dense (packed) for best performance.
- push/pop = highly optimized
- shift/unshift = slow
- splice = powerful but sometimes expensive
- Avoid delete — creates holes
- Use slice for copying, not splice
- Know the difference between shallow and deep copying

## E. Array Iteration

Array Iteration refers to how you loop through the elements of an array.

JavaScript provides:

1. Manual Loops
2. Built in iteration methods

### 1. Manual Iteration methods

These do not rely on Array.prototype. They are usually fastest and give max control.

1. for loop (fastest general purpose loop)

   ```js
   const arr = [1,2,3];
   for(let i = 0; i< arr.length; i++>) console.log(arr[i])
   ```

   - Very fast
   - works with holes prints undefined
   - Ideal for performance-critical use
2. while loop

   ```js
   let i = 0;
   while(i < arr.length){
    console.log(arr[i]);
    i++;
   }
   ```

   - Good for Dynamic bounds
   - Same speed as for, sometimes faster
3. for...of loop (ES6)

   ```js
    for(const value of arr){
        console.log(value);
    }
   ```

   - Clean syntax
   - ignores holes
   - usages [Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
  
4. for...in loop (Do not use for Arrays)

   ```js
    for(const index in arr){
        console.log(index, arr[index])
    }
   ```

   - Includes Inherited properties
   - Includes no numeric keys
   - very slow
   - Not meant for arrays
   - use only for objects
5. Recursion

   ```js
    function print(arr, i = 0){
        if(i === arr.length) return;
        console.log(arr[i]);
        print(arr, i+1);
    }

    print([1,2,3])
   ```

   - Rare but useful for Depth-first traversal, Multi-dimensional arrays.

### 2. Iteration Protocol and Iterators

Arrays implements Symbol.iterator.

This:

```js
const it = arr[Symbol.iterator]();
```

Produces:

```js
it.next()// {value: 10, done: false}
it.next()// {value: 20, done: false}
it.next(); // {done: true}
```

Used by:

- for...of
- spread ...arr
- Array.from
- structuredClone
- destructuring

### 3. Built-In Array Iteration Methods

- forEach
  
  ```js
  [1,2,3,4].forEach((value, index, array) => {
    console.log(value)
  })
  ```

  - Executes a callback for each element
  - Ignores holes
  - Can not break early
  - Returns undefined

- map
  
  ```js
    const doubled = [1,2,3].map((value, index, array)=> value * 2); 
  ```

  - Produces a new array
  - Same length as original
  - ignore holes an preservers them

  ```js
  [1,,3].map(x => x * 2); // [2, , 6]
  ```

- filter
  
  ```js
  const even = [1,2,3,4,5].filter((value, index, array) => {
    if(value % 2 == 0) return true;
    return false;
  })
  ```

  - Removes unwanted items
  - Does Not Preservers holes
  - Create smaller array

- reduce
  
  ```js
  const sum = [1,2,3,4,5].reduce((acc, v) => acc + val, 0);
  ```

  - Aggregated values
  - Very Powerful
  - used for: sum, max/min, flattening, grouping, building objects.

- reduceRight
  - Same as reduce but backwards
  - useful
  - for right to left associativity
- some
  
  ```js
  arr.some(x => x > 100)
  ```

  - Returns true if ANY element matches
  - Stops early
- every
  
  ```js
  arr.every(x => x > 0);
  ```

  - Returns true if all element match
  - Stops early
- find
  
  ```js
  arr.find(x => x.id === 5);
  ```

  - Returns first matching element
  - Stops early
  - Does not filter all matches

- findIndex
  - same as find but returns index
- flatMap
  
  ```js
  [1,2,3].flatMap(x => x * 2); // [1,2, 2,4, 3,6]
  ```

  - combines map + flat(1)

### 4. Hole Handling Behavior

| Method              | Treats Hole As               | Processes Hole?        |
| ------------------- | ---------------------------- | ---------------------- |
| for                 | `undefined`                  |  yes                  |
| while               | `undefined`                  |  yes                  |
| for…of              | skip                         |  skip hole            |
| for…in              | skip holes but includes keys | many edge cases        |
| forEach             | skip                         |  no                   |
| map                 | skip but preserves hole      |  no                   |
| filter              | skip & remove                |  no                   |
| reduce              | skip                         |  processing continues |
| some / every / find | skip                         |  skip                 |

### 5. map vs forEach vs reduce

| Method          | Returns         | Can Break? | Mutates? | Use For         |
| --------------- | --------------- | ---------- | -------- | --------------- |
| forEach         | undefined       |  No       |  No     | side effects    |
| map             | new array       |  No       |  No     | transformations |
| reduce          | single value    |  Yes      |  No     | aggregations    |
| some/every/find | boolean/element |  Yes      |  No     | searching       |

### 6. Performance Considerations

Fastest -> slowest

```js
for -> while -> for..of -> map/filter/reduce -> forEach -> for...in
```

Avoid:

- use of for..in for arrays.
- closures inside tight loops
- Unnecessary array creations
- Iterating sparse arrays

### 7. Polyfills

1. filterEach Polyfill

   ```js
   Array.prototype.myFilter = function(callback){
        if(typeof callback !== 'function') throw new TypeError(callback + " is not a function");
        const result = [];
        for(let i = 0; i < this.length; i++){
            if(i in this && callback(this[i], i, this)){
                result.push(this[i]);
            }
        }
        return result;
    }
   ```

2. map Polyfill

   ```js
   Array.prototype.myMap = function(callback){
        if(typeof callback !== "function") throw new TypeError(callback + "is not a function.");
        const result = [];
        for(let i = 0; i < this.length; i++){
            // check if element exits to handle sparse arrays
            if(i in this){
                result[i] = callback(this[i], i, this);
            }
        }
        return result;
    }
   ```

3. forEach Polyfill

   ```js
   Array.prototype.myForEach = function(callback){
        if(typeof callback !== "function") throw new TypeError(callback + " is not a function.");
        for(let i = 0; i < this.length; i++){
            if(i in this){
                callback(this[i], i, this);
            }
        }
    }
   ```

4. reduce Polyfill

   ```js
   Array.prototype.myReduce = function (callback, initialValue){
        if(typeof callback !== "function") throw new TypeError(callback + " is not a function.");
        const arr = this;
        let acc = initialValue;
        let startIndex = 0;
        if(acc === undefined){
            if(arr.length === 0) throw new TypeError("Reduce of empty arry with no initial value");
            acc = arr[0];
            startIndex = 1;
        }

        for(let i = startIndex; i< arr.length; i++){
            if(i in arr){
                acc = callback(acc, arr[i], i, arr);
            }
        }
        return acc;
    }
   ```

5. some Polyfill

   ```js
    Array.prototype.mySome = function(callback){
        if(typeof callback !== "function") throw new TypeError(callback + " is not a function");
        for(let i = 0; i < this.length; i++){
            if(i in this && callback(this[i],i, this )){
                return true;
            }
        }
        return false;
    }
   ```

6. every Polyfill

   ```js
    Array.prototype.myEvery = function(callback){
        if(typeof callback !== "function") throw new TypeError( callback + " is not a function");
        for(let i = 0; i < this.length; i++){
            if(i in this){
                let temp = callback(this[i], i, this);
                if(!temp){
                    return false;
                }
            }
        }
        return true;
    }
   ```

7. find Polyfill

   ```js
    Array.prototype.myFind = function(callback){
        if(typeof callback !== 'function') throw new TypeError(callback + " is not a function.");
        for(let i = 0; i < this.length; i++){
            if(i in this && callback(this[i], i, this)){
                return this[i];
            }
        }
        return undefined;
    }
   ```

8. sort Polyfill

   ```js
   Array.prototype.mySort = function(compare){
        for(let i =0; i < this.length; i++){
            for(let j = 0; j< this.length; j++){
                const a = this[j], b = this[j+1];
                if(compare ? compare(a,b)> 0 : a > b){
                    [this[j],this[j+1] = this[j+1], this[j]];
                }
            }
        }
        return this;
    }
   ```

9. concat Polyfill

    ```js
     Array.prototype.myConcate = function(...args){
        const result = [...this];
        args.forEach(arr => {
            for(let i = 0; i < arr.length; i++) result.push(arr[i]);
        });
        return result;
    }
    ```

10. include Polyfill

    ```js
     /**
      * Array.prototype.includes()
      * checks if array contain a value
    */
    Array.prototype.myInclude = function(val){
       for(let i =0; i< this.length; i++){
           if(i in this && this[i] === val){
               return true;
           }
       }
       return false;
    }
    ```

### 8. Iteration is foundational to all array usage

- Manual loops are fastest and handle holes.
- Built-in iteration methods follow the iterator protocol.
- Different iteration methods handle holes differently.
- Reduce is the most powerful aggregator.
- map/filter create new arrays; forEach performs side effects.
- Never use for…in for arrays.
- Iteration performance matters in large-scale systems.

## F. Spread and Rest

JavaScript uses the same syntax `...` for two different concepts.

1. Spread syntax

   Expands an iterable INTO individual elements.

   ```js
    const arr2 = [...arr1]; 
   ```

2. Rest Syntax

   Collects elements INTO an array.

   ```js
    function sum(...nums){}
   ```

> They Look Identical but behaves oppositely.

### 1. Spread vs Rest

| Feature     | Spread                          | Rest                           |
| ----------- | ------------------------------- | ------------------------------ |
| Direction   | expands                         | collects                       |
| Where used? | arrays, objects, function calls | function params, destructuring |
| Input       | iterable                        | any set of values              |
| Output      | list of elements                | array (or object)              |
| Example     | `[...arr]`                      | `[a, ...rest]`                 |

### 2. Shallow Copy Rules

Spread/rest creates shallow copies:

```js
const arr = [{a: 1}];
const copy = [...arr];

copy[0] = 99;
console.log(arr[0].a) // 99
```

Object inside array are copied by reference.

### 3. Performance and Memory Cost

- Spread is slower than slice for copying arrays

| Method       | Speed                      |
| ------------ | -------------------------- |
| arr.slice()  | fastest                    |
| [...arr]     | slower (iterator protocol) |
| Array.from() | slowest                    |

- Spread with Huge arrays can lead to out of memory issue

```js
[...bigArray] // may crash memory
```

- Rest inside function allocates a new array every time
  
```js
function test(...args){} // more memory usages
```

### 4. Summary

- Spread expands iterables.
- Rest collects values.
- Same syntax (...), opposite behavior.
- Used in arrays, objects, and functions.
- Spread creates shallow copies (not deep).
- Avoid spreading huge arrays due to memory limits.
- Rest is critical for variadic functions and destructuring.
- Spread uses the iterator protocol under the hood.
- Rest uses the binding pattern under the hood.

## G. Array-Like Object & Iterables

JavaScript has two separate but often confused concepts:

1. Array-Like Objects

   Objects that look like array but NOT real arrays.

   Must Have:

   - Numeric Index
   - length property

   But:

   - No Array methods
   - Not iterable unless Symbol.iterator exists
   - Not real arrays

   Example: `arguments`, NodeList, string-like objects.

2. Iterables

  Object that implements

  ```js
  obj[Symbol.iterator]
  ```

  This method returns an iterator object with

  ```js
  next() -> {value, done}
  ```

Example:

- Arrays
- String
- Sets
- Maps
- Generators

### 1. What is Array_Like?
