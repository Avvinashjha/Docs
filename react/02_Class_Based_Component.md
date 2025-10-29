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

2. [x] Lifecycle Methods
   1. [x] Component Lifecycle Phases (Mounting, Updating, Unmounting, Error Handling)
   2. [x] `constructor()`
   3. [x] `componentDidMount()`
   4. [x] `componentDidUpdate(prevProps, prevState)`
   5. [x] `componentWillUnmount()`
   6. [x] `getDerivedStateFromProps()`
   7. [x] `shouldComponentUpdate()`
   8. [x] `getSnapshotBeforeUpdate()`
   9. [x] Error Boundaries (`componentDidCatch()`)

3. [x] Advanced State Management
   1. [x] Using previous state safely in `setState()`
   2. [x] Updating nested objects or arrays in state
   3. [x] Passing state and methods between components (parent-child communication)
   4. [x] Lifting state up
   5. [x] Controlled vs Uncontrolled components (especially for forms)

4. [x] Component Composition and Reusability
   1. [x] Reusable class components
   2. [x] Higher-Order Components (HOCs)
   3. [x] Render Props pattern
   4. [x] Container vs Presentational components

5. [ ] Performance Optimization
   1. [ ] PureComponent and shallow comparison
   2. [ ] Implementing shouldComponentUpdate()
   3. [ ] React memoization techniques for class components
   4. [ ] Lazy loading and code splitting
   5. [ ] Avoiding unnecessary re-render

6. [ ] Integrations and Real-world Usage
   1. [ ] Fetching data in componentDidMount()
   2. [ ] Using third-party libraries (axios, redux, etc.)
   3. [ ] Working with forms and validation
   4. [ ] Using refs (React.createRef() and callback refs)
   5. [ ] Controlled vs uncontrolled inputs
   6. [ ] Context API with class components (static contextType, Context.Consumer)

7. [ ] Migration and Interop
   1. [ ] Converting class components to functional components with Hooks
   2. [ ] Using legacy lifecycle methods safely (UNSAFE_ methods)
   3. [ ] Mixing class and functional components in one project

8. [ ] Testing and Debugging
   1. [ ] Testing class components (Jest, Enzyme, React Testing Library)
   2. [ ] Snapshot testing
   3. [ ] Debugging lifecycle issues
   4. [ ] Profiling performance

9. [ ] Expert-Level Topics
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

#### Merging Behavior

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

### 1. Component lifecycle phases (Mounting, Updating, Unmounting, Error handling)

A React class Component goes through four main phases:

- **Mounting** - When the component is created and inserted into the DOM.

  ```text
   constructor() -> static.getDerivedStateFromProps() -> Render() -> componentDidMount()
  ```

- **Updating** - when props or state changes and the component re-renders.

   ```text
   static getDeriveStateFromProps() -> shouldComponentUpdate() -> render() -> getSnapshotBeforeUpdate() -> componentDidUpdate()
   ```

- **Unmounting** - when component is removed from the DOM, `componentWillUnMount()`
- **Error Handling** - when a child throws error during render, lifecycle, or constructors. Methods: `static getDerivedStateFromError()` and `componentDidCatch()` (Error Boundary APIs)

### 2. `constructor()`

when it runs: first during mounting, before anything else.

Purpose:

- Initialize local state.
- Bind event handler (if not using class fields).
- You can read `props` (but must call `super(props)` first)

Example:

```js
class MyComponent extends React.component {
   constructor(props);
   this.state = {count: 0};
   this.handleClick = this.handleClick.bind(this); 
   handleClick(){ this.setState({count: this.state.count+1}); }
   render(){return <button onClick={this.handleClick}>{this.state.count}</button>;}
}
```

#### Best Practices

- If you need to set initial state, prefer class field syntax: `state = { ... }`, no constructor needed.
- Keep constructor simple, don't fetch data or cause any side effect there, use componentDidMount instead.

Hooks equivalent: initial state is created via `useState()` inside function components, no constructor.

### 3. `componentDidMount()`

#### When it runs?

- once, immediately after the first render (component mounted in DOM).

#### Purpose

- Run side effects that need the component to be in the DOM: data fetching, subscriptions, timers, measuring DOM Nodes.
- Safe place to call setState() if you need to update the state after initial render (it will trigger a re-render)

Example

```js
class UserList extends React.Component {
   state = { user: [], loading: true};

   // It will run once after first render
   componentDidMount(){
      fetch("/api/users")
      .then(users => this.setState({users, loading: false}))
      .catch(error => this.setState({loading: false}));
      // Added a event listener too
      window.addEventListener("resize", this.handleResize)
   }

   // It will run before component is un mounted
   componentWillUnMount(){
      window.removeEventListener("resize", this.handleResize);
   }

   render(){
      if (this.state.loading) return <div>Loading…</div>;
      return <ul>{this.state.users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
   }
}
```

Pitfalls

- If you call `setState()` here, it re renders, that's norma. Avoid infinite loops by not repeatedly setting state unconditionally.
- Cleanup subscriptions established here in `componentWillUnmount()`.

Hooks Equivalent:

```js
useEffect(()=> {
   /*Mount*/
   return ()=>{
      /*Clean up*/
   }
}, []) // Empty deps array
```

### 4. `componentDidUpdate(prevProps, prevState, snapshot)`

#### When It Runs?

- After every update (re-render) except the first mount.

#### Parameters

- `prevProps` - previous props
- `prevState` - previous State
- `snapshot` - value returned from `getSnapshotBeforeUpdate()` (if implemented)

#### Purpose of `componentDidUpdate`

- Respond to prop or state changes: fetch new data when props change, update DOM that depends on previous values, synchronize with external systems.
- Compare prevProps/prevState with current to decide action.

Example - Fetch on prop changes

```js
class RepoViewer extends React.Component {
   state = { commits: []}

   componentDidUpdate(prevProps){
      if(prevProps.repo !== this.props.repo ){
         // Prop changed - fetch new data
         fetch(`/api/repos/${this.props.repo}/commit`)
         .then(r => r.json())
         .then(commits -> this.setState({commits}))
      }
   }

   render(){ ... }
}
```

Important Point - Avoid Infinite Loop

```js
componentDidUpdate(){
   // Bad: unconditional setState causes infinite loop
   this.setState({count: count + 1});
}
```

- Basically it runs on each re render and state change causes re render so it will go in infinite loop.

Hooks Equivalent:

```js
useEffect(()=> {
   /* respond to dependency*/
}, [prop1, state1])
```

### 5. componentWillUnmount()

#### 1. When it runs

Immediately before the component is removed from the DOM.

#### purpose

- Cleanup: removes timers, cancel network requests (or ignore their results), remove event listeners, unsubscribe from services to avoid memory leaks or state update on unmounted components.

Example:

