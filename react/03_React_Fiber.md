# React Fiber

## 1. Why Fiber Exists?

Before React 16, React used stack-based reconciler.

It used recursive function calls to traverse the component tree.

That had one big problem:

- It was not interruptive

If you hand a large component tree, React would block the main thread until the whole render finished, leading to sluggish UIs and dropped frames.

React Fiber (introduced in React 16) was a complete Rewrite of React's core algorithm, the reconciler, to make rendering incremental, interruptible, and prioritized.

## 2. What is Fiber?

A Fiber is a plain JavaScript object that represents one unit of work in the React tree, typically corresponding to one React element (component, DOM Node, etc.).

Think of it as a virtual stack frame that React controls manually.

In Simple terms:

> A Fiber is React's data structure for tracking and scheduling work for each component.

### Each Fiber Node contains:

Here is simplified version of a Fiber node:

```ts
type FiberNode = {
    tag: WorkTag,
    key: null | string,
    elementType: any,
    type: any,
    stateNode: any,

    // tree structure
    return: FiberNode | null,
    child: FiberNode | null,
    sibling: FiberNode | null,

    // Props and state
    pendingProps: any,
    memoizedProps: any,
    memoizedState: any,
    updateQueue: any,

    //Alternate tree
    alternate: FiberNode | null,

    flags: Flags,
    lanes: Lanes
}
```

- [ ] TODO: Explain the Fiber Node type in detail

So Each Fiber = 1 React element instance with metadata + pointers for traversal.

## 3. The Two Trees: `Current` and `Work in Progress`

React always keeps two copies of component tree:

1. **Current Fiber Tree** - Represents the UI currently committed to the DOM.
2. **Work-In-Progress (WIP) Fiber Tree** - Represents the next UI being prepared.

During rendering:

- React builds the WIP tree (processing updates).
- Once finished, React Swaps the trees, WIP becomes the new current tree.

Each Fiber has an alternate pointer linking these two versions.

```mathematical
Current Tree            Work-in-Progress Tree
     A   -------------------->      A'
    / \                            / \
   B   C                          B'  C'
```

This dual-tree structure allows React to:

- Compare (diff) old vs new
- Interrupt and resume work
- Batch and prioritize rendering.

## 4. How Fiber Reconciler Works?

React's rendering happens in two phase

### Render Phase (a.k.a Reconciliation)

- React builds the Work-In-Progress tree.
- It computes which part of UI changed.
- It can be paused, aborted, or resumed ( because of cooperative scheduling)
- Runs in a background-like mode.

### Commit Phase

- React applies the changes to the real DOM (mutation, layout effects, etc.).
- This phase is synchronous and non-interruptible.
- It's very fast compared to the render phase.

## 5. Fibers and Hooks

When a Function Component Fiber is Processed:

- React sets a global pointer `currentlyRenderingFiber` to that Fiber.
- Hooks (useState, useEffect, etc.) read/write to `currentlyRenderingFiber.memoizedState`.

Each hook call adds a Hook object to a linked list attach to the Fiber.

```ts
currentlyRenderingFiber.memoizedState = firstHook;
```

Then:

```ts
hook.memoizedState = stateValue;
hook.next = nextHook;
```

When React re-renders, it traverses this list in the same order, reading the previous state and effect data.

That’s how hooks persist state inside the Fiber, not as global variables.

## 6. Scheduling and Priorities (Lanes)

React Fiber introduces lanes, which are like prioritized buckets of work.

Each update (like setState) gets assigned a lane representing its priority:

- User input → high priority.
- Data fetching → lower priority.
- Background hydration → even lower.

The scheduler can:

- Interrupt lower-priority work.
- Let more important updates render first.
- Resume later, because each Fiber represents a resumable unit of work.

## 7. Visualization

Let's visualize what happens in one render cycle:

```yaml
User clicks -> setState() called
     |
     v
React creates Update -> attaches to Fiber.updateQueue
     |
     v
Scheduler marks Fiber's lane as dirty
     |
     v
Render phase begins:
  - Build Work-in-Progress tree
  - Traverse fibers recursively
  - Call component functions
  - Process hooks
     |
     v
Commit phase:
  - Apply DOM changes
  - Run layout/effects
  - Swap trees (WIP <-> Current)
```

## 8. Why This Matters (System Design Level)

Understanding Fiber helps you explain:

| Concept                            | How Fiber Explains It                                  |
| ---------------------------------- | ------------------------------------------------------ |
| **Concurrent Rendering**           | Fibers make work chunkable and pausable.               |
| **Suspense**                       | React can pause a subtree’s fiber until data resolves. |
| **Transitions (React 18)**         | React assigns updates to lower-priority lanes.         |
| **useState / useEffect internals** | Hook state stored on the fiber node.                   |
| **React DevTools Tree**            | Each node corresponds to a Fiber.                      |

## 9. Simplified “Fiber Engine” Example

Here’s a highly simplified mental model:

```js
function createFiber(element, parent) {
  return {
    type: element.type,
    props: element.props,
    parent,
    child: null,
    sibling: null,
    stateNode: null,
    memoizedState: null,
    alternate: null,
  };
}

function performUnitOfWork(fiber) {
  // 1. Process this component
  const children = fiber.type(fiber.props); // if function component
  reconcileChildren(fiber, children);

  // 2. Return next unit of work
  if (fiber.child) return fiber.child;
  let next = fiber;
  while (next) {
    if (next.sibling) return next.sibling;
    next = next.parent;
  }
}
```

React’s real reconciler is much more complex, but this demonstrates the traversal idea.

