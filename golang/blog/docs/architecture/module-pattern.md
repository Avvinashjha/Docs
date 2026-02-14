# Module Pattern

## Overview

Each domain module follows a consistent pattern for initialization and dependency management.

## Module Structure

```go
type Module struct {
    handler    *handler.Handler
    service    *service.Service
    repository repository.Repository
}
```

## Initialization

```go
func NewModule(db *pgxpool.Pool, dependencies ...Dependency) *Module {
    // 1. Initialize repository
    repo := repository.NewPostgresRepository(db)
    
    // 2. Initialize service with repository
    svc := service.NewService(repo)
    
    // 3. Initialize handler with service
    h := handler.NewHandler(svc)
    
    return &Module{
        handler:    h,
        service:    svc,
        repository: repo,
    }
}
```

## Route Registration

```go
func (m *Module) RegisterRoutes(mux *http.ServeMux, authMw AuthMiddleware) {
    // Public routes
    mux.HandleFunc("/resource", m.handler.List)
    mux.HandleFunc("/resource/", m.handler.Get)
    
    // Protected routes
    if authMw != nil {
        mux.HandleFunc("/admin/resource", authMw.RequireAuth(m.handler.AdminList))
        mux.HandleFunc("/admin/resource/create", authMw.RequireAuth(m.handler.Create))
    }
}
```

## Service Access

For inter-module communication:

```go
func (m *Module) GetService() *service.Service {
    return m.service
}
```

## Dependency Injection

Modules can depend on other modules:

```go
type PostModule struct {
    handler        *handler.PostHandler
    service        *service.PostService
    articleService *articleService.ArticleService
}

func NewPostModule(db *pgxpool.Pool, articleSvc *articleService.ArticleService) *PostModule {
    repo := repository.NewPostgresPostRepository(db)
    svc := service.NewPostService(repo, articleSvc)
    h := handler.NewPostHandler(svc)
    
    return &PostModule{
        handler:        h,
        service:        svc,
        articleService: articleSvc,
    }
}
```

## Testing

Modules are easy to test:

```go
func TestModule(t *testing.T) {
    // Create test database
    db := setupTestDB(t)
    defer db.Close()
    
    // Initialize module
    module := NewModule(db)
    
    // Test routes
    mux := http.NewServeMux()
    module.RegisterRoutes(mux, nil)
    
    // Make test requests
    // ...
}
```

## Benefits

1. **Consistent Structure** - All modules follow same pattern
2. **Easy to Understand** - Clear initialization flow
3. **Testable** - Easy to mock dependencies
4. **Flexible** - Easy to add new dependencies
5. **Maintainable** - Changes localized to module
