# 2. Class Based Component

1. [x] Basics of Class Based Components
   1. [x] What is a Class Component
   2. [x] Difference Between Class and Functional Components
   3. [x] Syntax of a Class Component (extends React.Component)
   4. [x] Why super(props)
   5. [x] The render() Method
   6. [x] Using props in Class Components
   7. [x] Using state (and initializing it)
   8. [x] Updating state with setState()
   9. [x] Binding Event Handlers (this keyword issue)
   10. [x] Handling Events in JSX

2. [ ] Lifecycle Methods
   1. [ ] Component Lifecycle Phases (Mounting, Updating, Unmounting, Error Handling)
   2. [ ] `constructor()`
   3. [ ] `componentDidMount()`
   4. [ ] `componentDidUpdate(prevProps, prevState)`
   5. [ ] `componentWillUnmount()`
   6. [ ] `getDerivedStateFromProps()`
   7. [ ] `shouldComponentUpdate()`
   8. [ ] `getSnapshotBeforeUpdate()`
   9. [ ] Error Boundaries (`componentDidCatch()`)

3. [ ] Advanced State Management
   1. [ ] Using previous state safely in `setState()`
   2. [ ] Updating nested objects or arrays in state
   3. [ ] Passing state and methods between components (parent-child communication)
   4. [ ] Lifting state up
   5. [ ] Controlled vs Uncontrolled components (especially for forms)

4. [ ] Component Composition and Reusability
   1. [ ] Reusable class components
   2. [ ] Higher-Order Components (HOCs)
   3. [ ] Render Props pattern
   4. [ ] Container vs Presentational components

5. [ ] Performance Optimization
   1. [ ] PureComponent and shallow comparison
   2. [ ] Implementing shouldComponentUpdate()
   3. [ ] React memoization techniques for class components
   4. [ ] Lazy loading and code splitting
   5. [ ] Avoiding unnecessary re-renders

6. [ ] Error Handling and Boundaries
   1. [ ] componentDidCatch(error, info)
   2. [ ] static getDerivedStateFromError(error)
   3. [ ] Creating a reusable Error Boundary component

7. [ ] Integrations and Real-world Usage
   1. [ ] Fetching data in componentDidMount()
   2. [ ] Using third-party libraries (axios, redux, etc.)
   3. [ ] Working with forms and validation
   4. [ ] Using refs (React.createRef() and callback refs)
   5. [ ] Controlled vs uncontrolled inputs
   6. [ ] Context API with class components (static contextType, Context.Consumer)

8. [ ] Migration and Interop
   1. [ ] Converting class components to functional components with Hooks
   2. [ ] Using legacy lifecycle methods safely (UNSAFE_ methods)
   3. [ ] Mixing class and functional components in one project

9. [ ] Testing and Debugging
   1. [ ] Testing class components (Jest, Enzyme, React Testing Library)
   2. [ ] Snapshot testing
   3. [ ] Debugging lifecycle issues
   4. [ ] Profiling performance

10. [ ] Expert-Level Topics
    1. [ ] Custom higher-order components for cross-cutting logic
    2. [ ] Understanding reconciliation and how setState batching works internally
    3. [ ] Controlled side effects and async operations in lifecycle methods
    4. [ ] Legacy patterns and migration strategies (Hooks, Suspense, etc.)

---

## A. Basics of Class Based Components

### 1. What is a Class Component?

A class component is a Javascript class that extends React.Component (or React.PureComponent) and implements a render() method which returns JSX. class components can hold internal state and expose lifecycle methods (mount/update/unmount phase).

Example:

```js
import React from "react";

class Hello extends React.Component {
   render(){
      return (
         <div>
            <h1>Hello, World!</h2>
         </div>
      )
   }
}

export default Hello;
```

Why they exists?

- Originally the only way to use component-local state lifecycle methods (before Hooks).
- Still used in Many legacy codebases.

### 2. Difference Between Class and Functional Components

High-level differences:

- Syntax
  - Class: `class MyComp extends React.Component{render(){...}}`
  - Functional: `function MyComp(props){return ...}` or arrow function `const MyComp = (prop)=> ...`

- State & Side-effects
  - Class: state via `this.state`; lifecycle methods (`componentDidMount`, etc)
  - Functional (With Hooks): `useState`, `useEffect`, etc.
- `this`
  - Class: methods often reference `this` (needs binding)
  - Functional: no `this`
- Readability & Boilerplate
  - Class: more boiler plate (constructor, binding) unless using class fields.
  - Functional: less ceremony, typical, simpler
