# Data Structures in Go

## 1. Arrays in Go

An array is a collection of fixed-size elements of the same type.

- Size is a part of the array type.

### Declaring an Array

```go
var nums [5] int
```

This creates an array with default value:

```text
[0 0 0 0 0]
```

### Declaring and initializing array

```go
arr := [3]int{10, 20, 30}
```

### Accessing & Modifying

```go
fmt.Println(arr[0]) // 10
arr[1] = 25
```

### Length of Array

```go
len(arr)
```

### Arrays are value types

```go
a := [3] int {1,2,3}
b := a
b [0] = 100

fmt.Println(a) // [1,2,4]
fmt.Println(b) // [100, 2, 3]
```

## Slices in Go

### What is Slice?

A slice is:
- Dynamic Sized
- Built on top of arrays
- Used 99% of the time instead of arrays

### Declaring a Slice

```go
nums := []int{1,2,3}
```

### Declare a Slice using `make`

```go
nums := make([]int, 3)
```

### Append to slice

```go
nums = append(nums, 4, 5)
```

### Length and Capacity

```go
len(nums)
cap(nums)
```

### Slicing a Slice

```go
a := []int{1,2,3,4,5}
b := a[1:4] // [2 3 4]
```

- Slicing share underlying array

### Slice are reference types

```go
a := []int {1,2 3}
a := a
b [0] = 100
fmt.Println(a) // [100 2 3]
```

### Iterating with range

#### Range over Slice

```go
for index, value := range nums {
    fmt.Println(index, value)
}
```

- We can ignore the index
  
```go
for _, value := range nums {
    fmt.Println(value)
}
```

## Maps (Key-Value Store)

### What is Map?

A map stores key-value pairs, like a dictionary

### Creating a Map

```go
ages := map[string]int{
    "Alice": 25,
    "Bob" : 30
}
```

Or 

```go
scores := make(map[string]int)
```

### Access and Update

```go
fmt.Println(ages["Alice"])
ages["bob"] = 35
```

### Check if Key Exists

```go
value, ok := ages["John"]

if ok {
    fmt.Println(value)
}else {
    fmt.Println("Key Not found")
}
```

### Delete from Map

```go
delete(ages, "Bob")
```

### Iterate Map

```go
for key, value := range ages {
    fmt.Println(key, value)
}
```

## Summary

| Feature | Array | Slice       | Map         |
| ------- | ----- | ----------- | ----------- |
| Size    | Fixed | Dynamic     | Dynamic     |
| Type    | Value | Reference   | Reference   |
| Usage   | Rare  | Very common | Very common |


