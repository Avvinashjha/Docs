# 🏗️ Go Blog Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  (HTMX + Modern CSS Styles)                                 │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTP Requests
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    Go HTTP Server                            │
│                  (Port: 5050)                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
   Public Routes   Auth Routes    Admin Routes
   (No Auth)      (Login/out)    (JWT Protected)
        │               │               │
        └───────────────┴───────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
   Handlers       Middleware       Templates
   (HTTP Layer)   (Auth Check)    (HTML Views)
        │               │
        └───────────────┘
                │
        ┌───────┴───────┐
        │               │
        ▼               ▼
    Services      JWT Service
    (Business)    (Auth Logic)
        │
        ▼
   Repositories
   (Data Layer)
        │
        ▼
   PostgreSQL
   (Database)
```

---

## 🔄 Request Flow

### Public Article View
```
Browser → Handler → Service → Repository → PostgreSQL
                                              │
PostgreSQL → Repository → Service → Handler → Template → Browser
```

### Admin Login Flow
```
1. GET /login
   Browser → AuthHandler.LoginForm → Template → Browser

2. POST /login (username, password)
   Browser → AuthHandler.Login
          → AuthService.Authenticate
          → UserRepository.GetByUsername
          → PostgreSQL
          → bcrypt.CompareHashAndPassword
          → JWTService.GenerateToken
          → Set Cookie (token)
          → Redirect /admin

3. GET /admin (with JWT cookie)
   Browser → AuthMiddleware.RequireAuth
          → JWTService.ValidateToken
          → Add UserID to Context
          → AdminHandler.Dashboard
          → ArticleService.ListArticles
          → Repository → PostgreSQL
          → Template → Browser
```

---

## 📦 Package Structure

### `/cmd/server/`
**Purpose**: Application entry point
- Initializes all dependencies
- Sets up routing
- Starts HTTP server

**Key File**: `main.go`
```go
Config → Database → Repositories → Services → Handlers → Routes → Server
```

### `/internal/config/`
**Purpose**: Configuration management
- Loads environment variables
- Provides defaults
- Type-safe config struct

**Key Functions**:
- `Load()` - Load all configuration

### `/internal/handler/`
**Purpose**: HTTP request handling
- Parse requests
- Call services
- Render templates

**Files**:
- `article.go` - Public article routes
- `admin.go` - Admin CRUD operations
- `auth.go` - Login/logout
- `template.go` - Template management

### `/internal/middleware/`
**Purpose**: HTTP middleware
- Request preprocessing
- Authentication checks
- Context enrichment

**Key Components**:
- `AuthMiddleware` - JWT validation
- `RequireAuth()` - Route protection

### `/internal/service/`
**Purpose**: Business logic
- Coordinate operations
- Validate data
- Transform models

**Files**:
- `article.go` - Article business logic
- `auth_service.go` - Authentication
- `jwt_service.go` - JWT token handling

### `/internal/repository/`
**Purpose**: Data access layer
- SQL queries
- Data mapping
- Connection management

**Files**:
- `article.go` - Article interface
- `article_postgres.go` - PostgreSQL implementation
- `user_postgres.go` - User data access
- `postgres.go` - Connection pool

### `/internal/model/`
**Purpose**: Domain models
- Data structures
- Business entities

**Files**:
- `article.go`
- `user.go`

### `/web/static/`
**Purpose**: Static assets
- CSS stylesheets
- JavaScript files
- Images

### `/web/templates/`
**Purpose**: HTML templates
- Layout template
- Page templates
- Reusable components

---

## 🔐 Authentication Flow

### JWT Token Structure
```
Header (Base64):
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload (Base64):
{
  "user_id": 1,
  "username": "admin",
  "iat": 1234567890,
  "exp": 1234654290
}

Signature:
HMACSHA256(
  base64(header) + "." + base64(payload),
  secret_key
)

Final Token:
<header>.<payload>.<signature>
```

### Cookie Storage
```
Name: token
Value: <JWT token>
HttpOnly: true (prevents JavaScript access)
SameSite: Strict (CSRF protection)
MaxAge: 86400 (24 hours)
```

---

## 🎨 Template System

### Template Hierarchy
```
layout.html (base)
├── title (block)
└── content (block)
    ├── home.html
    ├── article.html
    ├── login.html
    ├── admin_dashboard.html
    ├── admin_add.html
    └── admin_edit.html
