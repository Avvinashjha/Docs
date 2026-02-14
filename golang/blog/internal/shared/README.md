# Shared Infrastructure

This folder contains shared infrastructure used by all domain modules.

## Modules

### Auth
Authentication and authorization

**Location:** `auth/`
**Provides:** JWT authentication, user management, auth middleware
**Used by:** All protected routes

### Database
Database connection management

**Location:** `database/`
**Provides:** PostgreSQL connection pooling
**Used by:** All repositories

### Config
Application configuration

**Location:** `config/`
**Provides:** Environment-based configuration
**Used by:** All modules

### HTTP (Future)
HTTP utilities and middleware

**Location:** `http/`
**Provides:** Response helpers, error handling, CORS, logging, rate limiting
**Used by:** All handlers

## Usage

### Auth Module

```go
import "go-blog/internal/shared/auth"

// Initialize
authModule := auth.NewModule(db, cfg)

// Register routes
authModule.RegisterRoutes(mux)

// Use middleware
mux.HandleFunc("/admin", authModule.Middleware().RequireAuth(handler))

// Access service
authService := authModule.GetService()
```

### Database

```go
import "go-blog/internal/shared/database"

// Create connection pool
db, err := database.NewPostgresPool(dsn)
defer db.Close()
```

### Config

```go
import "go-blog/internal/shared/config"

// Load configuration
cfg := config.Load()

// Access values
dbURL := cfg.Database.DSN
jwtSecret := cfg.JWT.Secret
```

## Best Practices

1. **Shared code only** - Only put truly shared code here
2. **Stable interfaces** - Changes affect all domains
3. **Well documented** - Clear contracts
4. **Thoroughly tested** - High test coverage
5. **Backwards compatible** - Avoid breaking changes

## Adding Shared Modules

Only add to shared/ if:
- Used by multiple domains
- Provides infrastructure (not business logic)
- Stable and well-tested
- Has clear interface

Otherwise, keep it in the domain!