```js
class Clock extends React.Component {
   state: {time: Date.now()};

   componentDidMount(){
      this.timer = setInterval(()=> this.setState({ time: Date.now()}), 1000);
   }

   componentWillUnmount(){
      clearInterval(this.timer);
   }

   render(){ ... }
}
```

Pitfalls:

- Forgetting to clean up can cause memory leaks or exceptions (e.g. setState called on unMounted component).
- For request, consider aborting via AbortController or keeping an isMounted flag (but prefer cancellation api) 

Hooks equivalent

```js
useEffect(()=>{

   return ()=>{
      /*Unmount logic*/
   }
})
```

### 6. `static getDerivedStateFromProps(props, state)`

#### 1. When it runs?

- During mounting and updating, before render.
- It is a static method, no this access

Purpose:

- Provides a way to derive state from props in a safe lifecycle phase (replacement for deprecated `componentWillReceiveProps`)
- It should return an object to update state, ot null to do nothing.

Signature:

```js
static getDerivedStateFromProps(nextProps, prevState){ return newStateOrNull;}
```

Example (synchronizing a prop to internal state)

```js
class ControlledInputWrapper extends React.Component{
   state = {value: ""};

   static getDerivedStateFromProps(props, state){
      // If parent forces a reset vai prop reset-key, update internal state
      if(props.restKey != state.resetKey){
         return {value: props.initialValue || "", resetKey: props.restKey}
      }
      return null;
   }
   //...
}
```

Important caution:

- Overuse leads to bugs and complex code. Prefer to use props directly in render or lift state up.
- Avoid copying props into state blindly, this creates stale state problem (you duplicat the source of truth)
- Since it's static, no side effect allowed (no network request, not `setState` here)

When To Use

- Rare: when state truly depends on props and you must update sate before rendering (e.g. when implementing controlled /uncontrolled  wrapper components).

Hooks Equivalent

- No Direct equivalent, in function components yiu can use useEffect to respond to prop change or control derived state logic manually.

### 7. `shouldComponentUpdate(nextProps, nextState)`

#### When it Runs

- During updates, before rendering, It determines whether the component should re-render.

Purpose:

- Optimize performance: return `false` to skip `render()` and downstream lifecycle call for this update.
- Default returns `true`.

Signature

```js
shouldComponentUpdate(nextProps, nextState) { return boolean; }
```

Example:

```js
class PureLike extends React.Component {
   shouldComponentUpdate(nextProps, nextState){
      // shallow compare prop value
      return nextProps.value != this.props.value;
   }

   render(){ ... }
}
```

Alternative:

- Use React.PureComponent which implements a shallow prop/state comparison for you.

Pitfalls

- Incorrect `shouldComponentUpdate` logic can prevent necessary updates, causing stale UI.
- Shallow Comparison not deep: If propsa are complex objects mutated in place, shallow equality may fail to detect changes or incorrectly signal changes. prefer immutable updated.

Hooks Equivalent:

- React.memo for functional components optionally with custom comparison function.

### 8. `getSnapshotBeforeUpdate(prevProps, prevState)`

When it runs?

- After render() but before the DOM is updated (i.e. before React applies the changes to actual DOM).
- Its return value is passed as third parameter (snapshot) to componentDidUpdate().

Purpose:

- Capture information from the DOM (like scroll position) before React makes its updates, so you can use it in the componentDidUpdate() to adjust the DOM After changes.

Syntax:

```js
getSnapshotBeforeUpdate(prevProps, prevState) { return snapshotValueOrNull; }
```

Example - Preserving scroll position in a chat list

```js
class Chat extends React.Component{
   listRef = React.createRef();

   getSnapshotBeforeUpdate(prevProps){
      // If new messages are added, capture distance from bottom
      const list = this.listRef.current;
      if(!list) return null;
      return list.scrollHeight - list.scrollTop - list.clientHeight; // Distance from the bottom
   }

   componentDidUpdate(prevProps, prevState, snapshot){
      if(snapshot !== null){
         const list = this.listRef.current;
         //maintain the same distance from the bottom after new message added
         list.scrollTop = list.scrollHeight - list.clientHeight - snapshot;
      }
   }

   render(){
      return <div ref={ref.listRef}>{/*Messages*/}</div>;
   }
}
```

Pitfalls:

- Use only for reading DOM properties before update. Do not cause side effects here, side effects should happen in `componentDidUpdate`.

Hooks equivalent:

- Use `useLayoutEffect` to read DOM before paint and then update after render, you can capture values inside `useLayoutEffect` and update accordingly.

### 9. Error boundaries (`componentDidCatch()` and `static getDerivedStateFromError`())

What are Error Boundaries?

- Components that catch JavaScript errors in their child component tree during render, lifecycle methods and constructors, and display a fallback UI instead of crashing the whole React tree.

Two Methods used

- `static getDerivedStateFromError(error)` — update state to show fallback UI.

- `componentDidCatch(error, info)` — perform side effects like logging.

Important:

- Only class components can be error boundaries.
- Error boundaries catch errors in children, not within themselves.

Example:

```js
class ErrorBoundary extends React.Component{
   state = {hasError: false, error: null}

   static getDerivedStateFromError(error){
      // update state so next render shows fallback UI
      return {hasError: true, error}
   }

   componentDidCatch(error, info){
      //Log to an error reporting service
      logErrorToService(error, info);
   }

   render(){
      if(this.state.hasError){
         return <div> Something went wrong. please refresh</div>
      }
      return this.props.children;
   }
}
```

Usage:

Wrap parts of your tree:

```js
<ErrorBoundary>
  <Widget />
</ErrorBoundary>
```

Limitations:

- Error boundaries do not catch errors inside event handlers. Use try/catch inside the handler.
- They do not catch errors from asynchronous code (e.g., setTimeout) unless the error happens during render/lifecycle.
- They do not catch errors in server-side rendering.


## C. Advanced State Management

### 1. Using previous state safely in `setState()`

Why it matters?

`setState` is asynchronous and updates may be batched. when the new state depends on the old state, you must use functional form of `setState((prevState, props) => newState)` to avoid race conditions.

Correct pattern (class components)

```js
class Counter extends React.Component {
  state = { count: 0 };

  // safe increment
  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  // safe increment by N using props
  incrementBy = (n) => {
    this.setState((prevState, props) => ({ count: prevState.count + n }));
  };

  render() {
    return (
      <div>
        <div>Count: {this.state.count}</div>
        <button onClick={this.increment}>+1</button>
        <button onClick={() => this.incrementBy(5)}>+5</button>
      </div>
    );
  }
}
```

Common Mistake (unsafe update)

```js
// Unsafe: reading this.state directly when update depends on previous value 
this.setState({ count: this.state.count + 1 }); // may lead to incorrect count under rapid calls
```

Tips:

- Always use functional `setState` when new state uses **current state**.
- The functional `setState` receives (`prevState`, `props`).
- You can call setState multiple times; React will merge them (but still prefer functional when dependent on previous state).