```

### Template Loading Strategy
```go
// Each page gets its own template set with layout
templates["home.html"] = ParseFiles("layout.html", "home.html")
templates["admin_dashboard.html"] = ParseFiles("layout.html", "admin_dashboard.html")
```

**Why?** Prevents template name collisions when multiple pages define same blocks.

---

## 🔒 Security Layers

### Layer 1: Network
- HTTPS in production
- Firewall rules

### Layer 2: Application
- JWT authentication
- Middleware protection
- Input validation

### Layer 3: Session
- HTTP-only cookies
- SameSite attribute
- Token expiration

### Layer 4: Password
- Bcrypt hashing
- High work factor
- Salt per password

### Layer 5: Database
- Parameterized queries
- Connection pooling
- Least privilege access

---

## 📊 Data Flow

### Create Article
```
1. User fills form in admin_add.html
2. HTMX sends POST to /admin/add
3. AuthMiddleware validates JWT
4. AdminHandler.AddPost extracts form data
5. ArticleService.CreateArticle validates
6. ArticleRepository.Create inserts to PostgreSQL
7. Returns updated dashboard (HTMX swaps content)
```

### View Article
```
1. User clicks article link
2. HTMX sends GET to /article?id=1
3. ArticleHandler.Get parses ID
4. ArticleService.GetArticle fetches
5. ArticleRepository.GetByID queries PostgreSQL
6. Template renders article
7. HTMX replaces content div
```

---

## 🚀 Scalability Considerations

### Horizontal Scaling
✅ **Stateless JWT** - No session affinity needed
✅ **Static assets** - Can be served by CDN
✅ **Connection pooling** - Efficient DB usage

### Vertical Scaling
✅ **Go concurrency** - Goroutines handle many connections
✅ **PostgreSQL** - Can handle large datasets
✅ **Minimal dependencies** - Small memory footprint

### Future Enhancements
- [ ] Redis for caching
- [ ] CDN for static assets
- [ ] Read replicas for database
- [ ] Load balancer support

---

## 🧪 Testing Strategy

### Unit Tests
```
service/ → Mock repository
handler/ → Mock service
repository/ → Test database
```

### Integration Tests
```
Full flow: Handler → Service → Repository → PostgreSQL
```

### E2E Tests
```
Browser → Server → Database → Browser
(Can use Playwright or Selenium)
```

---

## 📈 Monitoring Points

### Application Metrics
- Request count per endpoint
- Response times
- Error rates
- Active connections

### Database Metrics
- Query performance
- Connection pool usage
- Slow queries
- Lock contention

### Security Metrics
- Failed login attempts
- Token validation failures
- Unusual access patterns

---

## 🔧 Configuration Matrix

| Environment | Database | JWT Secret | Port | Secure Cookies |
|-------------|----------|------------|------|----------------|
| Development | localhost:5433 | default | 5050 | false |
| Staging | RDS endpoint | env var | 8080 | true |
| Production | RDS endpoint | env var | 443 | true |

---

## 📝 Code Style Guide

### Naming Conventions
- **Handlers**: `XxxHandler` (e.g., `ArticleHandler`)
- **Services**: `XxxService` (e.g., `AuthService`)
- **Repositories**: `XxxRepository` (e.g., `UserRepository`)
- **Middleware**: `XxxMiddleware` (e.g., `AuthMiddleware`)

### Error Handling
```go
// Always handle errors explicitly
result, err := service.DoSomething()
if err != nil {
    return err // or log and handle
}
```

### Context Usage
```go
// Pass context for request-scoped values
ctx := context.WithValue(r.Context(), UserIDKey, userID)
next(w, r.WithContext(ctx))
```

---

## 🎓 Design Patterns Used

1. **Repository Pattern** - Data access abstraction
2. **Service Layer** - Business logic separation
3. **Dependency Injection** - Loosely coupled components
4. **Middleware Pattern** - Cross-cutting concerns
5. **Template Pattern** - HTML rendering
6. **Factory Pattern** - Object creation (New* functions)
7. **Strategy Pattern** - JWT token strategy

---

**This architecture provides a solid foundation for a production-ready blog application!** 🎉
