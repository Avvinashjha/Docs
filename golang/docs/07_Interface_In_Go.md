# Interface in Go

## What is an Interface ?

An Interface defines what a type can do, not what it is. If something can do these methods, it belongs here.

- Interface focus on behavior, not data

## Defining an Interface

```go
type Speaker interface {
    Speak() string
}
```

This says:

> Any type that has a Speaker has a Speak method, returning a string automatically satisfies this interface.


## Implementing an Interface

Example Struct

```go
type Person struct{
    Name string
}
```

Implement Interface

```go
func (p Person) Speak() string {
    return "Hello, My Name Is "+ p.Name; 
}
```

- No Implements keyword
- No Explicit declaration
- GO checks automatically

## Using Interface values (Polymorphism)

```go
func saySomething(s Speaker){
    fmt.Println(s.speak())
}
```

call:

```go
p := Person{Name: "Alice"}
saySomething(p)
```

- Different types, same behavior

## Multiple Types, One Inheritance

```go
type Dog struct {}

func (d Dog) Speak() string {
    return "woof!"
}
```

Now both `Person` and `Dog` Satisfies `Speaker`

```go
saySomething(Dog{})
saySomething(Person{Name: "Bob"})
```

## Why Interface are so Powerful

- Lose Coupling
- Easy testing (mocking)
- Clean Architecture
- Dependency Injection

Go Interfaces are small and focused design

## The Empty Interface

```go
var x interface{}

x = 10

x = "Hello"
```

This can hold any type.

## Type Assertion

```go
value, ok := x.(string)
if ok {
    fmt.Println(value)
}
```

## Type Switch

```go
switch v:= x.(type){
    case int:
        fmt.Println("Integer:", v)
    case string:
        fmt.Println("String:", v)
    case boolean:
        fmt.Println("boolean:", v)
    default:
        fmt.Println("Unknown type")
}
```

