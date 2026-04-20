# Event Driven Architecture

Redux fundamentally an event-driven system.

When user clicks a button

```
CLICK
-> dispatch action
-> reducer updates states
-> UI reacts
```

This is event architecture.

## What is Event Driven Architecture?

Instead of components directly changing everything, they emit events. Then other part of system respond.

```
Something happened
-> Notify system
-> System reacts
```

## In UI Example

User clicks login:

```
LOGIN_BUTTON_CLICKED
```

System may:
- call API
- Show loader
- save token
- Redirect user
- Track analytics

Button does not handle all that.

## Why Direct mutation is Bad

Imagine:

```
Header cart icon updates cart
Product page updates cart
Wishlist updates cart
Checkout updates cart
```

All directly editing same data.

Result:
- Duplicate logic
- bugs
- hard debugging
- race conditions

## Better event flow

```js
dispatch({
    type: "ADD_TO_CART",
    payload: product
})
```

Then store handles update centrally.

## Redux is Event Driven

Redux actions are events.

```js
dispatch({
    type: "USER_LOGGED_IN",
    payload: user
});
```

Action means: Something happened

Not: Run this function.

Keep it in mind.

## Event vs Command 

Command:

```
Add this product now
```

Imperative.

Event:

```
Product was added to cart
```

Descriptive.

Redux action should feel more like event.

## Better Action Names

Bad:

```js
dispatch({type: "SET_CART"})
```

Better:

```js
dispatch({type: "PRODUCT_ADDED_TO_CART"})
```

Tells story of system.

## Redux FLow

```
User Click
-> dispatch (action/event)
-> reducer receives event
-> state changes
-> UI updates
```

## Why This scales

One event can trigger many things later.

Example:

```
ORDER_PLACED
```

Can trigger:

- inventory reduce
- email send
- analytics
- loyalty points

Without changing button code. Huge architecture benefit.

## Problems

Q1: Which is Better?

```js
cart.push(item)
```

OR

```js
dispatch({ type: "ITEM_ADDED", payload: item })
```

- 2nd option is better because it allows us to look for that event and then we can have multiple things to update based on that event and all can be done in the reducer.

Q2: Better action name?

A. SET_USER

B. USER_LOGGED_IN

- `USER_LOGGED_IN` is better because by reading the action we can tell what actually happened

Q3: In Todo App, suggest event names for:

- add todo: `TODO_ADDED`
- delete todo: `TODO_DELETED`
- mark complete: `TODO_MARKED_AS_COMPLETE`

Q4: Why is event-driven easier to debug?

Because systems can inspect:

- What event happened?
- When?
- With what payload?
- What state changed after it?

That creates traceability.
