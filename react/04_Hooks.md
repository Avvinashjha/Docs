# 2. Hooks (Core React APIs)

- [x] What is Hooks?
- [x] useState
- [x] useEffect (dependencies, cleanup, avoiding infinite loops)
- [x] useContext
- [x] useReducer
- [x] useCallback
- [x] useMemo
- [x] useRef
- [ ] useLayoutEffect
- [ ] Custom hooks:
  - [ ] Reusable logic
  - [ ] Rules of hooks
- [ ] Generics and Generic Hooks


## A. What Are  Hooks?

Hooks are special function that let you "hook into" React feature like state, lifecycle, and context, without writing class components.

Introduces in React 16.8, Hooks solve two major problem

- State sharing between components (No more HOCs or render props).
- Complexity in class lifecycle management, cleaner logic separation.

## B. `useState`Hook

### 1. Conceptual Model

`useState` allows a functional component to persist values across renders and trigger re-render when that value changes.

Under the hood, it ties a value to the fiber node representing that component.

- Every component instance has fiber.
- Each hook call (like `useState`) registers a hook node in a linked list attached to that fiber.
- On Each render, React walks this first in the same order as hooks calls.

### 2. Internal Mechanism (How React Track State?)

React maintain a linked list of hooks for each fiber:

```ts
type Hook = {
  memoizedState: any, // current state value
  baseState: any, // base state before updates
  baseQueue: UpdateQueue<any> | null, 
  queue: UpdateQueue<any> | null,
  next: Hook | null
}
```

Each hook is created and linked during first render.

Subsequent renders traverse this list in exactly same order.

React relies on **call order consistency**, hence the Rules of Hooks.

```ts
type Update<S> = {
  action: (prevState: S) => S | S,
  next: Update<S> | null
}
```

When you call `setState`, React:

- Creates an `Update` object
- Adds it to the hook's queue.
- Schedules a re-render via the React scheduler.

During the next render, React:

- Walks through each `Update` in order
- Applies them sequentially (`reduce` style)
- Stores the new `memoizedState`

### 3. Usages & Pattern

Basic Usage:

```tsx
const [count, setCount] = useState(0);
setCount(c => c + 1)
```

Functional updates (`c => c + 1`) are crucial because they ensures correctness even when multiple updates are batched.

#### Lazy Initialization

```tsx
const [expensive, setExpensive] = useState(()=> computeExpensive());
```

The initializer function runs only on the first render.

### 4. Edge Cases and Pitfalls

- **Hooks order mismatch**, can cause Rendered fewer hooks than expected.
- **Setting state during render**, triggers infinite loop.
- **Stale closures**, state update depends on values captured in render.
  - Use functional updates or `useEffect` dependencies property.
- **Batching behavior**, multiple `setState`s in the same event are batched even across different components.

### 5. How You'd Write Simplified `useState`

Let's simulate it (simplified without fiber)

```js
let hookStates = [];
let hookIndex = 0;

function useState(initial){
  const currentIndex = hookIndex;
  hookStates[currentIndex] = hookStates[currentIndex] | initial;

  function setState(newValue){
    const value = typeof newValue === "function" 
    ? newValue(hookStates[currentIndex]) 
    : newValue;
    hookStates[currentIndex] = val;
    render(); // re render the component
  }
  hookIndex++;
  return [hookStates[currentIndex], setState];
}

function render(){
  hookIndex = 0;
  App(); // Pretend app is our component 
}
```

## C. `useEffect` Hook

`useEffect` is one of the richest and most subtle hooks in React.

### 1. Conceptual model - What problem useEffect solves?

`useEffect` lets function components run **side effect** after React has finished rendering and painting to the screen.

Side Effect = Anything that interacts with the outside world to mutates something outside the render: Data fetching, subscriptions, timers, eventListeners, DOM read/writes, logging, starting animation/stopping them and so on.

Kay Idea:

- **Separation of Concerns**: Keep rendering pure (compute JSX from props/state) and move impure operations to effect.
- **Declarative lifecycle**: describe what should happen after render, React runs and manages timing/cleanup.
- **Dependency-Driven**: an effect declares the value it depends on, React re-runs the effect when those values changes.

Simple Shape:

```js
useEffect(()=>{
  //Side effect
  return () => {/*clean up*/}
}, [dep1, dep2])
```

### 2. Lifecycle and Timing, when effects run (the observable behavior)

There are three phase to understand for each render commit:

1. **Render (pure)** - React calls your component functions. No effects run here.
2. **Commit Phase** - DOM Updates are applied.
   - **Layout effects**(useLayoutEffect) run synchronously after DOM mutation but before the browser paints.
   - **Painting** - Browser paints the Updated DOM.
   - **Passive effects** (useEffect) runs after painting and after the browser has had a chance to paint (they are asynchronous relative to paint)
3. **Effect cleanup timing**
   - When dependencies changes (or component unmounts), the cleanup of the previous effect runs before executing the new effect for that same component.
   - On Unmount, cleanup runs during commit/unmount stage.

Order Across components:

- Layout effects run in top-to-bottom (parent then child) order consistent with commit order (layout has strict ordering so DOM reads/writes are safe).
- Passive effects run after paint and the ordering among component is deterministic (generally same order as commit)

Important observation rules:

- `useEffect` callback are called after paint so they won't block painting.
- `useLayoutEffect` blocks paint until it finishes (so synchronous DOM reads/writes are safe).
- `useEffect` cleanup runs prior to next effect call and on unmount.
- React (concurrent Mode / React 18+) may delay passive effects more aggressively, layout effects still run synchronously in commit.

### 3. Internal Mechanics (How React implement useEffect in Fiber?)

React's implementation is complex, here we will discuss the simplified mental model:

- Each component Fiber stores a linked list of hook object in `fiber.memoizedState`. Each hook has field like `memoizedState` and for effect there is an `effect` object.
- When you call useEffect during render, React:
  - Allocates and reuse a hook object in the fiber's hook list.
  - Stores the effect callback, cleanup, dependency array in that hook.
  - Marks the fiber with an effect tag indicating there are passive effects to run (e.g. `Passive` / `HasEffect` flags).

- After commit, React collects the passive effects from the committed fiber into a global effect list(queue) and schedules them to run after paint. The scheduler runs them synchronously (in a task scheduled after the commit).

- Effect cleanup and re-run:
  - For an update, before adding the new callback to the queue, React will compare dependency array using `Object.js` equality on each dependency.
  - If dependencies changed (or no deps provided), it will schedule the new effect, else it skips running it.
  - If an effect is schedule to re-run, React will first call the stored cleanup function (if any) from the previous effects, then call the new effects.

