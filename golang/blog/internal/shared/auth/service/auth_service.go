package service

import (
	"errors"
	"go-blog/internal/shared/auth/model"
	"go-blog/internal/shared/auth/repository"

	"golang.org/x/crypto/bcrypt"
)

// AuthService handles authentication logic
type AuthService struct {
	users      *repository.UserRepository
	jwtService *JWTService
}

// NewAuthService creates a new auth service
func NewAuthService(users *repository.UserRepository, jwtService *JWTService) *AuthService {
	return &AuthService{
		users:      users,
		jwtService: jwtService,
	}
}

// Authenticate validates username and password, returns JWT token
func (s *AuthService) Authenticate(username, password string) (string, *model.User, error) {
	user, err := s.users.GetByUserName(username)
	if err != nil {
		return "", nil, errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return "", nil, errors.New("invalid credentials")
	}

	// Generate JWT token
	token, err := s.jwtService.GenerateToken(user.ID, user.Username)
	if err != nil {
		return "", nil, errors.New("failed to generate token")
	}

	return token, user, nil
}

// ValidateToken validates a JWT token and returns user ID
func (s *AuthService) ValidateToken(token string) (int, error) {
	claims, err := s.jwtService.ValidateToken(token)
	if err != nil {
		return 0, err
	}
	return claims.UserID, nil
}
