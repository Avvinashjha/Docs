# Frontend Interview Level 3 YOE

## JavaScript topics to prepare

1. Call apply bind
2. class
3. this keyword
4. arrow function and this
5. Prototype
6. Promise / async/await / Promise polyfills
7. Event loop
8. SetTimeout/setInterval
9. V8 Engine and Web APIs and multi threading
10. Event and lifecycle of event / eventDelegation / eventBubbling
11. Infinite scroll
12. Hoisting
13. debounce/ throttle
14. memoization
15. objects/ Map/weakMap/ set
16. Polyfills / Array Methods
17. WHAT is closure?
18. what is currying?
19. What is difference between Map and {}
20. What is deep copy/ deep clone/ shallow copy

### 1. Call apply bind

#### call()

Call is a method which comes with the function and using that we can give this argument, and it change the context of the function and will call the function immediately and will call the function immediately. and we can pass the function arguments comma separated.

what is `this` in a function declaration and function expression?

- For **Function Declaration** this is the context of the function itself. so in function declaration we can define `this.name = "something"` and when you access `this.name` in that function the you will get `something`.
- In function declaration if you don't have this inside function then in browser it refers to global window this, but in ide if you are running in module then it is undefined.

    ```js
    function log(){
        this.name = "log"; // this is the property of the function declaration
        console.log(this.name); // this will print log in console
    }
    ```

- For **Function Expression** this is the context of global this. so in function expression we do not have this as it's own property so it uses it outer scopes this as it's this. Function declaration this is crucial to understand.

    ```js
    // global property
    const name = "global";

    const noThisFunction(){
        console.log(this.name); // since current function expression has no this and it is looking for this in it's outer scope so it will print global
    }

    function localScope(){
        this.name  ="local";
        const noThisFunction(){
            console.log(this.name); // In this case the local this for noThisFunction is localScope function and now it will print local
        }  
    }
    ```

- How call set the this of a function?
  - In case of Function Declaration we can override the this context of the function and provide custom this based on our requirement and can call the function immediately for that context
  - In case of Function Expression call is not effective and it will use the this of it's lexical scope:

    ```js
    this.name = "global"

    const fun = (a, b) => {
        console.log(this.name, a, b);
    }
    fun(2, 4); // global 2 4
    fun.call({name: "call"}, 2, 4) // global 2 4

    function foo(b,c){
        console.log(this.name, b,c);
    }
    foo(2, 4); // undefined 2 4

    foo.call({name: "call"}, 2,4) // call 2 4
    ```

> So function declaration has it's own this and using call we can override that this and invoke that function.
> But in case of Function expression (Arrow function) it does not have it's own this and hence it uses it lexical scope's this and effectively if you want to override the this of function expression then you should change the context of it's lexical scope.

#### apply()

Apply is a method comes with a function, using this you can change the context of this for a function Declaration and arguments can be passed as second argument as array.

Example:

```js
this.name = "global"

const fun = (a, b) => {
    console.log(this.name, a, b);
}
fun(2, 4); // global 2 4
fun.apply({name: "call"}, [2, 4]) // global 2 4

function foo(b,c){
    console.log(this.name, b,c);
}
foo(2, 4); // undefined 2 4

foo.apply({name: "call"}, [2,4]) // call 2 4
```

- So this will behave same as call, this will also invoke the function with context and arguments but in this case arguments are passed into an array.
- Apply can also not be able to change the context of Function declaration.

#### bind()

bind is also a method comes with function which can bind the context to a function and return the bounded context function, In bind you can pass arguments and it will be comma separated.

```js
this.name = "global"

const fun = (a, b) => {
    console.log(this.name, a, b);
}
fun(2, 4); // global 2 4
const customContextFun = fun.bind({name: "call"}, 2, 4) 
customContextFun();// global 2 4

function foo(b,c){
    console.log(this.name, b,c);
}
foo(2, 4); // undefined 2 4

const customContextFoo = foo.bind({name: "call"}, 2,4) 

customContextFoo()// call 2 4
```

