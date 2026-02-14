# Domain-Driven Design Architecture

## Overview

This project follows a **Domain-Driven Design (DDD)** approach, organizing code by business domains/features rather than technical layers.

## Architecture Principles

### 1. Domain-Centric Organization

Each feature is organized as a self-contained domain module:

```
internal/domains/articles/
├── handler/          # HTTP handlers
├── service/          # Business logic
├── repository/       # Data access
├── model/            # Domain models
├── dto/              # Data transfer objects
└── module.go         # Module initialization
```

### 2. Shared Infrastructure

Common infrastructure is centralized:

```
internal/shared/
├── auth/             # Authentication
├── database/         # Database connections
├── config/           # Configuration
└── http/             # HTTP utilities
```

### 3. Common Utilities

Reusable utilities:

```
internal/common/
├── logger/           # Logging
├── validator/        # Validation
├── pagination/       # Pagination
└── utils/            # Helper functions
```

## Module Pattern

Each domain module exports a clean interface:

```go
type Module struct {
    handler    *handler.Handler
    service    *service.Service
    repository repository.Repository
}

func NewModule(db *pgxpool.Pool) *Module {
    // Wire dependencies
}

func (m *Module) RegisterRoutes(mux *http.ServeMux, authMw AuthMiddleware) {
    // Register HTTP routes
}

func (m *Module) GetService() *service.Service {
    // For inter-module communication
}
```

## Benefits

1. **Clear Boundaries** - Each feature is self-contained
2. **Parallel Development** - Teams can work on different features
3. **Easy Testing** - Test modules in isolation
4. **Maintainability** - Changes don't affect other features
5. **Scalability** - Easy to add new features
6. **Future-Proof** - Can extract to microservices later

## Inter-Module Communication

Modules communicate through service layer interfaces:

```go
type PostService struct {
    articleService *articleService.ArticleService
}

func (s *PostService) CreatePost(post *model.Post) error {
    // Validate referenced article
    article, err := s.articleService.GetArticle(post.ArticleID)
    // ...
}
```

## Dependency Flow

```
Handler → Service → Repository → Database
   ↓         ↓
Middleware  Auth
```

## Adding New Features

See [adding-new-features.md](./adding-new-features.md) for step-by-step guide.