- Performance
  - Now mostly equivalent, Hooks provide new patterns (custom hooks), but classes can use `PureComponent` and `shouldComponentUpdate`.

When to prefer:

- New Project : Functional + Hooks
- Legacy Code: Follow the code base if class then go with class

### 3. Syntax of a class Component

1. Classic Example

   ```js
   class Counter extends React.Component {
      constructor(props){
         super(props); // Must call Super(props) before using this
         this.state = { count: 0}; // init state
         this.handleClick = this.handleClick.bind(this); // bind the named function declarations
      }

      handleClick(){
         // this refers to the class instance because we bound it in the constructor 
         this.setState({ count: this.state.count + 1});
      }

      render () {
         return (
            <div>
               <p> Count: {this.state.count}</p>
               <button onClick={this.handleClick}>+</button>
            </div>
         )
      }
   }
   ```

2. Modern Class Component
   - modern class field syntax does not require constructor

   ```js
   class Counter extends React.Component{

      // direct state object 
      state = {count : 0}

      // class field arrow function auto-binds this
      handleClick = () => {
         this.setState(prev => ({ count : prev.count + 1}));
      }

      render(){
         return (
            <div>
               <p> Count: {this.state.count}</p>
               <button onClick={this.handleClick}>+</button>
            </div>
         )
      }
   }
   ```

Key Rules:

- If you use constructor, call super(props) before this.

- State can be declared either in constructor or as a class field `state = { ... }`.

- You can extend `React.PureComponent` for a shallow prop/state comparison to avoid re-renders.

### 4. Why must we call super(props) in a class component constructor?

In JavaScript, when you create a **subclass** (a class that extends another class), the subclass constructor must call `super()` before accessing `this`.

#### Step 1. Understand Inheritance

When you write:

```js
class MyComponent extends React.Component{ ... }
```

MyComponent is a subclass of React.Component class.

That means  it inherits logic, like prop handing, state initialization, etc.

The parent ( React.Component) constructor needs to run first to setup the internal fields that component relies on.

#### Step 2: The rule of this in ES6 classes

In ES6, you can't use this before calling super() inside a subclass constructor.

This is a JavaScript language rule, not React-specific.

If you forgot to call super(), JavaScript will throw error.

```text
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

#### Step 3: Why super(props) with props

React's `Component` constructor uses props internally to set up `this.props`.

Inside React's implementation:

```js
class Component{
   constructor(props){
      this.props = props;
   }
}
```

So, if you just call super() (without prop) then inside your constructor you will find:

```js
constructor(props) {
  super(); // not passing props
  console.log(this.props); // undefined
}
```

You will lose access to props early in the constructor.

Correct way:

```js
constructor(props) {
  super(props);
  console.log(this.props); // ✅ available
}
```

That ensures React sets `this.props = props` before you use it.

#### Step 4: When you can skip super(prop)

If you don't define your own constructor at all, React will automatically calls the parent's constructor, so it's fine:

```js
class MyComponent extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
```

Or, if your constructor does not need props ( you never use props inside it), you could technically do:

```js
constructor() {
  super();
  this.state = { count: 0 };
}
```

but this is not best practice, because you are breaking the assumption that super(props) passes props to the base class.

### 5. The `render()` method

`render()` is required in class components. It returns JSX (or `null/false`) and should be pure, meaning it should not modify state or have side effects ( side effects go in lifecycle methods).

**Good render() practices:**

- Keep it pure and fast
- Compute values for display using props and state
- Avoid heavy computation directly in `render()`, compute beforehand or memoize.

Example:

```js
class Greet extends React.Component {
   render(){
      const {firstName, lastName} = this.props;
      const name = `${firstName} ${lastName}`;
      return <h2> Hello, {name}!</h2>;
   }
}
```

If you need conditional Rendering

```js
render() {
  if (this.props.loading) return <div>Loading…</div>;
  return <div>Data loaded</div>;
}
```

### 6. Using `props` in Class Components

Access props via `this.props`. **props are read-only**, don't try to mutate them.

Example:

```js
class UserCard extends React.Component{
   render(){
      const {name, age} = this.props;
      return (
      <div>
        <strong>{name}</strong>
        <div>Age: {age}</div>
      </div>
    );
   }
} 
```

#### Default props and propTypes

```js
import PropTypes from "prop-types";

class Button extends React.Component{
   render(){
      return <button>{this.props.label}</button>
   }
}

Button.defaultProps = {label: "Click Me"}

