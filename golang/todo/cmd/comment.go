package cmd

import (
	"errors"
	"flag"
	"fmt"
	"time"

	"github.com/Avvinashjha/todo/domain"
	"github.com/Avvinashjha/todo/store"
	"github.com/Avvinashjha/todo/util"
)

func Comments(args []string, store store.TodoStore) error {
	fs := flag.NewFlagSet("comment", flag.ContinueOnError)

	id := fs.String("id", "", "todo id (required)")
	comment := fs.String("comment", "", "comment (required)")

	// pase the args
	if err := fs.Parse(args); err != nil {
		return err
	}

	// validate id and comment requirement
	if *id == "" || *comment == "" {
		return errors.New("id and comment are required")
	}

	// load todos
	todos, err := store.Load()

	if err != nil {
		return err
	}

	// find todo
	index := -1
	for i := range todos {
		if string(todos[i].ID) == *id {
			index = i
			break
		}
	}

	if index == -1 {
		return fmt.Errorf("todo with '%s' not found", *id)
	}
	now := time.Now()

	// update the comments of the todo
	todos[index].Comments = append(todos[index].Comments, domain.Comment{
		ID:        util.GenerateID(),
		Text:      *comment,
		CreatedAt: now,
	})
	todos[index].UpdatedAt = now

	// save todos
	if err := store.Save(todos); err != nil {
		return err
	}

	// confirm
	fmt.Printf("added. comment to todo %s\n", *id)
	return nil
}
