# 3. Array

- [x] Fundamentals Of Array
- [x] Memory and Internal Representation
- [ ] Array Class
- [ ] Array Operations
- [ ] Array Iteration
- [ ] Spread and Rest
- [ ] Array-Like and Iterables
- [ ] Advance Array Methods and Techniques
- [ ] Performance and Optimization
- [ ] Polyfills and Internal Mechanics
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
console.log(A.length); // 3 (still works)
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

```js

```