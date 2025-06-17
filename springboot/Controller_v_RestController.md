## @Controller V @RestController

The `@Controller` and `@RestController` annotations in Spring Boot are both used to define classes that handle HTTP requests, but they serve different purposes and have distinct behaviors. Below is a detailed comparison of the two:

---

### **1. Purpose**
#### **@Controller**
- Used for traditional **Spring MVC controllers**.
- Primarily intended for handling web views (e.g., rendering HTML pages using templates like Thymeleaf or JSP).
- Requires explicit use of `@ResponseBody` to return JSON or XML data instead of a view.

#### **@RestController**
- A specialized version of `@Controller`.
- Combines `@Controller` and `@ResponseBody`.
- Designed specifically for building **RESTful web services** where the response is typically in JSON or XML format.
- Automatically serializes the return value of methods into the response body.

---

### **2. Response Handling**
#### **@Controller**
- By default, methods in a `@Controller` class return a **view name** (e.g., `"home"`) that is resolved by a `ViewResolver` to render an HTML page.
- To return data (e.g., JSON or XML) instead of a view, you must explicitly annotate the method with `@ResponseBody`.

Example:
```java
@Controller
public class MyController {

    @GetMapping("/greet")
    public String greet(Model model) {
        model.addAttribute("message", "Hello, World!");
        return "greeting"; // Resolves to a view (e.g., greeting.html)
    }

    @GetMapping("/api/data")
    @ResponseBody
    public Map<String, String> getData() {
        return Map.of("key", "value"); // Returns JSON: {"key": "value"}
    }
}
```

#### **@RestController**
- Methods in a `@RestController` class automatically serialize the return value into the response body (e.g., JSON or XML).
- No need to use `@ResponseBody` because it's already included in the `@RestController` annotation.

Example:
```java
@RestController
@RequestMapping("/api")
public class MyRestController {

    @GetMapping("/greet")
    public Map<String, String> greet() {
        return Map.of("message", "Hello, World!"); // Returns JSON: {"message": "Hello, World!"}
    }
}
```

---

### **3. Use Cases**
#### **@Controller**
- Ideal for applications that render **server-side views** (e.g., HTML pages).
- Commonly used in traditional MVC applications where the controller interacts with a view layer (e.g., Thymeleaf, JSP).

Example Use Case:
- A web application where users navigate between pages, and the server generates dynamic HTML content.

#### **@RestController**
- Used for building **RESTful APIs**.
- The primary purpose is to expose endpoints that return data (e.g., JSON or XML) rather than rendering views.

Example Use Case:
- A backend API for a mobile app or frontend framework (e.g., React, Angular, Vue.js) that consumes JSON data.

---

### **4. Behavior**
#### **@Controller**
- Without `@ResponseBody`, the return value of a method is treated as a **view name**.
- Requires a `ViewResolver` to map the view name to an actual view template (e.g., `.html`, `.jsp`).

#### **@RestController**
- All methods in a `@RestController` automatically return data serialized into the response body.
- No `ViewResolver` is involved because the response is not meant to render a view.

---

### **5. Code Comparison**

#### **Using `@Controller`**
```java
@Controller
public class UserController {

    @GetMapping("/user")
    public String getUser(Model model) {
        model.addAttribute("name", "John Doe");
        return "userDetails"; // Renders userDetails.html
    }

    @GetMapping("/api/user")
    @ResponseBody
    public User getUserAsJson() {
        return new User("John", "Doe"); // Returns JSON: {"firstName": "John", "lastName": "Doe"}
    }
}
```

#### **Using `@RestController`**
```java
@RestController
@RequestMapping("/api")
public class UserRestController {

    @GetMapping("/user")
    public User getUser() {
        return new User("John", "Doe"); // Returns JSON: {"firstName": "John", "lastName": "Doe"}
    }
}
```

---

### **6. Key Differences Summary**

| **Aspect**               | **@Controller**                                                   | **@RestController**                                              |
|--------------------------|-------------------------------------------------------------------|------------------------------------------------------------------|
| **Purpose**              | Handles traditional MVC views (HTML pages).                       | Handles RESTful APIs (JSON or XML responses).                    |
| **Response Type**        | Returns a view name (or JSON/XML with `@ResponseBody`).           | Automatically returns JSON/XML (no view resolution).             |
| **Use Case**             | Rendering server-side views (e.g., Thymeleaf, JSP).               | Exposing REST endpoints for APIs.                               |
| **Annotations Required** | Requires `@ResponseBody` to return data.                          | Includes `@ResponseBody` by default.                             |
| **View Resolution**      | Uses `ViewResolver` to resolve view names.                        | Does not involve view resolution.                                |

---

### **When to Use Which?**

- Use **`@Controller`** if:
  - Your application needs to render server-side views (e.g., Thymeleaf, JSP).
  - You are building a traditional MVC web application.

- Use **`@RestController`** if:
  - Your application exposes RESTful APIs.
  - You want to return data (e.g., JSON or XML) directly without involving view templates.

---

### **Conclusion**

- `@Controller` is more general-purpose and can handle both views and data responses (with `@ResponseBody`).
- `@RestController` is a specialized annotation designed exclusively for RESTful APIs, making it simpler and more concise for returning data.

By understanding the differences, you can choose the appropriate annotation based on your application's requirements.