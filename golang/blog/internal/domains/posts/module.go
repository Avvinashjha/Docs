package posts

import (
	"go-blog/internal/domains/posts/handler"
	"go-blog/internal/domains/posts/repository"
	"go-blog/internal/domains/posts/service"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Module encapsulates the posts domain
type Module struct {
	handler    *handler.PostHandler
	service    *service.PostService
	repository repository.PostRepository
}

// AuthMiddleware is an interface for authentication middleware
type AuthMiddleware interface {
	RequireAuth(next http.HandlerFunc) http.HandlerFunc
}

// NewModule creates and initializes the posts module
// articleService is optional - pass nil if not needed
func NewModule(db *pgxpool.Pool, articleService service.ArticleService) *Module {
	// Initialize repository
	repo := repository.NewPostgresPostRepository(db)

	// Initialize service with optional article service dependency
	svc := service.NewPostService(repo, articleService)

	// Initialize handler
	h := handler.NewPostHandler(svc)

	return &Module{
		handler:    h,
		service:    svc,
		repository: repo,
	}
}

// RegisterRoutes registers all post-related HTTP routes
func (m *Module) RegisterRoutes(mux *http.ServeMux, authMw AuthMiddleware) {
	// Public routes
	mux.HandleFunc("/posts", m.handler.List)
	mux.HandleFunc("/posts/", m.handler.Get)

	// Protected admin routes
	if authMw != nil {
		mux.HandleFunc("/admin/posts", authMw.RequireAuth(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				m.handler.List(w, r)
			case http.MethodPost:
				m.handler.Create(w, r)
			default:
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			}
		}))
		mux.HandleFunc("/admin/posts/", authMw.RequireAuth(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodPut:
				m.handler.Update(w, r)
			case http.MethodDelete:
				m.handler.Delete(w, r)
			default:
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			}
		}))
	}
}

// GetService returns the post service for inter-module communication
func (m *Module) GetService() *service.PostService {
	return m.service
}
