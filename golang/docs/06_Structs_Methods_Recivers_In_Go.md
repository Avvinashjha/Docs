# Structs, Methods and Receivers

## Why Go Need Structs?

Go does not have classes like Java or C++. Instead, Go uses structs + methods.

Think of struct as, A custom data type that groups related data together.

## Defining a Struct

```go
type Person struct {
    Name string
    Age int
}
```

## Creating a Struct Values

### 1. Named Fields (recommended)

```go
p1 : Person{
    Name: "Alice",
    Age: 25
}
```

### 2. Positional (Avoid in Large struct)

```go
p2 := Person{"Bob", 30}
```

### Default Value Struct (Zero Values)

```go
var p3 Person

fmt.Println(p3) // { 0}
```

## Accessing and Modifying Fields

```go
fmt.Println(p1.Name)
p1.Age
```

## Methods in Go

A method is a function attached to struct.

Syntax:

```go
func (receiver Type) methodName() returnType {
    // logic
}
```

Example:

```go
func (p Person) Greet(){
    fmt.Println("Hello, my name is", p.Name )
}
```

Call:

```go
p1.Greet()
```

## Value Receiver vs Pointer Receiver

### Value Receiver (copy)

```go
func (p Person) Birthday(){
    p.Age ++
}
```

- Does not modify the original struct

### Pointer Receiver

```go
func (p *Person) Birthday(){
    p.Age++
}
```

- Modifies original struct
- More efficient (no copy)

> Note: If method modifies data -> use pointer receiver

## Method Example


```go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func (p *Person) Birthday() {
    p.Age++
}

func (p Person) Greet() {
    fmt.Println("Hi, I am", p.Name)
}

func main() {
    p := Person{Name: "John", Age: 25}
    p.Greet()
    p.Birthday()
    fmt.Println("Age:", p.Age)
}
```

## Struct Embedding (Inheritance-like behavior)

Go Uses composition, not inheritance.

Example:

```go
type Address struct {
    City string
}

type User struct {
    Name string,
    Address
}
```

Access:

```go
u := User {
    Name: "Alice",
    Address: Address {
        city: "Delhi"
    },
}

fmt.Println(u.City)
```

## Key OOP Concept in Go

| Concept       | Go Approach             |
| ------------- | ----------------------- |
| Class         | Struct                  |
| Object        | Struct value            |
| Method        | Function with receiver  |
| Inheritance   | Composition (embedding) |
| Encapsulation | Capitalization          |

## Exported vs Unexported

```go
type User struct {
    Name string // name starts with capital letter means exported / public
    age int // unexported as name starts with lowe case / private
}
```

- Capital Letter -> Public
- Small Letter -> private

