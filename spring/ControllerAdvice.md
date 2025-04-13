## `@ControllerAdvice` Decorator
`@ControllerAdvice` is a **specialized annotation** in Spring Framework that allows you to handle exceptions globally across all controllers in your application. It is part of Spring's exception handling mechanism and helps centralize error handling logic, making your code cleaner and more maintainable.

---

### **What Does `@ControllerAdvice` Do?**
- **Global Exception Handling:**  
  It enables you to define a centralized class for handling exceptions thrown by any controller in your application. This avoids duplicating exception-handling logic in multiple controllers.

- **Shared Behavior Across Controllers:**  
  In addition to exception handling, it can also be used to define shared behavior such as binding custom data to models or applying common configurations.

- **Scoped to All Controllers by Default:**  
  By default, a class annotated with `@ControllerAdvice` applies to all controllers in the application. However, you can restrict its scope to specific packages, annotations, or controller classes if needed.

---

### **Key Features of `@ControllerAdvice`**
1. **Centralized Exception Handling:**
   - You can use `@ExceptionHandler` methods within a `@ControllerAdvice` class to handle specific exceptions globally.
   - Example: Handle `NullPointerException`, `IllegalArgumentException`, or custom exceptions like `PlayerAlreadyExistsException`.

2. **Custom Response Formatting:**
   - You can define a consistent response format for errors (e.g., JSON structure) and return it from the exception handler methods.

3. **Model Attribute Sharing:**
   - You can use `@ModelAttribute` methods to add attributes to the model that are shared across all controllers.

4. **InitBinder Customization:**
   - You can use `@InitBinder` methods to customize how request parameters are bound to method arguments in controllers.

---

### **How Does `@ControllerAdvice` Work?**
When an exception occurs in a controller, Spring checks if there is a matching `@ExceptionHandler` method in a `@ControllerAdvice` class. If a match is found, the exception is handled by the corresponding method, and the response is returned.

#### **Example Workflow:**
1. A controller method throws an exception (e.g., `PlayerAlreadyExistsException`).
2. Spring detects the exception and looks for a matching `@ExceptionHandler` method in a `@ControllerAdvice` class.
3. The matching `@ExceptionHandler` method processes the exception and returns a response (e.g., an HTTP 409 Conflict response with a custom error message).

---

### **Example Code**

#### **1. Define a `@ControllerAdvice` Class**
```java
package com.cricinfo.cricinfo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PlayerAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handlePlayerAlreadyExistsException(PlayerAlreadyExistsException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setTimestamp(LocalDateTime.now().toString());
        errorResponse.setStatus(HttpStatus.CONFLICT.value());
        errorResponse.setError("Conflict");
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setPath(request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }
}
```

#### **2. Define the Custom Error Response Object**
```java
package com.cricinfo.cricinfo.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
    private String timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    // Constructors, Getters, and Setters
    public ErrorResponse() {}

    public ErrorResponse(String timestamp, int status, String error, String message, String path) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
}
```

#### **3. Throw the Exception in the Service Layer**
```java
@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public Player addPlayer(PlayerDTO player) {
        if (playerRepository.existsByIid(player.getIid())) {
            throw new PlayerAlreadyExistsException("Player with IID " + player.getIid() + " already exists");
        }

        Player newPlayer = new Player(player.getIid(), player.getName(), player.getCountry());
        return playerRepository.save(newPlayer);
    }
}
```

#### **4. Define the Custom Exception**
```java
package com.cricinfo.cricinfo.exception;

public class PlayerAlreadyExistsException extends RuntimeException {
    public PlayerAlreadyExistsException(String message) {
        super(message);
    }
}
```

---

### **Advantages of Using `@ControllerAdvice`**
1. **Code Reusability:**  
   Centralize exception handling logic in one place instead of duplicating it across multiple controllers.

2. **Consistency:**  
   Ensure consistent error responses across the entire application.

3. **Separation of Concerns:**  
   Keep exception-handling logic separate from business logic, improving code readability and maintainability.

4. **Scalability:**  
   Easily extend the exception-handling logic to handle additional exceptions as your application grows.

---

### **Customizing the Scope of `@ControllerAdvice`**
By default, `@ControllerAdvice` applies to all controllers. However, you can customize its scope using attributes:
- **`annotations`:** Restrict to controllers annotated with specific annotations.
- **`basePackages`:** Restrict to controllers in specific packages.
- **`assignableTypes`:** Restrict to specific controller classes.

#### **Example: Restrict to a Specific Package**
```java
@ControllerAdvice(basePackages = "com.cricinfo.cricinfo.controllers")
public class GlobalExceptionHandler {
    // Exception handlers here
}
```

---

### **Conclusion**
`@ControllerAdvice` is a powerful tool in Spring for centralizing exception handling and other cross-cutting concerns. By using it, you can ensure that your application handles errors consistently and efficiently, while keeping your codebase clean and maintainable.

## Can We Use two `@ControllerAdvice` in a Project?
Yes, you **can** create multiple `@ControllerAdvice` classes in a Spring application, but it is generally **not recommended** to have multiple `@ControllerAdvice` classes serving the **same purpose** (e.g., handling exceptions globally). Doing so can lead to confusion, redundancy, and potential conflicts in exception handling. Below, I'll explain how multiple `@ControllerAdvice` classes work, their use cases, and why you should avoid duplicating their purpose.

---

