# Blog System

Below is a **step-by-step plan** where:

* Each phase builds the blog features
* Each phase introduces **specific Go concepts**
* You’ll know *why* you’re learning each topic and *how* it applies to the project

---

# 🧭 High-Level Architecture

**Stack**

* Backend: **Go (net/http)**
* API style: **REST**
* Database: **PostgreSQL**
* Frontend: **HTML + HTMX**
* Auth:

  * Phase 1: Username + Password
  * Phase 2: JWT
  * Phase 3: SSO (OAuth2 later)
* Template rendering on server side

---

# 🪜 Learning & Build Plan (Progressive)

We’ll go from **basic Go → real production patterns**.

---

## PHASE 0 — Go Foundations (Before Coding the Blog)

🎯 Goal: Be comfortable *reading and writing* Go

### Go Topics

* Go installation & tooling
* `go mod`, `go build`, `go run`
* Packages & imports
* `main` function
* Variables, types, constants
* Control flow (`if`, `for`, `switch`)
* Structs
* Functions & methods
* Pointers (very important)
* Error handling (`error`, `fmt.Errorf`)
* Basic standard library overview

### Why this matters

Go is **simple but strict**. You must understand:

* Why Go avoids exceptions
* Why explicit error handling is a feature
* Why composition is preferred over inheritance

👉 Outcome: You can write small programs and understand compiler errors without panic 😄

---

## PHASE 1 — Basic HTTP Server (Guest Section First)

🎯 Goal: Serve pages & JSON using Go

### Blog Features

* Home page (list articles)
* Article detail page

### Go Topics

* `net/http`
* HTTP handlers
* `http.ServeMux`
* Request & response lifecycle
* Query params & URL params
* Status codes
* JSON encoding/decoding (`encoding/json`)
* Context basics (`context.Context`)

### What You’ll Build

* `/` → list articles
* `/articles/{id}` → article page
* Dummy in-memory data (slice of structs)

### Key Learning Concepts

* How Go handles concurrency automatically per request
* Why handlers are just functions
* How middleware *really* works

---

## PHASE 2 — Project Structure & Clean Architecture

🎯 Goal: Stop writing “messy Go”

### Go Topics

* Folder structure (`cmd`, `internal`, `pkg`)
* Separation of concerns
* Dependency injection (manual, no magic)
* Interfaces (small, purposeful ones)
* Configuration via environment variables

### Structure Example

```
cmd/
  server/
internal/
  handler/
  service/
  repository/
  model/
```

### Why this matters

This phase teaches:

* How Go apps scale
* How to avoid god-files
* How to write testable code

👉 This is where you start writing **professional Go**

---

## PHASE 3 — PostgreSQL Integration

🎯 Goal: Persistent data

### Blog Features

* Store articles in DB
* Retrieve articles dynamically

### Go Topics

* `database/sql`
* PostgreSQL driver (`lib/pq` or `pgx`)
* SQL queries
* Scanning rows into structs
* Transactions
* Connection pooling
* Migrations (with tools)

### What You’ll Learn

* Why Go doesn’t have an ORM by default
* How SQL + Go = control & performance
* How to avoid SQL injection properly

---

## PHASE 4 — HTML Templates + HTMX

🎯 Goal: Real UI without JS frameworks

### Blog Features

* Render pages from backend
* Use HTMX for:

  * Article list refresh
  * Create/edit/delete without page reload

### Go Topics

* `html/template`
* Template inheritance/layouts
* Escaping & security
* Partial rendering
* HTMX request headers

### Key Learning

* Why server-side rendering is powerful
* How HTMX simplifies frontend logic
* How Go templates stay safe by default

---

## PHASE 5 — Authentication (Username + Password)

🎯 Goal: Secure admin access

### Blog Features

* Login page
* Protected admin routes

### Go Topics

* Password hashing (`bcrypt`)
* Sessions vs stateless auth
* Cookies
* Middleware for auth
* Secure headers

### What You’ll Learn

* Why passwords are never stored raw
* How authentication flows work
* How to protect routes in Go cleanly

---

## PHASE 6 — JWT Authentication

🎯 Goal: Stateless API auth

### Blog Features

* JWT login
* Token-based auth for admin APIs

### Go Topics

* JWT structure
* Signing & verifying tokens
* Token expiration
* Middleware for JWT validation
* Claims & scopes

### Why this matters

This unlocks:

* API usage
* Mobile clients
* Separation of frontend/backend

---

## PHASE 7 — Admin Dashboard (CRUD)

🎯 Goal: Full blog management

### Blog Features

* Dashboard page
* Add article
* Edit article
* Delete article

### Go Topics

* HTTP verbs (POST, PUT, DELETE)
* Form handling
* Validation
* CSRF protection
* Flash messages

### Outcome

At this point, you have a **fully working blog system**.

---

## PHASE 8 — Testing

🎯 Goal: Confidence & correctness

### Go Topics

* `testing` package
* Table-driven tests
* Mocking with interfaces
* HTTP handler tests
* Database tests

### Why this matters

This is where Go shines:

* Fast tests
* Simple tooling
* No heavy frameworks

---

## PHASE 9 — SSO / OAuth2 (Advanced)

🎯 Goal: Industry-grade auth

### Features

* Login with Google/GitHub

### Go Topics

* OAuth2 flows
* External identity providers
* Token exchange
* User provisioning

---

## PHASE 10 — Production Readiness

🎯 Goal: Ship it

### Topics

* Logging (`slog`, `zap`)
* Graceful shutdown
* Docker
* Environment configs
* Reverse proxy (Nginx)
* Security best practices

---

# 🧠 How We Should Proceed (Recommended)

I suggest we:

1. **Start with PHASE 0 + 1**
2. Write code together
3. I explain *every Go concept as it appears*
4. You run it locally and experiment

---

### 👉 Next Step

If you’re ready, say:

> **“Start Phase 0 & 1”**

and I’ll:

* Set up the project
* Explain Go fundamentals **while coding**
* Build the first working API endpoint together 🚀
