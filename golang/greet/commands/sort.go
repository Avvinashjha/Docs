package commands

import (
	"flag"
	"fmt"
	"strconv"
	"strings"
)

func Sort(args []string) {
	fs := flag.NewFlagSet("sort", flag.ContinueOnError)

	arr := fs.String("arr", "[]", "pass array as string")
	if err := fs.Parse(args); err != nil {
		return
	}
	parts := strings.Fields(*arr)
	numArr := make([]int, 0, len(parts))
	for _, ch := range parts {
		n, err := strconv.Atoi(ch)
		if err != nil {
			fmt.Printf("Invalid number %s\n", ch)
			return
		}
		numArr = append(numArr, n)
	}
	fmt.Println()
}
