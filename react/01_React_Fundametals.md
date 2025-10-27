# 1. React Fundamental

- [x] What is React, why React over other frameworks?
- [x] JSX syntax and rules
- [x] Components:
  - [x] Functional vs Class components
  - [x] Component composition
- [x] React State and Lifecycle
- [x] Handling Events and Conditional Rendering in React
- [x] Lists and keys
- [x] Forms and Controlled Components
- [x] Rendering & reconciliation \(Virtual DOM, diffing\)
- [x] Fragments, portals, and error boundaries

## A. What is React, why React over other frameworks?

### 1. What is React?

React is a **JavaScript library for building user interfaces**, focusing on declarative and component-based architecture. It efficiently updates and renders components when data changes, using a **Virtual DOM** for performance.

### Deep Insight

- React is not a full framework, it’s the **view layer of MVC**.
- Designed for predictable UIs through **one way data flow.**
- Emphasizes **immutability**, **pure function**, and **re-usability.**
- React elements are **descriptions** of what you want to see, they are not the actual DOM Nodes.

### 2. Why React?

Before React \(or in plain DOM-Manipulation\) building complex, interactive UIs required manual DOM updates. Than becomes error prone and hard to reason about as app grows.

#### Problem with Pain Js/JQuery

1. Imperative updates: You had to manually update DOM element

    ```js
    // Update text content manually
    document.getElementById("count").textContent = 1;
    ```

    - With many UI elements, this becomes hard to maintain.
2. **State Management is complex**: Keeping UI in sync with app state requires manual bookkeeping.
3. **Poor component reuse**: Logic and DOM where often lightly coupled, amking reusability difficult.
4. **Performance issue**: Frequent DOM updates can be expensive. Developers had to manually optimize.

#### How React solves these problems

1. Declarative UI
    - Instead of telling the browser how to update the DOM, you declare what the UI should look like based on state.

    ```js
    const [count, setCount] = React.useState(0);
    return <div>{count}</div>
    ```

    - React automatically updates the DOM when `count` changes.
2. **Component based architecture**
    - Break UI into reusable pieces (components), each managing it's own state.
    - Makes large apps modular, maintainable and testable.

    ```js
    function Button({label, onClick}) {
        return <button onClick={onClick}>{label}</button>
    }
    ```

3. **Virtual DOM**
   - React uses Virtual DOM (in-memory representation of real DOM) to efficiently compute minimal updates, improving performance.
   - Reduces direct DOM Manipulation, which are slow.

4. **Unidirectional Data Flow**
   - Data flows top-down from parent to child via props
   - Makes it easier to reason about state changes.

5. Ecosystem & Tools
   - Rich ecosystem: React Router, Redux, Zustand, React Query
   - Developer Tools: React DevTools, JSX Debugging.
   - Works with Modern JS, TS, and frameworks like Next.js.

### 3. React vs Other Frameworks / Libraries

| Feature                  | React                     | Angular          | Vue                 | Plain JS / jQuery |
| ------------------------ | ------------------------- | ---------------- | ------------------- | ----------------- |
| Type                     | Library                   | Framework        | Framework           | None              |
| DOM Manipulation         | Virtual DOM               | Real DOM         | Virtual DOM         | Real DOM          |
| Learning Curve           | Moderate                  | Steep            | Easy to moderate    | Low               |
| State Management         | External (Redux, Zustand) | Built-in         | Built-in or Vuex    | Manual            |
| Component-based          | Yes                       | Yes              | Yes                 | No                |
| Data Binding             | One-way                   | Two-way          | Two-way (optional)  | Manual            |
| Performance Optimization | Virtual DOM diffing       | Change detection | Virtual DOM diffing | Manual            |
| Ecosystem                | Rich (Hooks, DevTools)    | Complete         | Growing             | Minimal           |

#### Why choose React over others?

- Flexibility: You choose routing, state management, and styling libraries.

- Performance: Virtual DOM optimizes updates.

- Reusability & Maintainability: Component-based.

- Large community & ecosystem: Many libraries, tutorials, and enterprise usage.

- Cross-platform: React Native allows mobile apps using the same principles.

### 4. Key Features of React

1. **Declarative**: UI updates automatically based on state changes.
2. **Component-based**: Reusable and modular pieces.
3. **Learn Once, Write Anywhere**: Web, mobile, desktop.
4. **JSX**: Clean syntax to combine JS + HTML-like structure.
5. **Virtual DOM**: Efficient rendering.
6. **Hooks (Modern React)**: Manage state, lifecycle, and side-effects in functional components.
7. **Ecosystem**: Testing, state management, routing, SSR (Next.js), etc.

### 5. Common Pitfalls

- React is **not a full framework** (doesn’t include routing, forms, state management by default).
- JSX is not required, but widely used.
- **Virtual DOM** doesn’t magically make your code fast, bad patterns can still hurt performance.
- Components must follow capitalized naming conventions for React to recognize them.
- React encourages functional programming patterns (pure functions, immutability) for maintainability.

### 6. Summary

- React is a **declarative**, **component-based** library for building UIs.
- It solves problems of manual DOM updates, complex state, and maintainability in large apps.
- Advantages over plain JS/jQuery and other frameworks include **Virtual DOM**, reusable components, unidirectional data flow, and a **rich ecosystem**.
- React is flexible and scalable for modern web applications.

### 7. Questions to Focus on

>Q1: What is React?<br>
 React is a JavaScript library for building user interfaces. It allows building reusable, component-based UIs with a declarative approach and Virtual DOM for performance.

>Q2: Why React over plain JS or jQuery?<br>
A2: React solves problems like manual DOM manipulation, complex state management, and code maintainability. It uses declarative UI, components, and Virtual DOM for efficient updates.

>Q3: What is the Virtual DOM and why is it important?<br>
A3: Virtual DOM is an in-memory representation of the real DOM. React diffs the new and old Virtual DOM to update only necessary parts of the actual DOM, improving performance.

>Q4: How is React different from Angular or Vue?<br>
A4: React is a library (not a full framework), focuses on UI components, uses unidirectional data flow, and has a Virtual DOM. Angular is a full framework with two-way binding and more built-in features. Vue is more flexible with optional two-way binding.

>Q5: What are the key benefits of using React?<br>
A5: Declarative UI, component reusability, maintainable code, performance optimizations, flexible ecosystem, cross-platform development (React Native), large community support.

## B. JSX syntax and rules

### 1. What is JSX?

- JSX (Javascript HTML) is a syntax extension for JavaScript that looks like HTML but allows embedding JS expressions.
- React uses JSX to declare UI in a declarative way.
- JSX is not required, you can write React.createElement directly, but JSX is universally used and it's readable and expressive.

#### Why JSX?

- Writing UI in plain JS `document.createElement` becomes verbose and imperative.
- JSX lets you write what the UI should look like for a given state in **clean**, **declarative** syntax.

#### Example: JS vs React vs React + JSX

1. **Plain JavaScript (Imperative DOM Updates)**

    ```js
    const div = document.createElement("div");
    div.textContent = "Hello JavaScript";
    document.body.appendChild(div);
    ```

2. **React Without JSX**

   ```js
    const element = React.createElement("div", null, "Hello React without JSX");
    ReactDOM.render(element, document.getElementById("root"));
   ```

