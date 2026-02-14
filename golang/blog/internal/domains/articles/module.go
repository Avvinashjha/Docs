package articles

import (
	"go-blog/internal/domains/articles/handler"
	"go-blog/internal/domains/articles/repository"
	"go-blog/internal/domains/articles/service"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Module encapsulates the articles domain
type Module struct {
	handler      *handler.ArticleHandler
	adminHandler *handler.AdminHandler
	service      *service.ArticleService
	repository   repository.ArticleRepository
}

// AuthMiddleware is an interface for authentication middleware
type AuthMiddleware interface {
	RequireAuth(next http.HandlerFunc) http.HandlerFunc
}

// NewModule creates and initializes the articles module
func NewModule(db *pgxpool.Pool) *Module {
	// Initialize repository
	repo := repository.NewPostgresArticleRepository(db)

	// Initialize service
	svc := service.NewArticleService(repo)

	// Initialize handlers
	h := handler.NewArticleHandler(svc)
	adminH := handler.NewAdminHandler(svc)

	return &Module{
		handler:      h,
		adminHandler: adminH,
		service:      svc,
		repository:   repo,
	}
}

// RegisterRoutes registers all article-related HTTP routes
func (m *Module) RegisterRoutes(mux *http.ServeMux, authMw AuthMiddleware) {
	// Public routes
	mux.HandleFunc("/", m.handler.List)
	mux.HandleFunc("/article", m.handler.Get)

	// Protected admin routes
	if authMw != nil {
		mux.HandleFunc("/admin", authMw.RequireAuth(m.adminHandler.Dashboard))
		mux.HandleFunc("/admin/add", authMw.RequireAuth(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				m.adminHandler.AddForm(w, r)
			case http.MethodPost:
				m.adminHandler.AddPost(w, r)
			default:
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			}
		}))
		mux.HandleFunc("/admin/edit", authMw.RequireAuth(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				m.adminHandler.EditForm(w, r)
			case http.MethodPost:
				m.adminHandler.EditPost(w, r)
			default:
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			}
		}))
		mux.HandleFunc("/admin/delete", authMw.RequireAuth(m.adminHandler.Delete))
	}
}

// GetService returns the article service for inter-module communication
func (m *Module) GetService() *service.ArticleService {
	return m.service
}

// GetHandler returns the article handler (useful for testing)
func (m *Module) GetHandler() *handler.ArticleHandler {
	return m.handler
}

// GetAdminHandler returns the admin handler (useful for testing)
func (m *Module) GetAdminHandler() *handler.AdminHandler {
	return m.adminHandler
}
