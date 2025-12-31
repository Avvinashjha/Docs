package main

import "fmt"

const lang = "go"

func main() {
	const a = 30
	const (
		port = 5050
		host = "localhost"
	)
	fmt.Println(a, lang)
	fmt.Println(port, host)
}
