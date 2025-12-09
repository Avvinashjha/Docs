
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
    console.log(Object.keys(obj1)); //[ 'name', 'greet' ]
   ```

3. Class is always in strict mode
4. Class can have constructor
5. Class supports super method and clean inheritance
6. Classes have a [[Construct]] check, You must use `new`

#### what is Strict Mode and Why Class is always in strict mode?

Strict mode is special mode in JS that makes code writing strict and consistent.

1. It prevents accidental global variables

   Example Without Strict Mode:

   ```js
    x = 10;
    console.log(x); // 10
   ```

   In Strict mode

   ```js
    "use strict"
    x = 10;
    console.log(x); // ReferenceError: x is not defined
   ```

2. Duplicate parameter names are not allowed

    Passing same name in parameter 

    ```js
    function add(a, a){
        console.log(a+a);
    }

    // so the output of this function will be
    // first a = 10
    // second a = 30
    // now as the value of change to 30 so first a will become 30
    add(10,30); // 60
    ```

    In Strict mode

    ```js
    function add(a, a){
        console.log(a + a);
    }
    add(10, 30); // SyntaxError: Duplicate parameter name not allowed in this context
    ```

3. Makes this more predictable

    In Non Strict mode

    ```js
    function fun(){
        console.log(this);
    }
    fun(); // refers to window
    ```

    In Strict mode

    ```js
    "use strict";
    function fun(){
        console.log(this);
    }
    fun(); // undefined refers to the this of function
    ```

#### What are different ways to create a class

There are multiple Ways to create a class in Javascript

1. using class declaration

   ```js
    class Test {
        constructor(name){
            this.name = name;
        }
        getName(){
            return this.name;
        }
    }

    // Create an object of class you have to use new keyword
    const obj = new Test(); // here we created the object without the name 
    console.log(obj.getName()); // undefined

    const obj1 = new Test("Avinash");
    console.log(obj1.getName()) // Avinash

    // What if you directly wants to access the name
    console.log(Test.name); // This will return the name of the class not the property(class does not have properties object has) of the class i.e. Test
    console.log(obj.name); // this will return the properties of object which is undefined
    console.log(obj1.name); // similarly will return the property of object Avinash
   ```

2. Class Expression

   Class does not need name or can be assigned to a variable.

   Name class Expression

   ```js
    const Test = class TestClass {
        constructor(name){
            this.name = name;
        }
    }
    const obj = new Test("Avinash");
    console.log(obj.name); // Avinash
   ```

   Anonymous class Expression

   ```js
    const Test = class {
        constructor(name){
            this.name = name;
        }
    }
    const obj = new Test("Avinash");
    console.log(obj.name); // Avinash
   ```

3. Constructor Function + Prototype (pre-ES6)

   This is how ES6 class Compile internally

   ```js
    function Test(name) {
        this.name = name;
    }

    Test.prototype.getName = function () {
      return this.name;
    };

    const obj = new Test("Avinash"); // Create an object of Test class
    console.log(obj.getName()); // Avinash
    console.log(Test("Avinash")); // Function returns nothing so undefined
    console.log(Test.name); // Name of the function
    console.log(Test("Avinash").getName()); // as getName is property of object so class will throw error
    // TypeError: Cannot read properties of undefined (reading 'getName')
   ``` 

4. Factory Function (Not a real class but act as one)

   No Prototype, No new

   ```js
    function Test(name){
        return {
            name,
            getName(){
                return this.name;
            }
        }
    }

    const obj = Test("Avinash");
    console.log(obj.getName()); // Avinash
    console.log(Test.name) // Function Name Test
    console.log(Test("Avinash").name) // Avinash
   ```

5. Factory + Prototype Hybrid (manual class)

    A factory that sets the prototype manually.

    ```js
    const testMethods = {
        getName(){
            return this.name;
        }
    }

    function Test(name){
        const obj = Object.create(testMethods);
        obj.name = name;
        return obj;
    }

    const obj = Test("Avinash");
    console.log(obj.name); // Avinash
    console.log(Test.name); // Test
    console.log(Test("Avinash").getName()); // Avinash
    ```


#### What is Inheritance?

Inheritance is a mechanism that allows one object or class to reuse or extend another object or class.

Javascript uses prototype based inheritance (not class based inheritance like Java/c++)

Even the class syntax in JS is only to show that it's extending another class but under the hood it uses prototype inheritance.

The core idea:

- Every object has hidden reference to another object and that called as prototype.
- When you access a property, Javascript looks:
  1. On the object itself
  2. If not found then it looks on it's prototype
  3. if still not found it looks on prototype's prototype
  4. ...all the way up the prototype chain

This lookup chain is inheritance in javascript.

Example:

```js
const parent = {
    greet(){
        console.log("hello");
    }
}
//Creates an object that has the specified prototype or that has null prototype.
// So in this case the prototype of child will have the greet properties which is of parent
const child = Object.create(parent);
child.greet(); // works because inherited from parent
```

Prototype Chain

```js
child -> Parent -> Object.prototype -> null
```

Types of Inheritance in Javascript

1. prototype Inheritance

   Using `Object.create()`

   ```js
   const parent  = {
    greet(){console.log("Hello")}
   }

   const child = Object.create(parent);

   child.greet();
   ```

   Most fundamental form of inheritance in Javascript.

2. Constructor Function Inheritance (Pre-ES6)

   Parent Constructor

   ```js
   function Person(name){
    this.name = name;
   }

   Person.prototype.sayHi = function(){
    console.log("Hi " + this.name);
   }
   ```

   Child Constructor

   ```js
   function Student(name, grade){
    Person.call(this, name); // Inherit properties
    this.grade = grade;
   }

   Student.prototype = Object.create(Person.prototype); // Inherit Methods
   Student.prototype.constructor = Student;
   ```

   This is classic OOP-style

3. ES6 Inheritance

   ```js
    class Person{
        constructor(name){
            this.name = name;
        }
        sayHi(){
            console.log("Hi " + this.name)
        }
    }

    class Student extends Person {
        constructor(name, grade){
            super(name);
            this.grade = grade;
        }
    }
   ```

   - Most popular, automatically manages prototypes under the hood
4. Mixins (Horizontal Inheritance)

   ```js
    const sayHi = {
        hi(){console.log("hi")};
    }
    const sayBye = {
        bye(){console.log("bye")}
    }

    const person = Object.assign({}, sayHi, sayBye);
   ```

   for classes

   ```js
    Object.assign(Person.prototype, sayHi, sayBye )
   ```

    - This emulates multiple inheritance under the hood it is just adding properties to the prototype from multiple class.

#### What is constructor?

A constructor is a special  method inside a class that runs automatically when you create a new object (instance) from the class.

- Only one constructor is allowed per class
- It's used to initialize properties of the class
- It runs when you use new ClassName()

#### what is this in class?

In Javascript class, this refers to the current instance of the class, the object created when you call new.

- this does not refer to class itself
- this does not refer to function
- this refers to the object being constructed

#### What is super in class?

super is a keyword used in child classes to:

1. Call the parent class constructor (super(...))
2. Access parent class methods (super.methodName())

```js
class Animal {
    constructor(name){
        this.name = name;
    }

