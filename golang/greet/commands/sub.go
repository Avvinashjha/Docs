package commands

import (
	"flag"
	"fmt"
)

func Sub(args []string) {
	fs := flag.NewFlagSet("sub", flag.ContinueOnError)

	num1 := fs.Int("num1", 0, "first number")
	num2 := fs.Int("num2", 0, "second number")

	if err := fs.Parse(args); err != nil {
		return
	}

	fmt.Printf("Sub = %d", *num1-*num2)
}
