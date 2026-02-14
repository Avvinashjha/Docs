# Articles Domain

## Overview

The articles domain handles blog article management.

## Domain Model

```go
type Article struct {
    ID      int       `json:"id"`
    Title   string    `json:"title"`
    Content string    `json:"content"`
    Date    time.Time `json:"published_at"`
}
```

## API Endpoints

### Public Routes

- `GET /` - List all articles
- `GET /article?id={id}` - Get single article

### Admin Routes (Protected)

- `GET /admin` - Admin dashboard
- `GET /admin/add` - Add article form
- `POST /admin/add` - Create article
- `GET /admin/edit?id={id}` - Edit article form
- `POST /admin/edit` - Update article
- `DELETE /admin/delete?id={id}` - Delete article

## Business Rules

1. Articles must have a title and content
2. Published date defaults to current date
3. Only authenticated users can manage articles
4. Articles are ordered by published date (newest first)

## Database Schema

```sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL
);
```

## Templates

- `web/templates/articles/list.html` - Article list
- `web/templates/articles/detail.html` - Article detail
- `web/templates/articles/admin/dashboard.html` - Admin dashboard
- `web/templates/articles/admin/add.html` - Add form
- `web/templates/articles/admin/edit.html` - Edit form

## Future Enhancements

- [ ] Add article categories
- [ ] Add tags
- [ ] Add featured image
- [ ] Add draft/published status
- [ ] Add author attribution
- [ ] Add comments
- [ ] Add search functionality
