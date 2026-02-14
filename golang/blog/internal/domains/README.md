# Domains

This folder contains all business domain modules. Each domain is self-contained and follows the same pattern.

## Current Domains

### Articles
Blog articles management (CRUD operations)

**Location:** `articles/`
**Routes:** `/`, `/article`, `/admin`
**Dependencies:** None

### Posts
Blog posts that can reference articles and quizzes

**Location:** `posts/`
**Routes:** `/posts`, `/admin/posts`
**Dependencies:** Articles (optional reference)

## Adding a New Domain

1. Create folder structure:
   ```bash
   mkdir -p internal/domains/your-domain/{handler,service,repository,model,dto}
   ```

2. Follow the pattern from existing domains

3. Create `module.go` to wire everything

4. Register routes in `cmd/server/main.go`

See `docs/architecture/adding-new-features.md` for detailed guide.

## Domain Structure

Each domain follows this structure:

```
domain-name/
├── handler/          # HTTP handlers
│   ├── http.go      # Public handlers
│   └── admin.go     # Admin handlers (optional)
├── service/          # Business logic
│   └── service.go
├── repository/       # Data access
│   ├── repository.go # Interface
│   └── postgres.go   # Implementation
├── model/            # Domain models
│   └── model.go
├── dto/              # Data transfer objects (optional)
│   ├── request.go
│   └── response.go
└── module.go         # Module initialization
```

## Module Pattern

Every module exports:
- `NewModule()` - Initialize the module
- `RegisterRoutes()` - Register HTTP routes
- `GetService()` - Access service for inter-module communication

## Inter-Module Communication

Modules can depend on other modules:

```go
// Posts module depends on articles
postsModule := posts.NewModule(db, articlesModule.GetService())
```

## Best Practices

1. **Keep domains independent** - Minimize dependencies
2. **Use interfaces** - For flexibility and testing
3. **Document APIs** - Clear contracts between modules
4. **Test independently** - Each module should be testable in isolation
5. **Follow naming conventions** - Consistent across all domains

## Documentation

Each domain should have:
- README.md in the domain folder
- API documentation in `docs/domains/`
- Business rules documented
- Examples provided

## Examples

- See `articles/` for a complete domain example
- See `posts/` for inter-module dependencies example
- See `docs/architecture/` for patterns and guides
