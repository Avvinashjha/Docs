package commands

import (
	"flag"
	"fmt"
	"os"
)

func Goodbye(args []string) {
	fs := flag.NewFlagSet("goodbye", flag.ContinueOnError)
	msg := fs.String("msg", "World!", "message for goodbye")

	fs.SetOutput(os.Stderr)

	if err := fs.Parse(args); err != nil {
		return
	}

	fmt.Printf("Goodbye %s", *msg)
}