- In this case bind returns the bounded context function
- It does not calls the function rather it binds the context and return the function
- Arguments are passed similar to call or you can pass the arguments when you are running the bounded function.

```js
this.name = "global"

const fun = (a, b) => {
    console.log(this.name, a, b);
}
fun(2, 4); // global 2 4
const customContextFun = fun.bind({name: "call"}) 
customContextFun(2,3);//// global 2 3

function foo(b,c){
    console.log(this.name, b,c);
}
foo(2, 4); // undefined 2 4

const customContextFoo = foo.bind({name: "call"}) 

customContextFoo(2,3)// call 2 4
```

### class

#### What is class in Javascript?

In Javascript class is a type of function. In JavaScript, a class is a special kind of function that provides a cleaner, more familiar syntax for creating objects and handling inheritance.

A class is a blueprint for creating objects with:

- properties (data)

- methods (functions)

- optional inheritance (via extends)

- Under the hood, a class is just a constructor function + prototype methods.

Then what is the difference between class and Function

1. Class is not hoisted in js
2. Class Properties are non-enumerable (so when you iterate over object properties then you will not be able to access methods and variables)

   ```js
    class Test {
        constructor(){
            this.name = "avinash";
        }
        greet(){
            console.log("Hello " + this.name);
        }
    }
    // Instance of Test
    const obj = new Test();
    // Called the Method of obj instance 
    obj.greet();

    // simple object
    const obj1 = {
        name: "Avinash",
        greet () {
            console.log("hello");
        }
    }

    // Checking the properties of class and in this case methods are no-enumerated
    console.log(Object.keys(obj));//[ 'name' ]

    // checking the properties of a simple object and you can see method appears
    console.log(Object.keys(obj1)); //[ 'name' ]
   ```

3. Class is always in strict mode
4. Class can have constructor
5. Class supports super method and clean inheritance
6. 

## React Topics to prepare

1. Vite / webpack / differences
2. Hooks ( useState/useEffect/useCallback/useMemo/memo/ useRef/ useReducer/ useContext)
3. Lifecycle Methods and how Lifecycle works in functional components
4. React Window / Infinite Scroll / Pagination
5. Custom Hooks difference between Hooks and functions
6. What happens when we build a react project?
7. How hot reload works?
8. How can we implement dark mode?
9. Why React over JS and Other Framework?
10. What is React fiber?
11. What is strict mode ?
12. Make a modal In React
13. Make a carousel in react
14. Make a todo-list in react
15. Form Handling/ validation
16. Design Patterns
17. Component Design Pattern
18. How React updates the DOM / what is Virtual tree in react fiber
19. What is Lazy Loading and Suspense in react?

## Redux

- What is Redux?
- Benefit of redux in a react app/ why to use redux?
- What is slice?
- Add redux to a react project and learn

## CSS

- What is box modal
- Flex Box
- Animation
- Create a Pie chart
- Create a confetti
- Create a loader

## Problems

1. Write a memoization function ✅
2. Write a debounce function ✅
3. write a throttle function ✅
4. Write a taskRunner ✅
5. Write a pub sub function 🌟 ✅
6. Implement a retry mechanism
7. Implement a promise pool
8. Write Promise.all. Promise.race, Promise.any from scratch
9. Create an Event emitter
10. Implement a scheduler that Runs task at a given timestamp
11. Implement a Lazy Evaluation chain (Like Lodash)
12. Implement Deep clone (handle Map, Set, Date, Cycles)
13. Implement LRU cache
14. Implement Polyfill for bind()
15. Implement pipe() and compose() function
16. Implement Observables (RxJS-style lightweight version)
17. Convert Callback style APIs to Promise (promisify)
18. Implement timeout wrapper for promise
19. Implement a memory friendly infinite iterator
20. Implement task queue with priority label
21. Implement you own JSON.stringify (minimal)
22. Implement a file upload manager with concurrency and retry
23. implement you own react like useState and re-render
24. Implement you onw redux with subscribe and dispatch
