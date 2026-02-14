package handler

import (
	"fmt"
	"go-blog/internal/domains/articles/service"
	"go-blog/internal/platform/templates"
	"net/http"
	"strconv"
)

// ArticleHandler handles HTTP requests for articles
type ArticleHandler struct {
	service *service.ArticleService
}

// NewArticleHandler creates a new article handler
func NewArticleHandler(service *service.ArticleService) *ArticleHandler {
	return &ArticleHandler{service: service}
}

// List handles listing all articles
func (h *ArticleHandler) List(w http.ResponseWriter, r *http.Request) {
	articles, err := h.service.ListArticles()

	if err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to fetch articles", http.StatusInternalServerError)
		return
	}

	templates.Render(w, r, "home.html", articles)
}

// Get handles fetching a single article
func (h *ArticleHandler) Get(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	article, err := h.service.GetArticle(id)

	if err != nil {
		http.Error(w, "Error fetching article", http.StatusInternalServerError)
		return
	}
	if article == nil {
		http.NotFound(w, r)
		return
	}

	templates.Render(w, r, "article.html", article)
}
