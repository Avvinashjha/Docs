package database

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

// NewPostgresPool creates a new PostgreSQL connection pool
func NewPostgresPool(dsn string) (*pgxpool.Pool, error) {
	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return nil, err
	}
	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	return pgxpool.NewWithConfig(ctx, config)
}