### **How Multiple `@ControllerAdvice` Classes Work**
When you define multiple `@ControllerAdvice` classes, Spring will process them **in parallel**, and each one can handle specific exceptions or apply shared behavior. The order in which they are executed depends on their **priority** or the order of declaration in the application context.

#### **Key Points:**
1. **Independent Execution:**  
   Each `@ControllerAdvice` class operates independently. If an exception matches an `@ExceptionHandler` method in one `@ControllerAdvice`, it will be handled by that class, and other `@ControllerAdvice` classes will not interfere.

2. **Scope Customization:**  
   You can restrict the scope of each `@ControllerAdvice` class using attributes like `basePackages`, `annotations`, or `assignableTypes`. This allows you to target specific controllers or packages with different advice classes.

3. **Potential Conflicts:**  
   If two `@ControllerAdvice` classes define `@ExceptionHandler` methods for the same exception type, Spring will use the first one it encounters based on the application context order. This can lead to unpredictable behavior if not carefully managed.

---

### **Use Cases for Multiple `@ControllerAdvice` Classes**
While it's not ideal to have multiple `@ControllerAdvice` classes for the same purpose, there are valid use cases for having more than one:

#### 1. **Separation of Concerns**
   - Use one `@ControllerAdvice` class for global exception handling and another for shared behavior like model attributes or data binding.
   - Example:
     ```java
     @ControllerAdvice
     public class GlobalExceptionHandler {
         // Handles exceptions globally
     }

     @ControllerAdvice
     public class SharedModelAttributeAdvice {
         // Adds shared model attributes across all controllers
     }
     ```

#### 2. **Scoped Exception Handling**
   - Use one `@ControllerAdvice` class for handling exceptions in a specific package or module, and another for global exceptions.
   - Example:
     ```java
     @ControllerAdvice(basePackages = "com.example.module1")
     public class Module1ExceptionHandler {
         // Handles exceptions specific to module1
     }

     @ControllerAdvice
     public class GlobalExceptionHandler {
         // Handles exceptions globally
     }
     ```

#### 3. **Different Response Formats**
   - Use separate `@ControllerAdvice` classes to return different response formats (e.g., JSON for REST APIs and HTML for web applications).
   - Example:
     ```java
     @ControllerAdvice(annotations = RestController.class)
     public class RestExceptionHandler {
         // Handles exceptions for REST controllers
     }

     @ControllerAdvice(annotations = Controller.class)
     public class WebExceptionHandler {
         // Handles exceptions for web controllers
     }
     ```

---

### **Why Avoid Multiple `@ControllerAdvice` Classes for the Same Purpose?**
1. **Redundancy:**  
   Having multiple `@ControllerAdvice` classes handling the same exceptions leads to duplicated code, making maintenance harder.

2. **Ambiguity:**  
   If two `@ControllerAdvice` classes handle the same exception type, it becomes unclear which one will take precedence. This can lead to unexpected behavior.

3. **Debugging Complexity:**  
   Debugging issues becomes more challenging when exceptions are handled in multiple places.

4. **Violation of Single Responsibility Principle:**  
   A single `@ControllerAdvice` class should ideally handle all global exceptions. Splitting this responsibility across multiple classes violates the principle of clean design.

---

### **Best Practices**
1. **Use a Single `@ControllerAdvice` Class for Global Exceptions:**  
   Consolidate all global exception handling logic into a single `@ControllerAdvice` class to ensure clarity and maintainability.

2. **Scope Appropriately:**  
   If you need multiple `@ControllerAdvice` classes, clearly define their scope using attributes like `basePackages` or `annotations`.

3. **Avoid Overlapping Exception Handlers:**  
   Ensure that no two `@ControllerAdvice` classes handle the same exception type unless explicitly scoped to different parts of the application.

4. **Ordering (if Necessary):**  
   If you must have multiple `@ControllerAdvice` classes handling overlapping exceptions, you can control their execution order using the `@Order` annotation or by implementing `Ordered`.
   - Example:
     ```java
     @ControllerAdvice
     @Order(1)
     public class HighPriorityExceptionHandler {
         // High-priority exception handlers
     }

     @ControllerAdvice
     @Order(2)
     public class LowPriorityExceptionHandler {
         // Low-priority exception handlers
     }
     ```

---

### **Example: Multiple `@ControllerAdvice` Classes**
Here’s an example of how multiple `@ControllerAdvice` classes can coexist for different purposes:

#### **Global Exception Handler**
```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PlayerAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handlePlayerAlreadyExistsException(PlayerAlreadyExistsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now().toString(),
                HttpStatus.CONFLICT.value(),
                "Conflict",
                ex.getMessage(),
                "/api/players"
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }
}
```

#### **Module-Specific Exception Handler**
```java
@ControllerAdvice(basePackages = "com.example.module2")
public class Module2ExceptionHandler {

    @ExceptionHandler(Module2SpecificException.class)
    public ResponseEntity<ErrorResponse> handleModule2Exception(Module2SpecificException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now().toString(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                "/module2/api"
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
```

---

### **Conclusion**
While it is technically possible to create multiple `@ControllerAdvice` classes for the same purpose, it is best to avoid doing so. Instead, use a single `@ControllerAdvice` class for global exception handling and leverage scoping or additional `@ControllerAdvice` classes for specific use cases. This approach ensures clean, maintainable, and predictable exception handling in your application. 
