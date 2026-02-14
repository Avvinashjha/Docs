package handler

import (
	"go-blog/internal/domains/articles/service"
	"go-blog/internal/platform/templates"
	"net/http"
	"strconv"
)

// AdminHandler handles admin operations for articles
type AdminHandler struct {
	service *service.ArticleService
}

// NewAdminHandler creates a new admin handler
func NewAdminHandler(service *service.ArticleService) *AdminHandler {
	return &AdminHandler{service: service}
}

// Dashboard displays the admin dashboard
func (h *AdminHandler) Dashboard(w http.ResponseWriter, r *http.Request) {
	articles, err := h.service.ListArticles()

	if err != nil {
		http.Error(w, "Failed to load articles", http.StatusInternalServerError)
		return
	}

	templates.Render(w, r, "admin_dashboard.html", articles)
}

// AddForm displays the add article form
func (h *AdminHandler) AddForm(w http.ResponseWriter, r *http.Request) {
	templates.Render(w, r, "admin_add.html", nil)
}

// AddPost handles article creation
func (h *AdminHandler) AddPost(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Invalid form", http.StatusBadRequest)
		return
	}
	title := r.FormValue("title")
	content := r.FormValue("content")
	date := r.FormValue("published_at")

	err := h.service.CreateArticle(title, content, date)

	if err != nil {
		http.Error(w, "Failed to create article", http.StatusInternalServerError)
		return
	}

	// return updated dashboard
	h.Dashboard(w, r)
}

// EditForm displays the edit article form
func (h *AdminHandler) EditForm(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(r.URL.Query().Get("id"))

	article, err := h.service.GetArticle(id)

	if err != nil || article == nil {
		http.NotFound(w, r)
		return
	}

	templates.Render(w, r, "admin_edit.html", article)
}

// EditPost handles article updates
func (h *AdminHandler) EditPost(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Invalid form", http.StatusBadRequest)
		return
	}

	id, _ := strconv.Atoi(r.FormValue("id"))
	title := r.FormValue("title")
	content := r.FormValue("content")
	date := r.FormValue("published_at")

	err := h.service.UpdateArticle(id, title, content, date)

	if err != nil {
		http.Error(w, "Failed to update article", http.StatusInternalServerError)
		return
	}
	h.Dashboard(w, r)
}

// Delete handles article deletion
func (h *AdminHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(r.URL.Query().Get("id"))
	err := h.service.DeleteArticle(id)

	if err != nil {
		http.Error(w, "Failed to delete article", http.StatusInternalServerError)
		return
	}

	// HTMX swap="delete" will remove the row automatically
	w.WriteHeader(http.StatusOK)
}
