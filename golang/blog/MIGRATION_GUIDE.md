# Migration Guide: From Layered to Domain-Driven Architecture

## Overview

This guide explains the migration from a layered architecture to a domain-driven modular architecture.

## What Changed

### Before (Layered Architecture)
```
internal/
├── handler/      # All handlers mixed together
├── service/      # All services mixed together
├── repository/   # All repositories mixed together
└── model/        # All models mixed together
```

### After (Domain-Driven Architecture)
```
internal/
├── domains/
│   ├── articles/  # Self-contained article domain
│   └── posts/     # Self-contained post domain
├── shared/
│   ├── auth/      # Shared authentication
│   ├── database/  # Database connections
│   └── config/    # Configuration
└── common/
    ├── logger/    # Logging utilities
    ├── utils/     # Helper functions
    └── pagination/# Pagination
```

## Benefits

1. **Clear Boundaries** - Each feature is self-contained
2. **Parallel Development** - Multiple developers can work without conflicts
3. **Easy Testing** - Test modules in isolation
4. **Scalability** - Add new features without affecting existing ones
5. **Maintainability** - Changes localized to specific domains

## New Structure Explained

### Domains (`internal/domains/`)

Each domain is a complete feature with:
- **handler/** - HTTP request handling
- **service/** - Business logic
- **repository/** - Data access
- **model/** - Domain models
- **dto/** - Data transfer objects
- **module.go** - Module initialization and wiring

### Shared Infrastructure (`internal/shared/`)

Common infrastructure used by all domains:
- **auth/** - Authentication and authorization
- **database/** - Database connection pooling
- **config/** - Application configuration
- **http/** - HTTP utilities and middleware

### Common Utilities (`internal/common/`)

Reusable utilities:
- **logger/** - Structured logging
- **validator/** - Data validation
- **pagination/** - Pagination helpers
- **utils/** - String, time, and other utilities

## How to Use

### 1. Importing from Domains

```go
// Old way
import "go-blog/internal/service"

// New way
import articleService "go-blog/internal/domains/articles/service"
```

### 2. Initializing Modules

```go
// Initialize database
db := database.NewPostgresPool(cfg.Database.DSN)

// Initialize auth module
authModule := auth.NewModule(db, cfg)

// Initialize domain modules
articlesModule := articles.NewModule(db)
postsModule := posts.NewModule(db, articlesModule.GetService())

// Register routes
mux := http.NewServeMux()
authModule.RegisterRoutes(mux)
articlesModule.RegisterRoutes(mux, authModule.Middleware())
postsModule.RegisterRoutes(mux, authModule.Middleware())
```

### 3. Inter-Module Communication

Modules can depend on other modules through service interfaces:

```go
// Posts module depends on articles module
postsModule := posts.NewModule(db, articlesModule.GetService())
```

## Migration Checklist

- [x] Create new folder structure
- [x] Move articles to `internal/domains/articles/`
- [x] Extract auth to `internal/shared/auth/`
- [x] Extract common utilities to `internal/common/`
- [x] Create module interfaces
- [x] Add example posts domain
- [x] Create documentation
- [ ] Update main.go to use new structure
- [ ] Update templates to use new paths
- [ ] Run tests
- [ ] Update deployment scripts

## Next Steps

1. **Update main.go** - Wire up the new modules
2. **Migrate templates** - Move to domain-specific folders
3. **Add tests** - Test each module independently
4. **Add new features** - Follow the pattern in `docs/architecture/adding-new-features.md`

## Backwards Compatibility

The old structure is still present for reference. Once you've verified the new structure works, you can:

1. Delete old files in `internal/handler/`, `internal/service/`, etc.
2. Update any remaining imports
3. Clean up unused code

## Need Help?

- See `docs/architecture/domain-driven-design.md` for architecture details
- See `docs/architecture/adding-new-features.md` for step-by-step guide
- See `docs/architecture/module-pattern.md` for module patterns
- Check domain-specific docs in `docs/domains/`

## Example: Adding a Quiz Feature

```bash
# 1. Create structure
mkdir -p internal/domains/quizzes/{handler,service,repository,model,dto}

# 2. Follow the pattern from posts domain
# 3. Wire in main.go
# 4. Takes 2-4 hours total!
```

The modular architecture makes adding features fast and safe!
