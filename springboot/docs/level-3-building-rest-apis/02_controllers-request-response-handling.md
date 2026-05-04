# Controllers + Request/Response Handling

This is about, How data comes into API and get processed then goes back as a response.

## 1. @RestController (Entry Point)

```java
@RestController
@RequestMapping("/api")
class UserController{}
```

Combines:
- @Controller
- @ResponseBody (returns JSON/Text instead of View)

## 2. Mapping Requests

### Basic Mapping:

```java
@GetMapping("/hello")
public String hello(){
    return "Hello";
}
```

### All HTTP Method

```java
@GetMapping     // Read
@PostMapping    // Create
@PutMapping     // Update
@DeleteMapping  // Delete
```

### REST Convention

| Operation | Method | Example    |
| --------- | ------ | ---------- |
| Get all   | GET    | `/users`   |
| Get one   | GET    | `/users/1` |
| Create    | POST   | `/users`   |
| Update    | PUT    | `/users/1` |
| Delete    | DELETE | `/users/1` |

## 3. Getting Data from Request

### @PathVariable

PathVariable -> data that are being passed in the path to be used for business logic.

```java
@GetMapping("/users/{id}")
public String getUser(@PathVariable int id) {
    return "User " + id;
}
```

URL:

```
/user/10
```

- Here 10 is the path variable.

### @RequestParam

RequestParam -> Data that are being passed in query prams of the url and it will be used for business logic

```java
@GetMapping("/search")
public String search(@RequestParam String name) {
    return name;
}
```

URL:

```
/search?name=avinash
```

### Optional Params

- You can make a request param optional and can conditionally handle the response.

```java
@RequestParam(required = false)
```

### @RequestBody

```java
@PostMapping("/users")
public String createUser(@RequestBody User user) {
    return user.getName();
}
```

JSON Input:

```json
{
  "name": "Avinash",
  "age": 25
}
```

How @RequestBody Works?

- JSON -> Java Object
- Uses Jackson (auto configured)

## 4. Sending Response

### Simple Return

```java
return "Hello";
```

### Returning Object

```java
return new User("Avinash", 25);
```

Automatically converts to JSON:

```json
{
  "name": "Avinash",
  "age": 25
}
```

### Using ResponseEntity

```java
return ResponseEntity.ok(user)
```

### Custom Status

```java
return ResponseEntity.status(201).body("Create")
```

## 5. Full Example

Model:

```java
class User {
    private String name;
    private int age;

    // getters/setters
}
```

Controller:

```java
@RestController
@RequestMapping("/api/users")
class UserController {

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.status(201).body(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> get(@PathVariable int id) {
        return ResponseEntity.ok("User " + id);
    }
}
```

## 6. Request Flow

```
Client → DispatcherServlet → Controller → Response
```

Now you know:

- How URL Maps
- How data binds
- How response is created

> Controllers are just translators between HTTP world and Java world.