### 2. Updating nested objects or arrays in state

Principle

State must be treated as immutable. Do NOT mutate objects/arrays in the this.state in-place. instead create a new object/array and set it.

Nested object example:

```js
class ProfileEditor extends React.Component{
   state = {
      user: {
         name: "Avinash",
         address: {
            city: "Delhi",
            zip: "110001"
         }
      }
   }

   // Update nested field immutably
   updateCity = (newCity) => {
      this.setState((prevState)=>{
         return {
            ...prevState.user, address: {...prevState.user.address, city: newCity }
         }
      })
   }

   render() {
    const { user } = this.state;
    return (
      <div>
        <div>{user.name} — {user.address.city}</div>
        <button onClick={() => this.updateCity('Mumbai')}>Set city to Portland</button>
      </div>
    );
  }
}
```

Array update patterns

- Add item: `newArray = prevArr.concat(item)` or `[...prevArr, item]`
- Remove item by id: filter
- Update item: map to replace single item immutably
  
```js
class TodoList extends React.Component {
  state = { todos: [{ id:1, text:'eat', done:false }] };

  add = (text) => {
    this.setState(prev => ({ todos: [...prev.todos, { id: Date.now(), text, done:false }] }));
  };

  toggle = (id) => {
    this.setState(prev => ({
      todos: prev.todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
    }));
  };

  remove = (id) => {
    this.setState(prev => ({ todos: prev.todos.filter(t => t.id !== id) }));
  };

  render() { /* ... */ }
}
```

Deep Updates

For very deep updates, either:

- Use utility helpers (e.g. immutability-helper, immer), note: these are third party library.
- Of lift and split state so you avoid extremely deep nesting.

Pitfalls

- Never mutate state directly: `this.state.arr.pus(...)` or `this.state.obj.foo = "bar"`
- Avoid deeply nested state if possible, it's harder to update correctly.

### 3. Passing state and methods between components (parent-child communication)

Patterns

- Parent owns the state.
- Parent passes state down as props to children.
- Parent passes callback functions to children so children can request state changes.

Binding methods in class components

In class components you must ensure callbacks are bound to this. ways:

1. Use class fields (arrow functions) — recommended:

   ```js
   handleSomething = () => { /* this works */ }
   ```

2. Bind in constructor

   ```js
   constructor(props) {
      super(props);
      this.handleSomething = this.handleSomething.bind(this);
   }
   ```

3. Avoid binding in render (creates new function each render).

Example parent -> child -> parent callback

```js
class Parent extends React.Component {
  state = { text: 'hello' };

  // arrow method is auto-bound
  updateText = (newText) => {
    this.setState({ text: newText });
  };

  render() {
    return (
      <div>
        <h3>Parent: {this.state.text}</h3>
        <Child text={this.state.text} onUpdate={this.updateText} />
      </div>
    );
  }
}

class Child extends React.Component {
  render() {
    return (
      <div>
        <div>Child sees: {this.props.text}</div>
        <button onClick={() => this.props.onUpdate('hello from child')}>Update Parent</button>
      </div>
    );
  }
}

```

Passing methods through many levels

If deep prop drilling becomes a problem you can:

- Lift state to closer common ancestor,

- Use context (`React.createContext`) — works with class components via `MyContext.Consumer` or `static contextType = MyContext`,

- Use a state management library (Redux, MobX) — usually overkill for small apps.

Pitfalls

- Don’t mutate props in child components.

- Avoid creating functions inline in `render` repeatedly if performance matters (it’s fine for most cases).

- Beware of stale closures if using props in callbacks — class methods get fresh `this.props` when invoked normally.

### 4. Lifting state up

When multiple sibling components need to share or coordinate state, move the state up to their nearest common ancestor (the "lifting" pattern). That ancestor becomes the single source of truth and passes data and callbacks down.

Example: Two siblings — a slider and display

```js
class Container extends React.Component {
  state = { value: 50 };

  setValue = (v) => this.setState({ value: v });

  render() {
    return (
      <div>
        <Slider value={this.state.value} onChange={this.setValue} />
        <Display value={this.state.value} />
      </div>
    );
  }
}

class Slider extends React.Component {
  handleChange = (e) => {
    this.props.onChange(Number(e.target.value));
  };
  render() {
    return <input type="range" min="0" max="100" value={this.props.value} onChange={this.handleChange} />;
  }
}

class Display extends React.Component {
  render() {
    return <div>Value: {this.props.value}</div>;
  }
}
```

Why lift?

- Avoid duplicated or inconsistent state.
- Easier to reason about data flow (unidirectional).
- Simplest approach before introducing context or external stores.

Pitfalls

- Lifting too high can make prop chains long — consider Context if many levels.
- Don’t lift state prematurely — keep local state for purely local UI details.

### 5. Controlled vs Uncontrolled components (especially for forms)

Definitions

- **Controlled component**: React controls the input value via value + onChange. Input state lives in React.

- **Uncontrolled component**: Browser DOM keeps the input state. React uses ref to read value when needed (like on submit).

Both are valid; choose controlled when you want immediate validation, formatting, or derived UI. Use uncontrolled for quick forms or when integrating non-React libraries.

Controlled Example:

```js
class ControlledForm extends React.Component {
  state = { name: '', email: '' };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', this.state); // values live in React
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" value={this.state.name} onChange={this.handleChange} />
        <input name="email" value={this.state.email} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

Uncontrolled example (using refs)

```js
class UncontrolledForm extends React.Component {
  nameRef = React.createRef();
  emailRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      name: this.nameRef.current.value,
      email: this.emailRef.current.value
    };
    console.log('submit uncontrolled', values);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" defaultValue="Alice" ref={this.nameRef} />
        <input name="email" defaultValue="a@b.com" ref={this.emailRef} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

When to use which

- **Controlled**: dynamic validation, instant feedback, complex interactions, disabling submit button, or when input value should drive other UI.
- **Uncontrolled**: simple forms, large forms where controlled would be verbose, or when migrating older non-React code.

Pitfalls

- Mixing value with defaultValue incorrectly — an input with a value prop but no onChange becomes read-only.
- Forgetting to bind or use arrow functions in class components for handlers.

Validation Example (controlled)

```js
class Signup extends React.Component {
  state = { email: '', error: '' };

  handleChange = (e) => {
    const email = e.target.value;
    let error = '';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = 'Invalid email';
    }
    this.setState({ email, error });
  };

  render() {
    return (
      <form>
        <input name="email" value={this.state.email} onChange={this.handleChange} />
        {this.state.error && <div style={{color:'red'}}>{this.state.error}</div>}
      </form>
    );
  }
}
```

## D. Component Composition and Reusability

### 1. Reusable Class Components

Concept

A reusable component is a class component that:

- Encapsulates its own logic and style,
- Exposes configurable props,
- Avoids hardcoding data or behavior,
- Can be used multiple times in different contexts.

