# Concurrency In Go

## What is Concurrency?

Concurrency vs Parallelism

- Concurrency -> dealing with many tasks at once
- Parallelism -> doing many tasks at the same time

Go is designed for concurrency first.

## Goroutines (Lightweight Threads)

### What is Goroutines?

A goroutine is:
- A lightweight thread
- Managed by Go runtime
- Very cheap (thousands / millions possible)

## Starting a Goroutine

```go
go functionName()
```

Example:

```go
go fmt.Println("Hello from goroutines")
```

## Simple Example

```go
package main

import "fmt"

func sayHello(){
    fmt.Println("Hello")
}

func main(){
    go sayHello()
    fmt.Println("Main function")
}
```

- Output may vary
- Program may exit before goroutine runs

## Waiting for Goroutines

Quick hack (not best practice), you can wait for sometime before exiting the program, so that go routine can run

```go
time.sleep(time.Second)
```

## Channels (Communication Between Goroutines)

### What is a Channel?

A channel lets goroutines send and receive data safely.

Thinks of it as a pipe.

## Creating Channel

```go
ch := make(chan int)
```

## Sending & Receiving

```go
ch <- 10 // send
value := <-ch // receive
```

## Chanel Example

```go
package main

import "fmt"

func main(){
    ch := make(chan string)
    go func(){
        ch <- "Hello from go routines"
    }()

    msg := <-ch
    fmt.Println(msg)
}
```

- No sleep needed
- Safe synchronization

## Blocking Behavior

- Sending blocks until received
- Receiving blocks until sent

This is how Go Synchronizes goroutines.

## Buffered Channels

```go
ch := make(chan int, 2)
```

- Can store 2 Values
- Send does not block until buffer full

## Range over channels

```go
for msg := range ch {
    fmt.Println(msg)
}
```

Close channel when done:

```go
close(ch)
```

## Select Statement

Used to wait on multiple channels.

```go
select {
    case msg1 := <-ch1:
        fmt.Println(msg1)
    case msg2 := <- ch2:
        fmt.Println(msg2)
    default:
        fmt.Println("No Message")
}
```

## Common Concurrency Pattern (Worker)

```go
func worker(id int, jobs <- chan int, result chan <- int){
    for j := range jobs {
        result <- j * 2
    }
}
```

## Complete Example

```go
package main
import "fmt"

func main () {
    ch := make(chan int)

    go func(){
        ch <- 42
    }()
    fmt.Println(<-ch)
}
```

## Key Rules to Remember

- Use goroutines for concurrent tasks
- Use channels to communicate
- Don't share memory, communicate
- Avoid race condition