3. **React with JSX**

   ```js
    const element = <div> Hello JSX</div>
    ReactDOM.render(element, document.getElementById("root"));
   ```

> Note: JSX Makes the Ui declaration much cleaner, especially with nested elements and dynamic content.

### 2. Rules of JSX

1. JSX expression must have one parent element

   ```js
    // Invalid JSX
    const element = <h1>hello</h1><p>world!</p>

    //Valid JSX
    const element = (
        <div>
            <h1>Hello</h1>
            <p>world!</p>
        </div>
    )
   ```

2. Use `{}` to embed JavaScript expressions

   ```js
    const name = "Avinash";
    const element = <h1>Hello, {name}</h1> // Hello, Avinash
   ```

3. Use `className` instead of `class`

   ```js
    <div className="container"></div>
   ```

4. Use `htmlFor` instead of `for`

   ```js
    <label htmlFor="email">Email:<label>
    <input id="email" />
   ```

5. Self closing tags for element with no children

   ```js
    <img src="logo.png" alt="logo" />
   ```

6. JSX is case Sensitive
   - Lowercase = HTML elements (`div`, `p`)
   - Uppercase = React components (`MyComponent`)

7. JSX Supports expression but not statement

   ```js
    // Invalid
    const element = <div>{if(x>0){"yes"}}</div>
    //valid
    const element = <div>{x > 0 ? "Yes" : "No"}</div>
   ```

### 3. Dynamic Context in JSX

- You can embed variables, expressions, function calls, array inside `{}`.
- Example
  
  ```js
  const name = "Avinash";
  const items = ["Apple", "Banana", "Mango"]
  function App(){
    return (
        <div>
            <h1> Hello, {name}</h1>
            <ul>
                {items.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <p> 2 + 3 = {2 + 3}</p>
        </div>
    )
  }
  ```

### 4. Conditional Rendering with JSX

- Use ternary or logical && to conditionally show UI.

    ```js
    const isLoggedIn = true;
    function Greeting (){
      return (
          <div>
              {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
          </div>
      )
    }
    ```

- Logical AND Example

    ```js
    <div> {isLoggedIn && <button>Logout</button>}</div>
    ```

### 5. JSX and Attributes

- Attributes in JSX follow camelCase naming

    ```js
    <input type="text" maxLength={10} />
    <button disabled={isDisabled}>Click</button>
    ```

- You can pass JS objects for inline styles

    ```js
    <div style={{backgroundColor: 'blue', color: 'white'}}>Hello</div>
    ```

### 6. JSX vs HTML

| JSX                         | HTML                       |
| --------------------------- | -------------------------- |
| `className`                 | `class`                    |
| `htmlFor`                   | `for`                      |
| `{}` allows JS expressions  | Cannot embed JS directly   |
| Self-closing tags mandatory | Optional for some elements |
| Case-sensitive for elements | Not enforced in HTML       |

### 7. Common Pitfalls

- Forgetting key in lists → reconciliation issues
- Using statements instead of expressions inside `{}`
- Not wrapping multiple root elements in a fragment or parent `<div>`
- Misusing `class` / `for` attributes
- Inline styles must be objects, not strings

### 8. Summary

JSX is the syntax that allows writing declarative React UI. It lets you embed dynamic JS logic, supports expressions, follows specific rules, and improves readability over plain DOM manipulation. JSX is transformed under the hood into React.createElement calls, so it’s just syntactic sugar but essential for modern React development.

### 9. Questions to Focus on

>Q: What is JSX and why do we use it?<br>
>A: JSX is a syntax extension for JavaScript that lets us write HTML-like code inside JS. It makes UI declarative, readable, composable, and dynamic.

>Q: Can you write React without JSX? Show an example.<br>
>A: Yes, you can use React.createElement:
>
>```js
>React.createElement('div', null, 'Hello World');
>```

>Q: How does JSX differ from HTML?<br>
>A: Differences include:
>
>- className vs class, htmlFor vs for
>- JS expressions inside {}
>- Self-closing tags required
>- Case-sensitive for elements

>Q: How do you conditionally render elements in JSX?<br>
>A: Using ternary or logical AND:
>
>```js
>    {isLoggedIn ? <h1>Welcome</h1> : <h1>Login</h1>}
>    {isLoggedIn && <button>Logout</button>}
>```

>Q: What rules must you follow when writing JSX?<br>
>A: Single parent element, JS expressions in {}, camelCase attributes, self-closing tags, case-sensitive, lists need key.

## C. Components

### 1. What is Component?

A component in React is a **reusable**, **independent piece of UI** that can contain logic, state, and markup.

Think of component as building blocks of you app, you compose them together to form complete interface.

Example:

```js
function Welcome() {
    return <h1> Hello, World!</h1>;
}
```

This small `Welcome` component can be reused anywhere in the app.

### 2. Why Component?

Before component base UI (in plain JS/ jQuery):

- You had to manually repeat DOM + event logic.
- Code duplication made apps hard to maintain.
- UI logic and Business logic were tightly coupled.

Example (Plain JS):

```js
function createButton(label){
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", () => alert("clicked"));
    document.body.appendChild(button);
}
createButton("Submit");
createButton("Cancel");
```

Problem:

- Repeating Logic for every button.
- Hard to update all button later.
- No Consistent Structure.

React's Solution:

Create reusable components that combine:

- UI Structure (JSX)
- Behavior (JS Logic)
- Styling (CSS Scoped)

Example(React):

```js
function Button({ label }){
    return <button onClick={()=> alert("clicked")}>{label}</button>;
}

function App(){
    return (
        <div>
            <Button label="Submit"/>
            <Button label = "Cancel"/>
        </div>
    )
}
```

Cleaner, reusable, declarative and composable.

### 3. Types of Components

#### A. Functional Components (Modern React)

- A function that returns JSX
- Can use Hooks (useState, useEffect, etc.) for state and side effects.
- Preferred in React 16.8+ versions.

Example:

```js
function Counter(){
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}
```

Advantage:

- Simpler Syntax
- Easy to test
- Encourage Function Programming.

#### B. Class Components (Legacy/ Still in Use)

- ES6 classes extending React.component.
- Have access to state and lifecycle methods (componentDidMount, etc).
- Common in older codebase.

Example:

```js
class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }
    increment = () => this.setState({ count: this.state.count + 1});

    render(){
        return (
            <div>
                <p> You clicked {this.state.count} times</p>
                <button onClick={this.increment}> + </button>
            </div>
        );
    }
}
```

- Used before hooks existed.
- More verbose, harder to reuse logic (Had to use HOCs or render props).

### 4. Functional vs Class Components

| Feature        | Functional Component           | Class Component                                 |
| -------------- | ------------------------------ | ----------------------------------------------- |
| Syntax         | Simple function                | ES6 class                                       |
| State          | `useState`, `useReducer`       | `this.state`, `this.setState`                   |
| Lifecycle      | `useEffect`, `useLayoutEffect` | `componentDidMount`, `componentDidUpdate`, etc. |
| `this` keyword | Not needed                     | Required for binding methods                    |
| Reusability    | Custom Hooks                   | HOCs / Render props                             |
| Performance    | Slightly better (lighter)      | Slightly heavier (due to prototype chain)       |
| Modern usage   | Recommended                  | Legacy / for older codebases                 |

### 5. Component Composition

You can compose components together, small ones forming bigger ones.