You’re basically designing it like a “function” that takes props and renders something predictable.

Example:

```js
class Button extends React.Component {
  render() {
    const { label, onClick, type = 'primary', disabled = false } = this.props;

    const styles = {
      primary: { background: '#007bff', color: 'white', border: 'none', padding: '8px 12px' },
      secondary: { background: 'white', color: '#007bff', border: '1px solid #007bff', padding: '8px 12px' }
    };

    return (
      <button
        style={styles[type]}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}

```

You can now use it anywhere:

```js
<Button label="Save" onClick={this.handleSave} />
<Button label="Cancel" onClick={this.handleCancel} type="secondary" />
```

Notice:

- No internal state — purely reusable & controlled by props.
- Customizable styling via props.type

Example 2: Reusable Input Component (controlled)

```js
class TextInput extends React.Component {
  render() {
    const { label, value, onChange, placeholder } = this.props;
    return (
      <div style={{ marginBottom: '8px' }}>
        <label>{label}</label><br />
        <input value={value} onChange={onChange} placeholder={placeholder} />
      </div>
    );
  }
}
```

Usages

```js
<TextInput
  label="Email"
  value={this.state.email}
  onChange={(e) => this.setState({ email: e.target.value })}
/>
<TextInput
  label="Password"
  value={this.state.password}
  onChange={(e) => this.setState({ password: e.target.value })}
/>
```

Example 3: Reusable Card with props.children

```js
class Card extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '12px',
        margin: '10px 0'
      }}>
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    );
  }
}
```

Usage:

```js
<Card title="Profile">
  <p>Name: Alice</p>
  <p>Age: 25</p>
</Card>

<Card title="Settings">
  <button>Change Password</button>
</Card>
```

- This is composition in action, the **parent injects arbitrary content** inside the Card.


### 2. What is a Higher-Order Component (HOC)?

A Higher-Order Component is a function that takes component and return a new component with added features.

It's basically a wrapper that adds reusable logic to components without modifying their sources.

#### Syntax:

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

#### The Core Idea

Imagine you have several components that need the same behavior, for example

- Logging props changes
- Fetching data
- Tracking window size
- Checking authentication

Instead of duplicating the logic in each, you extract that logic into a HOC and wrap component with it.

#### Example: Logging Props HOC

Step1: **Create a simple component**

```js
class Hello extends React.Component {
   render(){
      return <h3>Hello, {this.props.name}</h3>;
   }
}
```

Step2: **Write a HOC**

```js
function withLogger(WrappedComponent){
   return class extends React.Component {
      componentDidUpdate(prevProps){
         console.log("Old Props", prevProps);
         console.log("New Props", this.props);
      }

      render(){
         return <WrappedComponent {...this.props} />
      }
   }
}
```

Step 3: **Usages**

```js
const HelloWithLogger = withLogger(Hello);
```

Then Render:

```js
<HelloWithLogger name="avinash">
```

Every time props change, the HOC logs them, and the wrapped component doesn't even know it's being observed.

#### Key Pattern:

```js
function withSomething(WrappedComponent){
   return class extends React.Component{
      // add reusable logic 
      render <WrappedComponent {...this.props} />
   }
}
```

#### Always:

- Return a new class (or function) component
- Pass down all props 
- Give it a display name for debugging

   ```js
   Wrapped.displayName = `withSomething(${getDisplayName(WrappedComponent)})`;
   ```

#### Example 2: Data Fetching HOC

Let's say multiple components need to fetch JSON data from an API.

Instead of repeating componentDIDMount() + fetch everywhere, make a reusable HOC.

```js
function withData(WrappedComponent, url){
   return class extends React.Component{
      state = {data: null, loading: true, error: null}

      componentDidMount(){
         fetch(url)
         .then(res => res.json())
         .then(data => setState({data, loading: false}))
         .catch(error => setState({loading: false, error: error}))
      }

      render (){
         const {data, loading, error} = this.state;
         return <WrappedComponent
            {...this.props}
            data = {data}
            loading={loading}
            error = {error}
         />
      }
   }
}
```

#### Example 3: Authentication HOC

```js
function withAuth(WrappedComponent){
   return class extends React.Component{
      render() {
         const {isAuthenticated} = this.props;
         if(!isAuthenticated){
            return <p> access denied, please login </p>
         }
         return <WrappedComponent {...this.props} />
      }
   }
}
```

#### When to use HOCs

Use an HOC When 

- Multiple components share the same behavior or side effects (e.g., logging, fetching, resizing).
- You need to enhance existing components without editing them.

Avoid HOCs when

- Logic can be isolated into a single reusable component instead.
- You’re using hooks — then prefer custom hooks (useSomething).

### 3. Render Props Pattern

A Render Prop is a function prop that a component uses to determine what to render.

Instead of passing JSX as children or wrapping components (like in HOCs), we pass a function that receives data/logic and returns UI.

In Other Word

```js
<DataProvider render={(data) => <Display data={data}/>} />
```

- The Parent (DataProvider) owns the logic.
- The rend prop decides how to display that logic.

#### Why to use Render Props?

- To Share logic (like data fetching, mouse position tracking, window resizing, etc.) between multiple components.
- To separate logic from presentation.
- To Avoid some of the nesting and complexity of HOCs.

#### Example Mouse Tracker

Step 1: Create a class component with internal logic

```js
class MouseTracker extends React.Component{
   state = {x: 0, y: 0}

   handleMouseMove = (e) => {
      this.setState({x: e.clientX, y: e.clientY})
   }

   render (){
      return (
         <div style={{ height: '200px' }} onMouseMove={this.handleMouseMove}>
            {/*
              Instead of rendering its own UI,
              MouseTracker delegates rendering to a function passed via props
            */}
            {this.props.render(this.state)}
         </div>
      )
   }
}
```

Step 2: Use It

```js
class App extends React.Component {
  render() {
    return (
      <MouseTracker
        render={({ x, y }) => (
          <p>
            The mouse position is ({x}, {y})
          </p>
        )}
      />
    );
  }
}
```

- `MouseTracker` doesn’t care what is rendered — it just provides logic (the `x`, `y` state).
- Any component can now reuse this logic differently.

Example 2: Reusing the same logic for multiple views

```js
class App extends React.Component {
  render() {
    return (
      <MouseTracker
        render={({ x, y }) => (
          <div>
            <p>Mouse: ({x}, {y})</p>
            <div
              style={{
                position: 'absolute',
                left: x - 25,
                top: y - 25,
                width: 50,
                height: 50,
                background: 'skyblue'
              }}
            />
          </div>
        )}
      />
    );
  }
}
```

- Now the same logic (MouseTracker) drives both the text and a moving box.

#### Alternative Syntax- Using children as a Function

You don;t have to name the prop render.

Many devs just use the children prop (because JSX allows function as children):

