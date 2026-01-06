# Go Variables and Data Types

A variable is a named storage location in memory that holds a value.

## Declaring a variable in Go

Go is a statically typed language
- Every variable has a type
- Type checked at compile time

### Using var keyword

Full declaration (type + value)

```go
var age int = 25
var name string = "avinash"
```

- Go can infer the type so generally we don't need to specify type

```go
var age = 25
var name = "avinash"
```

### Short declaration (:=)

```go
age := 25
name := "avinash"
```

Rules:
- Can be used only inside function
- Type is inferred automatically

> You can declare variable outside the function with global scope, Short hand Declaration will not work outside the function.

### Basic Data Types in Go

#### 1. Numbers

**Integer**

```go
var a int = 10
var b int64 = 100
```

Common types: 
- `int`
- `int8`, `int16`, `int32`, `int64`
- int is platform-dependent (32 or 64 bit).

```go
var gn = 666

func main() {
	// declare numeric variable using var
	var id int = 32
	var defaultIntValue int
	fmt.Println(id, defaultIntValue) // 32 0

	// declare numeric variable using var and not type
	var a = 32 // here it is inferring the type
	// var b  // you can not declare a variable without type, either initialize it with some value or use type
	fmt.Println(a)

	// use short hand to declare and init a variable
	// a:= 30 // you can not re declare the variable
	a = 40 // you can re assign the variable

	z := 90
	fmt.Println(z)
	fmt.Println(gn)
}
```

**Floating-Point**

```go
var price float64 = 99.99
```

Types:
- float32
- float64 (default)

```go
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
```

#### 2. String

```go
var name string = "Go"
```

String are:

- Immutable
- UTF-8 encoded

#### 3. Boolean

```go
var isActive bool = true
```

### Zero values

In Go, uninitialized variables automatically gets a zero value.

| Type    | Zero Value |
| ------- | ---------- |
| int     | `0`        |
| float   | `0.0`      |
| string  | `""`       |
| bool    | `false`    |
| pointer | `nil`      |

Example:

```go
var x int
fmt.Println(x) // 0
```

- No Garbage value line c/c++

### Multiple variable Declaration

```go
var a,b,c int = 1,2,3
```

or

```go
x,y := 10,20
```

## Constants in Go

Constants are immutable.

```go
const PI = 3.14
```

Multiple constants:

```go
const (
    port: 5050,
    host: "localhost"
)
```

- Constants are evaluated at compile time.

## Key Rules:

- Go Does not allow unused variables
   
    ```go
     var x int // compile time error if unused
    ```

- Use `_` to ignore values

    ```go
    _, err := fmt.Println("Hello")
    ```

- Prefer := inside function
- Prefer var for zero value of clarity


