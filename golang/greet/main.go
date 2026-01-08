package main

import (
	"fmt"
	"os"

	"github.com/Avvinashjha/greet/commands"
)

func main() {
	if len(os.Args) < 2 {
		commands.Help()
		os.Exit(1)
	}
	cmd := os.Args[1]
	args := os.Args[2:]

	switch cmd {
	case "hello":
		commands.Hello(args)
	case "goodbye":
		commands.Goodbye(args)
	case "help":
		commands.Help()
	default:
		fmt.Fprintf(os.Stderr, "Unknown command %s\n\n", cmd)
		commands.Help()
		os.Exit(1)
	}
}
