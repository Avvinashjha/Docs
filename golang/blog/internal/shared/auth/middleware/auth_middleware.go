package middleware

import (
	"context"
	"go-blog/internal/shared/auth/service"
	"net/http"
)

type contextKey string

const UserIDKey contextKey = "userID"

// AuthMiddleware handles authentication middleware
type AuthMiddleware struct {
	authService *service.AuthService
}

// NewAuthMiddleware creates a new auth middleware
func NewAuthMiddleware(authService *service.AuthService) *AuthMiddleware {
	return &AuthMiddleware{
		authService: authService,
	}
}

// RequireAuth is a middleware that validates JWT token
func (m *AuthMiddleware) RequireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")
		if err != nil {
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}

		userID, err := m.authService.ValidateToken(cookie.Value)
		if err != nil {
			// Token invalid or expired, clear cookie and redirect
			http.SetCookie(w, &http.Cookie{
				Name:   "token",
				Value:  "",
				Path:   "/",
				MaxAge: -1,
			})
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}

		// Add user ID to request context
		ctx := context.WithValue(r.Context(), UserIDKey, userID)
		next(w, r.WithContext(ctx))
	}
}

// GetUserID extracts user ID from request context
func GetUserID(r *http.Request) (int, bool) {
	userID, ok := r.Context().Value(UserIDKey).(int)
	return userID, ok
}
