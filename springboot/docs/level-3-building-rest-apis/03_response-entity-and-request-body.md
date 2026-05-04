# ResponseEntity and RequestBody (Deep Dive)

## 1. What is ResponseEntity?

ResponseEntity is used to return response in spring.

```java
return ResponseEntity.ok(user);
```

But the real question is:
- Why not just return user directly?

### HTTP Response

Every HTTP response has 3 part:

```
Status code + Headers + Body
```

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "name": "Avinash"
}
```

### Problem With Returning Object Directly

```java
@GetMapping("/user")
public User getUser() {
    return new User("Avinash", 25);
}
```

Spring will:
- Convert object to JSON
- Sends response

But, You lose control over:
- Status Code (always 200)
- Headers
- Advanced response handling

### Now Consider ResponseEntity

> ResponseEntity = full control over HTTP response.

#### Structure:

```java
ResponseEntity<T>
```

Where T = response Body type

**Example 1: Basic**

```java
return ResponseEntity.ok(user);
```

Equivalent to:

```
Status: 200 OK
Body: user JSON
```

**Example 2: Custom Status**

```java
return ResponseEntity
        .status(201)
        .body(user);
```

Now:

```
Status: 201 Created
Body: user JSON
```

**Example 3: Not Found**

```java
return ResponseEntity
        .status(404)
        .body("user not found");
```

**Example 4: With Headers**

```java
return ResponseEntity
        .ok()
        .header("Custom-Header", "value")
        .body(user);
```

### Why Spring Needs this?

- Without ResponseEntity, Spring guesses response details.
- With ResponseEntity, You explicitly define response.


## 2. ResponseBody

```java
@PostMapping
@PostMapping
public ResponseEntity<SuccessResponse> addTodoItem(AddTodoItemDTO item)
```

The question is, why is it working without `@ResponseBody`?

Because we are using @RestController.

What @RestController actually does?

```
@RestController = @Controller + @ResponseBody
```

This means:
- Every method automatically behaves as if @ResponseBody is applied

So Internally, Spring treats your method like:

```java
@ResponseBody
public ResponseEntity<SuccessResponse> addTodoItem(...)
```

What does @ResponseBody does:

- It tells Spring, don't resolve view (HTML), Wite return value directly to HTTP response body

