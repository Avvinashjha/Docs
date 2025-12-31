package main

import (
	"fmt"
)

func main() {
	// switch time.Now().Weekday() {
	// case time.Saturday, time.Sunday:
	// 	fmt.Println("Weekend")
	// default:
	// 	fmt.Println("Work Day")
	// }
	whoAmI := func(i interface{}) {

		switch t := i.(type) {
		case int:
			fmt.Println("int")
		case string:
			fmt.Println("string")
		case bool:
			fmt.Println("bool")
		default:
			fmt.Println("other", t)
		}
	}
	whoAmI(0)
}
