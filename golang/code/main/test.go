package main

import "fmt"

func main() {
	// var firstName string = "test"
	// var lastname = "jha"
	// fmt.Scan(&firstName, &lastname)
	// var message = "Hi there"
	// fmt.Scanln(&message)
	// fmt.Println(firstName + " " + lastname + "\n" + message)

	var formattedString = fmt.Sprintf("hello %s", "j")
	fmt.Print(formattedString)
}
