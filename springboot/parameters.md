# Parameters in Springboot

When designing a REST endpoint, the parameters you accept depend on the functionality of the API. Below is a list of **common types of parameters** you might take in a REST endpoint, along with examples of how to use them in Spring Boot:

---

### **1. Query Parameters** `@RequestParam`
Used for filtering, sorting, or optional inputs.
- Example: `/todos?status=completed&priority=high`
- Use `@RequestParam` in Spring Boot.

```java
@GetMapping("/todos")
public String getTodos(
    @RequestParam(required = false) String status,
    @RequestParam(required = false) String priority,
    @RequestParam(defaultValue = "createdDate") String sortBy,
    @RequestParam(defaultValue = "asc") String order) {
    return String.format("Filters: status=%s, priority=%s, sortBy=%s, order=%s", status, priority, sortBy, order);
}
```

---

### **2. Path Parameters** `@PathVariable`
Used to identify a specific resource.
- Example: `/todos/123`
- Use `@PathVariable` in Spring Boot.

```java
@GetMapping("/todos/{id}")
public String getTodoById(@PathVariable Long id) {
    return "Fetching todo with ID: " + id;
}
```

---

### **3. Request Body** `@RequestBody`
Used to send data (e.g., JSON) in the body of the request, typically for `POST`, `PUT`, or `PATCH` requests.
- Example: Send a JSON object to create a new todo.
- Use `@RequestBody` in Spring Boot.

```java
@PostMapping("/todos")
public String createTodo(@RequestBody Todo todo) {
    return "Created todo: " + todo.getTitle();
}
```

---

### **4. Headers** `@RequestHeader`
Used for metadata, authentication, or custom information.
- Example: Send an `Authorization` header.
- Use `@RequestHeader` in Spring Boot.

```java
@GetMapping("/todos")
public String getTodos(@RequestHeader("Authorization") String authToken) {
    return "Authorization token: " + authToken;
}
```

---

### **5. Matrix Parameters** `@MatrixVariable`
Used to include additional key-value pairs in the URL path.
- Example: `/todos;status=completed;priority=high`
- Use `@MatrixVariable` in Spring Boot (requires additional configuration).

```java
@GetMapping("/todos/{id}")
public String getTodo(
    @PathVariable Long id,
    @MatrixVariable String status,
    @MatrixVariable String priority) {
    return String.format("Todo ID: %d, Status: %s, Priority: %s", id, status, priority);
}
```

---

### **6. Form Data** `@RequestParam`
Used for submitting form data (e.g., HTML forms).
- Example: Submit a form with `title` and `description`.
- Use `@RequestParam` or `@ModelAttribute` in Spring Boot.

```java
@PostMapping("/todos")
public String createTodo(
    @RequestParam String title,
    @RequestParam String description) {
    return "Created todo: " + title + ", " + description;
}
```

---

### **7. File Uploads** `MultipartFile`
Used for uploading files.
- Example: Upload a file with a `POST` request.
- Use `@RequestParam` with `MultipartFile` in Spring Boot.

```java
@PostMapping("/upload")
public String uploadFile(@RequestParam("file") MultipartFile file) {
    return "File uploaded: " + file.getOriginalFilename();
}
```

---

### **8. Cookies** `@CookieValue`
Used to read cookies sent by the client.
- Example: Read a `sessionId` cookie.
- Use `@CookieValue` in Spring Boot.

```java
@GetMapping("/todos")
public String getTodos(@CookieValue("sessionId") String sessionId) {
    return "Session ID: " + sessionId;
}
```

---

### **9. Optional Parameters** `required = false`
Used for parameters that are not required.
- Example: `/todos?status=completed` (status is optional).
- Use `required = false` in `@RequestParam`.

```java
@GetMapping("/todos")
public String getTodos(@RequestParam(required = false) String status) {
    return "Status filter: " + (status != null ? status : "not provided");
}
```

---

### **10. Default Values** `defaultValue`
Used to provide default values for parameters.
- Example: `/todos?sortBy=createdDate` (default sort by `createdDate`).
- Use `defaultValue` in `@RequestParam`.

```java
@GetMapping("/todos")
public String getTodos(@RequestParam(defaultValue = "createdDate") String sortBy) {
    return "Sorting by: " + sortBy;
}
```

---

### **11. Pagination Parameters** `@RequestParam`
Used for pagination (e.g., `page` and `size`).
- Example: `/todos?page=1&size=10`
- Use `@RequestParam` for `page` and `size`.

```java
@GetMapping("/todos")
public String getTodos(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {
    return "Page: " + page + ", Size: " + size;
}
```

---

### **12. Complex Query Parameters** `Map<String, String>`
Used for filtering with multiple criteria.
- Example: `/todos?filter=status:completed,priority:high`
- Use a custom object with `@RequestParam`.

```java
@GetMapping("/todos")
public String getTodos(@RequestParam Map<String, String> filters) {
    return "Filters: " + filters.toString();
}
```

---

### **Summary of Parameters**
| **Type**            | **Annotation**       | **Example**                          |
|----------------------|----------------------|--------------------------------------|
| Query Parameters     | `@RequestParam`      | `/todos?status=completed`            |
| Path Parameters      | `@PathVariable`      | `/todos/123`                         |
| Request Body         | `@RequestBody`       | Send JSON in `POST` body             |
| Headers              | `@RequestHeader`     | `Authorization: Bearer token`        |
| Matrix Parameters    | `@MatrixVariable`    | `/todos;status=completed`            |
| Form Data            | `@RequestParam`      | Submit HTML form                     |
| File Uploads         | `MultipartFile`      | Upload a file                        |
| Cookies              | `@CookieValue`       | Read `sessionId` cookie              |
| Optional Parameters  | `required = false`   | `/todos?status=completed` (optional) |
| Default Values       | `defaultValue`       | `/todos?sortBy=createdDate`          |
| Pagination           | `@RequestParam`      | `/todos?page=1&size=10`              |
| Complex Query Params | `Map<String, String>`| `/todos?filter=status:completed`     |

---

### **Complete Example**
Here’s a complete example of a REST endpoint that uses multiple types of parameters:

```java
@RestController
public class TodoController {

    @GetMapping("/todos/{id}")
    public String getTodo(
        @PathVariable Long id,
        @RequestParam(required = false) String status,
        @RequestHeader("Authorization") String authToken,
        @CookieValue("sessionId") String sessionId) {
        
        return String.format(
            "Todo ID: %d, Status: %s, Auth Token: %s, Session ID: %s",
            id, status, authToken, sessionId
        );
    }
}
```

---