- Effect tags:
  - Layout-effects use a different flag (e.g. Layout or Update effect) and are executed synchronously in the commit phase before paint.
  - Passive effects are scheduled asynchronously after paint (so they don't block).

Other internal Point:

- React ensures cleanup runs before the next effect runs for that component (preventing duplicate listeners, etc.).
- In development Strict mode (React 18+), React may mount, unmount, and remount components intentionally to help detect side-effect bugs, that causes effect and cleanups to run twice in development for mount -

### 4. Usages and Pattern

#### Basic Pattern

- Run on every render
  
  ```js
  useEffect(()=>{
    doSomethingEveryRender();
  }) // No dependency means runs after each render
  ```

- Runs once (on mount), and cleanup on unmount

  ```js
  useEffect(() => {
    const sub = subscribe();
    return ()=> sub.unsubscribe();
  }, []) // -> empty deps -> runs on mount/unmount
  ```

- Runs when specific values changes:

  ```js
  useEffect(()=>{
    fetchData(userId);
  }, [userId]); // -> Runs when userId changes
  ```

#### Pattern For specific cases

- **Data Fetching with cancellation**

  ```js
  useEffect(()=>{
    let cancelled = false;

    async function load(){
      const res = await fetch(`users/${id}`);
      if(!cancelled) setData(await res.json());
    }
    load();
    return () => {cancelled: true};
  }, [id])
  ```

  - Better use `abortController` for real cancellation.

- **Subscription and event listener**

  ```js
  useEffect(() => {
    const onResize = () => setSize({w:window.innerWidth, h:window.innerHeight});
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []); // [] ensures install once
  ```

- **Timers**

  ```js
  useEffect(()=> {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return ()=> cleanInterval(id);
  }, []) // use functional update if depending on stale state
  ```

- **Avoiding stale closures**
  
  In ean effect uses state or props that update, either include them in deps ot use refs/functional updates.

  ```js
  const latestValueRef = useRef(value);
  useEffect(()=>{
    latestValueRes.current = value
  }, [value])

  useEffect(()=>{
    const id = setInterval(()=>{
      doSomething(latestValueRef.current);
    }, 1000);
    return ()=> clearInterval(id);
  }, []) // stable interval but read latest value via ref
  ```

- **Splitting effects by concern**
  
  Prefer multiple small `useEffect`s instead of one big one handling unrelated concerns.
  Each useEffect is independent, this improves reasoning and avoids unnecessary runs.

- **Effect ordering**
  
  Effect are executed in the order they are declared inside the component function.

- **`useEffect` + async/await**

  You can not make the effect function itself `async`  because it must return cleanup or nothing (**not a Promise**). use an inner async function.

  ```js
  useEffect(()=>{
    let cancelled = false;
    (async () => {
      const res = await fetch(url);
      if(!cancelled) setData(res.json());
    })();
    return () => {cancelled: true;}
  }, [url])
  ```

### 5. Edge Cases

#### 1. Infinite loops from state updates inside effects

**Causes**: effect updates a state value that is in the effect's dependency array, causing re-render -> effect runs -> update state -> re-render -> loop

**Fixes**:

- Only update state when necessary (guard state update with if condition)
- Use function updates or compare previous state before setting.
- Narrow deps to only stable values you actually depends on.

Example Fix;

```js
useEffect(()=>{
  if(someValue != computedFrom(someOtherValue)){
    setSomeValue(computedFromOtherValue);
  }
}. [someOtherValue]); // Guard avoid loops
```

#### 2. Stale Closure

Cause: the effect captures old values, and because you didn't list them in deps (or used empty deps), it operates on stale data.

Fixes:

- Add values to deps array
- Use useRef to store latest value that an effect can read.
- Use Functional state updater `setState(perv => prev + 1)`

#### 3. Missing dependencies (an linters)

Cause: Forgetting to include dependencies, leading to bugs.

Fix:

- Trust ESLint `react-hooks/exhaustive-deps`. when it suggests adding something, prefer adding it or explain why you are not by using explanatory comment:

```js
//eslint-disable-next-line react-hooks/exhaustive-deps
```

#### 4. Running heavy work in `useEffect`

- useEffect runs after paint, heavy CPU work here can still make page janky.
- For heavy computation, offload to Web Worker or do incremental work, or run outside React.

#### 5. Race Condition with async effects and unmounting

Cause: an asynchronous operation completes after unmount and tries to call `setState`.

Fixes:

- Use an AbortController for fetch or a cancelled flag/ref to skip updates when unmounted.
- Do cleanup to cancel subscription/ promises where possible.

#### 6. Strict Mode double mounts in dev (React 18+)

React intentionally mounts, unmounts, and remounts components in development Strict Mode to reveal side-effect bugs. This means effects may run twice on mount in dev. Ensure your effect code can handle mount/unmount sequences idempotently.

#### Dependencies equality semantics

React uses `Object.is` for dependency comparison. That means:

- Primitive values compare by value.
- Objects/arrays/functions compare by reference identity; passing inline objects/arrays/functions will cause effects to re-run each render.

Fix: memoize values with `useMemo`/`useCallback` when you intend stable references.

### 6. useEffect vs useLayoutEffect (quick comparison)

- `useLayoutEffect` runs synchronously after DOM mutations but before paint. Use it when you need to read layout from the DOM (e.g., measure DOM nodes) and then synchronously apply mutations before paint to avoid flicker.

- `useEffect` runs after the browser paints — safe for logging, network requests, subscriptions, and anything that can wait.

- Prefer `useEffect` by default; only use useLayoutEffect if you must measure DOM layout and synchronously update before paint.

- In SSR (server-side rendering), `useLayoutEffect` warns because it runs only on the client.

### 7. Common performance issues and how to address them

- **Unnecessary re-runs**: caused by non-stable deps (inline functions/objects). Use `useCallback`/`useMemo` where appropriate.

- **Too many effects**: split logically but avoid costly shared work across multiple effects — sometimes consolidating saves work.

- **Heavy work inside effects**: move heavy CPU work to Web Workers or do `throttling`/`debouncing`.

- **Memory leaks**: forgetting to cleanup event listeners, timers, subscriptions. Always return cleanup from effect.

- **Frequent state updates inside effect**: batch updates or reduce frequency (`throttle`/`debounce`).

### 8. useEffect re-implementation

Here is a small conceptual JavaScript re-implementation to illustrate the core mechanics. This is not React code, but a mental model code.

```js
// PSEUDO-RENDERER: simplified per-component state
function createComponent(){
  let hooks = [];
  let currentHook = 0;
  let mounted = false;

  function useEffect(callback, deps){
    const hookIndex = currentHook++;
    const prev = hook[hookIndex];

    const hasChanged = !prev || !deps || !arrayEqual(prev.deps, deps);

    if(!prev){
      // On initial render we store placeholder, effect to run after commit
      hooks[hookIndex] = {deps, callback, cleanup: undefined, hasChanged }
    }else{
      hooks[hookIndex] = { deps, callback, cleanup: prev.cleanup, hasChanged}
    }
  }

  // call during commit phase (after DOM update), runs passive effects
  async function runPassiveEffects(){
    // Run cleanup before running new effect if it has changed
    for(const h of hooks){
      if(h.hasChanged && type of h.cleanup === "function"){
        try{ h.cleanup();}catch(e){console.log(e);}
      }
    }

    // Run new effects
    for(const h of hooks){
      if(h.hasChanged){
        const cleanupOrVoid = h.callback();
        if(typeof cleanupOrVoid === "function") h.cleanup = cleanupOrVoid;
        else h.cleanup = undefined;
        h.hasChanged = false;
      }
    }
  }

  // Example mount/ unmount flow 
  return {
    render(){
      currentHook = 0;
      // call component function which calls useEffect as needed
      //..
      if(!mounted){
        mounted = true;
        //schedule run passive effect after paint time slice
        setTimeOut(runPassiveEffects, o);
      }else{
        setTimeout(runPassiveEffect, 0);
      }
    },
    unMount(){
      // call all cleanups
      for(const h of hooks){
        if(typeof h.cleanup === "function") h.cleanup();
      }
      mounted = false;
    }
  }
}

function arraysEqual(a, b) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}
```

This pseudo-implementation highlights:

- Hooks stored per-component in a list.
- Dependency comparison via Object.is.
- Scheduling of passive effects after commit (here simulated with setTimeout).
- Cleanup invocation occurs before running the new effect.

React’s real implementation uses Fiber nodes, effect lists/queues, and the scheduler to run passive effects after commit and paint. But this model is useful mentally.

### 9. Compact example illustrating many point

```js
function FriendStatus({ friendId }) {
  const [isOnline, setIsOnline] = useState(null);
  const latestFriendId = useRef(friendId);

  useEffect(() => {
    latestFriendId.current = friendId;
  }, [friendId]);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function getStatus() {
      try {
        const resp = await fetch(`/status/${friendId}`, { signal: controller.signal });
        const { online } = await resp.json();
        if (!mounted) return;
        setIsOnline(online);
      } catch (err) {
        if (err.name === 'AbortError') return; // expected
        console.error(err);
      }
    }

    getStatus();

    const onMessage = (e) => {
      // use ref to get latest friendId if necessary
      if (someCheck(e, latestFriendId.current)) setIsOnline(e.data.online);
    };
    SomeSocket.subscribe(onMessage);

    return () => {
      mounted = false;
      controller.abort(); // cancel fetch
      SomeSocket.unsubscribe(onMessage);
    };
  }, [friendId]); // re-run when friendId changes

  return <div>{isOnline == null ? "Loading..." : (isOnline ? "Online" : "Offline")}</div>;
}
```

This shows cancellation, ref to avoid stale closures, cleanup of socket and fetch, and proper deps.

### 10. Advanced notes (Concurrent Mode & scheduler)

- In concurrent rendering, React may interrupt renders and attempt to reuse work. Passive effects are guaranteed to run only after commit; they may be delayed further to prioritize responsiveness.

- React can batch multiple state updates and schedule passive effects in a single commit’s post-phase.

- Because effects are not used for rendering, they are safe to be delayed.

## D. useContext - Deep Dive

### 1. Conceptual Model - What problem it solves?

#### The Problem

Before React context, props drilling was a big issue.

When data (like theme, locale, auth) needed to be accessed deeply in the component tree, it had to be passed through many intermediate components that didn't use it.

#### Solution

useContext allows components to subscribe to a context value directly, bypassing intermediate props.

It gives dependency injection at the component level, data can flow down the tree without explicit prop passing.

```js
const ThemeContext = React.createContext('light');

function App(){
  return (
    <ThemeContext.Provider value='dark'>
      <Toolbar/>
    <ThemeContext.Provider>
  );
}

function Toolbar(){
  return <ThemeButton/>
}

function ThemeButton(){
  const theme = useContext(ThemeContext);
  return <button className={theme}> Theme: {theme</button>}
}
```

- Here, `ThemeButton` reads directly from the nearest `ThemeContext.Provider` without props drilling.

### 2. Internal Mechanics - How React implements Context in Fiber

#### The Data Structures

Each React.createContext(defaultValue) creates a Context object:

```js
$$typeof: REACT_CONTEXT_TYPE,
_currentValue: defaultValue,
Provider: { $$typeof: REACT_PROVIDER_TYPE, _context: ...}
Consumer: {...}
```

Each Provider fiber keeps track of the value it provides (fiber.memoizedProps.value) and links to the corresponding. Context object.

#### During Render phase

When a component calls useContext(Context):

1. React look up the current context value using the nearest Provider above it in the Fiber tree.
2. It establishes a dependency link between this fiber and that Provider's value, so that if the Provider's value changes, React knows to re render this consumers.
3. The hook itself doesn't cause re-renders, updates propagate via context's internal subscription mechanism.

#### During commit phase

When a Provider's value changes (by prop updates):

- React traverse all consumers that read from the context and mark them for re-render.
- Context propagation is optimize to avoid re-rendering the whole subtree if values haven't changed.

#### Dependency tracking

React tracks which fiber depends on which contexts:

- Each context keeps a list of fibers subscribed to it.
- On value change, React compares new and old context values using Object.is (same as useEffect deps).
- Only consumers whose observed context value changed are scheduled for an update.

#### Context vs State

- useState stores local component state.
- Context is global (per Provider), shared across all components in its subtree.
- Updating context value re-renders all consumers of that context (unless optimized)

### 3. Usages and Pattern

#### basic Usages

```js
const UserContext = createContext(null);

function UserProvider({children}){
  const [user, setUser] = useState(null);
  return {
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  }
}

function Profile(){
  const {user} = useContext(UserContext);
  return <div>{user ? user.name: "Guest"}</div>;
}
```

#### Pattern 1: Context Composition

Multiple contexts can coexist:

```js
const ThemeContext = createContext();
const LocaleContext = createContext();

function App(){
  return (
    <ThemeContext.Provider value="dark">
      <LocaleContext.Provider value="en">
        <Page/>
      <LocaleContext.provide>
    </ThemeContext.Provider>
  )
}

function Page(){
  const theme = useContext(ThemeContext);
  const locale = useContext(LocaleContext);
  ....
}
```

#### Pattern 2: Scoped or Slice context

Large apps often have many contexts.

You can isolate by scoping them:

```js
const UserSettingContext = createContext();

function SettingProvider({settings, children}){
  const value = useMemo(() => ({settings}), [settings]);
  return (
    <UserSettingContext.Provider value={value}>
      {children}
    </UserSettingContext.Provider>
  )
}
```

The useMemo ensures that Provider's value object identity is stable unless settings changes, avoiding unnecessary re-renders.

#### Pattern 3: Context with Reducer

Combine useReducer + context for global state management:

```js
const AppStateContext = createContext();
const AppDispatchContext = createContext();

function AppProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatch.Provider value={dispatch}>
        {children}
      <AppDispatch.Provider/>
    </AppStateContext.Provider>
  )
}

function useAppState(){
  return useContext(AppStateContext);
}

function useAppDispatch(){
  return useContext(AppDispatchContext);
}
```

This is the basic of "Context + Reducer" global stores.

#### Pattern 4: Dynamic Context value with Memoization

If you context provides an object or function, always memoize the value:

```js
const AuthContext = useContext();

function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const login = (u) => setUser(u);

  const value = useMemo(()=> ({user, login}), [user]);

  return <AuthContext.Provider>{children}</AuthContext.Provider>
}
```

Without `useMemo`, the value object changes on every render -> all consumer re-renders even if user didn't change.

### 4. Edge Cases & Pitfalls

#### 1. Unnecessary re-renders

- Every time the Provider's value changes identity, all consumers re-render.
- Avoid inline object/function, use `useMemo` or `useCallback`.

Bad:

```js
<ThemeContext.Provider value={{dark: true}}>...</ThemeContext.Provider>
```

Good:

```js
const theme = useMemo(() => ({ dark: true }), []);
<ThemeContext.Provider value={theme}>...</ThemeContext.Provider>
```

#### 2. Deeply nested Providers

Too many nested contexts can reduce readability and increase render cost.

- Consider a context composition helper.
- Of flatten providers using custom hooks that combine multiple contexts.

#### 3. Frequent context updates

If Provider's value changes often (e.g. animation frame, mouse move), all consumers re-render.

Mitigations:

- Split context into smaller slices (e.g. separate Theme and User).
- Move fast-changing state local or use `useSyncExternalStore`.

#### 4. Using context outside provider

If a component call useContext but no matching provider is found above, React return a defaultValue passed to createContext.

#### 5. Circular dependencies

Context value depending on other contexts can cause timing issues.

Always derive new context values from stable state, not from reading another context during Provider render.

#### 6. Static vs Dynamic values

if a context rarely changes, memoizing the Provider's value ensures it doesn't cause cascading renders.

#### 5. How to do a custom Implementation for metal model

```js
// Simplified context system
function createContext(defaultValue){
  const context = value: defaultValue, subscribers: new Set()};

  function Provider({ value, children }){
    context,.value = value;
    // notify subscribers on value change
    for (const callback of context.subscribers) callback();
    return children;
  }

  function useContext(){
    const [state, setState] = React.useState(context.value);
    React.useEffect(()=>{
      const update = () => setState(context.value);
      context.subscribers.add(update);
      return ()=> context.subscribers.delete(update);
    },[]);
    return state;
  }
  return {Provider, useContext};
}
```

This pseudo-code shows:

- Each context has a current value and a list of subscribers.
- Consumers subscribe during mount and update when the value changes.
- Providers notify subscribers when value changes.
- Real React does this via Fiber links and scheduling, not explicit event subscription.

### 6. Performance Notes

- Context updates are efficient but global, any consumer that depends on the context will re-render.
- Avoid putting high-frequency state (like mouse position) in context.
- For Performance-sensitive shared state, use:
  - useSyncExternalStore
  - Redux/Zustand/Recoil/Jotai
  - Context selectors (via external libs like use-context-selector)

### 7. Debugging Tips

- Use React DevTools -> Components tab and look at Provides and values.
- Check re-render counts of context consumers when debugging performance.
- Ensure value props in Providers are memoized of object/function.

### 8. Summary

| Aspect                | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| Purpose               | Share data down the tree without props drilling                  |
| Trigger               | Provider value change                                            |
| Comparison            | Uses `Object.is` to compare old/new value                        |
| Effect                | Re-renders all consumers whose context changed                   |
| Optimization          | Use `useMemo`/`useCallback` to stabilize provider values         |
| Common Pitfall        | Inline objects/functions in Provider value                       |
| React Fiber Mechanism | Links consumers to nearest Provider; updates via dependency list |
| Works with            | All hooks, including `useReducer`, `useMemo`, etc.               |

### 9. Context in Concurrent React

In React 18+ concurrent rendering:

- Context reads during render are consistent with the render snapshot.
- React maintains separate copies of context values per render “lane”.
- Updates to Providers are propagated to consumers only when committed (no tearing).
- For truly external shared stores, use useSyncExternalStore instead of context.

## E. `useReduce` Hook

### 1. Conceptual model — what problem `useReducer` solves?

- `useReducer` models state as a pure reducer function `reducer(state, action) -> new state`
- It's ideal when state is complex, state transition  depend on previous state, or many related updates exist.
- Compared with useState:
  - `useState` is fine for simple independent values.
  - `useReducer` centralizes state transition logic and makes updates traceable and testable.
- Common uses: complex forms, state machines, undo/redo optimistic updates, local stores combined with `Context`.

### 2. Usage & patterns

#### Basic usage

```js
const initialState = { count: 0 }

function reducer(state, action){
  switch(action.type){
    case 'increment':
      return {...state, count: state.count + 1 };
    case 'decrement':
      return {...state, count: state.count - 1 };
    default:
      throw new Error('Unknown action');
  }
}

function Counter(){
  const[state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div>{state.count}</div>
      <button onClick={()=> dispatch({ type: 'increment'})}>+</button>
    </>
  )
}
```

#### lazy initialization

If initial state computation is expensive, use lazy initializer:

- You can pas third pram in useReducer and that will only run on mount.

```js
const initialArg = { seed: 42 };
function init(arg){
  return { count: arg.seed };
}

const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- `init` only runs on mount.

#### Action payload & discriminated unions (TypeScript)

Prefer action object with type and payload:

```ts
type Action =
  | { type: 'add'; payload: number }
  | { type: 'reset' };

function reducer(state: State, action: Action): State { ... }
```

#### Reducer composition

Split big reducer into smaller ones:

```js
function rootReducer(state, action){
  return {
    user: useReducer(state.user, action),
    items: itemsReducer(state.items, action)
  };
}
```

#### Local reducer + Context for global-ish stores

useReducer + Context to create a simple local stores:

```js
const MyContext = createContext(null);

function Provider({children}){
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return <MyContext.Provider value={{state, dispatch}}>{children}</MyContext.Provider>;
}
```

#### Side effects and dispatch

Reducers must be pure, side effects must live in effects (e.g. useEffect) or middleware-like layers (custom hooks). Dispatch from effects or UI handlers.

#### Using `useReducer` with `useCallback` / `useMemo`

If you pass dispatch into memoized callbacks, it;s stable (React ensures same dispatch identity across renders). But be careful with dependencies for callbacks that use state, prefer deriving values from state in the reducer rather than capturing stale state.

#### Performance pattern

- Use lazy init to avoid repeated heavy initializations.
- Use action object instead of many small callbacks to reduce re-renders for inline handler changes.
- Use useReducer when many related state updates must be commited together to avoid multiple setState calls.

#### Optimistic updates & undo/redo

- Keep a history in the reducer: `{ past: [...], present: obj, future: [...]}`.
- Dispatch `UNDO`/`REDO` action to manipulate history.

#### Middleware-like behavior

- You can wrap dispatch to intercept actions:

```js
function useLoggingReducer(reducer, initState){
  const [state, baseDispatch] = useReducer(reducer, initState);
  const dispatch = useCallback((action)=> {
    console.log('action', action);
    baseDispatch(action);
  }, [baseDispatch]);
  return [state, dispatch];
}
```

But avoid breaking dispatch identity expectations if you pass it to dependencies: baseDispatch stable but wrapper re-creates unless memoized.

### 3. Internal mechanics — how React implements useReducer in the Fiber tree?

#### Where state lives

- Hooks state (including `useReducer`) is stored in the component's Fiber as a linked list of hooks objects. Each hook node holds:
  - memoizedState (current state)
  - queue (update queue)
  - baseState, baseQueue (for concurrent rendering)
  - a reference to the reducer function for useReducer (conceptually).

#### Dispatch

- dispatch(action) creates an Update object (with action, lane priority info, timestamp) and enqueues it in the fiber's hook queue.
- React schedules a re-render of that fiber (with a lane/priority). In concurrent mode lanes determine when the update runs relative to other work.

#### During render

- On render, React replays pending updates in the queue to compute the new memoizedState by calling the reducer repeatedly for each enqueued update (or in a batched manner) to arrive at the final state for this render.
- If dispatch happens during render (rare, discouraged), the updates gets enqueued and may cause another re-render depending on the timing, but React warns about dispatch-in-render causing infinite loop.

#### Bailing out/ skipping updates

- If the state computed equals the previous state (===), React may bail out of subtree updates depending on memoization (e.g. React.memo) and render optimizations.

#### Concurrent-mode specifics

- React Keep multiple versions of the queued updates to support interruptible renders:
  - When an update is scheduled but work is interrupted, react preserves the update queue and may later reapply updates when continuing work.
  - baseState/baseQueue help track which updates were applied in which render.

#### Commit phase

- After render calculates the element tree, React commits DOM changes and runs effects, first useLayoutEffect (synchronous commit phase) then useEffect (async, after painting).

### 4. Lifecycle and Render phase for `useReducer`

Think in three phases:

1. Mount (initial render)

   - hook object  is created, memoizedState set to initialState ( or init(initialArg) if lazy).

2. Dispatch & Re-render (update render phase)

   - dispatch enqueues updates, schedules fiber for re render.
   - During the render of that fiber, queue updates are replayed using the reducer, memoizedState becomes the state calculated after re applying updates.
   - If the render completes and commit happens, state is commited to the fiber's memoizedState.

3. Commit Phase

   - DOM updates applied, useLayoutEffect runs synchronously, useEffect runs after paint.

4. Subsequent dispatch -> repeat step 2 -> 3

### 5. Edge cases and Common pitfalls

#### 1. Mutating state inside reducer

Problem: Mutating state directly  (e.g. `state.items.push(...)`) breaks pure reducer semantics and can lead to stale refs, missed updates, or incorrect === checks.

Solution: Always return a new object (immutability). use immer of immutability is cumbersome.

#### 2. Non-pure reducers (side effects inside reducer)

Reducers must be pure, performing side effects (fetching, I/O, localStorage writes) inside reducer will break React's Model and make it un predictable. Move side effect into useEffect, or use middleware-like pattern (custom hooks that wraps dispatch and runs side effects).

#### 3. Dispatch in render -> Infinite loop

If you dispatch an action during render (not an effect or event), you risk infinite loops. React will warn: “Cannot update a component while rendering a different component.” Avoid dispatching in render; move to useEffect or event handler.

#### 4. Stale closures & derived state in effects

If you compute derived values outside the reducer and then use them in the effect, you might capture stale values. Prefer to derive inside the reducer or include correct dependencies in effects.

#### 5. Overusing useReducer when useState is simpler

useReducer adds boilerplate; if state is just a few independent primitives, useState might be simpler.

#### 6. Too many actions causing cognitive overload

Design action types with clear responsibilities. Use action creators and TypeScript discriminated unions to avoid mistakes.

#### 7. Performance: expensive reducer computations

If reducer work is heavy, you can:

- Use web workers.
- Break work into chunks.
- Memoize derived computations outside the reducer; but avoid caching inside reducer unless pure and deterministic.

#### 8. Identity changes when wrapping dispatch

Wrapping dispatch (e.g., to log) can change identity and break useEffect deps or children reliant on dispatch identity. Memoize wrapper with useCallback and keep base dispatch stable.

#### 9. Mixing useReducer and external state updates

When external events update state (e.g., socket messages), dispatch actions from their handlers so updates flow through reducer; avoid direct mutation.

### 5. How to re-implement (mental model)

Below is a conceptual re-implementation (not production React, but clear mental model) that shows how useReducer and dispatch could be implemented inside a simple reconciler.

```js
// Simple mental model
function createComponentInstance(reducer, initialArg, init) {
  const hook = {
    memoizedState: init ? init(initialArg) : initialArg,
    queue: [], // pending actions
  };

  function dispatch(action) {
    // enqueue update
    hook.queue.push(action);
    scheduleRender(); // schedule this component to re-render
  }

  function render() {
    // replay queued actions
    let state = hook.memoizedState;
    if (hook.queue.length > 0) {
      for (const action of hook.queue) {
        state = reducer(state, action);
      }
      // commit: clear queue and update memoized state
      hook.queue = [];
      hook.memoizedState = state;
    }
    // return UI derived from state
    return renderUI(state);
  }

  return { dispatch, render, getState: () => hook.memoizedState };
}
```

Key points this model shows:

- dispatch enqueues work, does not immediately mutate memoizedState.

- State is computed by replaying queued actions during render.

- Lazy init is applied only once on mount (via init).

- Real React adds lanes, priorities, and handles interruption; it keeps multiple queues for concurrent renders and preserves updates across preempted renders.

## F. `useCallback` Hook

### 1. Conceptual model, what problem useCallback solves?

Problem: In React, functions are re-created on every render (because they're values created inside the component function). That means:

- Passing a freshly created function to memoized child (React.memo or PreComponent) will cause the child to think its props changed, triggering re-render.

- Passing function into dependency array (e.g. useEffect) as dependencies can cause that child to think props changed, triggering re-render.
- Frequent recreation of callbacks can also increase GC churn or break referential-equality-based optimization.

`useCallback (fn, [deps])` goal: return a stable function reference across renders as long as deps don't change. It's a convenience wrapper: `useCallback(fn, [deps])` is equivalent to `useMemo(()=> fn, deps)` conceptually. It avoids unnecessary child re-renders of effect re-triggers when the function's identity is all that matters.

Important nuance: useCallback does not freeze the closure variable inside the function. If the function closes over local state, it will capture the values from the render when it was created. If you keep the identity stable while state changes, you can get stale closures, a major pitfall.

### 2. Internal mechanics — how React implements it?

React stores hooks on each Fiber in a linked list/array of hook records. Each hook record holds a memoizedState and internal data:

- `useCallback` is implemented similarly to `useMemo` under the hood: it stores the memoized callback value and the dependencies array in the hook record (often called `memoizedState`).
- On each render:
  - The hook index is advanced (React relies on stable hook call order).
  - React reads the previous hook record's stored deps.
  - It runs a shallow equality comparison on dependencies using Object.is (React uses an internal areHookInputsEqual that does Object.is per element). If deps are equal to previous deps, it returns the old memoizedState (the old function object). If not equal, it stores the newly created function as memoizedState.
- So identity stability is implemented by returning the previously stored function instance when deps compare equal.

**Concurrency/StrictMode**: concurrent rendering may re-run renders; React ensures correctness by making the comparison and scheduling updates deterministically. But in Concurrent Mode, effects and commits can be deferred, so don't depend on side effects inside the callback creation.

**Important to remember**: useCallback only affects the function identity (the value returned). It doesn't change when the function is invoked or what closure values it has — those are determined at the render when the function object was created.

### 3. Usage & Patterns

#### Basic Usage

```js
const MyComponent = ({ onClickParent }) => {
  const [count, setCount] = useState(0);

  // stableIdentity increments only when setCount changes (it never changes)
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // safe: uses functional update, so no `count` dependency

  return <button onClick={increment}>+{count}</button>;
};
```

#### Prefer functional updates to avoid depending on state

If callback needs to update state, prefer `setStat(prev => ...)` inside the callback. That often allows [] deps on useCallback and avoids stale closure problems.

#### Use useCallback for stable props to memoized children

```js
const Parent = () => {
  const [value, setValue] = useState(0);
  const handle = useCallback(()=>{
    console.log("clicked");
  }, []) // stable identity
  return <Child onAction={handle} value={value}>
}

const Child = React.memo(({onAction, value}) => {
  // child will not render if only onAction remained stable and other props unchanged.
})
```

#### Callback ref pattern to avoid stale closure while preserving identity

Sometimes you want stable identity, but the implementation should use latest state. You can store the latest implementation in a ref and return a stable wrapper.

```js
function useEventCallback(fn){
  const fnRef = useRef(fn);
  fnRef.current = fn; // update on each render

  return useCallback((...args) => {
    return fnRef.current(...args);
  },[]) // stable identity forever
}
```

This is the pattern behind many lib's `useEvent` or `useLatestCallback`.

#### Don;t wrap everything, cost / benefit

`useCallback` has a small runtime cost (deps compare, allocation of hook record storage) and increase complexity. For simple local handlers that are not passed to memoized children or used in deps, you can skip it.

#### Avoid using useCallback to stop re-renders caused by heavy children that depend on other props - identify the real cause

If a child still rerenders, check all props — it's often a different prop changing (object/array identities).

### 4. Edge cases and pitfalls

#### 1. Stale closure

If you memoize a function but that function closes over state/props that later change, it will keep the old values unless you re-create the callback when those values are in `deps`.

Bad:

```js
const My = () => {
  const [n, setN] = useState(0);
  const f = useCallback(()=> console.log(n), []); // never updates
  // f will always log 0
}
```

Fixes:

- Include n in deps:
  
  ```js
  useCallback(()=> {
    console.log(n)
  }, [n])
  ```

  - Or use functional ref pattern (useRef) or useEventCallback so identity stays stable but implementation reads latest value.

#### 2. Overuse (micro-optimization)

Wrapping every function in `useCallback` clutters code and isn't free. React’s reconciliation cost can be smaller than the overhead of many memoized callbacks.

**Rule of thumb**: use when you pass callback to memoized children or when you depend on stable identity in `useEffect`.

#### 3. Incorrect dependency arrays

If you omit dependencies required by the callback, you get stale values. If you include objects/arrays created on each render, you defeat the purpose (the callback will be recreated every render). Use memoization for dependencies too (`useMemo`, `useRef`, or derive stable references).

#### 4. Infinite loop with `useEffect`

If you put a callback inside an effect dependency and the callback is re-created each render (because deps are wrong), the effect will re-run every render. Similarly, if the effect updates a state that causes the dependency to change, you can get a render loop.

Example:

```js
useEffect(()=>{
  doSomething(callback);
}, [callback]) // if callback identity keeps changing -> effects runs every render
```

#### 5. Misunderstanding identity vs content

`useCallback` preserves identity, not necessarily behavior. Two different callbacks can do the same thing but have different identities. `useCallback` only stops identity changes.

#### 6. When not needed with `dispatch`

If you get a `dispatch` from `useReducer`, or `setState` from `useState`, they are stable by default—no need to wrap them with `useCallback`.

#### 7. Memory Leak

If your callback closes over something that holds resources (timers, subscriptions) and you keep the callback alive longer than necessary, be mindful of cleanup. Usually cleanup goes in `useEffect`, not in the callback itself.

### 5. How to re-implement `useCallback` (mental model)

Conceptually, useCallback(fn, deps) does:

1. On initial render, store { value: fn, deps } in hook state and return fn.

2. On subsequent renders, React compares deps to previous deps using Object.is for each item.
   - If equal: return previous value (previous function object).
   - If not equal: store new { value: fn, deps } and return new fn.

Let's show a simplified custom hook that mimics useCallback behavior using only `useRef` and `useEffect`. This is not production-grade (React internals do this more efficiently), but it demonstrates the core idea.

```js
import { useRef, useEffect } from 'react';

/**
 * useSimpleCallback: simplified reimplementation of useCallback
 * - uses Object.is semantics for dependency equality
 */
function areDepsEqual(oldDeps, newDeps) {
  if (oldDeps === null || newDeps === null) return false;
  if (oldDeps.length !== newDeps.length) return false;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], newDeps[i])) return false;
  }
  return true;
}

