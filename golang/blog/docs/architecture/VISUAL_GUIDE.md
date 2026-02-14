# Visual Architecture Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                    (User Interface)                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTP Requests
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    HTTP Router                               │
│                   (Route Dispatch)                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
   Articles        Posts          Auth
   Module          Module         Module
        │               │               │
        └───────────────┴───────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
   Handler         Service        Repository
   (HTTP)          (Logic)        (Data)
        │               │               │
        └───────────────┴───────────────┘
                        │
                        ▼
                   PostgreSQL
```

---

## Domain Module Structure

```
┌────────────────────────────────────────────┐
│         Articles Domain Module             │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │         Handler Layer                │ │
│  │  - HTTP request/response             │ │
│  │  - Validation                        │ │
│  │  - Template rendering                │ │
│  └────────────┬─────────────────────────┘ │
│               │                            │
│  ┌────────────▼─────────────────────────┐ │
│  │         Service Layer                │ │
│  │  - Business logic                    │ │
│  │  - Validation rules                  │ │
│  │  - Orchestration                     │ │
│  └────────────┬─────────────────────────┘ │
│               │                            │
│  ┌────────────▼─────────────────────────┐ │
│  │       Repository Layer               │ │
│  │  - SQL queries                       │ │
│  │  - Data mapping                      │ │
│  │  - CRUD operations                   │ │
│  └────────────┬─────────────────────────┘ │
│               │                            │
│  ┌────────────▼─────────────────────────┐ │
│  │         Model Layer                  │ │
│  │  - Domain entities                   │ │
│  │  - Business rules                    │ │
│  └──────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘
```

---

## Inter-Module Communication

```
┌─────────────┐         ┌─────────────┐
│   Posts     │         │  Articles   │
│   Module    │         │   Module    │
├─────────────┤         ├─────────────┤
│             │         │             │
│  Service ───┼────────►│  Service    │
│             │ uses    │             │
│             │         │  GetArticle │
│             │         │             │
└─────────────┘         └─────────────┘

Posts can validate that referenced articles exist
```

---

## Request Flow Example

### Creating a Post with Article Reference

```
1. User submits form
   │
   ▼
2. POST /admin/posts
   │
   ▼
3. Auth Middleware validates JWT
   │
   ▼
4. PostHandler.Create()
   │
   ▼
5. PostService.CreatePost()
   │
   ├─► ArticleService.GetArticle() (validate reference)
   │   │
   │   └─► ArticleRepository.GetByID()
   │       │
   │       └─► PostgreSQL
   │
   ▼
6. PostRepository.Create()
   │
   ▼
7. PostgreSQL INSERT
   │
   ▼
8. Return success
```

---

## Folder Growth Pattern

### Current (2 Domains)
```
internal/domains/
├── articles/
└── posts/
```

### After Adding 3 More Features
```
internal/domains/
├── articles/
├── posts/
├── quizzes/      # New feature
├── surveys/      # New feature
└── comments/     # New feature
```

### After Adding 5 More Features
```
internal/domains/
├── articles/
├── posts/
├── quizzes/
├── surveys/
├── comments/
├── polls/        # New feature
├── analytics/    # New feature
├── notifications/# New feature
├── tags/         # New feature
└── categories/   # New feature
```

**Notice:** Structure grows **horizontally** (more domains), not **vertically** (deeper nesting).

This keeps the codebase flat and easy to navigate!

---

## Dependency Graph

```
┌─────────────────────────────────────────────┐
│              Application                     │
└──────────────────┬──────────────────────────┘
                   │
     ┌─────────────┼─────────────┐
     │             │             │
     ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│Articles │  │  Posts  │  │ Quizzes │
│ Module  │  │ Module  │  │ Module  │
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
     │            ├────────────┘
     │            │ (depends on articles)
     │            │
     └────────────┴────────────┐
                               │
                               ▼
                    ┌──────────────────┐
                    │  Shared Modules  │
                    ├──────────────────┤
                    │  - Auth          │
                    │  - Database      │
                    │  - Config        │
                    └──────────────────┘
```

---

## Module Lifecycle

```
1. Initialize
   ├─► Create Repository
   ├─► Create Service (inject repo)
   └─► Create Handler (inject service)

2. Register Routes
   ├─► Public routes
   └─► Protected routes (with auth middleware)

3. Serve Requests
   ├─► Handler receives request
   ├─► Service processes logic
   ├─► Repository accesses data
   └─► Response sent to client

4. Inter-Module Communication
   └─► Service calls other module's service
```

---

## Scaling Patterns

### Pattern 1: Independent Features
```
Articles ─┐
Posts    ─┼─► Database
Quizzes  ─┘

No dependencies between domains
```

### Pattern 2: Feature Dependencies
```
Posts ──► Articles (validates references)
  │
  └────► Quizzes (embeds quizzes)

Posts depends on other domains
```

### Pattern 3: Shared Services
```
Articles ─┐
Posts    ─┼─► Auth Module (shared)
Quizzes  ─┘

All domains use shared auth
```

---

## Performance Considerations

### Code Splitting
- Each domain loads only its code
- Shared code loaded once
- No unnecessary dependencies

### Database Queries
- Each domain optimizes its queries
- No N+1 query problems
- Connection pooling shared

### Caching
- Can cache per domain
- Invalidation is isolated
- No cache pollution

---

## Testing Strategy

### Unit Tests (Per Layer)
```
handler/http_test.go      # Test HTTP layer
service/service_test.go   # Test business logic
repository/postgres_test.go # Test data access
```

### Integration Tests (Per Module)
```
module_test.go            # Test full module
```

### E2E Tests (Cross-Module)
```
tests/integration/
├── posts_with_articles_test.go
└── full_workflow_test.go
```

---

## Summary

This architecture provides:

1. **Clear Organization** - By feature, not layer
2. **Easy Scaling** - Add features horizontally
3. **Fast Development** - 2-4 hours per feature
4. **Team Friendly** - No conflicts
5. **Maintainable** - Changes isolated
6. **Testable** - Independent testing
7. **Future-Proof** - Can split to microservices

**Your blog is now ready to scale from 1 feature to 100+ features!** 🚀
