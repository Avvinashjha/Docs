package domain

import "time"

type Comment struct {
	ID        string
	Text      string
	CreatedAt time.Time
}