---

## 1. What “Reconciliation” Means

Reconciliation is React’s process of figuring out:

> “Given the previous UI tree and the new UI tree (produced by render), what changed?”

It’s basically a diffing algorithm between:

- the current Fiber tree (representing the UI in the DOM)
- and the new React elements (the result of re-rendering components)

## 2. How Fiber Enables Reconciliation

In pre-Fiber React (pre-16), reconciliation used recursion:

```js
function reconcile(oldVNode, newVNode) { ... }
```

It was synchronous, non-interruptible, and operated on an in-memory tree.

In Fiber React, reconciliation operates incrementally over Fiber nodes.

Each Fiber node represents:

- One element (function, class, host DOM node, etc.)
- Its place in the tree (parent/child/sibling)
- Its state and effects
- And, crucially, a pointer to its alternate fiber (previous version)

## 3. The Two Trees: “Current” vs “Work-in-Progress”

React always keeps two trees:

| Tree                            | Represents                              | Lifecycle |
| ------------------------------- | --------------------------------------- | --------- |
| **Current Fiber Tree**          | The UI currently committed to the DOM   | Live      |
| **Work-in-Progress Fiber Tree** | The UI that React is currently building | Temporary |

During rendering:

1. React builds the Work-in-Progress tree based on the new React elements.
2. Each Fiber in the WIP tree has an .alternate pointer to its corresponding Fiber in the current tree.
3. React diffs them and marks what needs to change (update, placement, deletion).

## 4. The Core of the Diff Algorithm

React’s diff algorithm is built on three heuristics (from React’s original reconciliation paper):

1. Different component types → replace subtree

    ```js
    <Button /> → <Card />   // completely different, destroy and remount
    ```

2. Same component type → update in place

    ```jsx
    <Button color="red" /> → <Button color="blue" />
    ```

3. Lists with keys → reconcile by key

    ```jsx
    [<Item key="1" />, <Item key="2" />]
    ```

## 5. The Fiber Reconciliation Process (Step-by-Step)

When React calls a function component:

```js
const element = Component(props);
```

React will then call `reconcileChildren(currentFiber, newChildren)`.

Here is the simplified version of what happens:

### Step 1: Compare element type

If the new child element’s type matches the old fiber’s type → React reuses the Fiber.

Otherwise → React marks the old fiber for deletion and creates a new one.

### Step 2: Reuse or create new child fibers

For each child:

- Same key + same type:Reuse the existing Fiber.Copy over its state (alternate), mark as update.

- Different key or type:Create a new Fiber node, mark as placement.

- Missing old fibers: Mark as deletion.

### Step 3: Link the new child Fibers

React links all children as a linked list via `.child` and `.sibling` pointers.

Each child Fiber has a `return` pointer to its parent.

### Step 4: Set flags

Each new or updated Fiber is assigned one or more flags:

```js
Placement | Update | Deletion | Ref | Snapshot
```

During the **commit phase**, React walks the finished WIP tree and applies these operations to the real DOM.

## 6. Handling Lists and Keys

Let’s see how React uses keys to optimize list reconciliation:

```js
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```

- Without keys → React diffs positionally (index-based).

- With keys → React builds a hash map { key -> fiber } to detect:

  - Reorders
  - Insertions
  - Deletions

Example:

```js
Old: [A, B, C]
New: [B, A, D]
```

With keys:

- B → move (reuse)
- A → move (reuse)
- C → delete
- D → add

Without keys:

- A → update with B’s props
- B → update with A’s props
- C → update with D’s props (wrong)

That’s why stable keys are essential.

## 7. How Reconciliation Connects to Scheduling

Each update (from setState) creates a unit of work for a particular Fiber.

- The scheduler assigns a lane (priority level).
- React processes the highest-priority lanes first.
- Each Fiber’s work can be paused (yielded back to the browser), then resumed later.

That’s how React supports Concurrent Rendering, it can partially reconcile the tree, pause, let the browser paint, and continue later.

## 8. The Commit Phase (DOM Application)

Once the Work-in-Progress tree is fully reconciled:

- React commits all changes to the DOM.

- It walks the tree looking for Fibers with side-effect flags:

  - Placement → appendChild
  - Update → update DOM props
  - Deletion → removeChild

- Runs layout and passive effects (useLayoutEffect, useEffect).

After commit:

- The WIP tree becomes the new current tree.

- Old Fiber alternates remain linked for the next reconciliation.

## 9. Simplified Pseudo-Implementation

Here’s a conceptual sketch of how `reconcileChildren` might look:

```js
function reconcileChildren(currentFiber, newChildren) {
  let oldFiber = currentFiber.alternate?.child;
  let prevSibling = null;

  for (const element of newChildren) {
    let newFiber = null;
    const sameType = oldFiber && element.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        stateNode: oldFiber.stateNode,
        pendingProps: element.props,
        return: currentFiber,
        alternate: oldFiber,
        flags: "Update"
      };
    } else {
      if (element) {
        newFiber = {
          type: element.type,
          pendingProps: element.props,
          return: currentFiber,
          stateNode: null,
          flags: "Placement"
        };
      }
      if (oldFiber) oldFiber.flags = "Deletion";
    }

    if (oldFiber) oldFiber = oldFiber.sibling;
    if (prevSibling) prevSibling.sibling = newFiber;
    else currentFiber.child = newFiber;

    prevSibling = newFiber;
  }
}
```

This pseudo-algorithm:

- Builds the new Fiber tree
- Determines what to reuse, delete, or create
- Flags what needs to happen in the commit phase