Example:

```js
function Avatar({ src, alt}){
    return <img src={src} alt={alt} className="avatar" />
}

function UserProfile({user}){
    return (
        <div>
            <Avatar src={user.avatar} alt={user.name}/>
            <h3> {user.name}</h3>
            <p>{user.bio}</p>
        </div>
    );
}

function App() {
    const user = { name : "Avinash". bio: "Software Engineer", avatar: "/me.png" };
    return <UserProfile user={user}/>;
}
```

- Promotes **modularity** and **reusability**.

### 6. Props (Component Inputs)

Props are **read-only inputs** from parents to child components.

Example:

```js
function Greeting({name}) {
    return <h3> Hello, {name}</h3>;
}

<Greeting name="Avinash">
```

#### Rules of Props

- Props are immutable ( child can not change them)
- Props flow down wards ( Parent -> child)
- Can pass any type: string, number, array, object, or function

Examples with object and function

```js
function UserCard({ user, onSelect}){
    return (
        <div onClick={() => onSelect(user)}>
            <h3> {user.name}</h3>
            <p> {user.email} </p>
        </div>
    )
}

<UserCard user={{ name: "Avinash", email: "avinash@mail.com" }} onSelect={alert} />;
```

### 7. State (Component's Internal State)

State is data Managed by a component that can change over time.

Functional Component Example

```js
function Toggle(){
    const [isOn, setIsOn] = useState(false);

    return (
        <button onClick={() => setIsOn(!isOn)}>
            {isOn ? "ON" : "OFF"}
        </button>
    )
}
```

Class Component Example

```js
class Toggle extends React.component{
    state = { isOn:  false}

    toggle = () => this.setState({ isON: !this.state.isOn});

    render(){
        return (
            <button onClick={this.toggle}>
                {this.state.isOn ? "ON" : "OFF"}
            </button>
        )
    }
}
```

- Stateful components can manage their own internal UI Logic.
- Don't mutate state directly (always use setState or state setters)

### 8. Component Lifecycle

React components go through three main phase

| Phase                     | Class Method           | Hook Equivalent                           |
| ------------------------- | ---------------------- | ----------------------------------------- |
| Mounting (initial render) | `componentDidMount`    | `useEffect(() => {}, [])`                 |
| Updating (re-render)      | `componentDidUpdate`   | `useEffect(() => {}, [dependencies])`     |
| Unmounting (cleanup)      | `componentWillUnmount` | `useEffect(() => { return cleanup }, [])` |

Example:

```js
function Example() {
    React.useEffect(() => {
        console.log("Mounted");
        return () => console.log("UnMounted");
    }, []);
    return <div>Hello</div>;
}
```

### 9. Props vs State

| Feature   | Props                       | State                                   |
| --------- | --------------------------- | --------------------------------------- |
| Source    | Passed by parent            | Managed by the component                |
| Mutable?  | Immutable                 | Mutable                               |
| Usage     | Configure a component       | Store internal data                     |
| Direction | Parent → Child              | Internal                                |
| Example   | `<Greeting name="Avinash" />` | `const [count, setCount] = useState(0)` |

### 10. Common Pitfalls

- Don't mutate state directly, `state.count++`
- Components must start with capital latter
- Return one parent element in render
- Props are read only, never modify props
- Don't use hook inside conditions or loop
- Always give a key when rendering list.

### 11. Summary

- Components are the core building blocks of React UIs.
- They can be functional (modern) or class-based (legacy).
- Props = read-only inputs
- State = internal mutable data
- React apps are built by composing small components into larger ones.
- Hooks in functional components replace class lifecycles and state.

### 12. Questions in Focus

> 1: What is React Component?
>
> A component is a reusable piece of UI that can manage its own state and behavior. It’s a function or class that returns JSX.

>2: Difference between functional and class components?<br>
>Functional: simple functions using Hooks for state and lifecycle.
>
>Class: ES6 classes with state and lifecycle methods.
>Functional components are preferred in modern React.

>3: What are Props?
>
> Props are read-only inputs passed from parent to child components. They make components reusable and configurable.

>4: What is State?
>
> State is data managed inside a component that determines what the UI looks like. When state changes, the component re-renders.

>5: What’s the difference between Props and State?<br>
>
> - Props are immutable and passed from parent.
> - State is internal and mutable by the component itself.

>6: What are the lifecycle methods of a component?<br>
>
> - Mounting: componentDidMount / useEffect(() => {}, [])
> - Updating: componentDidUpdate / useEffect(() => {}, [dep])
> - Unmounting: componentWillUnmount / cleanup in useEffect.

>7: Why are functional components preferred today?
>
> - Simpler syntax
> - Better performance
> - Easier reuse via Hooks
> - No need for this or binding methods

## D. React State and Lifecycle

### 1. What is State in React?

State us an object that represents the dynamic data of a component. It determines **how a component behaves and renders**.

Whenever state changes, React re-renders the component automatically, keeping the UI in sync with data.

Example:

```js
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

- `count` -> current state
- `setCount` -> function to update the state
- When `setCount` is called, React re-renders with a new value.

### 2. Why We Need State?

Without React state, we'd have to manually manipulate the DOM.

```js
let count = 0;
document.getElementById('btn').addEventListener('click', () => {
  count++;
  document.getElementById('counter').textContent = count;
});
```

Problem:

- Imperative( you tell the browser how to update)
- Hard to maintain and debug.
- Prone to bugs when UI and data get out of sync.

React's solution

- React state system makes the UI declarative, You just define what the UI should look like based on state.

### 3. Using `useState` Hook

Syntax:

```js
const [state, setState] = useState(initialValue);
```

Example:

```js
const [isDark, setIsDark] = useState(false);

<button onClick={() => setIsDark(!isDark)}>
  {isDark ? "Dark Mode" : "Light Mode"}
