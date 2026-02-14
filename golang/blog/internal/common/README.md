# Common Utilities

This folder contains reusable utility packages used across the application.

## Packages

### Logger
Structured logging

**Location:** `logger/`
**Usage:**
```go
import "go-blog/internal/common/logger"

logger.Info("Server started on port %s", port)
logger.Error("Failed to connect: %v", err)
```

### Utils
Helper functions

**Location:** `utils/`
**Includes:**
- String utilities (truncate, slugify)
- Time utilities (format, parse)

**Usage:**
```go
import "go-blog/internal/common/utils"

slug := utils.Slugify("My Article Title") // "my-article-title"
excerpt := utils.TruncateString(content, 160)
```

### Pagination
Pagination helper

**Location:** `pagination/`
**Usage:**
```go
import "go-blog/internal/common/pagination"

paginator := pagination.NewPaginator(page, perPage, totalItems)
offset := paginator.Offset()
hasNext := paginator.HasNext()
```

### Validator (Future)
Data validation

**Location:** `validator/`
**Will provide:** Input validation, business rule validation

## Best Practices

1. **Pure functions** - No side effects
2. **Well tested** - High test coverage
3. **Documented** - Clear examples
4. **Generic** - Not domain-specific
5. **Stable** - Rarely changes

## Adding Utilities

Add to common/ if:
- Used by multiple domains
- Generic and reusable
- No business logic
- Pure utility function

Examples:
- ✅ String formatting
- ✅ Date parsing
- ✅ Pagination
- ❌ Article validation (belongs in articles domain)
- ❌ User authentication (belongs in auth module)
