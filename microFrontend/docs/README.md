A **micro frontend** is an architectural style in web development where a large frontend application is split into **smaller, independent pieces** that are developed, deployed, and maintained separately.

Think of it like microservice, but from the user interface instead of backend.

## Idea Behind Micro Frontend

Instead of building one big frontend app, you break it into mini apps, each mini app:
- Handles specific feature or page (eg. login, dashboard, cart, etc)
- Can be build with it's onw tech-stack (App1-> React, App2 -> Angular, App3 -> Vue3)
- Is owned by separate team

All these mini apps are then combined to form one complete application.

## Why It is used?

- **Independence**: Teams work separately on different parts.
- **Technology flexibility**: Different frameworks can be used
- **Independent deployment**: Updates don't required re deploying the whole app
- **Scalability**: Easier to scale teams and codebase

## High-Level Architecture of a Micro Frontend SystemA

![alt text](image.png)

### 1. Shell/Host Application

The shell is the main application users open.

Responsibilities:
- Global layout
- Authentication
- Routing
- Loading micro frontends dynamically
- Shared dependencies

Example:

- Navbar
- Sidebar
- User session
- Route handling

### 2. Micro Frontends (MFEs)

Each Micro frontend:
- Owns a business domain
- Has its own repository
- Has independent CI/CD
- Can deploy independently

Example:
- Checkout
- orders
- analytics
- profile

### 3. Deployment Model

This is where micro frontends become powerful.

#### Traditional Monolith

```
Frontend App
   └── Single build
   └── Single deployment
```
Any small change redeploys entire frontend.

#### Micro Frontend Deployment

Each module deploys separately:

```
Shell App      → app.company.com
Cart MFE       → cart.company.com
Profile MFE    → profile.company.com
Search MFE     → search.company.com
```

Or static CDN deployment:

```
cdn.com/cart/v15/remoteEntry.js
cdn.com/profile/v8/remoteEntry.js
```

The shell dynamically loads them at runtime.

### 4. Runtime Integration

A common modern approach uses:

- Webpack module federation

This shell loads remote JS bundles dynamically:

```js
const CartApp = await import("cart/App")
```

Shell imports them remotely.

### 5. Communication between Micro Frontends

This is the hardest part.

Micro frontends should be
- Independent
- loosely coupled

Avoid direct imports between MFEs whenever possible.

#### Common Communication Patterns

1. **Event Bus (most common)**
   
   One MFE emits events.

   Another listens.

   ```
   Cart MFE
   └── emits "cart-updated"

   Header MFE
      └── updates cart badge
   ```

   Example:

   ```js
   window.dispatchEvent(
    new CustomEvent("cart-updated", {
        details: {count: 3}
    })
   )
   ```

   Listener:

   ```js
   window.addEventListener(
    "cart-updated", (event)=>{
        console.log(event.detail.count);
    }
   )
   ```

   Good for:
   - Decoupling
   - scalability

2. **Shared Global State**
   
   Possible but overuse can lead to tight coupling and it will beat the purpose of MFEs

   Example:
   - Redux store shared from shell
   - Zustand singleton
   - RxJS shared stream

   Architecture:

   ```
    Shell owns store
            │
        ┌───┴────┐
        │        │
      Cart    Profile
   ```

   Example:

   ```js
   shared: {
    react: {singleton: true},
    redux: {singleton: true}
   }
   ```

   Best only for:
   - Auth
   - theme
   - user session
   - feature flags

   Avoid large shared business state.

3. **URL-Based States**
   
   Very clean approach.

   Use URL as communication:

   ```
   /products?category=book
   ```

   Any MFE can read URL params.

   Good for:
   - filters
   - navigation
   - search

4. **Backend as source of truth**
   
   Very common in large systems.

   Instead of frontend-to-frontend communication:

   ```
   Cart MFE
      → updates backend

   Header MFE
      → fetches backend state
   ```
   This reduces coupling dynamically.

### 6. Shared dependencies

Without optimization:

```
Cart loads React
Profile loads React
Search loads React
```

Huge bundle duplication.

Module federation solved this:

```js
shared: {
    react: {
        singleton: true
    },
    "react-dom" :{
        singleton: true
    }
}
```

Only one React instance loads.

### 7. Shared Architecture

1. **Option 1: Shell Owns Routing**
   
   Most common.

   ```
   /orders  -> Orders MFE
   /cart    -> Cart MFE
   /profile -> Profile MFE
   ```

2. **Option 2: Nested Routing**
   
   MFE handles internal routes:

   ```
   /profile/settings
   /profile/security
   ```

   Shell only knows `/profile/*`

### 8. CI/CD Flow

Each MFE has it's own pipeline:

```
Developer pushes code
       ↓
     Build
       ↓
     Test
       ↓
Deploy remote bundle
       ↓
Shell automatically loads latest version
```

Huge advantage:
- independent releases
- no frontend bottleneck

### 9. Versioning strategy

A real production concern.

Example problem:

- Shell expects Cart V2
- Cart deployed V2 breaking API

Solution:

- Semantic Versioning
- backward compatibility
- contracts/interfaces
- canary deployment

### 10. Real World Production Architecture

Typically enterprise setup:

```
                     CDN
                      │
         ┌────────────┼────────────┐
         │            │            │
      Shell        Cart        Profile
         │            │            │
         └────── API Gateway ──────┘
                      │
               Backend Services
```

> Micro frontend can be confused by some devs and they end up building distributed monolith frontend.

