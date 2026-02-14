package config

import (
	"os"
	"time"
)

type Config struct {
	Database DatabaseConfig
	JWT      JWTConfig
	Server   ServerConfig
}

type DatabaseConfig struct {
	DSN string
}

type JWTConfig struct {
	Secret     string
	Expiration time.Duration
}

type ServerConfig struct {
	Port string
}

// Load reads configuration from environment variables with defaults
func Load() *Config {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "your-secret-key-change-in-production"
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://bloguser:blogpass@localhost:5433/goblog?sslmode=disable"
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "5050"
	}

	return &Config{
		Database: DatabaseConfig{
			DSN: dsn,
		},
		JWT: JWTConfig{
			Secret:     jwtSecret,
			Expiration: 24 * time.Hour,
		},
		Server: ServerConfig{
			Port: port,
		},
	}
}
