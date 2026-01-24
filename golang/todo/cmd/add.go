package cmd

import (
	"errors"
	"flag"
	"fmt"

	"github.com/Avvinashjha/todo/domain"
	"github.com/Avvinashjha/todo/store"
)

func Add(args []string, store store.TodoStore) error {
	fs := flag.NewFlagSet("add", flag.ContinueOnError)

	//parse flags
	title := fs.String("title", "", "title of the todo (required)")
	priority := fs.String("priority", "medium", "priority: low | medium | high")
	description := fs.String("description", "", "todo description")

	if err := fs.Parse(args); err != nil {
		return err
	}

	// explicit error handling
	if *title == "" {
		return errors.New("title is required")
	}

	// priority parsing
	var p domain.Priority
	switch *priority {
	case "low":
		p = domain.PriorityLow
	case "medium":
		p = domain.PriorityMedium
	case "high":
		p = domain.PriorityHigh
	default:
		return fmt.Errorf("invalid priority %s", *priority)
	}

	// load
	todos, err := store.Load()
	if err != nil {
		return err
	}

	todo := domain.NewTodo(*title)

	todo.Priority = p

	todo.Description = *description

	// modify
	todos = append(todos, todo)

	// save
	if err := store.Save(todos); err != nil {
		return err
	}

	fmt.Println("Added todo:", todo.Title)
	return nil
}
