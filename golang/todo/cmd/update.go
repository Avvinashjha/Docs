package cmd

import (
	"errors"
	"flag"
	"fmt"
	"time"

	"github.com/Avvinashjha/todo/domain"
	"github.com/Avvinashjha/todo/store"
)

/*
Goal:
todo update --id 123 --title "New title"
todo update --id 123 --status done
todo update --id 123 --priority 3
todo update --id 123 --description "Updated desc"
*
*/
func Update(args []string, store store.TodoStore) error {
	fs := flag.NewFlagSet("update", flag.ContinueOnError)

	id := fs.String("id", "", "todo id (required)")
	title := fs.String("title", "", "update title")
	description := fs.String("description", "", "update description")
	statusFlag := fs.String("status", "", "todo | doing | done")
	priorityFlag := fs.Int("priority", -1, "1=Low, 2=Medium, 3=High")

	if err := fs.Parse(args); err != nil {
		return err
	}

	if *id == "" {
		return errors.New("id is required")
	}

	// load todos and find target
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

	// status parsing
	if *statusFlag != "" {
		switch *statusFlag {
		case "todo":
			todos[index].Status = domain.StatusTodo
		case "doing":
			todos[index].Status = domain.StatusDoing
		case "done":
			todos[index].Status = domain.StatusDone
		default:
			return fmt.Errorf("invalid status %s", *statusFlag)
		}
	}

	// priority parsing
	if *priorityFlag != -1 {
		switch *priorityFlag {
		case 1:
			todos[index].Priority = domain.PriorityLow
		case 2:
			todos[index].Priority = domain.PriorityMedium
		case 3:
			todos[index].Priority = domain.PriorityHigh
		default:
			return fmt.Errorf("invalid priority %d", *priorityFlag)
		}
	}

	// title
	if *title != "" {
		todos[index].Title = *title
	}

	// description
	if *description != "" {
		todos[index].Description = *description
	}

	// update the time stamp
	todos[index].UpdatedAt = time.Now()

	// save and confirm
	if err := store.Save(todos); err != nil {
		return err
	}

	fmt.Println("Update todo: ", todos[index].ID)
	return nil
}