</button>
```

#### Rules for useState

- You must call it at the top level of your component (not inside loops, conditions, or nested functions).
- You can call useState multiple times for different piece of state.
- State updates are asynchronous (React may batch update).
- Don't mutate state directly (state.value = x is not correct way to do)

### 4. Updating state Correctly

#### Correct Way (using setter)

```js
setCount(count + 1);
```

- It will trigger re-render and changes will reflect on UI.

#### Wrong (direct mutation)

```js
count++;
```

- It won't trigger re-render and hence state changes will not reflect on UI.

#### If your new state depends on previous state

Use the **updater function** form

```js
setCount( prevCount => prevCount + 1);
```

This ensures you are always working with the latest value, especially important when multiple update are batched.

#### Batching causes stale state

```js
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Add 3</button>
    </div>
  );
}
```

**Problem:**

**React batches state updates** that happens in the same event  (like click handler) for performance reasons.

So all three `setCount(count + 1)` calls see the same value for `count` ( _the one from before click_).

You expect `count` to become **3**, but React will only increment it once, `count` becomes 1.

**Correct Way**: use the updater function

```js
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Add 3</button>
    </div>
  );
}
```

Now each update uses the latest value of `count` (as React processes them in sequence).

When you click, the final `count` will correctly be **3**.

#### Why this matters?

This pattern is crucial when:

- You’re updating the same state multiple times in a row.
- You’re using asynchronous effects (like setTimeout, promises, or data fetching).
- You rely on previous state values when the update is scheduled.

Example With Async Behavior

```js
function AsyncCounter() {
  const [count, setCount] = useState(0);

  const delayedIncrement = () => {
    setTimeout(() => {
      //  might use stale `count`
      setCount(count + 1);

      //  always correct
      // setCount(prev => prev + 1);
    }, 1000);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={delayedIncrement}>Add after 1s</button>
    </div>
  );
}
```

Here, if the user clicks multiple times quickly, the count inside the setTimeout closure becomes stale.

Using the updater form (prev => prev + 1) ensures you always increment from the latest count.

### 5. Lifecycle in React

React component go through three main lifecycle phases:

| Phase      | Description                                          |
| ---------- | ---------------------------------------------------- |
| Mounting   | Component is created and inserted into the DOM       |
| Updating   | Component is re-rendered due to prop or state change |
| Unmounting | Component is removed from the DOM                    |

#### Lifecycle in Class components

| Phase      | Method                                     |
| ---------- | ------------------------------------------ |
| Mounting   | `componentDidMount()`                      |
| Updating   | `componentDidUpdate(prevProps, prevState)` |
| Unmounting | `componentWillUnmount()`                   |

#### Lifecycle in Functional Components (Using Hooks)

The `useEffect` hook replaces all lifecycle methods.

Syntax:

```js
useEffect(() => {
    // side effect logic here
    return () => {
        // cleanup logic here
    }
}, [dependencies])
```

Mounting Example:

```js
useEffect(()=> {
    console.log("Component Mounted");
}, []); //. Empty dependency runs only once
```

Updating Example:

```js
useEffect(()=>{
    console.log("Count Updated", count);
}, [count])// Runs every time count changes
```

Unmounting (cleanup) Example

```js
useEffect(() => {
    const timer = setInterval(() => console.log("Tick"), 1000);

    return ()=>{
        clearInterval(timer); // Cleanup before component un mounts
    }
}, [])
```

### 6. Common Pattern with `useEffect`

A. **Fetching Data**

```js
useEffect(() => {
    async function fetchData(){
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    }

    fetchData();
}, []); // Run Once when mounted
```

B. **Event Listener**

```js
useEffect(() => {
    const handleResize = () => setWidth(window.innerWith);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
}, [])
```

C. **Multiple Effects**

You can have multiple useEffects for clarity

```js
useEffect(() => console.log("User changed"), [user]);
useEffect(() => console.log("Theme changed"), [theme]);
```

### 7. Common Pitfall

| Mistake                         | Issue                       | Fix                                 |
| ------------------------------- | --------------------------- | ----------------------------------- |
| Missing dependency array        | Effect runs on every render | Add dependencies or empty array     |
| Updating state in every render  | Causes infinite loop        | Add dependency array to `useEffect` |
| Mutating state directly         | No re-render                | Use setter function                 |
| Using hooks inside conditionals | Breaks hook order           | Always call at top level            |

### 8. Derived State ( from Props)

If you need to compute state from props:

```js
function PriceTag({ basePrice, discount }) {
  const [finalPrice, setFinalPrice] = useState(basePrice - discount);

  useEffect(() => {
    setFinalPrice(basePrice - discount);
  }, [basePrice, discount]);

  return <p>Price: {finalPrice}</p>;
}
```

- Keeps derived data updated when props changes.

### 9. Multiple State Example

```js
function ProfileEditor() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={age} onChange={e => setAge(+e.target.value)} />
      <label>
        <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
        Admin
      </label>
    </div>
  );
}
```

### 10. State Lifting ( Sharing state between Components)

If two components need to share the same state, lift the state to their common parent.

Example:

```js
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Display count={count} />
      <Controls onIncrement={() => setCount(count + 1)} />
    </>
  );
}

function Display({ count }) {
  return <h1>{count}</h1>;
}

function Controls({ onIncrement }) {
  return <button onClick={onIncrement}>+1</button>;
}
```

- Shared, single source of truth for count.

### 11. State vs Props vs Context

| Feature    | State                  | Props               | Context                |
| ---------- | ---------------------- | ------------------- | ---------------------- |
| Ownership  | Owned by the component | Passed from parent  | Global-like            |
| Mutability | Mutable                | Immutable           | Mutable (via Provider) |
| Scope      | Local                  | Across parent-child | App-wide               |
| Use-case   | Internal data          | Configuration       | Shared/global state    |

### 12. Summary

- **State**: internal, mutable data managed by React.
- **Lifecycle**: mounting, updating, unmounting, managed via `useEffect`.
- `useState` -> to manage data
- `useEffect` -> to manage side effects.
- State updates cause re-render. Always treat state as immutable.
- Manage dependencies carefully in `useEffect` to avoid infinite loops.
- For shared state, **lift state up** or use **Context**.

### 13. Questions in Focus

>Q1: What is state in React?
>
>A1: State is data managed inside a component that determines what the UI looks like. Changing the state re-renders the component.

>Q2: What are Hooks?
>
>A2: Hooks are special functions (like useState, useEffect) that allow you to use React features (state, lifecycle, context) in functional components.

>Q3: What is the difference between useState and useEffect?
>
> - useState stores and updates state variables.
> - useEffect runs side effects (e.g., data fetching, subscriptions, DOM updates).

>Q4: What are side effects in React?
>
>Actions that affect something outside the component — like fetching data, timers, logging, or manipulating the DOM.

>Q5: Why does useEffect sometimes cause infinite re-renders?
>
>A5: Because state is updated inside useEffect without a proper dependency array. React keeps re-running the effect.

>Q6: How do you run useEffect only once (on mount)?
>
>A6: Pass an empty dependency array:
>
>```js
>useEffect(() => {
>  console.log("Mounted");
>}, []);
>```

>Q7: What happens when you call setState multiple times?
>
>A7: React batches updates for performance, so multiple updates in the same event loop may merge before re-rendering.

>Q8: Can you explain cleanup in useEffect?
>
>A8: Cleanup is a function returned from useEffect to remove subscriptions, timers, or listeners before the component unmounts or before the next effect runs.

## E. Handling Events and Conditional Rendering in React

### 1. Handling Events in React

React provides a synthetic event system, which is a cross-browser wrapper around the browsers native events.

This means  React normalizes events so they behave consistently across all browsers.

Example:**Basic Event Handling**

Plain HTML:

```html
<button onclick="alert('clicked!')"> click me </button>
```

React: 

```js
function App() {
  function handleClick() {
    alert('Button Clicked!');
  }
  return <button onClick={handleClick}>Click Me</button>;
}
```

- The event name is `onClick` (camelCase)
- The value is a function, not a string.
- React automatically handles this binding for functional components.

Example: **Inline Event Handler**

```js
<button onClick={() => alert("clicked!")}>click <button>
```

- Simple for short actions
- Avoid using inline function excessively, creates new functions on every render( minor performance hit large applications).

#### Passing Argument to Event Handlers


```js
function greetUser(name){
    alert(`Hello, ${name}`);
}

