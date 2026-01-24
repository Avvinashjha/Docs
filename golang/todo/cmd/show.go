package cmd

import (
	"errors"
	"flag"
	"fmt"
	"strings"

	"github.com/Avvinashjha/todo/domain"
	"github.com/Avvinashjha/todo/store"
)

func Show(args []string, store store.TodoStore) error {
	fs := flag.NewFlagSet("show", flag.ContinueOnError)

	id := fs.String("id", "", "todo id (required)")

	if err := fs.Parse(args); err != nil {
		return err
	}

	if *id == "" {
		return errors.New("id is required")
	}

	todos, err := store.Load()

	if err != nil {
		return err
	}

	var todo *domain.Todo

	for i := range todos {
		if string(todos[i].ID) == *id {
			todo = &todos[i]
			break
		}
	}

	if todo == nil {
		return fmt.Errorf("todo with id %s not found", *id)
	}

	// Render output
	fmt.Printf("ID:        %s\n", todo.ID)
	fmt.Printf("Title:     %s\n", todo.Title)
	fmt.Printf("Status:    %s\n", todo.Status)
	fmt.Printf("Priority:  %s\n", todo.Priority)

	// tags
	if len(todo.Tags) > 0 {
		fmt.Printf("Tags:     %s\n", strings.Join(todo.Tags, ", "))
	} else {
		fmt.Println("Tags:     -")
	}

	// description
	fmt.Println()
	fmt.Println("Description")
	fmt.Println("---------------")
	if todo.Description != "" {
		fmt.Println(todo.Description)
	} else {
		fmt.Println("-")
	}

	// comments
	fmt.Println()
	fmt.Println("Comments:")
	fmt.Println("--------------")

	if len(todo.Comments) == 0 {
		fmt.Println("-")
		return nil
	}

	for i, c := range todo.Comments {
		fmt.Printf("[%d] %s\n", i+1, c.CreatedAt.Format("2006-01-02 15:04:05"))
		fmt.Printf(".    %s\n\n", c.Text)
	}
	return nil
}
