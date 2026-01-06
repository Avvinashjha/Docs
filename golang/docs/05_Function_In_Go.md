# Functions In Go

## What is a Function?

A function is a block of code that:
- Performs a task
- Can be reused
- Can take input (parameters)
- Can return output (results)

## Basic Syntax of function

```go
func functionName (parameters) returnType {
    // function body
}
```

Example:

```go
func greet(){
    fmt.Println("Hello!")
}
```

Calling the function:

```go
greet()
```

### Function with Parameters

```go
func add(a, b int) int {
    return a + b
}
```

## Function with Parameters

```go
func greet(name string){
    fmt.Println("Hello", name)
}
```

Call:

```go
greet("Avi")
```

## Multiple Parameters (same type short hand)

```go
func add(a, b int) int{
    return a + b
}
```

## Function with Return value

```go
func square(n int) int {
    return n * n;
}
```

Call:

```go
result := square(5)
```

## Multiple Return Values

Go Supports returning multiple values.

```go
func divide (a, b int) (int, int) {
    return a / b, a % b
}
```

call:

```go
q, r := divide(10, 3)
```

## Common Go Pattern (value + error)

```go
func safeDivide(a, b int) (int, error){
    if b == 0 {
        return 0, fmt.Error("cannot divide by zero")
    }
    return a / b, nil
}
```

## Named Return Values

```go
func sum(a, b int) (result int){
    result = a + b
    return
}
```

## Variadic Functions (...)

Functions that take any number of arguments

```go
func total(nums ...int) int {
    sum:=0;
    for _, n := range nums {
        sum += n;
    }
    return sum
}
```

call:

```go
total(1,2,3,4)
total(34,5,1,3,4,5,6)
```

## Passing slices to variadic Function

```go
numbers := []int{1,2,3}
total(numbers...)
```

## Function as Value

```go
func add(a, b int) int {
    return a + b
}

var op func(int, int) int = add
fmt.Println(op(2,3))
```

## Key Rules to Remember

- Function names use cameCase
- Return types come after parameters
- Multiple returns are common
- Variadic uses `...`
- Errors are return, not thrown