    speak(){
        console.log(this.name + " makes a sound");
    }
}

class Dog extends Animal{
    constructor(name){
        super(name); // calls the Animal Constructor
    }
    speak(){
        super.speak(); //calls Animal.speak()
        console.log(this.name + " barks");
    }
}
```

What happens under the hood:

1. super() calls the parent constructor, This initializes the initial state(this) using parent class logic.
2. Super links prototypes, The extends keyword sets:
   - Dog.prototype -> inherits from Animal.prototype
   - Dog (the class constructor function) -> inherits from Animal

    so prototype chain is set by extends, not by super.
3. super() must be called before using this, In subclass constructor, Javascript requires super() to run before you access this because:
   - super() creates and initializes the this object.

So we can say that super is used to call the parent class's constructor and methods.

#### what is static in class?

static is a keyword that defines properties or methods that belongs to the class itself, not to instances of the class.

Example:

```js
class Counter {
    static count = 0; // static variable
    static increment(){ // static method
        Counter.count++; // here we are not access count using this because it is the property of class
    }
}
Counter.increment(); // Here we are directly calling increment on class itself because static makes it the property of class
console.log(Counter.count); // 1 similarly here count is property of class as it is static
```

Static members are the property of class so you can not access in on instances. For each instance static property will remain same.

```js
const c = new Counter();
c.count; // undefined
c.increment() // error calling undefined
```

static members belong only to class not to its objects.

Why do we use static?

1. Class level configuration of constants

   ```js
    class AppConfig {
        static API_URL = "https://api.example.com"
    }
   ```

2. Tracking instances

    ```js
    class User{
        static totalUsers = 0;
        constructor(){
            this.totalUsers ++;
        }
    }
    ```

3. Factory Methods

   ```js
    class Person {
        // you can create a Person instance using name
        constructor(name){
            this.name = name;
        }
        // you can create a person instance by passing the json object
        static fromJSON(json){
            return new Person(json.name);
        }
    }

    const p1 = new Person("Avinash");
    const p2 = Person.fromJSON({name: "Avinash"})
   ```

#### can we declare private variables?

- Yes you can use closure to create a private variable in javascript.
- of use #privateField inside class to create true private properties or methods.

#### can we have class inside a class?

Yes, you can define a class inside another class in JavaScript, but JS does not support true nested classes.
The inner class is simply a variable (often static) holding a class definition, not a special nested structure.

```js
class Outer {
  constructor() {
    console.log("Outer created");
  }