<button onClick={() => greetUser("Aisha")}>Greet</button>
```

If you use class Component

```js
<button onClick={this.greetUser.bind(this, "Aisha")}>Greet</button>
```

#### SyntheticEvent

React wraps native browser events in SyntheticEvent to ensure cross-browser compatibility.

Example:

```js
function handleClick(e) {
  console.log(e.type); // "click"
}
```

**SyntheticEvent** mimics the browser event but has a consistent API.

#### Common React Events

| Event Type | React Event                                                | Description         |
| ---------- | ---------------------------------------------------------- | ------------------- |
| Mouse      | `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave` | Mouse interactions  |
| Keyboard   | `onKeyDown`, `onKeyUp`, `onKeyPress`                       | Keyboard input      |
| Form       | `onChange`, `onSubmit`, `onFocus`, `onBlur`                | Forms and inputs    |
| Clipboard  | `onCopy`, `onPaste`, `onCut`                               | Clipboard events    |
| Touch      | `onTouchStart`, `onTouchMove`, `onTouchEnd`                | Touchscreen devices |

#### Form Example (Handling onChange)

```jsx
function FormExample() {
  const [value, setValue] = React.useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    alert(`Submitted: ${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

- Controlled component — form input’s value is driven by state.

### 2. Binding Events in Class Components

Before hooks, class components had to **manually bind** methods to preserve `this`.

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this); // manual binding
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <button onClick={this.handleClick}>Clicked {this.state.count}</button>;
  }
}
```

- In modern React, functional components with hooks eliminate this hassle.

### 3. Conditional Rendering

Conditional rendering in React means showing **different UI** based on certain conditions — similar to `if-else` in JS, but inside JSX.

Example 1: **Inline Conditional (Ternary Operator)**

```js
function Greeting({ isLoggedIn }) {
  return (
    <h1>{isLoggedIn ? "Welcome Back!" : "Please Sign In"}</h1>
  );
}
```

Example 2: **Using `if` Statement**

```js
function Dashboard({ user }) {
  if (!user) return <Login />;
  return <MainDashboard user={user} />;
}
```

Example 3: **Logical AND (`&&`)**

```js
function Cart({ items }) {
  return (
    <div>
      <h3>Your Cart</h3>
      {items.length > 0 && <p>You have {items.length} items.</p>}
    </div>
  );
}
```

- Renders only if the condition is true.

Example 4: **Multiple Conditions**

```js
function Status({ status }) {
  return (
    <>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error occurred</p>}
      {status === "success" && <p>Loaded successfully!</p>}
    </>
  );
}
```

Example 5: **Conditional Rendering with Early Return**

```js
function AdminPanel({ user }) {
  if (!user.isAdmin) return null; // Hide for non-admin users
  return <div>Welcome Admin!</div>;
}
```

### 4. Combining Events with Conditional Logic

```js
function ToggleButton() {
  const [isOn, setIsOn] = React.useState(false);

  function toggle() {
    setIsOn(prev => !prev);
  }

  return (
    <button onClick={toggle}>
      {isOn ? "Turn Off" : "Turn On"}
    </button>
  );
}
```

- Demonstrates both state update and conditional rendering together.

### 5. Conditional Rendering Best Practices

- Use ternary (? :) for simple toggles
- Use early returns for excluding elements
- Avoid deeply nested conditionals — refactor into small helper functions
- Use separate components for large conditional branches

Example (Refactor)

```js
function Greeting({ user }) {
  if (!user) return <GuestGreeting />;
  return <UserGreeting user={user} />;
}
```

### 6. Common Pitfalls

| Mistake                                                | Problem                  | Solution                          |
| ------------------------------------------------------ | ------------------------ | --------------------------------- |
| Using `onclick` instead of `onClick`                   | Won’t work               | Use camelCase                     |
| Calling function immediately `onClick={handleClick()}` | Runs on render           | Use `onClick={handleClick}`       |
| Mutating state directly                                | Doesn’t re-render        | Use `setState` or state setter    |
| Forgetting `e.preventDefault()` in forms               | Causes page reload       | Always prevent default submission |
| Returning multiple roots                               | JSX must have one parent | Wrap in `<div>` or `<>...</>`     |

### 7. Summary

- React uses synthetic events for cross-browser consistency.
- Use camelCase event names like onClick, onChange.
- Always pass a function reference, not a function call.
- Use state to handle form inputs and toggles.
- Conditional rendering lets you show/hide UI parts based on state or props.
- Use ternary operators or logical && for simple conditions, and early returns for cleaner code.

### 8. Questions in Focus

>1: How does event handling differ in React vs plain JS?
>
>- React uses a synthetic event system for consistent behavior.
>- Event handlers use camelCase (e.g. onClick).
>- The handler is a function, not a string of code.

>2: What is a synthetic event?
>
> It’s React’s wrapper around native browser events, providing a consistent API across all browsers.

>3: How do you pass parameters to event handlers in React?
>
> Use an inline arrow function:
>
>```js
>onClick={() => handleClick(param)}
>```

>4: What is conditional rendering?
>
>Rendering different UI based on conditions (state or props).
>
>Example: `{isLoggedIn ? <Dashboard /> : <Login />}`

>5: How do you prevent a form from reloading a page in React?
>
> Use `event.preventDefault()` in your submit handler.

>6: Why does `onClick={handleClick()}` execute immediately?
>
> Because you’re calling the function instead of passing it. Use `onClick={handleClick}` to pass a reference.

>7: What are best practices for conditional rendering?
>
>- Keep it simple (ternaries or logical &&)
>- Use early returns to avoid nested logic
>- Split complex conditions into smaller components

## F. Lists and Keys in React

### 1. What are Lists in React?

Just like in JavaScript, where you use arrays to store multiple items,
in React you often need to **render lists** of elements dynamically, for example, rendering a list of users, products, or tasks.

React uses array mapping (`.map()`) to transform data into UI elements.

Example (Basic List Rendering)

```js
function NameList() {
  const names = ["Aisha", "Rahul", "Sara"];

  return (
    <ul>
      {names.map(name => <li key={name}>{name}</li>)}
    </ul>
  );
}
```

- The `.map()` method loops over the array and returns `<li>` elements for each item.
- Each element must have a unique `key` prop.

### 2. Why Do We Need Keys?

#### The Problem Without Keys:

React uses a **Virtual DOM** and needs a way to identify which elements have changed, been added, or been removed.

If you don’t provide a unique `key`, React can’t efficiently update the DOM, it may re-render or reorder elements incorrectly.

Example (Without Key):

```js
{items.map(item => <li>{item}</li>)} //No key
```

React warning: Each child in a list should have a unique "key" prop.

With Key:

```js
{items.map(item => <li key={item.id}>{item.name}</li>)} // Correct
```

- React now knows which element corresponds to which item.

### 3. What Exactly is a Key?

- A unique identifier for each element in a list.
- Helps React reconcile (diff) the old and new Virtual DOM efficiently.
- Should be **unique among** siblings, not globally unique.

#### How React Uses Keys Internally

Let’s say you have:

```js
["A", "B", "C"]
```

and render them as:

```js
<li key="A">A</li>
<li key="B">B</li>
<li key="C">C</li>
```

If the array changes to ["A", "C", "B"], React compares keys:

- "A" → same → reused
- "C" and "B" swapped → React only reorders the DOM
- Fast, minimal DOM updates.

If you don’t use keys, React compares by position, not identity, and might re-render or lose state incorrectly.

### 4. Best Practices for Keys

- Use stable unique IDs (from database or API)
- Avoid using array index (map((item, index) => index)), unless:
  - The list is static (does not reorder, add, or remove)
  - No unique IDs are available

Example (Wrong: Using Index)

```js
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}
```

- If the order changes, React might reuse incorrect DOM nodes, causing bugs.

Example (Correct: Using Unique ID)

```js
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```

- Stable, predictable rendering.

### 5. Rendering Lists of Components

You can map over an array of data objects and render custom components.

Example:

```js
function UserCard({ user }) {
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

function UserList() {
  const users = [
    { id: 1, name: "Aisha", email: "aisha@mail.com" },
    { id: 2, name: "Rahul", email: "rahul@mail.com" },
  ];

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

```

- Each child (UserCard) gets a unique key based on its data.

### 6. Rendering Nested Lists

You can also render nested structures easily with .map() inside .map().

Example:

```js
function CategoryList({ data }) {
  return (
    <div>
      {data.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

- Each level of list has its own key.

### 7. Keys in Dynamic Lists (Adding/Removing Items)

Example:

```js
function TodoList() {
  const [todos, setTodos] = React.useState([
    { id: 1, task: "Learn React" },
    { id: 2, task: "Build a Project" },
  ]);

  const addTodo = () => {
    const newTodo = { id: Date.now(), task: "New Task" };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => removeTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- Adding/removing items works perfectly because keys are unique and stable.

### 8. Common Pitfall

| Mistake            | Issue                               | Fix                                        |
| ------------------ | ----------------------------------- | ------------------------------------------ |
| Using index as key | Causes reordering bugs              | Use unique IDs                             |
| Duplicate keys     | React reuses wrong DOM nodes        | Ensure keys are unique                     |
| Missing key        | React warning + inefficient diffing | Always add key                             |
| Global unique key  | Not required                        | Keys only need to be unique among siblings |

Bad Example:

```js
{users.map(user => <UserCard key="user" user={user} />)}
```

- All have same key "user" → React can’t differentiate → wrong updates.

Good Example:

```js
{users.map(user => <UserCard key={user.id} user={user} />)}
```

### 9. Lists + Conditional Rendering Example

```js
function ProductList({ products }) {
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

- Uses conditional rendering + list rendering together.

### 10. Summary

- Lists in React are rendered using .map().
- Keys help React identify which items have changed, added, or removed.
- Always use unique, stable keys (prefer IDs from data).
- Avoid using array index as a key when the list can change.
- Lists can render components, nested structures, and be conditionally displayed.

### 11. Question In Focus

>1: Why do we need keys in React lists?
>
>Keys help React identify which list items have changed, added, or removed, making Virtual DOM updates efficient.

>2: What happens if you don’t use keys?
>
> React shows a warning and may incorrectly reuse or reorder DOM elements, leading to UI bugs.

>3: Why should you avoid using array index as a key?
>
>Because if the list changes order, React can confuse elements — causing incorrect rendering or lost component state.

>4: Where should keys be placed?
>
>On the outermost element in the list that’s being iterated — typically the root element returned by `.map()`.

>5: Do keys need to be globally unique?
>
> No — only unique among siblings within the same list.

>6: Can keys improve performance?
>
> Yes, stable keys help React avoid unnecessary re-renders by optimizing the diffing process.

## G. Forms and Controlled Components in React

### 1. What are Forms in React?

Forms are how users input data in an app, login fields, search boxes, comment boxes, etc.

In HTML, forms manage their own state and submit directly to the server.
In React, we usually manage the form’s data inside the component’s state, keeping UI and data in sync.

**Key Idea:**

In React, form input are not automatically controlled by the DOM, you control them using state.

That’s where Controlled Components come in.

### 2. Controlled vs Uncontrolled Components

| Type                       | Description                                  | Data Managed By | Example       |
| -------------------------- | -------------------------------------------- | --------------- | ------------- |
| **Controlled Component**   | React controls the input’s value using state | React State     |  Preferred   |
| **Uncontrolled Component** | Browser (DOM) controls the input’s value     | DOM (via refs)  | Legacy / rare |

#### Controlled Component Example

```js
function ControlledForm() {
  const [name, setName] = React.useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello, ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

- React controls the input value (value={name})
- Every keystroke updates the component’s state
- The input always displays the latest state value

#### Uncontrolled Component Example

```js
function UncontrolledForm() {
  const inputRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello, ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

- Value is managed by the DOM, accessed via ref
- No React state sync — you lose fine-grained control.

### Difference between Controlled and Uncontrolled Components

| Feature       | Controlled      | Uncontrolled           |
| ------------- | --------------- | ---------------------- |
| Value source  | React state     | DOM                    |
| Default value | `value` prop    | `defaultValue` prop    |
| Access value  | via state       | via `ref`              |
| Validation    | Easy (in state) | Manual                 |
| Use case      | Most apps       | Legacy or simple forms |


### 3. Handling Multiple Inputs

When you have multiple fields (like a registration form), use one state object for all values.

```js
function SignupForm() {
  const [form, setForm] = React.useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

- Uses `name` attribute to update corresponding field in state.
- `...prev` ensures we keep other fields intact (immutability).

### 4. Controlled Checkboxes

```js
function CheckboxExample () {
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <label>
            <input
                type= "checkbox"
                checked={isChecked}
                onChange = {(e) => setIsChecked(e.target.checked)}
            />
            Subscribe
        </label>
    )
}
```

- Use `checked` instead of value for checkbox.
- The event value is `e.target.checked` (boolean)

### 5. Controlled Radio Button

```js
function GenderSelect(){
    const [gender, setGender] = React.useState("female");

    return (
        <>
            <label>
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
        </>
    );
}
```

- Use `checked = {gender === "male"}` pattern to control radio button.

### 6. Controlled Select (Dropdown)

```js
function SelectExample() {
  const [city, setCity] = React.useState("mumbai");

  return (
    <select value={city} onChange={(e) => setCity(e.target.value)}>
      <option value="mumbai">Mumbai</option>
      <option value="delhi">Delhi</option>
      <option value="bangalore">Bangalore</option>
    </select>
  );
}
```

- Controlled via `value` prop
- React update and re renders based on selection.

### 7. Textarea in React

Unlike HTML, React uses value prop instead of inner text.

```js
function CommentBox() {
  const [comment, setComment] = React.useState("");

  return (
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write a comment..."
    />
  );
}
```

- Controlled textarea behaves like input.

### 8. Handling Form Submission

Always use onSubmit event on `<form>` and call `e.preventDefault()` to prevent page reload.

```js
function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

- Standard pattern for forms in React.

### 9. Form Validation (Basic Example)

You can perform validation inside `handleSubmit` or on every input change.

```js
function SimpleForm() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={handleChange} placeholder="Enter email" />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

- Demonstrates inline validation using React state.

### 10. Performance Tip

If you have many input fields, updating state on every keystroke can be heavy.
Solutions:

- Use **debouncing** (setTimeout) for heavy validations.
- Use **uncontrolled components** + refs for simple non-reactive forms.
- Use form libraries like:
  - react-hook-form
  - formik
  - yup for validation

### 11. Common Pitfalls

| Mistake                                     | Problem                        | Fix                                   |
| ------------------------------------------- | ------------------------------ | ------------------------------------- |
| Missing `value` prop                        | Input becomes uncontrolled     | Add `value` prop                      |
| Mixing controlled/uncontrolled inputs       | React warning                  | Always control or don’t — not both    |
| Forgetting `e.preventDefault()`             | Form reloads page              | Always prevent default                |
| Mutating state directly                     | UI won’t update                | Use setter (`setState` or `useState`) |
| Forgetting to handle `checked` for checkbox | Checkbox doesn’t reflect state | Use `checked` instead of `value`      |

### 12.Summary

- Forms are controlled by React via state and onChange.
- Use controlled components for reliable and predictable UI.
- Use value for text fields and checked for checkboxes.
- Prevent form reload with e.preventDefault().
- Use one state object to manage multiple fields efficiently.
- Prefer React state over refs unless performance is critical.

### 13. Question in Focus

>1: What is a controlled component in React?
>
>A form element whose value is controlled by React state, making React the single source of truth.

>2: What is an uncontrolled component?
>
> A form element that manages its own state via the DOM. Its value is accessed using ref.

>3: Which is preferred — controlled or uncontrolled?
>
>Controlled components are preferred because they make data flow predictable and allow validation, dynamic updates, and form resets easily.

>4: How do you handle multiple inputs in React forms?
>
> Use a single state object and update values dynamically using the input’s name attribute:
>
>```js
>setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
>```

>5: What’s the difference between value and defaultValue?
>
>- `value`: for controlled components (React state decides the value)
>- `defaultValue`: for uncontrolled components (initial DOM value only)

>6: What’s the difference between onChange in React vs HTML?
>
>In React, onChange fires on every keystroke, while in HTML it fires only when the element loses focus.

>7: How to reset form values in React?
>
>By setting the state back to initial values:
>
>```js
>setForm({ name: "", email: "" });
>```

## H. Rendering & Reconciliation (Virtual DOM & Diffing Algorithm)

### 1. 1. What Happens When React Renders?

When React renders your component:\

1. It calls you component function (or class `render()` method) to produce a React Element Tree (a lightweight description of what the UI should look like).
2. This React element Tree is compared to the previous version of the tree.
3. Based on the differences (diffs), React updates only the changed parts of the actual browser DOM.

The entire process is managed by

- Virtual DOM
- Reconciliation Algorithm
- Diffing Algorithm

### 2. What is the Virtual DOM?

The Virtual DOM (VDOM) is a lightweight, in-memory representation of the real DOM.

- It’s a plain JS object that describes your UI structure.
- When state or props change, React creates a new Virtual DOM tree.
- React compares the new VDOM with the previous one (diffing).
- It then updates only the changed elements in the real DOM (patching).

#### Visual Representation

```pgsql
Your Component
     ↓
 JSX → React.createElement()
     ↓
 Virtual DOM (JS Object)
     ↓
 Diffing (Compare old vs new)
     ↓
 Real DOM updated efficiently
```

#### Example:

```js
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

When you click Increment:

1. setCount triggers a re-render.
2. React build a new virtual DOM Tree
3. Compares it with the previous one.
4. Find only `<h1>` text changed.
5. Updated only the node in the real DOM.

Efficient, Only updates what changed, not the entire UI.

### 3. Why React Uses Virtual DOM?

#### Problem with Real DOM

- DOM operation (create, update, remove) are expensive.
- Frequent re-renders can cause layout thrashing and performance degradation.

#### Solution

React Virtual DOM minimizes direct DOM manipulation:

- Uses in-memory diffing instead of touching real DOM for every change.
- Batches and applies minimal updates.
- Leads to faster UI updates and smoother performance.

### 4. How Reconciliation Works?

**Reconciliation** = the process React uses to update the DOM when your component’s state or props change.

#### Steps

- React create a new Virtual DOM tree from your component's latest render.
- React compares it with the previous Virtual DOM.
- React finds the minimum number of changes (diff).
- React Updates only yhe affected nodes in the real DOM.

#### Example Of Reconciliation

Old V-DOM:

```js
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
```

New V-DOM

```js
<ul>
  <li>A</li>
  <li>C</li>
  <li>B</li>
</ul>
```

React compares the trees:

- Detects that B and C swapped.
- If key props are unique, React reorders nodes instead of re-rendering all.

> That's why Keys are crucial in lists, they guide reconciliation.

### 5. Diffing Algorithm (React's Heuristics)

React uses a **heuristic O(n)** diffing algorithm (not deep tree diffing like O(n³)) **to stay fast**.

It follows two main assumptions:

#### Assumption 1: Different element types -> replace entire subtree

If element type changes, React destroys and re builds that part of the tree.

Example:

```js
<div>...</div>  →  <span>...</span>
```

React removes `<div>` and mounts `<span>` a new, it won't try to patch them.

#### Assumption 2: Use keys to identify elements in lists

If you render lists, React uses the key prop to match items between renders.

Example:

```js
// Before
<li key="a">A</li>
<li key="b">B</li>

// After
<li key="b">B</li>
<li key="a">A</li>
```

React:

- sees `key="b"` already exists -> move it
- Sees `key="a"` -> moves it too

Efficient reorder, no unnecessary unmount/remount.

If no key is provides, **React falls back to index comparison**, which can cause incorrect updates.

### 6. Fiber Architecture

In React 16+, reconciliation was rewritten using Fiber architecture.

#### What is Fiber?

React Fiber is:

- A re-implementation of reconciliation algorithm.
- Enables incremental rendering, breaking rendering work into small chunks.
- Allows pausing, resuming, and prioritizing tasks.

#### Why Fiber Matters

Old React (pre-16) rendered the entire component tree synchronously, blocked UI for large updates.

Fiber Introduces:

- Time Slicing: Split work into small pieces.
- Prioritization: more important updates (like use input) happen first.
- Suspense and Concurrent Rendering

### 7. Rendering Phase

React rendering happens in two main phases:

| Phase            | Purpose                        | Synchronous?              |
| ---------------- | ------------------------------ | ------------------------- |
| **Render Phase** | Creates a new Virtual DOM tree | Can be paused/interrupted |
| **Commit Phase** | Updates the actual DOM         | Always synchronous        |

#### Visualization

```sql
setState()
   ↓
Render Phase (create new VDOM)
   ↓
Diff with previous VDOM
   ↓
Commit Phase (update real DOM)
```

- Render = Calculate changes
- Commit = Apply changes

### 8. Optimization Tips

| Technique                   | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| Use `React.memo()`          | Prevent re-render if props didn’t change          |
| Use `useMemo()`             | Memoize computed values                           |
| Use `useCallback()`         | Prevent new function references on each render    |
| Use `key` props correctly   | Helps React identify stable elements              |
| Avoid unnecessary state     | Localize state to smallest possible component     |
| Avoid deep object mutations | Breaks shallow comparison and triggers re-renders |

### 9. Real Example of Diffing Optimization

Imagine you have:

```js
<div>
  <p>Title</p>
  <button>Click</button>
</div>
```

You change it to

```js
<div>
  <h2>Title</h2>
  <button>Click</button>
</div>
```

React detects `<p> -> <h2>` type change -> replaces node
 `<button>` remains same -> reused.

### 10 Common Pitfalls

| Mistake                          | Effect                     | Fix                              |
| -------------------------------- | -------------------------- | -------------------------------- |
| Changing element type frequently | Causes full re-render      | Use consistent element structure |
| Missing keys in lists            | Wrong node reuse           | Always use unique keys           |
| Deep nested state updates        | Causes unnecessary renders | Split components or memoize      |
| Using index as key               | Breaks diffing efficiency  | Use stable IDs                   |

### 11.Summary

- React maintains a Virtual DOM (a lightweight in-memory tree).
- When state/props change, React:
  - Creates a new Virtual DOM
  - Diffs it with the previous one
  - Patches only the changed parts in the real DOM

- The diffing algorithm relies on:
  - Element type
  - Keys (for lists)

- Fiber architecture enables:
  - Incremental rendering
  - Better scheduling
  - Non-blocking UI updates

- Performance tuning relies on:
  - Proper key usage
  - Memoization
  - Avoiding unnecessary re-renders

### 12. Question in Focus

>1: What is the Virtual DOM in React?
>
> It’s a lightweight JS object that represents the real DOM. React updates the Virtual DOM first, compares it to the previous one, and updates only changed parts in the real DOM.

>2: How does React’s reconciliation algorithm work?
>
>React compares the new Virtual DOM tree with the old one, finds the minimal set of changes, and efficiently updates the real DOM.

>3: What are React’s diffing heuristics?
>
> 1. Different element types → replace subtree
> 2. Use keys to track elements in lists

>4: Why are keys important in reconciliation?
>
> Keys let React match elements across renders, helping it reorder instead of re-creating DOM nodes.

>5: What is React Fiber and why was it introduced?
>
>Fiber is a reimplementation of the reconciliation algorithm that enables incremental rendering and task prioritization for smoother, non-blocking UI updates.

>6: What’s the difference between the render phase and commit phase?
>
>- Render Phase: Builds Virtual DOM (can be paused)
>- Commit Phase: Updates real DOM (always synchronous)

>7: How can you improve React rendering performance?
>
>- Use React.memo, useMemo, and useCallback
>- Split components
>- Use proper keys
>- Avoid deep state mutations

## I. React Fragments

### 1. What is Fragments?

A Fragment is a lightweight wrapper that lets you return multiple elements from a component without adding extra node to the DOM.

In Plain HTML, you can't return two sibling element from a component without wrapping them in a parent `<div>`.

Fragments solve that, no unnecessary `<div>`s cluttering your DOM.

### 2. Before Fragment

```js
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome to React</p>
    </div>
  );
}
```

- Works fine, but creates an extra `<div>` that might mess up styling, grid, or semantics HTML.

### 3. With Fragments

```js
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome to React</p>
    </>
  );
}
```

- No Extra DOM Node
- Cleaner markup
- Better for tables, lists, grids, and layout-sensitive UIs

### 4. Fragment Variants

| Syntax                                 | Description                |
| -------------------------------------- | -------------------------- |
| `<>...</>`                             | Short syntax (most common) |
| `<React.Fragment>...</React.Fragment>` | Can include a `key` prop   |

#### Example With Key

You can't add key to shorthand `<>..</>` version, use `React.Fragment` instead

```js
function Table({ rows }) {
  return (
    <tbody>
      {rows.map(row => (
        <React.Fragment key={row.id}>
          <tr><td>{row.name}</td></tr>
          <tr><td>{row.details}</td></tr>
        </React.Fragment>
      ))}
    </tbody>
  );
}
```

- Prevents extra `<div>` inside `<table>`
- Enables use of key for each fragment group

### 5. Summary

- Allows multiple JSX elements without Wrapper nodes
- Cleaner DOM Output
- Supports key when using `<React.Fragment>`
- Commonly used in list, tables, and layout grids

### 6. Interview Questions — Fragments

>1: What is a React Fragment?
>
> A React Fragment lets you return multiple JSX elements without adding extra DOM elements.

>2: Why are Fragments better than wrapping elements in `<div>`?
>
> They avoid unnecessary DOM nodes, keeping HTML clean and avoiding CSS/layout issues.

>3: Can Fragments have keys?
>
>Yes — but only when using `<React.Fragment>`, not the shorthand `<>...</>` syntax.

## J. React Portals

### 1. What is a Portal?

A Portal allows you to render children into a DOM node outside of the parent component’s hierarchy.

Useful when you want something to appear visually outside of its parent container but still logically belong to that component.

### 2. Example Use Cases

- Modals/Dialogs
- Tooltips
- Dropdown/Popovers
- Toast Notification

### 3. Example: Basic Portal

```js
import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">{children}</div>,
    document.getElementById("modal-root")
  );
}
```

Then in your HTML

```html
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

