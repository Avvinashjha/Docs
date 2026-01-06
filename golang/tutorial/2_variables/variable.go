package main

import (
	"fmt"
)

var gn = 666.66

func main() {
	//. declare a variable with var and type
	var a float32 = 9.99
	fmt.Println(a)

	// declare a variable and use type infer
	var b = 889.9900
	fmt.Println(b)

	// use a default value variable
	var f float32
	fmt.Println(f)

	// declare variable using short hand
	c := 878.9877
	fmt.Println(c)

	// declare multiple variable using var with type
	var g, h float32 = 7.8, 9.8

	// declare multiple variable using var without type
	var i, j = 6.6, 7.9 // type infer
	fmt.Println(g, h, i, j)

	// declare multiple variable using short hand
	d, e := 67.77, 89.88
	fmt.Println(d, e)

	fmt.Println(gn)
}
