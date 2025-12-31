package main

import "fmt"

func main() {

	count := 10

	for i := range count {
		fmt.Print(i)
	}
}
