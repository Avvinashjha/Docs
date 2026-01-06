# 1. Installing GO and Setting Up 

## What is GO?

GO (or Golang) is:

- A compiled Language
- Designed by Google
- Fast, Simple and Great for backend, cloud, and System Programming

## Installation Steps

### Step 1: Install GO

1. Go to [Official Page](https://go.dev/dl/)
2. Download the installer for your OS
3. Install using default setting

### Step 2: Verify Installation

Open terminal / command prompt and run:

```bash
go version
```

You should see something like:

```bash
go version go1.25.4 darwin/arm64
```

### Step 3: Environment Variables

When GO installs, it sets 

- GOROOT -> Where Go itself is installed
- GOPATH -> Workspace (older system, now optional)

## GOPATH vs GO Modules

### Old Way: GOPATH (Before Go 1.11)

Earlier, Go required:

```bash
$GOPATH/
  |-- src/
  |-- bin/
  |-- pkg/
```

Your code had to live inside GOPATH, this was restrictive and confusing.

### Modern Way: Go Modules (Current and Recommended)

GO now uses Go Modules.

#### What is a Go Module?

A Go Module is:

- A project 
- With own dependencies
- Defined by a go.mod file

You can create Go projects ANYWHERE on your computer.

### Creating First GO Module

```bash
mkdir hello-go
cd hello-go
go mod init hello-go
```

This Creates:

```text
go.mod
```

Example go.mod

```go
module hello-go

go 1.25.4
```

This file tells Go:

- Project Name
- Go version
- Dependencies

## First Hello World Program

### Create a main.go

```go
package main

import "fmt"

func main(){
    fmt.Println("Hello, World");
}
```

### Understand Each Line

```go
package main
```

- Every Go file belongs to a package
- main package -> Entry point to go application. -> executable program

```go
import "fmt"
```

- imports GO's standard formatting package
- Used for printing & input/output

```go
func main(){
```

- Entry point to Go Program 
- Execution starts here

```go
fmt.Println("Hello, World");
```

- Prints text to terminal
- `Println` adds a new line

## Go Workspace Structure

With Go Module, a simple project looks like this:

```text
hello-go
  |-- go.mod
  |-- main.go
```

As project grows:

```text
hello-go
  |-- go.mod
  |-- main.go
  |-- utils
  |     |-- helper.go
  |-- internals
```

No Need for `src/`, `bin/`, `pkg/` anymore

### Running & Building Go Program

This is where go feels powerful

#### `go run` (Quick run)

```bash
go run main.go
```

- Compiles and runs this program
- No Executable saved
- Used during development
  
#### `go build` (Build Executable)

```bash
go build
```

Creates

- `hello-go` (linux/mac)
- `hello-go.exe` (windows)

Run it:

```bash
./hello-go
```

#### `go install` (Installs binary)

```bash
go install
```

- Builds program
- Installs binary into $GOPATH/bin or $HOME/go/bin
- Useful for CLI tools

Then you can use it from anywhere

```bash
hello-go
```

## Summary

| Concept        | Meaning             |
| -------------- | ------------------- |
| Go             | Compiled language   |
| Module         | A Go project        |
| `go.mod`       | Project config      |
| `package main` | Executable program  |
| `main()`       | Program entry point |
| `go run`       | Compile + run       |
| `go build`     | Create executable   |
| `go install`   | Install executable  |


