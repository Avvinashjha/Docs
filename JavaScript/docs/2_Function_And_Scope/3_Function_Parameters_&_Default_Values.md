## 3. Function Parameters & Default Values

### 1. Basic Function Parameters

A parameter is a variable in a function definition, and an argument is the actual value passed when the function is called.

```js
function greet(name){
  console.log("Hello " + name);
}
greet("Avinash"); // Hello Avinash
greet(); // Hello undefined
```

- By Default, parameters not passed are undefined

### 2. Default Parameter value (ES6 Feature)

Default parameter allow you to assign a fallback value directly in the function signature.

```js
function greet(name="user") {
  console.log("Hello "+ name);
}
greet("Avinash);//Hello Avinash
greet(); // Hello user
```

- when no argument is passed or if the the argument is explicitly undefined, the default value will be used.

```js
greet(undefined);// Hello User
greet(null);// Hello null (default is not applied)
```

- Default values are applied only when the argument is **undefined**, not **null**

### 3. Expression as default value

Default values aren’t limited to literals, they can be expressions(even function calls.

```js
function randomId(){
  return Math.floor(Math.random()*1000);
}
function createdUser(name="Anonymous", id= randomId()){
  console.log(name, id);
}
createUser("Sam", 1); //{name: "Sam", id:1}
createUser("Avinash"); //{name: "Avinash", id: 456}
createUser(); // {name: "Anonymous", id: 876}
```

- The function expressions are evaluated at call time, not function definition time.

### 4. Dependent Default Parameter

Default parameter can reference earlier parameter, but not later ones.

```js
function introduce(firstName, lastName="Jha", fullName=`${firstName} ${lastName}`){
  console.log(fullName);
}
introduce("Avinash")// Avinash Jha
introduce("Hritik","Raj")// Hritik Raj
```

- Using later parameters inside a default value will cause a `ReferenceError`

```js
function invalid(a = b, b = 5){} // Refrence Error can not access 'b' before initialization
```

### 5. Parameter Scope and TDZ(Temporary Dead Zone)

Each parameter has its own scope, you can not reference a parameter before it’s defined (inside the same parameter list)

```js
function example(a = b, b = 5){
  console.log(a,b);
}
example()// ReferenceError
```

- Here, `b` is not initialized when `a's` default is being computed, this is a TDZ issue.
- Correct version

```js
function example(b = 5, a = b){
  console.log(a, b);
}
example();// 5, 5
```

### 6. Using Default value with Destructuring

Default parameters pair beautifully with destructuring, especially for configuration objects.

```js
function createUser({name="Guest", age=18, active=true}) = {}) {
  console.log(name, age, active);
}
createUser({name: "Avinash", age: 21});// Avinas 21 true
createUser();// guest, 18, true
```

**Why `={}` after destructuring?**

If you call `createUser()` with no argument, destructuring undefined would throw an error. The outer default (`= {}`) prevents that

### 7. Rest Parameters (`...args`)

Rest parameters gather all remaining arguments into an array.

```js
function sum(...numbers){
  return numbers.reduce((acc, n) => acc+n, 0);
}
let sum1 = sum(1,2,3,4,5);//15
let sum2 = sum(1,2,3); // 6
```

You can mix rest and normal parameters

```js
function log(type, ...messages){
  console.log(`[${type.toUpperCase()}]:`, ...messages);
}
log("info", "server started", "port 9000");
 // [INFO]: server started port 9000
```

### 8. Default values + Rest Parameters

Default values work fine alongside rest prameters.

```js
function greetAll(greeting="Hi", ...names){
  names.forEach(name => console.log(`${greeting}, ${name}`);
}
greetAll("Hello", "Avinash", "Sam");
greetAll(undefined, "Avinash", "Sam", "Ravi");
```

### 9. Common Pitfalls

- Default value evaluated every call

```js
function addItem(item, list=[]){
  list.push(item);
  return list;
}
console.log(addItem("Apple"));// ["Apple"]
console.log(addItem("Banana")); // ["Banana"]
//Each call get a new array
```

- Confusing undefined vs null

```js
function show(val = 10){console.log(val);}
show(undefined); // 10 default values applies
show(null) // null Default value ignored
```

### 10. Advanced Use: Lazy Initialization

Because default expressions are evaluated lazily, they’re perfect for expensive computations that they may not always needed.

```js
function compute(value = factorial(100)){
  console.log("Computed:", value);
}
function factorial(num){
  if(num === 0 || num === 1){ return 1;}
  return n * factorial(num -1);
}
compute(42); // 42
compute(); // 9.332621544394418e+157 this might take time

```

>Q. When are default parameter value evaluated?
>- At call time and only if the argument is undefined.
