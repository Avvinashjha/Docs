package commands

import (
	"flag"
	"fmt"
	"os"
)

func Add(args []string) {
	fs := flag.NewFlagSet("add", flag.ContinueOnError)

	num1 := fs.Int("num1", 0, "first num to add")
	num2 := fs.Int("num2", 0, "second num to add")

	fs.SetOutput(os.Stderr)

	if err := fs.Parse(args); err != nil {
		return
	}
	fmt.Printf("sum = %d", *num1+*num2)
}
