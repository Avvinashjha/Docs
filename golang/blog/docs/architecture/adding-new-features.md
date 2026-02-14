# Adding New Features

## Step-by-Step Guide

### 1. Create Domain Folder Structure

```bash
mkdir -p internal/domains/feature-name/{handler,service,repository,model,dto}
```

### 2. Create Domain Model

```go
// internal/domains/feature-name/model/feature.go
package model

type Feature struct {
    ID      int
    Name    string
    // ... other fields
}
```

### 3. Create Repository Interface

```go
// internal/domains/feature-name/repository/repository.go
package repository

type FeatureRepository interface {
    Create(feature *model.Feature) error
    GetByID(id int) (*model.Feature, error)
    List() ([]model.Feature, error)
    Update(feature *model.Feature) error
    Delete(id int) error
}
```

### 4. Implement PostgreSQL Repository

```go
// internal/domains/feature-name/repository/postgres.go
package repository

import "github.com/jackc/pgx/v5/pgxpool"

type PostgresFeatureRepository struct {
    db *pgxpool.Pool
}

func NewPostgresFeatureRepository(db *pgxpool.Pool) *PostgresFeatureRepository {
    return &PostgresFeatureRepository{db: db}
}

// Implement interface methods...
```

### 5. Create Service

```go
// internal/domains/feature-name/service/feature_service.go
package service

type FeatureService struct {
    repo repository.FeatureRepository
}

func NewFeatureService(repo repository.FeatureRepository) *FeatureService {
    return &FeatureService{repo: repo}
}

// Implement business logic...
```

### 6. Create Handler

```go
// internal/domains/feature-name/handler/http.go
package handler

type FeatureHandler struct {
    service *service.FeatureService
}

func NewFeatureHandler(service *service.FeatureService) *FeatureHandler {
    return &FeatureHandler{service: service}
}

// Implement HTTP handlers...
```

### 7. Create Module

```go
// internal/domains/feature-name/module.go
package featurename

import (
    "go-blog/internal/domains/feature-name/handler"
    "go-blog/internal/domains/feature-name/repository"
    "go-blog/internal/domains/feature-name/service"
    "net/http"
    "github.com/jackc/pgx/v5/pgxpool"
)

type Module struct {
    handler    *handler.FeatureHandler
    service    *service.FeatureService
    repository repository.FeatureRepository
}

func NewModule(db *pgxpool.Pool) *Module {
    repo := repository.NewPostgresFeatureRepository(db)
    svc := service.NewFeatureService(repo)
    h := handler.NewFeatureHandler(svc)
    
    return &Module{
        handler:    h,
        service:    svc,
        repository: repo,
    }
}

func (m *Module) RegisterRoutes(mux *http.ServeMux, authMw AuthMiddleware) {
    mux.HandleFunc("/features", m.handler.List)
    mux.HandleFunc("/features/", m.handler.Get)
    
    if authMw != nil {
        mux.HandleFunc("/admin/features", authMw.RequireAuth(m.handler.AdminList))
    }
}

func (m *Module) GetService() *service.FeatureService {
    return m.service
}
```

### 8. Wire in Main

```go
// cmd/server/main.go
import "go-blog/internal/domains/feature-name"

func main() {
    // ...
    featureModule := featurename.NewModule(db)
    featureModule.RegisterRoutes(mux, authModule.Middleware())
    // ...
}
```

### 9. Create Migration

```sql
-- migrations/feature-name/001_create_features.sql
CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 10. Create Templates

```
web/templates/feature-name/
├── list.html
├── detail.html
└── admin/
    ├── dashboard.html
    ├── add.html
    └── edit.html
```

### 11. Create CSS

```
web/static/css/feature-name/
├── list.css
└── detail.css
```

## Time Estimate

Following this pattern, adding a new feature takes approximately **2-4 hours**.

## Checklist

- [ ] Create folder structure
- [ ] Define domain model
- [ ] Create repository interface
- [ ] Implement PostgreSQL repository
- [ ] Create service with business logic
- [ ] Create HTTP handlers
- [ ] Create module.go
- [ ] Wire in main.go
- [ ] Create database migration
- [ ] Create templates
- [ ] Create CSS
- [ ] Write tests
- [ ] Update documentation
