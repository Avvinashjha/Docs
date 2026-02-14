package handler

import (
	"fmt"
	"go-blog/internal/platform/templates"
	"go-blog/internal/shared/auth/service"
	"net/http"
	"time"
)

// AuthHandler handles authentication HTTP requests
type AuthHandler struct {
	auth *service.AuthService
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(auth *service.AuthService) *AuthHandler {
	return &AuthHandler{auth: auth}
}

// LoginForm displays the login form
func (h *AuthHandler) LoginForm(w http.ResponseWriter, r *http.Request) {
	// Check if already logged in
	if cookie, err := r.Cookie("token"); err == nil && cookie.Value != "" {
		if _, err := h.auth.ValidateToken(cookie.Value); err == nil {
			http.Redirect(w, r, "/admin", http.StatusSeeOther)
			return
		}
	}

	templates.Render(w, r, "login.html", nil)
}

// Login handles authentication
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Invalid form data", http.StatusBadRequest)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	// Authenticate and get JWT token
	token, user, err := h.auth.Authenticate(username, password)
	if err != nil {
		http.Error(w, "Invalid Credentials", http.StatusUnauthorized)
		return
	}

	// Set JWT token in HTTP-only cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   false, // Set to true in production with HTTPS
		SameSite: http.SameSiteStrictMode,
		MaxAge:   86400, // 24 hours
	})

	fmt.Printf("User %s logged in successfully\n", user.Username)
	http.Redirect(w, r, "/admin", http.StatusSeeOther)
}

// Logout handles user logout
func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	// Clear the token cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
		Expires:  time.Unix(0, 0),
	})
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
