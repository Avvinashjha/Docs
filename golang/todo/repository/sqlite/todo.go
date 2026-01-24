package sqlite

import "database/sql"

type TodoRepository struct {
	db *sql.DB
}

func New(db *sql.DB) *TodoRepository {
	return &TodoRepository{db: db}
}