```js
class MouseTracker extends React.Component {
   state = { x: 0, y: 0}

   handleMouseMove = (e) => {
      this.setState({ x: e.clientX, y: e.clientY})
   }

   render(){
      return  (
         <div style={{height: "200px"}}> onMouseMove={this.handleMouseMove}>
            {this.props.children(this.state)}
         </div>
      )
   }
}
```

Usages:

```js
<MouseTracker>
{({x, y}) => <h3>Mouse: {x}, {y}</h3>}
<MouseTracker>
```

- This is slightly cleaner and common.

#### Difference between HOC and Render Props

| Concept             | HOC                         | Render Props                        |
| ------------------- | --------------------------- | ----------------------------------- |
| How logic is shared | Function wraps component    | Function is passed *into* component |
| Composition style   | Outside (wraps around)      | Inside (passed as prop)             |
| Name collision risk | Possible (props can clash)  | No risk (data scoped to function)   |
| Readability         | Can get nested (“HOC hell”) | Usually flatter and clearer         |


Example: Data Fetcher with render props

```js
class DataFetcher extends React.Component{
   state = { data: null, loading: true, error: null}

   componentDidMount() {
    fetch(this.props.url)
      .then((res) => res.json())
      .then((data) => this.setState({ data, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  }

  render() {
    return this.props.render(this.state);
  }
}
```

Usage:

```js
<DataFetcher url="https://jsonplaceholder.typicode.com/users"
   render={({data,loading,error}) => {
      if(loading) return <p> Loading...</p>;
      if(error) return <p>Error: {error.message}</p>;
      return (
         <ul>
            {data.map((user) => <li key={user.id}>{user.name}</li>)}
         </ul>
      )
   }}
/>
```

Now You can reuse DataFetcher for any endpoint by changing the URL and render function.

#### Advantages:

- Flexible composition — You can control how the data/logic is displayed.
- No prop name clashes — Because the render function receives fresh data.
- Easier testing — You can test logic and UI separately.
- No inheritance or modification — Just composition.

### 4. Container vs Presentational Components

Container vs Presentational Components, one of the **most foundational architectural patterns** for building clean, maintainable React apps, especially in **class component** projects.

#### Core Idea

Split the components into two categories:

| Type                          | Responsibility    | Knows about                   | Usually                               |
| ----------------------------- | ----------------- | ----------------------------- | ------------------------------------- |
| **Presentational Components** | How things *look* | props, UI                     | Functional or simple class components |
| **Container Components**      | How things *work* | state, data fetching, actions | Class components                      |

#### Analogy

- Think of presentational components as the actors, they are just performing what they're told, no logic.
- and container components as director, they fetch data, handle logic, and tell actors what to do.

#### Example 1: Todo App Split

Step 1: Presentational Layer

```js
// Purely UI Component
// Purely UI component
class TodoList extends React.Component {
  render() {
    const { todos, onToggle, onDelete } = this.props;

    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
              />
              {todo.text}
            </label>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}
```

- No Internal State, only renders what it's given.

Step 2: **Container Component**

- Handles all state, logic, and data changes

```js
class TodoContainer extends React.Component {
  state = {
    todos: [
      { id: 1, text: 'Learn React', done: false },
      { id: 2, text: 'Build something', done: false }
    ],
    newTodo: ''
  };

  handleChange = (e) => this.setState({ newTodo: e.target.value });

  addTodo = () => {
    if (!this.state.newTodo.trim()) return;
    this.setState((prev) => ({
      todos: [
        ...prev.todos,
        { id: Date.now(), text: prev.newTodo, done: false }
      ],
      newTodo: ''
    }));
  };

  toggleTodo = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    }));
  };

  deleteTodo = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.filter((t) => t.id !== id)
    }));
  };

  render() {
    return (
      <div>
        <h3>My Todos</h3>
        <input
          value={this.state.newTodo}
          onChange={this.handleChange}
          placeholder="Add a new task"
        />
        <button onClick={this.addTodo}>Add</button>

        {/* Pass data + behavior down to presentational component */}
        <TodoList
          todos={this.state.todos}
          onToggle={this.toggleTodo}
          onDelete={this.deleteTodo}
        />
      </div>
    );
  }
}
```

Now you have:

- TodoContainer = logic + state

- TodoList = pure UI

**Separation of concerns achieved.**

#### Key Benefits

| Benefit                   | Explanation                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
|  **Reusability**        | Presentational components can be reused with different data or containers. |
|  **Testability**        | You can test UI separately from logic.                                     |
|  **Clearer structure**  | Containers fetch/manage data; presentation only renders it.                |
| **Easier refactoring** | Change logic or backend without touching UI, or vice versa.                |

#### Project Structure Tips

```bash
/components
   /presentational
      /Button.js
      /Card.js
      /TodoList.js
   /Container
      /TodoContainer.js
      /UserTableContainer
```

## E. Performance Optimization

### 1. PureComponent and shallow comparison

`React.PureComponent` is like `React.Component` but implement a built-in `shouldComponentUpdate()` that does a shallow comparison of `props` and `state`. If nothing changed shallowly, the component skips re-render, which can give a performance boost, but shallow compare is reference based, so mutated nested object will not be detected.

#### 4. How Pure Component Works?

- When a PureComponent receives new props or state, React compares each prop and each state field using === (strict equality).
- If every prop and every state field is qual (by reference / primitive value), React bails out, no render.
- If any field differs (different primitive value or different object/array reference), it will re-render.

#### When to use It?

User Pure Component when:

- A component renders the same output for same props/state
- Props and state are simple or updated immutably (so reference change when contents change).
- You have measurable re-renders overhead and want an easy optimization.

Avoid or be careful if:

