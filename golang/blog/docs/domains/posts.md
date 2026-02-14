# Posts Domain (Example)

## Overview

The posts domain demonstrates how to add a new feature that references other domains.

## Domain Model

```go
type Post struct {
    ID        int
    Title     string
    Content   string
    ArticleID *int  // Optional reference to article
    QuizID    *int  // Optional reference to quiz
    CreatedAt time.Time
}
```

## Inter-Module Dependencies

Posts can reference:
- **Articles** - Link to related articles
- **Quizzes** - Embed quizzes in posts

## Implementation Example

```go
type PostService struct {
    repo           PostRepository
    articleService *articleService.ArticleService
    quizService    *quizService.QuizService
}

func (s *PostService) CreatePost(post *model.Post) error {
    // Validate referenced article exists
    if post.ArticleID != nil {
        _, err := s.articleService.GetArticle(*post.ArticleID)
        if err != nil {
            return errors.New("referenced article not found")
        }
    }
    
    return s.repo.Create(post)
}
```

## Module Initialization

```go
func NewPostModule(
    db *pgxpool.Pool,
    articleSvc *articleService.ArticleService,
    quizSvc *quizService.QuizService,
) *Module {
    repo := repository.NewPostgresPostRepository(db)
    svc := service.NewPostService(repo, articleSvc, quizSvc)
    h := handler.NewPostHandler(svc)
    
    return &Module{
        handler: h,
        service: svc,
    }
}
```

## API Endpoints

- `GET /posts` - List all posts
- `GET /posts/{id}` - Get single post
- `POST /admin/posts` - Create post (protected)
- `PUT /admin/posts/{id}` - Update post (protected)
- `DELETE /admin/posts/{id}` - Delete post (protected)

## Database Schema

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    article_id INTEGER REFERENCES articles(id),
    quiz_id INTEGER REFERENCES quizzes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

This demonstrates the modular architecture in action!