export function useSimpleCallback(fn, deps) {
  const ref = useRef({ deps: null, value: null });
  if (ref.current.value === null) {
    // first render
    ref.current = { deps: deps ? deps.slice() : null, value: fn };
    return fn;
  }
  // compare deps
  if (!areDepsEqual(ref.current.deps, deps)) {
    // deps changed -> update stored function and deps
    ref.current = { deps: deps ? deps.slice() : null, value: fn };
  }
  return ref.current.value;
}
```

### 6. Examples Miss

#### callback used in useEffect dependencies

Problem:

```js
const App = () => {
  const [count, setCount] = useState(0);
  const cb = () => console.log(count);

  useEffect(() => {
    // will run every render if cb is re-created every render
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, [cb]);
};
```

Solution: either memoize cb with [count] in deps or use a stable wrapper + ref so the registered function doesn't change and reads latest count.

#### Expensive child re-renders

```js
const Parent = () => {
  const [x, setX] = useState(0);
  const handler = useCallback(()=> {/*usages nothing from parent */}, []);
  return <ExpensiveChild onAction={handler} other={x}>
}
```

`ExpensiveChild` will only rerender when `other` changes; `onAction` stays stable.

### 7. Summary

- useCallback preserves function identity across renders if deps don’t change, implemented like useMemo.
- It’s useful to avoid unnecessary renders when passing callbacks to memoized children or using them in effect deps.
- Beware stale closures — including the right deps or using the callback-ref pattern solves that.
- Don’t overuse — measure and only optimize when identity stability is necessary.
- Internally, React stores the callback and its deps in the hook record on the Fiber and uses Object.is-based shallow comparison for deps.

## G. useMemo Hook

### 1. Conceptual Model: What problem does useMemo solve?

React re-runs the component function on every render. Therefore:

- Expensive calculations run again unless memoized.
- Object/array identity changes on every render -> breaking referential equality, causing
  - unnecessary renders in memoized children ( `React.memo`)
  - unnecessary effect execution (`useEffect`)
  - unnecessary callback re-creation (`useCallback` depends on deps which might include objects)

solution:**`useMemo(create, deps)` solves**

1. Caches the result of expensive computations.
2. Preserves identity of returned values (objects/arrays/functions) unless deps change.
3. Avoid unnecessary re-renders or effect runs driven by identity changes.

**Important**: `useMemo` **memoizes a value**, **not a function** (though you can memoize a function, `useCallback` is just `useMemo(() => fn, deps)`).

### 2. Internal Mechanics, How React implements `useMemo`?

React’s hooks are stored on each Fiber node in a list of “hook cells.”

Each memo hook stores:

- `memoizedState = { values, deps}`

On Each Render:

1. React advances the hook pointer
2. Compares deps vs previous deps using shallow compared (Object.is).
3. If equal -> return the previous memoized value.
4. If not equal -> executes the create function, stores the result in hook cell, returns it.

Important:

During render, React;s design is purely functional, so useMemo is a safe optimization since the create() call is pure ( must not cause side-effects).

### 3. Usages and Patterns

#### 1. Memoizing expensive computations

```js
const expensive = useMemo(()=>{
  return heavyCalculate(data); // CPU heavy 
}, [data])
```

#### 2. Stable object/array references

Without useMemo, an inline object changes identity each render:

```js
const filters = {sortBy, limit}; // new object every render
```

Fix:

```js
const filters = useMemo(()=> ({sortBy, limit}));
```

Useful when:

- Passing object to memoized children
- Using objects as deps in `useEffect`.

#### 3. Derived state (computed from props/state)

```js
const visibleItems = useMemo(
  () => items.filter(item => item.visible),
  [items]
)
```

#### 4. useMemo + useCallback for stable deps

Avoid callback recreation

```js
const stableDeps = useMemo(() => ({id, role}), [id, role]);
const handler = useCallback(()=> {
  apiCall(stableDeps);
}, [stableDeps])
```

#### 5. Memoizing component bodies (rare but useful)

```js
const memoizedMarkup = useMemo(()=>{
  return <ExpensiveTree data={data}/>
}, [data])
```

### 4. Edge Cases and Pitfalls in useMemo

#### 1. useMemo doesn't run misunderstanding

useMemo does not guarantee the computation won't re-run, React may discard memo entries during concurrent rendering or for keeping memory small.

**Guarantee**: The returned value identity is stable when deps don’t change.
**Not guaranteed**: The create() function runs zero times.

But usually it's avoided.

#### 2. Overuse

useMemo is for expensive computations for identity stabilization.

Not needed for trivial operations.

Bad:

```js
const double = useMemo(()=> count * 2, [count]);
```

Just calculate directly.

#### 3. Incorrect dependency arrays passed

Including changing objects as deps negates memoization.

Bad:

```js
const v = useMemo(() => something(a), [{a}]) // deps always new
```

Fix: Memoize inner object or list primitive deps.

#### 4. useMemo with function instead of useCallback

Bad:

```js
const fun = useMemo(()=> console.log(a), [a]);
```

Better:

```js
const fun = useCallback(()=> console.log(a), [a]);
```

#### 5. Memoizing JSX for render optimization rarely effective

JSX creation is cheap — reconciliation is what matters. Avoid premature use.

Better: memoize components with React.memo, not the JSX tree.

#### 6. Recalculating because of unstable deps

If deps include arrays/objects that aren't memoized:

```js
const data = useMemo(() => transform(list), [list, options]);
```

But options is {} created inline — causing recalculations.

### 5. Metal Model

Below is a tiny re-implementation showing how React does it logically.

```js
function areDepsEqual(oldDeps, newDeps){
  if(!oldDeps || !newDeps) return false;
  if(oldDeps.length !== newDeps.length) return false;
  for(let i = 0; i < oldDeps.length; i++){
    if(!Object.is(oldDeps[i], newDeps[i])) return false;
  } 
  return true;
}

function useSimpleMemo(factory, deps){
  const res = useRef({ value: null, deps: null});

  if(re.current.deps && areDepsEqual(ref.current.deps, deps)){
    return res.current.value // identity stable
  }

  const value = factory();
  ref.current = {value, deps};
  return value;
}
```

This captures the core behavior:

- Compares deps
- Either reuse previous value or recompute
- No Side-effect inside the compute function.

### 6. Advanced Techniques

#### 1. Memoizing stable dependencies for useEffect/useCallback

```js
const stableConfig = useMemo(() => ({ limit, sort }), [limit, sort]);

useEffect(() => {
  fetchData(stableConfig);
}, [stableConfig]);
```

Useful for avoiding render loops.

#### 2. Memoizing selector results (like Redux selectors)

```js
const selected = useMemo(() => expensiveSelector(state), [state.a, state.b]);
```

#### 3. Co-locating memoized values with refs

Useful for objects that store methods or references:

```js
const api = useMemo(
  () => ({
    increment: () => setCount(c => c + 1),
    reset: () => setCount(0)
  }),
  []
);
```

#### 4. useMemo + useTransition for heavy computation during concurrent renders

```js
const [isPending, startTransition] = useTransition();
const result = useMemo(() => computeBigStuff(input), [input]);
```

### 7. Performance reasoning — When to use useMemo

Use when:

- The computation is expensive (≥1–2 ms).
- You rely on referential equality in:
  - React.memo children
  - useEffect deps
  - useCallback deps
- You memoize stable objects/arrays passed as props.

Don't use when:

- The computation is trivial.
- You’re not relying on referential equality.
- The value is primitive (numbers, booleans, strings).
- You haven't profiled a real performance hit.

## H. useRef Hook

### 1. Conceptual model — what problem useRef solves?

- Primary Goal: provides a stable, mutable container whose identity persists across renders: `{current: T}`
- Two Common uses:
  1. DOM refs - get access to a DOM element (or class component instance) to call methods or read properties.
  2. Mutable instances variable = hold mutable values that persists across renders but changing them does not cause a re-render. Good for timer, previous values, couters, external library handles, etc.

Key Properties:

- The object returned by useRef() is stable (same reference) across renders.
- .current can be mutated directly.
- Mutation do not schedule a render.

### 2. Lifecycle &  timing - when refs are created and assigned?

Important lifecycle moments (function component with hooks)

1. Render Phase (pure): React calls your component function. useRef(initial) returns the same ref Object that was stored for that hook during previous renders. If this is first render, React creates the ref object (but does not mutate DOM yet).
2. Commit phase (DOM mutation & lifecycle): After reconciliation and DOM updates, React assign DOM ref (if using `ref = {refObject}` or callback refs) during the commit phase That means:
   - The ref object's .current is updated with DOM node (or null) during commit.
   - Callback refs are invoked in commit.
3. Effects:
   - useLayoutEffect runs after commit, before painting, so DOM refs are available here and this is the right place to synchronously read layout (size/position) or synchronously call DOM APIs.
   - useEffect runs after painting, so refs are also available but reading layout inside useEffect may cause visible layout jank.
4. Unmount: On unmount, React will set object refs to null (or callback ref with null) during commit for cleanup.

So:

- Ref creation: at first render (hook initialization)
- Ref assignment : During commit (after DOM insertion / updates)
- Reading DOM/measure: use useLayoutEffect if you need to read layout synchronously.

### 3. Internal Mechanics - How React implements useRef (High level, Fiber)

This is a simplified, high-level mental model:

- React stores hooks in a linked list list/array on a component's Fiber (one entry per hook call order).
- Each hook call (first useState, useRef, etc.) corresponds to a slot. During render, React looks up the hook slot and returns stored data.
- For useRef, React stores an object like `{ current: initial}` in that slot. On Subsequent renders, React returns the exact same object, which is why identity is stable.
- In the commit phase, when reconciling DOM, React walks nodes and sets ref values
  - for object refs, `refs.current = node`
  - For callback refs, call the function with node.
- In Concurrent Mode (or Strict mode with double renders), the render can be discarded. React must ensure the ref object persists and only committed during the commit phase, so you can;t rely on side effect during the render.

Important Concurrency point:

- The ref object is persistent (stable), but the assignment of .current happens only when the commit occurs.
- Because renders might be thrown away, do not cause side effects during render based on .current changes — wait until commit/effects.

### 4. Usages and Pattern in useRef

#### Basic Example

```js
import {useRef, useLayoutEffect} from 'react';

function TextInput(){
  const inputRef = useRef(null);

  useLayoutEffect(()=> {
    // safe to measure and call focus synchronously
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />
}
```

#### Mutable container (timer id, etc.)

```js
function Timer(){
  const timerIdRef = useRef(null);

  useEffect(()=>{
    timerIdRef.current = setInterval(()=>{
      // do something
    }, 1000);
    return () => clearInterval(timerIdRef.current);
  }, [])
}
```

#### Previous value

```js
function usePrevious(value){
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current;
}
```

#### Callback refs

- Callback refs are functions that React calls with the node, they are executed in commit.

```js
function MyComponent(){
  const refCallback = (node) => {
    if(node) node.style.background = 'red';
    // store in closure of another ref if needed
  }

  return <div ref = {refCallback} />
}
```

#### Combining refs (mergeRef)

Useful when you want to forward refs but also keep a local ref:

```js
function mergeRefs(...refs){
  return (node) => {
    refs.forEach(ref => {
      if(!ref) return;
      if(!typeof ref === 'function') ref(node);
      else ref.current = node;
    });
  };
}
```

#### Forwarding refs + useImperativeHandle

```js
const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, ()=> ({
    focus: () => inputRef.current?.focus();
    clear: () => { inputRef.current.value = '';}
  }));
  return <input ref = {inputRef} />
})
```

`useImperativeHandle` customizes the instance value exposed to parent refs. This should be used sparingly — usually for library components.

#### useRef for event handlers (stabilizing callbacks)

Store the latest callback in a ref to avoid recreating event listeners:

```js
function useEvent(callback) {
  const ref = useRef(callback);
  useEffect(()=> {
    ref.current= callback;
  }, [callback]);
  return useCallback((...args) => ref.current(...args), []);
}
```

#### Persisting mutable state without re-render

When you need to mutate many times without re-render or have value between renders:

```js
const stateRef = useRef({ x: 0, y: 0});

