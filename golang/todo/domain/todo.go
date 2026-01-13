package domain

import "time"

type TodoID string
type Status string

const (
	StatusTodo  Status = "todo"
	StatusDoing Status = "doing"
	StatusDone  Status = "done"
)

type Priority int

// type constants as enums
const (
	PriorityLow Priority = iota + 1
	PriorityMedium
	PriorityHigh
)

type Todo struct {
	ID          TodoID
	Title       string
	Description string

	Priority Priority
	Status   Status

	Tags     []string
	Comments []string

	CreatedAt time.Time
	UpdatedAt time.Time
}

// Constructor function
// go does not have constructor like Java instead
func NewTodo(title string) Todo {
	now := time.Now()

	return Todo{
		ID:        TodoID(now.Format("20060102150405")),
		Title:     title,
		Status:    StatusTodo,
		Priority:  PriorityMedium,
		CreatedAt: now,
		UpdatedAt: now,
	}
}
