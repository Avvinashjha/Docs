package handler

import (
	"encoding/json"
	"go-blog/internal/domains/posts/model"
	"go-blog/internal/domains/posts/service"
	"net/http"
	"strconv"
)

// PostHandler handles HTTP requests for posts
type PostHandler struct {
	service *service.PostService
}

// NewPostHandler creates a new post handler
func NewPostHandler(service *service.PostService) *PostHandler {
	return &PostHandler{service: service}
}

// List handles listing all posts
func (h *PostHandler) List(w http.ResponseWriter, r *http.Request) {
	posts, err := h.service.ListPosts()
	if err != nil {
		http.Error(w, "Failed to fetch posts", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// Get handles fetching a single post
func (h *PostHandler) Get(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	post, err := h.service.GetPost(id)
	if err != nil {
		http.Error(w, "Error fetching post", http.StatusInternalServerError)
		return
	}
	if post == nil {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// Create handles post creation
func (h *PostHandler) Create(w http.ResponseWriter, r *http.Request) {
	var post model.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.service.CreatePost(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

// Update handles post updates
func (h *PostHandler) Update(w http.ResponseWriter, r *http.Request) {
	var post model.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.service.UpdatePost(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// Delete handles post deletion
func (h *PostHandler) Delete(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	if err := h.service.DeletePost(id); err != nil {
		http.Error(w, "Failed to delete post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