// mutate stateRef.current.x = 3
```

### 5. Edge cases and pitfalls 

1. Expecting ref changes to cause renders
   - ref.current = value does NOT cause a re-render. Use useState if UI must update.

2. Reading .current in render that wasn’t assigned yet
   - On first render, before commit, DOM refs are still null. Don’t assume DOM ref exists during render.
3. Strict Mode double-invocation
   - In React Strict Mode (development) function components may be executed twice; refs are created twice? No — the ref object is stable across renders, but callback refs can be called twice (null then node). Code should tolerate multiple assignments.
4. Concurrent Mode & render discard
   - Renders might be thrown away. Don't perform side effects based on .current during render. Access .current in effects or commit phase.
5. Stale closures
   - Storing a value in a ref and using it inside a closure can avoid stale closures, but be careful to update the ref appropriately `(ref.current = latest)` in an effect.
6. Using ref in dependency arrays
   - ref object identity is stable, so including `ref` in deps is usually unnecessary. If you depend on ref.current changes, remember mutating .current does not trigger updates — you must use state or other signals.
7. Null checks & types in TypeScript
   - `useRef<HTMLDivElement>(null)` — null vs undefined typing pitfalls. Use `useRef<HTMLDivElement | null>(null)` to correctly type initial null.
8. Memory leaks
   - Storing large structures or DOM nodes in refs can prevent GC if not cleared on unmount — ensure cleanup if it matters.
9. Callback refs and re-creation
   - If a callback ref function is re-created each render, React will call the previous callback with `null` and the new with the node; prefer `useCallback` for stable callback refs if needed.
10. Reading layout vs painting
    - Reading DOM measurements in `useEffect` can cause layout thrash. Use `useLayoutEffect` to read synchronously after DOM updates.
11. Accessing refs during server-side rendering
    - On SSR, DOM refs are `null` because there's no DOM. Guard any DOM logic.

### 6. How to mentally re-implement useRef

There are two useful re-implementations: (A) mental model with plain objects and (B) a simplified hook using useState/useMemo to illustrate behavior.

#### 1. conceptual/ class style

Think of class components: they have `this` instance that persists across renders. `useRef` is like placing a property on `this`.

```js
// Class Component

