# Prop Drilling

This is one of the original reasons state libraries become popular.

## Why Prop Drilling?

Passing data thorough many components that don't need it, just so deep child can access it.

```
App
 ↓ user
Layout
 ↓ user
Sidebar
 ↓ user
ProfileCard
```

Only ProfileCard needs user.

Middle layers are just pipes.

Why It Hurts:

- Unnecessary props everywhere
- header refactoring
- components tightly coupled
- many re-renders
- painful scaling

Prop drilling specifically means passing props through intermediate components that don’t need them, only so deeper children can receive them.

## Scattered State

Important app state stored in many random places.

```js
Header has cartCount state
ProductPage has cartItems state
Checkout has totals state
Sidebar has filters state
```

No single source of truth.

Problems:

- inconsistent UI
- duplicate state bugs
- syncing bugs
- difficult updates

Example Bug:

Header says:

```
Cart: 2
```

Checkout Says:

```
Cart: 3
```

Now user loses trust.

##