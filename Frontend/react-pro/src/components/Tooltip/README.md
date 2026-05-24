# Tooltip Component Design Doc

This component introduces entirely new categories of problems:

- DOM measurement
- positioning system
- portals
- interaction management
- accessibility semantics
- collision handling
- timing systems
- event orchestration

tooltip is where frontend engineering starts feeling like system engineering.

## Why Tooltip Is a Huge Learning Milestone

A button mostly lives, Inside itself, Tooltip does not.

Tooltip must understand:
- Viewport
- target element
- scrolling
- layering
- positioning
- mouse interactions
- keyboard interactions

This is a major jump in complexity.

## 1. Understand what Tooltip really is

You think:
> Tooltip is a text shown on hover.

Wrong, A professional tooltip system is:
- an anchored floating UI Primitive
- an interaction state machine
- a positioning engine
- an accessibility system

That's why mature tooltip system are surprisingly complex.

## 2. Define Responsibility

What should tooltip handle?

- Anchor to target element
- show/hide intelligently
- support hover
- support keyboard focus
- support accessibility
- support positioning
- avoid clipping
- support delays
- support animations

What it should not handle:

- manage business logic
- fetch data
- know routing
- manage app state

## 3. Understand Core architectural problem

Where should tooltip render?

Option 1: Inside parent DOM tree.

Problem:

```css
overflow: hidden
```

can clip tooltip. this is very common issue.

Solution:

Use **Portals**: Render tooltip outside normal DOM hierarchy.

Usually into:

```html
document.body
```

Topic in focus: **React Portals**

## 4. Understand Anchored UI

Tooltip is, anchored floating UI. Meaning:

```
target element
+
floating element
+
position calculation
```

This architecture later powers:
- Popover
- Dropdown
- Select
- Context Menu
- Modal Positioning

Tooltip is foundational.

## 5. Define Initial Tooltip API

Question: How should developer use it?

Common Pattern:

```ts
<Tooltip content="save changes">
    <Button>Save</Button>
</Tooltip>
```

Why Composition is good here?

Tooltip wraps:

trigger element and this gives:
- flexibility
- event control
- accessibility management

## 6. Define Positioning API

We need placement support.

Example:

```ts
<Tooltip
    content="save"
    placement="top"
/>
```

Possible Placements:

- top
- bottom
- left
- right

Later:
- top right
- top left
- bottom right 
- bottom left
- top-left-corner
- bottom-left-corner
- top-right-corner
- bottom-left-corner

## 7. Think about Controlled vs Uncontrolled

Question: Should tooltip manage itself?

Usually, yes initially

Meaning, Internal hover state

Later: controlled tooltip may exist.

## 8. Understand Interaction Complexity

When should tooltip open?

Possible triggers:
- Mouse enter
- focus
- keyboard navigation

When should it close?
- Mouse leave
- blur
- escape key

This is called interaction orchestration.

## 9. Accessibility Thinking

Tooltip accessibility is often implemented incorrectly.

Tooltip should work for:
- Mouse users
- keyboard users
- screen readers

Common Accessibility Pattern

Trigger gets:

```ts
aria-describedby
```

Tooltip gets:

```ts
role="tooltip"
```

Critical accessibility architecture.

## 10. Understand Positioning Problem

How do we know where tooltip should appear?

Need: DOM Measurement, using

```ts
getBoundingClientRect()
```

Huge browser API concept to learn.

## 11. What must be measured?

Need:
- trigger position
- trigger dimension
- tooltip dimension
- viewport boundaries

Tooltip introduces, layout computation systems.

## 12. Think about rendering timing

Problem:

Tooltip dimension unknown before render.

Meaning:

```
render
- measure
- reposition
```

This introduces, **layout effect timing**, this is again a very important concept.

## 13. Understand why `useLayoutEffect` matters?

Tooltip positioning must happen, before paint, otherwise:
- flicker
- jumping

This is une of the best real world example for

```ts
useLayoutEffect
```

## 14. Think about collision detection

What if tooltip goes off-screen?

Example:

```
placement=top
but target is near top edge
```

Need:

Collision handing, we need to handle this case with smart flipping.

## 15. Think about portal architecture

We said tooltip should render into:

```
document.body
```

Using, `createPortal` this solves:
- clipping
- stacking issues
- z-index nightmares

## 16. Think about animation architecture

Question: Should tooltip instantly appear?

Usually no, commonly 
- fade
- slight movement
- custom animation

Here we will understand **animation orchestration**.

## 17. Think about delay systems

Professional tooltip often support
- open delay
- close delay

Why?

Avoid flicker when moving muse rapidly. This introduces us to **timeout orchestration**.

## 18. Think about ref architecture

Tooltip needs ref for:
- Trigger element
- tooltip element

You will learn:

```ts
useRef
```

For DOM systems.

## 19. Think about Single Child constraint

Tooltip wraps trigger.

Question: What if user passed multiple children?

Most tooltip system expects, exactly one trigger element, this becomes

```ts
React.cloneElement
```

territory.

Another huge React concept.

## 20. Final Initial Architecture

Now We can mentally model:

### Public API

```ts
<Tooltip
    content = "Save changes"
    placement = "top"
>
    <Button>Save</Button>
</Tooltip>
```

### Internal Architecture

```
trigger element
|
interaction handler
|
open state
|
portal render
|
positioning calculation
```

---

## Understanding DOMReact

Returned by:

```
getBoundingClientReact()
```

Contains:

```
top
left
right
bottom
width
height
```

relative to viewport.


