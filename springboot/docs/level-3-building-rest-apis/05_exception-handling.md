# Exception Handling

## 1. Why Exception Handling?

Right now, if something goes wrong:

```java
@GetMapping("/{id}")
public User getUser(@PathVariable int id) {
    return userService.find(id); // what if null?
}
```

Without Proper handling

- NullPointerException
- Stack trace leaked
- Ugly response
- Wrong status code

Example of Bad Response:

```json
{
  "timestamp": "...",
  "status": 500,
  "error": "Internal Server Error"
}
```

- Not useful for frontend

Goal:
- Convert exception into meaningful HTTP responses.

### Where Exception Fit in Flow

```
Client → DispatcherServlet → Controller → Service → Exception
```

Now:

```
Exception → Handler → Clean Response
```

## 2. Default Spring Behavior
Spring has a default exception handler:

- `BasicErrorController`

it:
- catches exceptions
- Returns generic response

Problem:
- Not customizable enough
- Not user friendly

## 3. Custom Exception

### 1. Create Custom Exception

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message){
        super(message);
    }
}
```

### 2. Use It

```java
@GetMapping("/{id}")
public User getUser(@PathVariable int id){
    User user = userService.find(id);
    if(user == null){
        throw new ResourceNotFoundException("User not found with id " + id);
    }
    return user;
}
```

### Why Custom Exception

Makes intent clear:

```
“User not found” ≠ “NullPointerException”
```

### But Problem Still Exists

If you throw this now:

- You still get 500 Internal Server error

## 4. Global Exception Handling

This is the real power Spring

### 1. Create a Global Handler

```java
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
}
```

#### What is @RestControllerAdvice ?

```java
@RestControllerAdvice = @ControllerAdvice + @ResponseBody
```

It:
- Applies to all controllers
- Converts response to JSON

### 2. Handle Custom Exception

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex){
    return ResponseEntity
            .status(404)
            .body(ex.getMessage());
}
```

Now Response:

```json
"User not found with id 5"
```

## 5. Better API Design (Structured Error Response)

Instead of returning string:
- Create a proper response object

### Error DTO

```java
public class ErrorResponse {
    private String message;
    private int status;
    private long timestamp;

    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
        this.timestamp = System.currentTimeMillis();
    }
}
```

### Use It

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex){
    ErrorResponse error = new ErrorResponse(ex.getMessage(), 404);
    return ResponseEntity
                .status(404)
                .body(error);
}
```

### Response

```json
{
  "message": "User not found with id 5",
  "status": 404,
  "timestamp": 1712345678
}
```

## 6. Handling Validation Errors

From previous topic:

```java
@Valid @RequestBody AddTodoItemDTO item
```

If invalid -> Spring throws:

```
MethodArgumentNotValidException
```

### Handle It globally

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex){
    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult().getFieldErrors().forEach(error -> 
        errors.put(error.getField(), error.getDefaultMessage());
    )
    return ResponseEntity.badRequest().body(errors);
}
```

### Response

```json
{
  "title": "Title cannot be empty",
  "description": "Must be at least 5 characters"
}
```

### Internal Flow

```
Controller throws exception
        ↓
Spring looks for @ExceptionHandler
        ↓
GlobalExceptionHandler catches it
        ↓
Returns ResponseEntity
        ↓
Sent to client
```

## 7. Catch-All Exception (Fallback)

Always add this:

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleGenericException(Exception ex){
    ErrorResponse error = new ErrorResponse("Something went wrong", 500);
    return ResponseEntity.status(500).body(error);
}
```

- Don't expose internal error in production.

## 8. Connect Everything

```
Request
   ↓
@RequestBody
   ↓
@Valid (validation)
   ↓
Controller
   ↓
Service
   ↓
Exception (if any)
   ↓
@ControllerAdvice
   ↓
ResponseEntity
   ↓
Client
```

> Exception are not errors, they are signals. Spring lets you convert them into meaningful API responses.

