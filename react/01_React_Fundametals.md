# 1. React Fundamental

- [x] What is React, why React over other frameworks?
- [x] JSX syntax and rules
- [ ] Components:
  - [ ] Functional vs Class components
  - [ ] Component composition
- [ ] Props & PropTypes
- [ ] State and setState \(functional \+ class\)
- [ ] Conditional rendering
- [ ] Lists and keys
- [ ] Controlled vs uncontrolled components
- [ ] Event handling in React
- [ ] Basic component lifecycle \(mount, update, unmount\)
- [ ] Rendering & reconciliation \(Virtual DOM, diffing\)
- [ ] Fragments, portals, and error boundaries
- [ ] Inline vs external styling in React

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

