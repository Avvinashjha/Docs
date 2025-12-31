package main

import "fmt"

func main() {
	a := 10
	b := 20
	c := 15
	// find the largest among 3 nums
	if a > b && a > c {
		fmt.Println(a, " is  greatest.")
	} else if b > a && b > c {
		fmt.Println(b, "is greatest")
	} else {
		fmt.Println(c, "is greatest")
	}
}