- props/ state are deeply nested object you mutate in place.
- You rely on function or inline object being equal between renders (they usually aren't)
- Premature optimization: measure first.

#### Example 1: Basic usage

```js
// child is a pure component
class Child extends React.PureComponent {
   render(){
      console.log("Child render");
      return <div>Value: {this.props.value}</div>
   }
}

class Parent extends React.Component {
  state = { value: 0};
  increment = () => this.setState((s) => ({ value: s.value + 1 }));
  render() {
    return (
      <div>
        <button onClick={this.increment}>inc</button>
        <Child value={this.state.value} />
      </div>
    );
  }
}
```

- If value does not change, Child will not re-render.

Example 2: Pitfall: nested mutation (why shallow compare can fail you)

Bad pattern — mutating objects in place:

```js
class Child extends React.PureComponent {
  render() {
    console.log('Child render');
    return <div>{this.props.user.name}</div>;
  }
}

class Parent extends React.Component {
  state = {
    user: { name: 'Alice', age: 30 }
  };

  // BAD: mutates state.user directly
  changeNameMutating = () => {
    this.state.user.name = 'Bob';
    this.setState({ user: this.state.user }); // same object reference -> shallow compare sees no change
  };

  // GOOD: produce a new object
  changeNameImmutable = () => {
    this.setState((prev) => ({
      user: { ...prev.user, name: 'Bob' }
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.changeNameMutating}>Mutate</button>
        <button onClick={this.changeNameImmutable}>Immutable</button>
        <Child user={this.state.user} />
      </div>
    );
  }
}
```

If you click Mutate, `Child` may not re-render (because the `user` reference is unchanged). If you click Immutable, `Child` will re-render because `user` reference changes.

`Lesson`: always create new objects/arrays when changing nested data if you rely on shallow comparison.

Example 3: Functions and inline objects cause re-renders

Passing a different reference each render triggers PureComponent to re-render even if the underlying logic is identical.

```js
class Child extends React.PureComponent {
  render() {
    console.log('Child render');
    return <div>{this.props.label}</div>;
  }
}

class Parent extends React.Component {
  state = { label: 'hello' }

  // This arrow creates a new function each render!
  render() {
    return (
      <div>
        <Child
          label={this.state.label}
          onClick={() => console.log('clicked')} // new function every render -> prop ref changes
        />
      </div>
    );
  }
}
```

Fixes

- Use instance methods (arrow class fields) so the reference is stable:

   ```js
   handleClick = () => console.log('clicked');
   // then pass: onClick={this.handleClick}
   ```

Avoid creating inline objects/arrays in render — move them to constants or compute immutably outside render.

#### How PureComponent compares to manual shouldComponentUpdate

`PureComponent` is a convenience. If you have custom logic (e.g., deep comparisons on specific props), implement `shouldComponentUpdate(nextProps, nextState)` yourself.

Example:

```js
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.importantValue !== this.props.importantValue) return true;
    // If a large list prop only changes length or specific item you care about:
    if (nextProps.items.length !== this.props.items.length) return true;
    return false; // otherwise skip
  }
}
```

Manual `shouldComponentUpdate` lets you be more precise than shallow compare, but it’s more error-prone.

#### Best practices when using PureComponent

- Prefer immutable updates for props/state so references change when content changes (`...` spread, `slice`, `concat`, `map` producing new arrays/objects).
- Avoid inline functions/objects in `render` (they create new references every render).
  - Use instance methods (arrow class fields) or bind once in constructor.
- **Keep props small and simple** when possible, primitive values and shallow structures.
- Use `PureComponent` for leaf components that render based on props, they often benefit most.
- Profile before and after, use React DevTools Profiler to confirm actual gains.
- **Beware third-party children**, if child components mutate objects you pass, PureComponent can be fooled.

#### When PureComponent is harmful or useless

- If props frequently contain new references (e.g., inline styles/objects), `PureComponent` may still re-render every time and give no benefit.

- If your component is cheap to render (simple), the extra shallow comparison may cost more than a render; measure.

- If you need deep checks, `PureComponent` is insufficient — manual `shouldComponentUpdate` or memoization is needed.

#### Diagnosing problems

- Use `console.log('render')` in component render to see re-renders.
- Use React DevTools Profiler to capture renders and flame graphs.
- If a `PureComponent` isn’t updating when you expect, check for:
  - Mutations (mutating nested objects)
  - Passing same object reference back into state
- If a `PureComponent` keeps re-rendering:
  - Search for inline functions/objects in parent render
  - Check for props that are new references (e.g., `new Date()` each render)

#### Small checklist for converting a component to PureComponent safely

- Ensure parent updates props immutably (references change on real updates).

- Replace inline functions with instance methods or bound methods.

- Replace inline objects/arrays with constants or memoized values.

- Add `console.log` or profiler to confirm less re-rendering.

- If complex prop shapes, consider `shouldComponentUpdate` or `PureComponent` + immutable data helpers.

### 2. Implementing `shouldComponentUpdate()`

#### What is `shouldComponentUpdate()`

`shouldComponentUpdate(nextProps, nextState)` is a lifecycle method that lets you decide whether a component should re-render when it receives new props or state.

By default, React.Component always re-renders when `setState()` is called or when parent props change.

But by implementing `shouldComponentUpdate()`, you can tell React to skip the render step if nothing meaningful changed.

#### Lifecycle Context

`shouldComponentUpdate()` runs **after** new props/state are set but **before** render

```js
→ props/state change
→ shouldComponentUpdate(nextProps, nextState)
   └── return true  → render()
   └── return false → skip render()
```

So it’s a **performance optimization hook**, not for side effects or data fetching.

#### Basic Example

```js
class Counter extends React.Component {
  state = { count: 0 };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Current:', this.state.count, 'Next:', nextState.count);
    return nextState.count !== this.state.count; // only re-render if count changed
  }

  render() {
    console.log('Render called');
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

The component will only re-render when count changes.

If you call `setState({ count: this.state.count })`, `shouldComponentUpdate()` returns `false` → React skips `render()`.

#### Comparison with `PureComponent`

| Feature          | `React.Component`  | `React.PureComponent`       | Manual `shouldComponentUpdate`       |
| ---------------- | ------------------ | --------------------------- | ------------------------------------ |
| Default behavior | Always re-render   | Shallow compare props/state | Custom logic                         |
| Control level    | None               | Automatic                   | Full control                         |
| Best for         | Simpler components | Shallow data                | Complex data or special rules        |
| Performance      | Lower              | Often higher                | Can be highest, if written correctly |


PureComponent internally does something like this:

```js
shouldComponentUpdate(nextProps, nextState) {
  return (
    !shallowEqual(this.props, nextProps) ||
    !shallowEqual(this.state, nextState)
  );
}
```

You can write your own version if you need deeper control.

#### Example 2 — Selective Prop Comparison

Imagine you have a big component, but only some props matter for rendering.

```js
class ProfileCard extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Only re-render if name or age changed
    if (nextProps.name !== this.props.name) return true;
    if (nextProps.age !== this.props.age) return true;
    return false;
  }

  render() {
    console.log('ProfileCard render');
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>Age: {this.props.age}</p>
      </div>
    );
  }
}
```

If the parent keeps passing new unrelated props (like theme, timestamp, etc.), this component won’t re-render unnecessarily.

#### Example 3 — Deep Comparison (be careful!)

When props are nested objects, a shallow compare may not be enough.

```js
class SettingsPanel extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Deep compare theme settings
    return JSON.stringify(nextProps.theme) !== JSON.stringify(this.props.theme);
  }

  render() {
    console.log('SettingsPanel render');
    return <div>Theme: {this.props.theme.mode}</div>;
  }
}
```

This works but beware:

- JSON.stringify() is expensive — don’t do it for large objects on every render.
- Better: use immutable data so you can rely on reference comparison.

#### Example 4: Comparing Specific Keys in State

```js
class ChatWindow extends React.Component {
  state = { messages: [], draft: '', unreadCount: 0 };

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if messages or draft changed
    return (
      nextState.messages !== this.state.messages ||
      nextState.draft !== this.state.draft
    );
  }

  render() {
    console.log('ChatWindow render');
    return (
      <div>
        <ul>
          {this.state.messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <input
          value={this.state.draft}
          onChange={(e) => this.setState({ draft: e.target.value })}
        />
      </div>
    );
  }
}
```

- This avoids re-rendering when only unreadCount changes (which might be tracked elsewhere).

### 3. React memoization techniques for class components

#### What is Memoization?

Memoization = caching the result of a function so that if you call it again with the same input, it returns the cached result instead of recomputing it.

React re-renders components when props/state change.

If you components does heavy work (filtering, sorting. mapping, etc.) every render, it can slow down.

Memoization ensures that expensive calculations or derived data are not recomputed unless necessary.

#### React Render Flow Reminder

Every time setState() runs or new props come in:

1. The component's render() method is called
2. Any function or calculations inside render are re-run.
3. New Virtual DOM elements are created and diffed.

So if you compute something expensive in render(), it will happen every single time.

Memoization solves that.

#### Technique 1: Manual Caching inside the class

For simple memoization, you can cache result as instance fields.

Example - Filtering a list

```js
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this._lastProducts = null;
    this._lastSearch = '';
    this._filteredCache = null;
  }

  getFilteredProducts(products, search) {
    // Return cached result if inputs didn't change
    if (
      this._lastProducts === products &&
      this._lastSearch === search
    ) {
      return this._filteredCache;
    }

    console.log('Filtering products...');
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Cache for next call
    this._lastProducts = products;
    this._lastSearch = search;
    this._filteredCache = filtered;

    return filtered;
  }

  render() {
    const { products, search } = this.props;
    const filtered = this.getFilteredProducts(products, search);

    return (
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    );
  }
}
```

Benefits:

- Expensive filtering runs only when products or search changes.
- Perfect for static lists, large data, or derived data (sorted, grouped, etc.).

#### Technique 2: Use third-party memoization helpers (like Lodash)

You can use tools like lodash memoize for function level caching.

```js
import memoize from 'lodash.memoize';

