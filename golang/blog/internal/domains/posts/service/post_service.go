package service

import (
	"errors"
	"go-blog/internal/domains/posts/model"
	"go-blog/internal/domains/posts/repository"
)

// ArticleService interface for dependency injection
type ArticleService interface {
	GetArticle(id int) (interface{}, error)
}

// PostService handles business logic for posts
type PostService struct {
	repo           repository.PostRepository
	articleService ArticleService // Optional dependency
}

// NewPostService creates a new post service
func NewPostService(repo repository.PostRepository, articleService ArticleService) *PostService {
	return &PostService{
		repo:           repo,
		articleService: articleService,
	}
}

// ListPosts returns all posts
func (s *PostService) ListPosts() ([]model.Post, error) {
	return s.repo.GetAll()
}

// GetPost returns a single post by ID
func (s *PostService) GetPost(id int) (*model.Post, error) {
	return s.repo.GetByID(id)
}

// CreatePost creates a new post
func (s *PostService) CreatePost(post *model.Post) error {
	// Validate referenced article exists (if provided)
	if post.ArticleID != nil && s.articleService != nil {
		_, err := s.articleService.GetArticle(*post.ArticleID)
		if err != nil {
			return errors.New("referenced article not found")
		}
	}

	// TODO: Validate quiz reference when quiz module exists

	return s.repo.Create(post)
}

// UpdatePost updates an existing post
func (s *PostService) UpdatePost(post *model.Post) error {
	// Validate referenced article exists (if provided)
	if post.ArticleID != nil && s.articleService != nil {
		_, err := s.articleService.GetArticle(*post.ArticleID)
		if err != nil {
			return errors.New("referenced article not found")
		}
	}

	return s.repo.Update(post)
}

// DeletePost deletes a post
func (s *PostService) DeletePost(id int) error {
	return s.repo.Delete(id)
}
