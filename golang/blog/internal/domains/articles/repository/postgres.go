package repository

import (
	"context"
	"go-blog/internal/domains/articles/model"

	"github.com/jackc/pgx/v5/pgxpool"
)

// PostgresArticleRepository implements ArticleRepository using PostgreSQL
type PostgresArticleRepository struct {
	db *pgxpool.Pool
}

// NewPostgresArticleRepository creates a new PostgreSQL article repository
func NewPostgresArticleRepository(db *pgxpool.Pool) *PostgresArticleRepository {
	return &PostgresArticleRepository{db: db}
}

func (r *PostgresArticleRepository) GetAll() ([]model.Article, error) {
	rows, err := r.db.Query(context.Background(), "SELECT id, title, content, published_at FROM articles ORDER BY published_at DESC")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var articles []model.Article

	for rows.Next() {
		var a model.Article
		err := rows.Scan(&a.ID, &a.Title, &a.Content, &a.Date)
		if err != nil {
			return nil, err
		}
		articles = append(articles, a)
	}
	return articles, nil
}

func (r *PostgresArticleRepository) GetByID(id int) (*model.Article, error) {
	var a model.Article

	err := r.db.QueryRow(context.Background(),
		`SELECT id, title, content, published_at FROM articles WHERE id = $1`,
		id,
	).Scan(&a.ID, &a.Title, &a.Content, &a.Date)
	if err != nil {
		return nil, nil
	}
	return &a, nil
}

func (r *PostgresArticleRepository) Create(title, content, date string) error {
	_, err := r.db.Exec(context.Background(),
		`INSERT INTO articles (title, content, published_at) VALUES ($1, $2, $3)`,
		title, content, date,
	)
	return err
}

func (r *PostgresArticleRepository) Update(id int, title, content, date string) error {
	_, err := r.db.Exec(context.Background(),
		`UPDATE articles SET title=$1, content=$2, published_at=$3 WHERE id=$4`,
		title, content, date, id,
	)
	return err
}

func (r *PostgresArticleRepository) Delete(id int) error {
	_, err := r.db.Exec(context.Background(),
		`DELETE FROM articles where id=$1`, id,
	)
	return err
}