class StudentList extends React.Component {
  // memoized version of filtering function
  filterStudents = memoize((students, grade) => {
    console.log('Filtering...');
    return students.filter((s) => s.grade === grade);
  });

  render() {
    const { students, grade } = this.props;
    const filtered = this.filterStudents(students, grade);

    return (
      <div>
        {filtered.map((s) => (
          <div key={s.id}>{s.name}</div>
        ))}
      </div>
    );
  }
}
```

`memoize` caches results keyed by the function arguments.
It’s especially handy when the same props come in repeatedly (like Redux-connected components).

Beware:

- Lodash’s default memoize only uses the first argument as a cache key unless you provide a custom resolver.
- Use shallow or deep key resolvers depending on your data shape.

#### Technique 3: Memoizing render helpers or derived UI

Sometimes, your render method contains computed JSX that doesn’t change often.
You can store it and update only when inputs change.

```js
class Dashboard extends React.Component {
  lastStats = null;
  lastMarkup = null;

  renderStats(stats) {
    if (this.lastStats === stats) return this.lastMarkup;

    console.log('Rendering expensive stats section...');
    this.lastStats = stats;
    this.lastMarkup = (
      <div>
        <h4>Total: {stats.total}</h4>
        <p>Active: {stats.active}</p>
      </div>
    );
    return this.lastMarkup;
  }

  render() {
    const { stats } = this.props;
    return (
      <div className="dashboard">
        {this.renderStats(stats)}
      </div>
    );
  }
}
```

Here, the expensive JSX is only recomputed when stats actually change.

#### Technique 4: Combine with shouldComponentUpdate or PureComponent

You can pair memoization with shallow comparison to prevent unnecessary re-renders and expensive re-computations.

Example:

```js
class Chart extends React.PureComponent {
  computeData = memoize((dataset) => {
    console.log('Computing chart data...');
    return dataset.map((d) => d.value * 2);
  });

  render() {
    const processed = this.computeData(this.props.data);
    return <div>{processed.join(', ')}</div>;
  }
}
```

Because this is a `PureComponent`, if `data` reference doesn’t change, it won’t even call `render()`, and if `render` is called, memoization ensures expensive work runs only once per data set.

#### Technique 5: Using libraries like Reselect or Memoizee

For large-scale state-driven apps (like Redux), you can use selectors that are memoized automatically:

Example using Reselect:

```js
import { createSelector } from 'reselect';

const getUsers = (state) => state.users;
const getSearch = (state) => state.search;

// Derived selector (memoized)
export const getFilteredUsers = createSelector(
  [getUsers, getSearch],
  (users, search) =>
    users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
);
```

Then your container component receives a filtered list that only recalculates when users or search changes — no redundant work or re-rendering.

Works perfectly with class-based Redux containers.

#### Technique 6: Memoizing method results using class fields

You can write a lightweight reusable memoizer:

```js
function memoizeOne(fn) {
  let lastArgs = [];
  let lastResult;
  return function (...args) {
    if (
      args.length === lastArgs.length &&
      args.every((a, i) => a === lastArgs[i])
    ) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = fn.apply(this, args);
    return lastResult;
  };
}

class UserStats extends React.Component {
  getUserData = memoizeOne((users) => {
    console.log('Computing user stats...');
    return users.filter((u) => u.active);
  });

  render() {
    const data = this.getUserData(this.props.users);
    return <div>Active users: {data.length}</div>;
  }
}
```

Same result is returned if the same users reference is passed again.

This “memoize-one” pattern is used in many popular React libraries (like **react-select**).

### 4. Lazy Loading and Code Splitting

#### What Are Lazy Loading & Code Splitting?

**Lazy Loading** means loading parts of your app only when they're needed, not all at once.

**Code splitting** means splitting your bundle into smaller chunks so the browse can load them on demand.

Together they reduce:

- Initial Page Load time
- Bundle Size
- Perceived performance

#### Why It matters?

When your React app grows, everything gets bundled into one large `bundle.js`. That means the user has to download the entire app before even seeing the first screen.

Problem:

- You have routes: `/home`, `/about`, `/dashboard`
- The user starts at `/home`
- But React bundles everything, even dashboard logic the user might never open.

Solution:

- Code Splitting + lazy loading lets you load `/dashboard` code only when user navigates there.

#### Technique 1: `React.lazy()` + `Suspense`

Introduced in React 16.6, works perfectly in class components.

Step 1: **Normal import (Before Optimization)**

```js
import Dashboard from './Dashboard';
import Reports from './Reports';

class App extends React.Component {
  render() {
    return (
      <div>
        <Dashboard />
        <Reports />
      </div>
    );
  }
}
```

Problem: Both `Dashboard` and `Reports` are imported immediately (even if not needed yet).

Step 2: **Lazy Import with `React.lazy`**

```js
import React, {Suspense} from "react";