Button.propTypes = {
   label: PropTypes.string
}
```

Note: `defaultProps` works for class components. Functional Component can also use `defaultProps` but we can directly pass default value to props in functional component so not used.

### 7. Using state ( and initializing it)

`state` holds component **local, mutable data**. Initialize it in constructor or as a class field.

Constructor Initialization

```js
constructor(props){
   super(props);
   this.state = { count: 0}
}
```

Class Field initialization (cleaner)

```js
state = {
   count: 0
}
```

Access it with `this.state`. Don't mutate `this.state` directly, use `setState()` method.

Example Usage:

```js
Class Todo extends React.Component{
   state= {todos: [], text: ""}

   render(){
      return (
         <div>
        <input value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
        <ul>
          {this.state.todos.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
      )
   }
}
```

### 8. Updating `state` with `setState()`

Key points about `setState()`:

- Always use this.setState() to update state, never assign to this.state directly.
- setState() is asynchronous / may be batched, do not rely on this.state immediately after setState.
- When the new state depends on previous tate, pass function to `setState(prevState, props) => newState`

Bad Code:

```js
this.setState({ count: this.state.count + 1});
this.setState({ count: this.state.count + 1});
```

- In this case React will batch the setState and your state will increase only once.

Good Code:

```js
// Use prev state such that it will capture the state change one by one
this.setState(prevState => ({ count: prevState.count + 1}));

// Or when you need props
this.setState((prevState, props) => ({
   count: prevState.count + props.incrementBy
}))
```

#### Merging Behavior:

- `setState()` shallow-merges the object you provide into `this.state` (only at the top level). for nested updates, you must merge manually or use immutability helpers.

Updating nested state example:

```js
this.setState(prev => ({
  profile: {
    ...prev.profile,
    address: {
      ...prev.profile.address,
      city: "New City"
    }
  }
}));
```

Callback after setState:

setState(partialState, callback), callback runs after state update and re-render.

```js
this.setState({ value: 42 }, () => {
  console.log("State updated:", this.state.value);
});
```

### 9. Binding Event Handler (this keyword issue)

this in JS class methods is not bound automatically. If you access this inside a handler, you must bind it or use arrow functions.

Common ways to bind:

1. Bind in the constructor

   ```js
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }
   handleClick() { console.log(this.state); }
   ```

2. Class field with arrow functions (modern approach)

   ```js
   handleClick = () => {
      console.log(this.state);
   };
   ```

3. Bind inline in JSX ( works but not recommended for performance reasons, recreates the function on each render)

   ```js
   <button onClick={this.handleClick.bind(this)}>Click</button>
   ```

4. Arrow Function in render ( also recreates function in each render, use when acceptable)

   ```js
   <button onClick={() => this.handleClick(id)}>Click</button>
   ```

#### Why It Matters?

- Without binding, this inside handleClick will be undefined(in strict mode) pr not the component instance, causing runtime error.

Example Showing bug:

```js
class Broken extends React.Component{
   constructor(props){
      super(props);
      this.state = {count:0}
   }
   increment() {
    this.setState({ count: this.state.count + 1 }); // `this` is undefined if not bound
  }

  render() {
    return <button onClick={this.increment}>+</button>; // crash when clicked
  }
}
```

Fix with arrow class field:

```js
increment = () => {
  this.setState(prev => ({ count: prev.count + 1 }));
};
```

### 10. Handing Events in JSX

React wraps browser events in **SyntheticEvent** for cross-browser consistency. Use `onClick`, `onChange`, `onSubmit`, etc. they follow camelCase naming and pass event handlers (functions), not strings.

Example:

```js
class Form extends React.Component {
  state = { value: "" };

  handleChange = (e) => {
    // e is a SyntheticEvent
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent normal form post
    console.log("Submitting:", this.state.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.value} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

Passing arguments to event handlers: use arrow function or bind to pass extra arguments:

```js
class List extends React.Component {
  handleDelete = (id, e) => {
    // id available, e is event only if passed last
  };

  render() {
    return this.props.items.map(item => (
      <div key={item.id}>
        <button onClick={(e) => this.handleDelete(item.id, e)}>Delete</button>
      </div>
    ));
  }
}
```

Or bind:

```js
<button onClick={this.handleDelete.bind(this, item.id)}>Delete</button>
```

But prefer arrow function + class fields for clarity and automatic binding.

### 11. Summary

- Use this.props and this.state in class components.
- Initialize state in constructor or as a class field.
- Always call super(props) in constructor.
- Use setState(prev => ...) when new state depends on previous state.
- Avoid heavy work in render(); keep render() pure.
- Bind handlers either in constructor or with class fields arrow functions.
- Prefer functional components + hooks for new code, but understand classes for legacy code and interviews.

## B. Lifecycle Methods
