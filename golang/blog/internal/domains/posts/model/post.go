package model

import "time"

// Post represents a blog post that can reference articles and quizzes
type Post struct {
	ID        int        `json:"id"`
	Title     string     `json:"title"`
	Content   string     `json:"content"`
	ArticleID *int       `json:"article_id,omitempty"` // Optional reference to article
	QuizID    *int       `json:"quiz_id,omitempty"`    // Optional reference to quiz
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
}
