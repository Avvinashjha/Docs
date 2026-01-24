package repository

import "github.com/Avvinashjha/todo/domain"

type TodoRepository interface {
	Create(todo domain.Todo) error
	GetByID(id string) (*domain.Todo, error)
	List() ([]domain.Todo, error)
	Update(todo domain.Todo) error
	Delete(id string) error
}
