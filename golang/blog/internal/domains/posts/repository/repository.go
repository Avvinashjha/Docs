package repository

import (
	"go-blog/internal/domains/posts/model"
)

// PostRepository defines the interface for post data access
type PostRepository interface {
	GetAll() ([]model.Post, error)
	GetByID(id int) (*model.Post, error)
	Create(post *model.Post) error
	Update(post *model.Post) error
	Delete(id int) error
}
