package model

import "time"

// Article represents a blog article
type Article struct {
	ID      int       `json:"id"`
	Title   string    `json:"title"`
	Content string    `json:"content"`
	Date    time.Time `json:"published_at"`
}
