package cmd

import (
	"flag"
	"fmt"
	"strings"

	"github.com/Avvinashjha/todo/domain"
	"github.com/Avvinashjha/todo/store"
)

// List of todo
// if no flag then show all todo
// --status : StatusTodo, show all todo with that status
// --priority: show todo with that priority
// --search: show todo where title and description match the search text
// --tags: show todo with that tags
func List(args []string, store store.TodoStore) error {
	fs := flag.NewFlagSet("list", flag.ContinueOnError)

	// parse flags
	statusFlag := fs.String("status", "", "todo status: todo | doing | done")
	priorityFlag := fs.Int("priority", -1, "todo priority")
	searchFlag := fs.String("search", "", "search todo title and description")
	// tags := fs.String("tag", "", "todo with tag")

	if err := fs.Parse(args); err != nil {
		return err
	}

	// load todo
	todos, err := store.Load()

	if err != nil {
		return err
	}

	// validate if status flag is provided
	var status domain.Status

	if *statusFlag != "" {
		switch *statusFlag {
		case "todo":
			status = domain.StatusTodo
		case "doing":
			status = domain.StatusDoing
		case "done":
			status = domain.StatusDone
		default:
			return fmt.Errorf("invalid status: %s", *statusFlag)
		}
		todos = filterByStatus(todos, status)
	}

	// validate if priority flag is provided
	var priority domain.Priority

	if *priorityFlag != -1 {
		switch *priorityFlag {
		case 1:
			priority = domain.PriorityLow
		case 2:
			priority = domain.PriorityMedium
		case 3:
			priority = domain.PriorityHigh
		default:
			return fmt.Errorf("invalid priority: %d (use 1=low, 2=medium, 3=hight)", *priorityFlag)
		}
	}

	if *priorityFlag != -1 {
		todos = filterByPriority(todos, priority)
	}

	if *searchFlag != "" {
		todos = filterBySearch(todos, *searchFlag)
	}

	if len(todos) == 0 {
		fmt.Println("No todos found")
		return nil
	}

	// header
	fmt.Printf("%-15s %-8s %-8s %s\n", "ID", "STATUS", "PRIORITY", "TITLE")
	fmt.Println(strings.Repeat("-", 60))

	for _, t := range todos {
		fmt.Printf(
			"%-15s %-8s %-8s %s\n",
			t.ID,
			t.Status,
			priorityToString(t.Priority),
			t.Title,
		)
	}

	return nil
}

func filterByStatus(todos []domain.Todo, status domain.Status) []domain.Todo {
	result := make([]domain.Todo, 0, len(todos))

	for _, t := range todos {
		if t.Status == status {
			result = append(result, t)
		}
	}
	return result
}

func filterByPriority(todos []domain.Todo, priority domain.Priority) []domain.Todo {
	result := make([]domain.Todo, 0, len(todos))

	for _, t := range todos {
		if t.Priority == priority {
			result = append(result, t)
		}
	}
	return result
}

func filterBySearch(todos []domain.Todo, search string) []domain.Todo {
	result := make([]domain.Todo, 0, len(todos))

	for _, t := range todos {
		if strings.Contains(strings.ToLower(t.Title), search) ||
			strings.Contains(strings.ToLower(t.Description), search) {
			result = append(result, t)
		}
	}
	return result
}

func priorityToString(p domain.Priority) string {
	switch p {
	case domain.PriorityLow:
		return "low"
	case domain.PriorityMedium:
		return "medium"
	case domain.PriorityHigh:
		return "high"
	default:
		return "unknown"
	}
}
