package service

import (
	"go-blog/internal/domains/articles/model"
	"go-blog/internal/domains/articles/repository"
)

// ArticleService handles business logic for articles
type ArticleService struct {
	repo repository.ArticleRepository
}

// NewArticleService creates a new article service
func NewArticleService(repo repository.ArticleRepository) *ArticleService {
	return &ArticleService{repo: repo}
}

// ListArticles returns all articles
func (s *ArticleService) ListArticles() ([]model.Article, error) {
	return s.repo.GetAll()
}

// GetArticle returns a single article by ID
func (s *ArticleService) GetArticle(id int) (*model.Article, error) {
	return s.repo.GetByID(id)
}

// CreateArticle creates a new article
func (s *ArticleService) CreateArticle(title, content, date string) error {
	return s.repo.Create(title, content, date)
}

// UpdateArticle updates an existing article
func (s *ArticleService) UpdateArticle(id int, title, content, date string) error {
	return s.repo.Update(id, title, content, date)
}

// DeleteArticle deletes an article
func (s *ArticleService) DeleteArticle(id int) error {
	return s.repo.Delete(id)
}
