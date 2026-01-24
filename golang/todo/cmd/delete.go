package cmd

import (
	"flag"
	"fmt"

	"github.com/Avvinashjha/todo/domain"
	"github.com/Avvinashjha/todo/store"
)

func Delete(args []string, store store.TodoStore) error {

	fs := flag.NewFlagSet("delete", flag.ContinueOnError)

	id := fs.String("id", "", "todo id (required)")

	if err := fs.Parse(args); err != nil {
		return err
	}
	fmt.Println(*id)
	// validate id
	if *id == "" {
		return fmt.Errorf("id is a required field")
	}

	// load todos
	todos, err := store.Load()

	if err != nil {
		return err
	}

	// find todo to delete
	filteredTodo := make([]domain.Todo, 0, len(todos))
	isTodoExists := false

	for _, t := range todos {
		if string(t.ID) != *id {
			filteredTodo = append(filteredTodo, t)
		} else {
			isTodoExists = true
		}
	}
	// early return in case invalid todo id
	if !isTodoExists {
		return fmt.Errorf("invalid todo id %s", *id)
	}
	// save todos
	if err := store.Save(filteredTodo); err != nil {
		return err
	}

	// confirm
	fmt.Printf("Deleted todo with id: %s", *id)
	return nil
}
