## Variables

There are multiple ways to declare a variable in golang

1. using var keyword
    - In this case go will infer the type for you
    ```go
    var a = 10;
    ```

2. Var Keyword with explicit type
   - Here we are giving explicit type.
   
   ```go
    var b int = 10;
   ```

   - what if we want to re assign it with another type

    ```go
    var a = 10
    a = 30 // this is allowed since type is int
    a = true; // this is not allowed because you are changing the type
    ```
3. Using shorthand
   
   ```go
    var a = 10;
   ```

   can be written as 

   ```go
   a := 10;
   ```
4. Can we redeclare the same variable?
    
    No, You can not redeclare the variable with same name. By doing so go compiler will throw error `NoNewVar` error in case of short hand and if you are declaring using var keyword then you wil. get an error of type `DuplicateDecl`

5. Can we declare variable outside the main method?
   
   Yes we can declare variable outside the main method, as a global variable. and we can change it inside the main method as well.

   ```go
    package main
    import "fmt"
    var lang = "golang"
    func main() {
    	// a := 1
    	var a int = 10
    	var b string

    	b = "adf"

    	c := true

        lang = "java"

    	fmt.Println(a, b, c, lang)
    }
   ```

## Constants

Constants are the variable once declared it can not be changed.

1. How can we declare a constant?
   
   constant can be declared using const keyword in go.

   ```go
    const a = 10;
    const name = "avinash"
    const isAdmin = true
   ```

2. Can we change the value of constants?
   
   No constant's value can not be changed, if you try to change the value of constants then go compiler will through an error saying `cannot assign to a (neither addressable nor a map index expression)`

   ```go
    const a = 10;
    a = 20; // this will throw an error
   ```

3. Can we just declare the constant?
   
   You can not just declare a constant you have to initialize it where you are declaring it.

   ```go
    const a; //  missing init expr for b WrongAssignCount error
   ```

4. can we use short hand for constants?

    No You can not use short hand in case of constant since const keyword is required.

    In this case go will infer the type

    ```go
    const a = 30;
    ```

    You can also explicitly mention the type

    ```go
    const a int = 30;
    ```

5. We can declare const outside the main method
   
   Yes we can declare constant outside the main method.

   ```go
    package main
    import "fmt"
    const lang = "go"   
    func main() {
    	const a = 30
    	fmt.Println(a, lang)
    }
   ```

6. How can we do constant grouping?
   
   In go we can group const, and the can use it simply by their name.
   
   ```go
    const (
        port: 5050
        host: "localhost"
    )
   ```

## Loop In go

For looping go only has `for` keyword, for is the only construct in go to do looping.

1. How can we use while loop
   
   ```go
    func main() {
	    // While loop
	    i := 1
	    for i <= 3 {
	    	fmt.Println(i)
	    	i++
	    }
    }
   ```

2. How can we do infinite loop
   
   ```go
    i := 0;
    for{
        fmt.Println(i++)
    }
   ```
   - since there is no condition check the it will infinitely.

3. How can we do classic for loop
   
   ```go
    for i = 0; i < 3; i++ {
        fmt.Println(i)
    }
   ```

4. Can we use `break` and `continue`?
   
   Yes go for loop supports break and continue.

   ```go
    package main
    import "fmt"
    func main() {
    	count := 10
    	// Print 2 even number skip 0
    	eventCount := 0
    	for i := 0; i < count; i++ {
    		if i == 0 {
    			continue
    		}
    		if i%2 == 0 {
    			eventCount++
    			fmt.Println(i)
    		}
    		if eventCount == 2 {
    			break
    		}
    	}
    }
   ```

5. What is range in go, and how can we use it.
   
   Range has multiple use case related to iteration for this example and to keep things simple range is a keyword which will give use the range for i

   ```go
    func main() {
	    count := 10
	    for i := range count {
	    	fmt.Print(i)
	    }
    }
   ```

   - range is use it iterate over array, string, maps...
   - It first value is index and second value is value at that index

## if else in Go

In go if-else behave same as any other language, just it's syntax is a little different

```go
age := 18;

if age >= 18{
    fmt.Println("Person is adult");
}
```

- Here we don't have to wrap the condition in small bracket similar to for loop.

```go
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
```

## switch statement in go

Switch is used when there are multiple conditions and based on those condition different behavior.

```go
package main

import "fmt"

func main() {
	i := 5

	switch i {
	case 1:
		fmt.Println(1)
	case 2:
		fmt.Println(2)
	default:
		fmt.Println("other")
	}
}
```

We can handle multiple case in go switch as well

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	switch time.Now().Weekday() {
	case time.Saturday, time.Sunday:
		fmt.Println("Weekend")
	default:
		fmt.Println("Work Day")
	}
}
```

Here we have used time package of go which gives use elegant way to deal with time.

type switch

```go
func main() {
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
```

## Arrays

Array is a ordered sequence of specific length with same type.

1. How to declare an array?

    ```go
    func main() {
	    var num [4]int
	    var name [4]string
	    var isAdmin [4]bool
	    fmt.Println(num)
	    fmt.Println(name)
	    fmt.Println(isAdmin)
    }
    ```
2. Can we use shorthand to declare an array?

    Yes we can declare array using shorthand

    ```go
    nums := [3]int{} // this will create array of int type with len = 3
    ```
2. How to get length of the array?

    You can use len method to get length of the array.

    ```go
    var num [4] string;
    fmt.Println(len(num)) // 4
    ```

3. What is the default value in the array?
   
   Default value is falsy in nature.
   - int -> 0
   - string -> "" 
   - bool -> false

4. How can we create an array with value?
   
   ```go
    nums := [3]int{1,2,3} // now here is an array with len = 3 with value 1, 2 and 3
   ```

5. How can we create a 2d array?

    ```go
    func main() {
	    nums := [2][2]int{}
	    fmt.Println(nums) // [[0 0] [0 0]]
    }
    ```
6. How can create a 2d array with default value?

    ```go
    func main() {
	    nums := [2][2]int{{1, 2}, {3, 4}}
	    fmt.Println(nums) // [[1 2] [3 4]]
    }
    ```

7. Can 2d array size can be dynamic?

    Array is optimized for memory, so if you know size before hand the you should create array else for dynamic array we can use slices.

## Slices

Slices are the dynamic array, it is one of the most use construct in go. slices has many useful methods.

1. How to declare a slice
   
   ```go
    var nums[] int; // this is the slice
   ```
2. What is the default value of a slice
   
   ```go
    fmt.Println(nums); // []
   ```

   So default value of a slice is printed as [] but it's actually nil

   ```go
    fmt.Println(nums == nil) // true
   ```
3. What is the default length of slice
   
   ```go
   fmt.Println(len(nums)) // 0
   ```

4. what happens we we access index that is not there in slice?
   
   You will get index out of bound error

   ```go
    fmt.Println(nums[1])// index out of range [1] with length 0
   ```