package main

import (
	"fmt"

	"github.com/Avvinashjha/todo/domain"
)

func main() {
	t := domain.NewTodo("Learn Go Cli Properly")
	fmt.Printf("%+v\n", t)
}