class Comp {
  constructor(){
    this.myRef = {current: null}; // created once
  }

  render(){
    // return JSX, React sets this.myRef.current in commit when DOM Mounts
  }
}
```

#### 2. Simplified "polyfill" implemented with existing hooks

This shows the observable behavior (not actual internal React). You can implement a stable object with useMemo:

```js
function useRefPolyfill(initialValue){
  // The identity of this ref object needs to be stable across renders.
  // useMemo with empty deps will create it once and be stable
  const ref = React.useMemo(() => ({ current: initialValue}));
  return ref;
}
```

Or, using useState to create object once:

```js
function useRefPolyfillV2(initialValue){
  const [ref] = React.useState(()=> ({current: initialValue}));
  return ref;
}
```

**Important caveat**: These examples rely on the guarantee that `useMemo`/`useState` creates the object once per component instance — which mirrors React’s real hook storage.

#### 3. Callback refs: how they are invoked in commit?

Callback refs are just functions called with node during commit, React tracks them and calls them at commit time (not during render).

```text
During commit:
  if(ref is function) call ref(node)
  else of(ref is object) ref.current= node;
```

### 7. Performance considerations

- useRef itself is cheap: it returns a stable object.
- Over-mutating refs is cheap because it doesn’t re-render, but you must consider:
  - If UI needs to reflect changes, using refs prevents updates and can cause inconsistent UI.
  - Excessive usage to avoid re-renders may make code harder to reason about.
- Don’t use refs as a substitute for state. Use them when you explicitly need to:
  - avoid re-renders,
  - hold non-UI values,
  - store DOM nodes or external library instances.

### 8. Special topics & gotchas

- Refs and SSR: refs are null during server render. Guard DOM operations.
- Refs & React strict mode: initialization may happen multiple times in dev; cleanup and assignments may be invoked twice — code must tolerate null→node→null sequences.
- Refs & garbage collection: React clears object refs to null on unmount; if you store references to big objects (images, DOM) in refs and keep external references, you may accidentally create leaks.
- Refs vs ids or querySelector: prefer refs for direct node access; querySelector costs DOM traversal.
- Avoid storing derived UI in refs — it's easy to get inconsistent state.

### 9. Example real component showing several patterns

```js
import React, { useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }), []);

  useLayoutEffect(() => {
    // Safe to measure layout or focus synchronously
    if (props.autoFocus) inputRef.current?.focus();
  }, [props.autoFocus]);

  return <input ref={inputRef} placeholder={props.placeholder} />;
});

