package main

import (
	"fmt"
	"os"

	"github.com/Avvinashjha/todo/cmd"
	"github.com/Avvinashjha/todo/store"
)

func main() {
	if len(os.Args) < 2 {
		cmd.Help()
		os.Exit(1)
	}

	store := store.FileStore{
		Path: "./data/todos.json",
	}

	command := os.Args[1]
	args := os.Args[2:]

	var err error

	switch command {
	case "add":
		err = cmd.Add(args, store)
	case "list":
		err = cmd.List(args, store)
	case "update":
		err = cmd.Update(args, store)
	case "delete":
		err = cmd.Delete(args, store)
	case "show":
		err = cmd.Show(args, store)
	case "comment":
		err = cmd.Comments(args, store)
	case "tag":
		err = cmd.Tag(args, store)
	case "help":
		cmd.Help()
		return
	default:
		fmt.Fprint(os.Stderr, "Unknown command \n\n", command)
		cmd.Help()
		os.Exit(1)
	}

	if err != nil {
		fmt.Fprintln(os.Stderr, "Error:", err)
		os.Exit(1)
	}
}