  static Inner = class {
    constructor() {
      console.log("Inner created");
    }
  }
}

new Outer() // outer cleated
new Outer.Inner(); // inner created
```

so in javascript nested class simply means the inner class is a property of outer class.

#### Can we have polymorphism in javascript?

Polymorphism = same method name, different behavior depending on the object.

JavaScript supports this in multiple ways.

1. Polymorphism through method overriding (class inheritance)

    ```js
    class Animal {
        speak(){
            console.log("Animal make sound" );
        }
    }

    class Dog extends Animal {
        speak(){
            console.log("Dog Barks");
        }
    }

    class Cat extends Animal {
        speak(){
            console.log("Cat Meows");
        }
    }

    function makeAnimalSpeak(animal){
        animal.speak(); // polymorphism in action
    }

    makeAnimalSpeak(new Dog())// Dog Barks
    makeAnimalSpeak(new Cat())// Cat Meows
    ```

    So same method name but different behavior depending on which class instance you use.

2. Polymorphism through prototypes

    Even without classes, JS objects can override methods.

    ```js
    function Shape (){}

    Shape.prototype.draw = function(){
        console.log("Drawing shape");
    }

    function Circle (){}
    Circle.prototype = Object.create(Shape.prototype);
    Circle.prototype.draw = function(){
        console.log("Draw circle");
    }

    new Circle().draw() // Drawing circle
    ```

3. Duck typing (Javascript unique style polymorphism)

    If it looks like duck and quack like a duck, treat it like a duck.

    Javascript does not require inheritance to use polymorphism.

    ```js
    function greet(entity){
        entity.sayHi();
    }
    const obj1 = {sayHi(){console.log("Hi from obj1")}};
    const obj2 = {sayHi(){console.log("Hi from obj2")}};
    greet(obj1);
    greet(obj2);
    ```

    As long as an object has right method,it works, this is also a form of polymorphism.