const Dashboard = React.lazy(()=> import("./Dashboard));
cost Reports = React.lazy(()=>import("./Reports"));

class App extends React.Component {
   state = { showDashboard: true}

   toggleView = () => this.setState((s) => ({showDashboard: !s.showDashboard}));

   render(){
      return(
         <div>
            <button onClick={this.toggleView}> Toggle View</button>
            {/*Suspense shows fallback wile loading*/}
            <Suspense fallback= {<div> Loading component...</div>}>
               {this.state.showDashboard? <Dashboard/>: <Reports/>}
            </Suspense>
         </div>
      )
   }
}
```

Result:

- Dashboard code loads only when rendered.
- When toggled, Reports chunk loads on demand.
- The `<Suspense>` fallback displays a loading spinner or message until it’s ready.

#### How It Works?

When React sees a `React.lazy(()=> import("..."))`, It creates a **dynamic import** that webpack splits into separate JavaScript file.

Example generated chunk:

```js
main.bundle.js
Dashboard.chunk.js
Reports.chunk.js
```

The First load includes only `main.bundle.js`. When you render `<Dashboard/>`, React loads `Dashboard.chunk.js` asynchronously.

#### Technique 2: Lazy Loading Routes (With React Routers)

This way is most commonly used.

```js
import React, {Suspense} from "rect";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Lazy import for each page
const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(()=> import("./pages/Dashboard"));
const Reports = React.lazy(()=> import("./pages/Reports"))

class App extends React.Component{
   render(){
      return (
         <Router>
            <Suspense>
               <Routes>
                  <Route path="/" element= {<Home/>} />
                  <Route path= "/dashboard" element={<Dashboard/>} />
                  <Route path="/reports" element = {<Reports/>} />
               </Routes>
            </Suspense>
         </Router>
      )
   }
}
```

Each Page is loaded only when you navigate to it.

#### Technique 3: Preloading Lazy Component (For Smoother UX)

You can preload components in the background so they load instantly when needed.

```js
import React, {Suspense} from "react";
const Profile = React.lazy(()=> import("./Profile"));

class App extends React.Component {
   preloadProfile = () => import("./Profile"); // Trigger background load

   render(){
      return(
         <div>
            <button onMouseEnter={this.preloadProfile}> Hover to preload profile</button>
            <Suspense fallback={<div>Loading...</div>}>
               <Profile/>
            </Suspense>
         </div>
      )
   }
}
```

The profile page will load in the background when the user hovers over the button, feels instant when clicked.

#### Technique 4: Conditional Lazy Loading

You can lazy-load components conditionally (based on user action, role, feature flags, etc.)

```js
class AdminPanel extends React.Component{
   state= {showLogs: false}

   handleShowLogs = async () => {
      const {default: Logs} = await import ("./Logs"); // Dynamic import manually
      this.Logs = Logs; // Save reference
      this.setState({ showLogs: true});
   }

   render(){
      const Logs = this.Logs;
      return (
        <div>
        <h2>Admin Panel</h2>
        <button onClick={this.handleShowLogs}>Load Logs</button>
        {this.state.showLogs && Logs ? <Logs /> : null}
      </div>
      )
   }
}
```

This approach doesn’t even need React.lazy — pure dynamic import controlled manually.

#### Technique 5: Code Splitting Utility Components

If you have small reusable parts (like charts, modals, graphs), you can wrap lazy loading in a reusable HOC.

```js
function withLazyImport(importFn){
   const LazyComponent = React.lazy(importFn);
   return (props) => {
      <Suspense fallback={<div> Loading Component</div>}>
         <LazyComponent/>
      </Suspense>
   }
}

// Usage
const LazyChart = withLazyImport(()=> import("./Chart"));

class Dashboard extends React.Component {
   render(){
      return (
         <div>
            <h2>Dashboard</h2>
            <LazyChart />
         </div>
      )
   }
}
```

Simple wrapper to apply lazy loading anywhere easily.

#### Under the Hood — Webpack & Dynamic Imports

When you write 

```js
const Dashboard = React.lazy(()=> import("./Dashboard"));
```

Webpack automatically splits `./Dashboard` into separate chunk during build.

In your network tab, you’ll see:

```css
main.js
Dashboard.chunk.js
```

React loads Dashboard.chunk.js dynamically via async request when the component is needed.

#### Lazy Loading Images or Assets

Not just components, you can lazy-load images too:

```js
class LazyImage extends React.Component {
   state = { loaded: false};

   componentDidMount(){
      const img = new Image();
      img.src = this.props.src;
      img.onload = () => this.setState({ loaded: true});
   }

   render (){
      return this.state.loaded ? 
      <img {...this.props}>
      :<div style={{height: 200, background: "#eee"}}>Loading image..</div>
   }
}
```

Helps performance in image-heavy apps.

#### Common Mistakes

| Mistake                            | Problem                                                                       |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| Forgetting `<Suspense>`            | React throws an error (“lazy component used without Suspense”)                |
| Lazy-loading everything            | Too many network requests, slower overall                                     |
| Using lazy components inside loops | Creates multiple requests per iteration                                       |
| Server-side rendering              | `React.lazy` doesn’t support SSR directly (use `Loadable Components` instead) |
| Forgetting error boundaries        | If a lazy import fails, it can break the app — wrap in error boundaries       |

#### Best Practice

- Lazy-load **routes** and rarely used features (admin panels, charts, modals, settings).
- Don’t lazy-load critical UI (headers, navbars, main layout).
- Always use `<Suspense>` with a meaningful fallback.
- Preload strategic components (hover, intersection observer, etc.)
- Monitor your network tab, ensure chunks are loaded on demand.

### 5. Avoiding Unnecessary  Re-renders

You Have already seen how React re-renders and how to optimize pieces using

- PureComponent
- shouldComponentUpdate
- Memoization
- Lazy Loading

Now we'll go end-to-end on strategies to prevent React from doing work it doesn't need to.

#### Why React Re-renders?

React re-renders a component whenever

1. State changes (via setState())
2. Its props changes (from parent)
3. The Parent re-renders, even if props are same (unless prevented)
4. A context value changes (for consumers).
5. A forcedUpdate() call is made manually.

But Remember

- Re-render != DOM Update
- React will diff virtual DOM element first, so the real DOM may not change if the output is same.
- Still, skipping unnecessary re-renders saves CPU and memory.

#### Core Optimization Tools Recap

| Tool                      | Stops re-renders when                         | Typical use                         |
| ------------------------- | --------------------------------------------- | ----------------------------------- |
| `React.PureComponent`     | Props/state are shallowly equal               | Simple props/state                  |
| `shouldComponentUpdate()` | Custom comparison logic                       | Deep or selective control           |
| Memoization               | Derived data/expensive calculations unchanged | Filtering, sorting, computed values |
| `React.lazy` + Suspense   | Component not rendered yet                    | Route-level or heavy UI             |
| State lifting/placement   | State lives closer to where it’s needed       | Prevents child re-renders           |


#### Strategy 1:  \=