function Parent() {
  const fancyRef = useRef(null);
  const latestValue = useRef(''); // mutable container, won't rerender
  function handleChange(e) { latestValue.current = e.target.value; }

  useEffect(() => {
    // Example: read latest value when pressing a key outside of React lifecycle
    const onKey = (e) => {
      if (e.key === 'Enter') {
        console.log('latest:', latestValue.current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <FancyInput ref={fancyRef} autoFocus placeholder="Type..." />
      <input onChange={handleChange} />
      <button onClick={() => fancyRef.current.focus()}>Focus fancy</button>
    </>
  );
}
```

## I. useLayoutEffect Hook

### 1. Conceptual Model - what useLayoutEffect solves?

useLayoutEffect is for effects that must run synchronously after the DOM has been updated but before the browser paints. Typical use-cases:

- Measure DOM (e.g., getBoundingClientRect) immediately after React updated the DOM so measurements are accurate for the current render.
- Apply DOM writes that must be invisible to the user (e.g., repositioning, adding inline styles) to avoid visible flicker.
- Integrate with third-party imperative libraries that expect immediate DOM reads/writes.
- Synchronously update refs/state that will be taken into account before painting.

>If you don’t need the synchronous guarantee, prefer `useEffect` — it runs after paint and is non-blocking.

### 2. Lifecycle / ordering — exact timing (high-level)

1. **Render phase (pure)** — React computes the new Fiber tree (can be interrupted in concurrent mode).
2. **Commit phase (non-interruptible)** — DOM mutations are applied.
3. **Layout effects run synchronously** — all `useLayoutEffect` cleanup functions (from previous commit) are executed, then the new `useLayoutEffect` effect functions are executed. This happens before the browser paints.
4. **Browser paint** — screen is updated.
5. **Passive effects run (useEffect)** — execute asynchronously after paint.

Key consequences:

- `useLayoutEffect` blocks paint. Heavy work here causes jank.
- Cleanup of previous useLayoutEffect runs during the commit phase before new effect runs.
- On unmount, cleanup runs as part of commit.

Strict mode (dev) note: React (since v18) intentionally mounts, unmounts, and mounts again (double mounting) in dev to detect side-effects — this affects useLayoutEffect calls during development.