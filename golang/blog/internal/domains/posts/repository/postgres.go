package repository

import (
	"context"
	"go-blog/internal/domains/posts/model"

	"github.com/jackc/pgx/v5/pgxpool"
)

// PostgresPostRepository implements PostRepository using PostgreSQL
type PostgresPostRepository struct {
	db *pgxpool.Pool
}

// NewPostgresPostRepository creates a new PostgreSQL post repository
func NewPostgresPostRepository(db *pgxpool.Pool) *PostgresPostRepository {
	return &PostgresPostRepository{db: db}
}

func (r *PostgresPostRepository) GetAll() ([]model.Post, error) {
	rows, err := r.db.Query(context.Background(),
		`SELECT id, title, content, article_id, quiz_id, created_at, updated_at 
		 FROM posts ORDER BY created_at DESC`)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []model.Post
	for rows.Next() {
		var p model.Post
		err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.ArticleID, &p.QuizID, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}
	return posts, nil
}

func (r *PostgresPostRepository) GetByID(id int) (*model.Post, error) {
	var p model.Post

	err := r.db.QueryRow(context.Background(),
		`SELECT id, title, content, article_id, quiz_id, created_at, updated_at 
		 FROM posts WHERE id = $1`,
		id,
	).Scan(&p.ID, &p.Title, &p.Content, &p.ArticleID, &p.QuizID, &p.CreatedAt, &p.UpdatedAt)

	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *PostgresPostRepository) Create(post *model.Post) error {
	return r.db.QueryRow(context.Background(),
		`INSERT INTO posts (title, content, article_id, quiz_id, created_at) 
		 VALUES ($1, $2, $3, $4, NOW()) RETURNING id, created_at`,
		post.Title, post.Content, post.ArticleID, post.QuizID,
	).Scan(&post.ID, &post.CreatedAt)
}

func (r *PostgresPostRepository) Update(post *model.Post) error {
	_, err := r.db.Exec(context.Background(),
		`UPDATE posts SET title=$1, content=$2, article_id=$3, quiz_id=$4, updated_at=NOW() 
		 WHERE id=$5`,
		post.Title, post.Content, post.ArticleID, post.QuizID, post.ID,
	)
	return err
}

func (r *PostgresPostRepository) Delete(id int) error {
	_, err := r.db.Exec(context.Background(),
		`DELETE FROM posts WHERE id=$1`, id,
	)
	return err
}
