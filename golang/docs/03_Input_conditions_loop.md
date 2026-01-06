# Input, Condition and Loops

## 1. Taking input in Go

Why input is different in Go
- Go is strict
- You must pass memory address using `&`

Example

```go
package main

import "fmt"

func main(){
    var age int

    fmt.Println("Enter your age");
    fmt.Scan(&age)

    fmt.Println("Your age is:", age);
}
```

- `&age` -> address of variable
- `Scan` stores input directly into that variable.

### Multiple Input

```go
var a, b int

fmt.Scan(&a, &b)
```

- Always pass address of the variable, go will store the input to that address

## Conditional Statement (if / else)

### Basic `if`

```go
if age >= 18 {
    fmt.Println("Adult")
}
```

### `if - else`

```go
if age >= 18 {
    fmt.Println(age)
}else {
    fmt.Println("Minor")
}
```

### `if - else - if - else`

```go
if marks >= 90 {
    fmt.Println("A")
}else if marks >= 75 {
    fmt.Println("B")
}else {
    fmt.Println("C")
}
```

### Special Go Features: if with initialization

```go
if x:= 10; x > 5 {
    fmt.Println("x is greater than 5")
}
```

- `x` exits only inside the if block.

## Switch Statement

Go's switch is powerful and clean

### Basic Switch

```go
switch day {
    case 1:
        fmt.Println("Monday")
    case 2:
        fmt.Println("Tuesday")
    default:
        fmt.Println("Invalid day")
}
```

- No Break needed Go adds it automatically

### Multiple cases

```go
switch ch {
    case 'a', 'e', 'i', 'o', 'u':
        fmt.Println("Vowel")
    default:
        fmt.Println("Consonant")
}
```

### Switch without condition

```go
switch {
    case age < 18:
        fmt.Println("Minor")
    case age > 18 && age < 60:
        fmt.Println("Working Adult")
    default:
        fmt.Println("Senior Citizen")
}
```

## Loops in Go (for)

Go has only one loop keyword: `for`

### Classic `for` loop

```go
for i := 0; i <= 5; i++{
    fmt.Println(i)
}
```

### `for` as `while` loop

```go
i := 1
for i <= 5 {
    fmt.Println(i)
    i++
}
```

### Infinite loop

```go
for {
    fmt.Println("Running...")
}
```

- Use break to stop the loop

### Loop `break` and `continue`

```go
for i:= 1; i <= 5; i++ {
    if i == 3 {
        continue;
    }
    fmt.Println(i)
}
```

## Example:

```go
package main

import "fmt"

func main() {
    var num int

    fmt.Print("Enter a number: ")
    fmt.Scan(&num)

    if num%2 == 0 {
        fmt.Println("Even number")
    } else {
        fmt.Println("Odd number")
    }

    for i := 1; i <= num; i++ {
        fmt.Print(i, " ")
    }
}
```

## Key Rules

- Go requires {} even for one line block
- No parentheses () in if
- only for loop exits
- switch does not need break

