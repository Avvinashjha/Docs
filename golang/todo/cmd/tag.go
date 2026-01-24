package cmd

import (
	"errors"
	"flag"
	"fmt"
	"time"

	"github.com/Avvinashjha/todo/store"
)

func Tag(args []string, store store.TodoStore) error {
	if len(args) == 0 {
		return errors.New("tag requires subcommand: add | remove")
	}

	switch args[0] {
	case "add":
		return tagAdd(args[1:], store)
	case "remove":
		return tagRemove(args[1:], store)
	default:
		return fmt.Errorf("unknown tag subcommand: %s", args[0])
	}
}

func tagAdd(args []string, store store.TodoStore) error {
	fs := flag.NewFlagSet("tag add", flag.ContinueOnError)

	id := fs.String("id", "", "todo id (required)")
	tag := fs.String("tag", "", "tag name (required)")

	if err := fs.Parse(args); err != nil {
		return err
	}

	if *id == "" || *tag == "" {
		return errors.New("id and tag are required")
	}

	// load and find todo
	todos, err := store.Load()

	if err != nil {
		return err
	}

	index := -1

	for i := range todos {
		if string(todos[i].ID) == *id {
			index = i
			break
		}
	}

	if index == -1 {
		return fmt.Errorf("todo with id %s not found", *id)
	}

	// prevent duplicate tag
	for _, existing := range todos[index].Tags {
		if existing == *tag {
			return fmt.Errorf("tag %s already exists", *tag)
		}
	}

	// add tag and update timestamp
	todos[index].Tags = append(todos[index].Tags, *tag)
	todos[index].UpdatedAt = time.Now()

	if err := store.Save(todos); err != nil {
		return err
	}

	fmt.Printf("Added tag '%s' to todo %s\n", *tag, *id)
	return nil
}

func tagRemove(args []string, store store.TodoStore) error {
	fs := flag.NewFlagSet("tag remove", flag.ContinueOnError)

	id := fs.String("id", "", "todo id (required)")
	tag := fs.String("tag", "", "tag name (required)")

	if err := fs.Parse(args); err != nil {
		return err
	}

	if *id == "" || *tag == "" {
		return errors.New("id and tag are required")
	}

	// load and find todo
	todos, err := store.Load()
	if err != nil {
		return err
	}

	index := -1

	for i := range todos {
		if string(todos[i].ID) == *id {
			index = i
			break
		}
	}

	if index == -1 {
		return fmt.Errorf("todo with id %s not found", *id)
	}

	// remove tag
	newTag := make([]string, 0, len(todos[index].Tags))
	found := false
	for _, t := range todos[index].Tags {
		if t == *tag {
			found = true
			continue
		}
		newTag = append(newTag, t)
	}
	if !found {
		return fmt.Errorf("tag %s not found", *tag)
	}
	todos[index].Tags = newTag
	todos[index].UpdatedAt = time.Now()

	// save and confirm
	if err := store.Save(todos); err != nil {
		return err
	}

	fmt.Printf("Removed tag '%s' from todo %s\n", *tag, *id)
	return nil
}
