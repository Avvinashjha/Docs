# Spring MVC + Request Flow

## 1. What is Spring MVC?

Spring MVC = framework for handing **HTTP requests -> responses**

It follows:

```
client -> controller -> Service -> Response
```

### Core Idea

You write:

```java
@GetMapping
public String hello(){
    return "hello";
}
```

- But internally, a lot happens before this method runs.

## 2. DispatcherServlet (The Brain)

> DispatcherServlet = Front controller of Spring MVC

**What does it do?**

- Receives all HTTP requests
- Decides
  - Which controller to call
  - How to process request
  - How to return response

## 3. Full Request Flow

Let's trace:

```
GET /api/hello
```

1. Request Hits server
   - Browser -> Tomcat (embedded server)

2. Goes to DispatcherServlet
   - Entrypoint for all requests

3. Handler Mapping
   
   Spring checks:
   - Which controller matches this URL?

4. Finds Controller Method
   
   ```java
   @GetMapping("/api/hello")
   public String hello(){}
   ```

5. Handler Adapter
   
   - Call the method
   - Prepares argument (@PathVariable, @RequestBody)

6. Controller Executes
   
   ```java
   return "Hello";
   ```

7. Response Handling
   
   - Converts return value -> HTTP response
   - uses:
     - Message converters (JSON, String, etc.)

8. Response Sent Back
   
   - Client receives response

### Visual Flow

```
Client
   ↓
DispatcherServlet
   ↓
HandlerMapping
   ↓
Controller
   ↓
Service (optional)
   ↓
Response (JSON/String)
```

## 4. Key Components

1. HandlerMapping: Finds correct controller
2. HandlerAdapter: Executes controller method
3. Controller: Your business entry point
4. MessageConverters: Convert Java to JSON
5. ViewResolver: For HTML views

Example:

```java
@RestController
@RequestMapping("/api")
class UserController {

    @GetMapping("/user/{id}")
    public String getUser(@PathVariable int id) {
        return "User " + id;
    }
}
```

**What is happening Internally?**

- /api/user/1 -> DispatcherServlet
- HandlerMapping -> finds method
- HandlerAdapter -> calls method
- Return "User 1" -> Converted to HTTP response

## 5. REST vs MVC

Traditional MVC

```java
@Controller
public String page(){
    return "home"; // HTML view
}
```

REST (Modern)

```java
@RestController
public String api(){
    return "Data"; // JSON/text
}
```

> @RestController = @Controller + @ResponseBody

## Common Misconception

1. Thinking Controller is entry point: DispatcherServlet is the real entry
2. Ignoring flow: leads to confusion in debugging
3. Mixing business logic in controller: Keep logic in service layer

Every request in Spring goes though a pipeline if handlers, understanding this helps in:

- Debugging
- Custom Filters
- Security
- Performance tuning

> DispatcherServlet is the central brain that routes every request in Spring MVC.

