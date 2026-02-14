package auth

import (
	"go-blog/internal/shared/auth/handler"
	"go-blog/internal/shared/auth/middleware"
	"go-blog/internal/shared/auth/repository"
	"go-blog/internal/shared/auth/service"
	"go-blog/internal/shared/config"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Module encapsulates the auth domain
type Module struct {
	handler    *handler.AuthHandler
	middleware *middleware.AuthMiddleware
	service    *service.AuthService
	repository *repository.UserRepository
}

// NewModule creates and initializes the auth module
func NewModule(db *pgxpool.Pool, cfg *config.Config) *Module {
	// Initialize repository
	repo := repository.NewUserRepository(db)

	// Initialize JWT service
	jwtService := service.NewJWTService(cfg.JWT.Secret, cfg.JWT.Expiration)

	// Initialize auth service
	authSvc := service.NewAuthService(repo, jwtService)

	// Initialize handlers
	h := handler.NewAuthHandler(authSvc)

	// Initialize middleware
	mw := middleware.NewAuthMiddleware(authSvc)

	return &Module{
		handler:    h,
		middleware: mw,
		service:    authSvc,
		repository: repo,
	}
}

// RegisterRoutes registers all auth-related HTTP routes
func (m *Module) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			m.handler.LoginForm(w, r)
		} else if r.Method == http.MethodPost {
			m.handler.Login(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	mux.HandleFunc("/logout", m.handler.Logout)
}

// Middleware returns the auth middleware
func (m *Module) Middleware() *middleware.AuthMiddleware {
	return m.middleware
}

// GetService returns the auth service for inter-module communication
func (m *Module) GetService() *service.AuthService {
	return m.service
}
