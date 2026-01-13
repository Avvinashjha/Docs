package store

import "github.com/Avvinashjha/todo/domain"

type TodoStore interface {
	Load() ([]domain.Todo, error)
	Save([]domain.Todo) error
}
