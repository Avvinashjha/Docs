# Validation 

## 1. Why Validation Exists

Right now your API accepts anything:

```json
{
  "title": "",
  "description": "abc"
}
```

- This is invalid business data, but API will accept it.

Without validation, Problems:
- Bad data in DB
- Bugs Later
- Hard to debug

With Validation:

- Validate data at the boundary (controller) before it enters your system.

## 2. Where validation Fits in Flow

Let's extend the request flow:

```
Client → DispatcherServlet → Controller → Service
```

Now with Validation:

```
Client → DispatcherServlet → Validation → Controller → Service
```

- Validation happens before your method logic runs

## 3. Bean Validation

Spring uses:

- **Bean Validation**, implemented by **Hibernate Validator**

### Step 1: Add validation Dependency

Usually already included:

```
spring-boot-starter-validation
```

### Step 2: Add Annotation to DTO

```java
import jakarta.validation.constraints.*;

public class AddTodoItemDTO {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @Size(min = 5, message = "Description must be at least 5 characters")
    private String description;

    // getters/setters
}
```

Common Validation Annotations

| Annotation        | Meaning                       |
| ----------------- | ----------------------------- |
| `@NotNull`        | Cannot be null                |
| `@NotBlank`       | Not null + not empty (String) |
| `@Size(min, max)` | Length constraint             |
| `@Email`          | Valid email                   |
| `@Min`, `@Max`    | Number range                  |

### Step 3: Enable Validation in Controller

This is the most important part:

```java
@PostMapping
public ResponseEntity<T> addTodoItem(
    @Valid @RequestBody AddTodoItemDTO item
){
    return ResponseEntity.ok("Success");
}
```

What does @Valid does:

- Triggers validation before validation execution.

#### What happens Internally?

1. Request Comes in
2. JSON -> DTO (@RequestBody)
3. @Valid triggers validator
4. If valid -> method runs
5. If invalid -> exception thrown

#### What Happens on Failure?

Spring throws:

```
MethodArgumentNotValidException
```

- And returns default error response

#### Example Error Response

```JSON
{
  "timestamp": "...",
  "status": 400,
  "errors": [
    "Title cannot be empty"
  ]
}
```

**Validation does not run Automatically:**

This won't work:

```java
public ResponseEntity<?> addTodoItem(@RequestBody AddTodoItemDTO item)
```

**Missing @Valid**

Correct:

```java
public ResponseEntity<?> addTodoItem(@Valid @RequestBody AddTodoItemDTO item)
```

## `@Validated` vs `@Valid`

### @Valid

- Standard
- Works on method prams

### @Validated
- Spring Specific
- Supports groups (advance use)

For now we will focus on @Valid.

## Handling Validation Errors Properly

Right now, Spring gives ugly default response.
- We will fix this in next topic Exception Handling

> Validation Ensures only correct data enters your system.

