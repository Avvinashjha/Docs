# Error Handling In GO

## How Go Handles Errors

Unlike many languages:
- Go does not use exceptions for normal errors
- Errors are values
- Functions return errors explicitly

This makes error handling:
- clear
- Explicit 
- Easy yo reason about

## The `error` interface  

In Go, error is a built in interface:

```go
type error interface {
    Error() string
}
```

Anything the implements `Error() string` is an error.

## Returning an Error from a function

Example: Safe Division

```go
func divide(a, b int) (int, error){
    if b == 0 {
        return 0, fmt.Error("cannot divide by zero")
    }
    return a / b, nil
}
```

## Handling the Error

```go
result, err := divide(10, 0)
if err != nil{
    fmt.Println("Error:", err)
    return
}
fmt.Println("Result:", result)
```

- Always check error immediately

## Creating Errors

### Using `errors.New`

```go
import "errors"

err:= errors.New("Something went wrong")
```

### Using `fmt.Errorf`

```go
err := fmt.Errorf("Invalid value %d", x)
```

## Custom Error Types

```go
type MyError struct {
    Code int
    Msg string
}

func (e MyError) Error() string {
    return fmt.Sprintf("Error %d: %s", e.Code, e.Msg)
}
```

Usages:

```go
return MyError{Code: 404, Msg: "Not Found"}
```

## Error Wrapping (Go 1.13+)

```go
err := fmt.Errorf("reading file failed: %w", originalError)
```

Check wrapped error:

```go
errors.Is(err, originalErr)
errors.As(err, &targetErr)
```

- Very Important for large 

## panic

### What is Panic?

`panic` stops normal execution.

```go
panic("something terrible happened")
```

Used only for:
- Programmer errors
- Unrecoverable states
- Not for normal errors.

## recover

Used to recover from panic.

```go
func safe(){
    defer func(){
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
        }
    }()
    panic("crash")
}
```

- Mostly used in servers

## Defer

defer delays execution until function returns.

```go
defer fmt.Println("World")
fmt.Println("Hello")
```

Output:

```text
Hello
World
```

Used for:
- Closing files
- Unlocking mutex
- Cleanup

## Complete Example Program

```go
package main

import (
    "fmt"
    "errors"
)

func readAge(age int) error {
    if age < 0 {
        return errors.New("age can not be negative")
    }
    return nil
}

func main(){
    err:= readAge(-5)
    if err != nil{
        fmt.Println("Error", err)
    }
}
```

## Error Handling Best Practice

- Returns error, don't panic
- Check errors immediately
- Wrap errors with context
- Key error message clear
- Use `defer` for cleanup

