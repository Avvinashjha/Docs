# What is a Button?

Most beginners think:
> A button is a Style <button>

That's incorrect.

A production grade button is:

- a semantic interaction primitive
- a reusable design system foundation
- an accessibility abstraction
- a styling abstraction
- an interaction abstraction

This mindset changes everything.

## What are the responsibilities of a Button?

A button should:
- render clickable UI
- handle variants
- supports sizes
- supports disable state
- supports accessibility
- support keyboard interaction
- expose native button behavior
- allow styling extension

## What should not belong in button?

A Button Should not:
- Handles API request
- contains business logic
- know about routing
- know about modals
- know about forms

This separation is important.

## Think about API Design first

Before implementation:

How should developer use this component?

Bad API Design:

```ts
<Button red rounded big />
```

Problems:

- Hard to scale
- ambiguous
- impossible combinations
- poor DX

Better:

```ts
<Button
    variant = "filled"
    size= "lg"
    rounded
/>
```

Much more scalable.

## Identify Component Dimensions

Professional components are usually designed around dimensions.

For Button:

| Dimension | Examples                |
| --------- | ----------------------- |
| Variant   | filled, outlined, ghost |
| Size      | sm, md, lg              |
| Shape     | rounded, square         |
| State     | loading, disabled       |
| Width     | fullWidth               |
| Content   | icon, text              |
| Behavior  | button, submit          |

This is the first real design-system concept.

## Decide Between Props and Composition

Question: Should icon be a prop?

Example:

```ts
<Button leftIcon={<Plus/>} />
```

Or composition?

```ts
<Button>
    <Plus/>
    Add Item
</Button>
```

### Thought Process

**Prop-based API**

Pros:
- Easier to use
- Controlled Spacing

Cons:
- Rigid
- Harder to customize

**Composition-Based API**

Pros:
- Flexible
- Scalable
- More React Like

Cons:
- Spacing responsibility move to user

### Decision

Usually:

- basic system use props
- advance system favor composition

We'll likely support both later.

But Initially:
- Keep Composition First design

## Accessibility Thinking

THis is where real engineering begins.

Most developes completely ignore this.

Questions:

- Should we use <button> or <div>
- How does keyboard interaction work?
- What about screen readers?
- What about focus state?

Correct Answer:

Always prefer native HTML semantics.

Good:

```ts
<button>Save</button>
```

Bad:

```ts
<div role="button"> Save </div>
```

Why?

Native `<button>` already supports:
- Keyboard interaction
- focus handing
- accessibility
- form behavior

This is extremely important.

## Typescript Thinking

Now we start thinking about types.

Question:

Should we manually define every props?

Bad:

```ts
type ButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
};
```

Why Bad?

Because native button already has:

- onClick
- onFocus
- aria-label
- disabled
- type
- tabIndex
- etc...

You'd be re building the DOM API.

Good Approach:

Extend native button props.

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
```

This is one of the most important React Ts Patterns.

## Add Custom Component Props

Now Combine native props with our design-system props.

```ts
type Variant = "filled" | "outlined" | "ghost";
type size = "sm" | "md" | "lg";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
} 
```

This is scalable architecture.

## Think About Defaults

Question:

What happens if no variant is passed?

We need defaults.

Professional system always define:

- default variant
- default size
- default type

Example:

```ts
variant = "filled"
size = "md"
type = "button"
```

Why type = "button" Matters

This is a famous production bug.

HTML buttons inside forms default to:

```html
type="submit"
```

This causes accidental form submission.

Professional Button components almost always default to:

```ts
type="button"
```

## Styling Architecture

Another huge topic:

Question:

How should style scale?

Bad:

```ts
if(variant === "filled") {

}
```

Messy conditional styling everywhere.

Better:

Create class Maps.

Example:

```ts
const variantClasses : {
    filled: "...",
    outlined: "...",
    ghost: "..."
}
```

Now styles are:


- centralized
- scalable
- maintainable

## Think about ref support

Question:

Why should users need access to button DOM?

Example:

- focus button
- measure size
- animations
- accessibility flows

So We need:

```ts
forwardRef
```
>forwardRef is a React utility that allows a parent component to pass a reference (ref) down to a child component. 

This is foundation res-usable component design.

## Think about Loading state

Question:

What happens during loading?

Should:
- Button disable click?
- spinner replaces content?
- maintain width?
- preserve accessibility?

## Think about future scalability

Important mindset:

Even if don't build features now, design so future features fit naturally.

Future:
- Icon Button
- polymorphism
- ripple effect
- theming
- animation
- slots
- loading indicators

Good architecture anticipates growth.

## Define initial Scope

Don't build everything immediately.

Build in phases.

### Phase 1 Button

Features:

- Variant
- size
- disabled
- loading
- full width
- rounded
- forwardRef
- native button support

### Phase 2 

- Icon Support
- polymorphism
- accessibility improvements
- Keyboard enhancements

>Polymorphism (meaning "many forms") in component design allows different objects or UI components to share the exact same interface or contract, while providing their own unique implementations. This means your core application code can interact with any component seamlessly, regardless of its specific underlying type. 

```ts
<Button as="a" />
```

### Phase 3

- Theming
- animation system
- ripple effect
- compound variants

> In component design, the ripple effect refers to a visual micro-interaction popularized by Material Design. When a user taps, clicks, or interacts with a button or list item, a circular "ripple" or expanding wave animation radiates outward from the exact point of contact.


## Finalize Initial API

Now We can define API.

Example:

```ts
<Button>Save</Button>

<Button variant="outlined">Cancel</Button>

<Button size="lg" rounded> Continue</Button>

<Button loading>Saving...</Button>
```

Notice:
- Readable
- scalable
- predictable
- composable

That's good component API design.

## Topic To learn from Button Component

- What is forwardRef?
- Why Button.displayName?
- Polymorphic components
- Design tokens (style without touching the base class just change variables)
- Generic in ts
- Default generic type
- Understand `ComponentPropsWithoutRef`
- Learn about Omit in ts
- How to avoid prop collision and how `Omit` help?