Even though the modal is rendered in a different DOM subtree, it remains part of the Same React component tree, meaning it still receives context, props, and events correctly.

### 4. Using the Modal

```js
function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      {open && (
        <Modal>
          <div className="modal">
            <p>This is rendered via Portal</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
```

- The Modal Content will appear outside the `#root` div
- But React event bubbling (like `onClick`)  still works through the React tree.

### 5. Event Bubbling in Portal

Even if a portal renders outside the parent DOM hierarchy, events still bubble up through the React component tree, not the DOM tree.

### 6. Common Pitfall

| Mistake                                   | Issue               | Fix                            |
| ----------------------------------------- | ------------------- | ------------------------------ |
| Rendering portal into a non-existent node | Nothing appears     | Ensure `target` node exists    |
| Using portals for static content          | No benefit          | Only use for overlays, modals  |
| Styling conflicts                         | Overlay not aligned | Use fixed/absolute positioning |


### 7.Summary

- Allow rendering outside normal DOM hierarchy
- Still Part of React component tree (props, context, events works)
- Commonly used for modals, popovers, tooltips, etc.
- Created using `ReactDOM.createPortal(child, container)`

### 8. Question in Focus

>1: What is a React Portal?
>
>A portal lets you render a component’s output into a different DOM node outside its parent hierarchy.

