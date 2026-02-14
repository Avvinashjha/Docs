package repository

import (
	"go-blog/internal/domains/articles/model"
)

// ArticleRepository defines the interface for article data access
type ArticleRepository interface {
	GetAll() ([]model.Article, error)
	GetByID(id int) (*model.Article, error)
	Create(title, content, date string) error
	Update(id int, title, content, date string) error
	Delete(id int) error
}
