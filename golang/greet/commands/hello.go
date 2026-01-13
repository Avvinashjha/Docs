package commands

import (
	"flag"
	"fmt"
	"os"
)

func Hello(args []string) {
	fs := flag.NewFlagSet("hello", flag.ContinueOnError)
	name := fs.String("name", "World", "name to greet")

	fs.SetOutput(os.Stderr)

	if err := fs.Parse(args); err != nil {
		return
	}
	

	fmt.Printf("Hello, %s!\n", *name)
}
