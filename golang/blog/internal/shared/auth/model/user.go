package model

// User represents a system user
type User struct {
	ID           int
	Username     string
	PasswordHash string
}
