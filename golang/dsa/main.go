package main

import (
	dsa "dsa/code"
	"fmt"
)

func main() {
	arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	res := dsa.FindAllPrimeNumber(arr)
	fmt.Println(res)
}