>2: Do portals affect event bubbling?
>
> No — events bubble through the React component tree, not the DOM.

>3: Why use portals?
>
> For UI elements like modals and tooltips that need to escape CSS overflow or stacking contexts.

## K. Error Boundaries

### 1. What is an Error Boundary?

An Error Boundary is a React component that catches JavaScript errors in its child component tree, logs them, and displays a fallback UI instead of crashing the entire app.

#### Without Error Boundary

If a child component throws an error, the entire app crashes.

#### With Error Boundary

You can show a graceful fallback (e.g. "Something went wrong") while other parts of the UI continue to function.

#### Example: Basic Error Boundary

Error boundaries must be class components (Hooks can't catch render errors yet).

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error to an error tracking service
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}
```

Usages:

```js
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

- `BuggyComponent` errors won’t crash the whole app.

### 2. Lifecycle Methods in Error Boundaries

| Method                                   | Purpose               |
| ---------------------------------------- | --------------------- |
| `static getDerivedStateFromError(error)` | Update fallback state |
| `componentDidCatch(error, info)`         | Log error details     |

### 3. Limitation of Error Boundaries

They Do NOT catch

- Error in event handler
- Asynchronous code (like setTimeout)
- Sever-side rendering errors
- Errors in ErrorBoundary itself

You can handle event handler error with regular try/catch

### 4. Custom Fallback Example

```js
function FallbackUI({ error }) {
  return (
    <div>
      <h3>Something broke 😢</h3>
      <p>{error.message}</p>
    </div>
  );
}
```

```js
class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) return <FallbackUI error={this.state.error} />;
    return this.props.children;
  }
}
```

