package commands

import "fmt"

func Help() {
	fmt.Println(`greet - a simple greeting cli
	Usage:
		greet <command> [flags]
	Commands:
		hello say hello
		goodbye say goodbye
		help show this help
	`)

}
