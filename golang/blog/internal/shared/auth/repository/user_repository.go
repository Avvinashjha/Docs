package repository

import (
	"context"
	"go-blog/internal/shared/auth/model"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

// UserRepository handles user data access
type UserRepository struct {
	db *pgxpool.Pool
}

// NewUserRepository creates a new user repository
func NewUserRepository(db *pgxpool.Pool) *UserRepository {
	return &UserRepository{db: db}
}

// GetByUserName finds a user by username
func (r *UserRepository) GetByUserName(username string) (*model.User, error) {
	var u model.User

	err := r.db.QueryRow(context.Background(),
		`SELECT id, username, password_hash FROM users WHERE username=$1`,
		username,
	).Scan(&u.ID, &u.Username, &u.PasswordHash)

	if err != nil {
		return nil, err
	}
	return &u, nil
}

// CreateSession creates a new session (deprecated - using JWT now)
func (r *UserRepository) CreateSession(userID int) (string, error) {
	sessionID := uuid.New().String()

	_, err := r.db.Exec(context.Background(),
		`INSERT INTO sessions (id, user_id, expires_at)
VALUES ($1, $2, $3)`, sessionID, userID, time.Now().Add(24*time.Hour),
	)
	return sessionID, err
}
