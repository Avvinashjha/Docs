# Spring Annotations

## 1. Stereotype Annotations (Bean Creation)

These annotations tell Spring, **Create and manage class as a Bean**.

1. `@Component` (Generic)
   
   ```java
    @Component
    class UtilityService{}
   ```

   - Base annotation
   - Used when no specific role

2. @Service (Business Logic)
   
   ```java
   @Service
   class UserService{}
   ```
   - Use for
     - Core business logic
     - Service layer

3. `@Repository` (Data Layer)
   
   ```java
   @Repository
   class UserRepository{}
   ```

   - It has a special behavior
     - It translates DB exceptions into Spring exceptions

4. `@Controller` / `@RestController` (Web Layer)
   
   ```java
   @RestController
   class UserController{}
   ```
   - `@Controller` -> returns views
   - `@RestController` -> returns JSON (most common)

All of those are actually:

```java
@Component
```

- They just add **semantic meaning**
 
## 2. Dependency Injection Annotations

1. `@Autowired`
   
   ```java
   @Autowired
   private UserService userService;
   ```

   - Injects dependency automatically

   Modern Spring:
   - Not needed for constructor injection

2. `@Qualifier`
   
   ```java
    public Developer(@Qualifier("laptop") Computer computer)
   ```

   - Resolves multiple bean conflict

3. `@Primary`
   
   ```java
    @Primary
    @Component
    class Laptop implements Computer{}
   ```

   - Default bean when multiple exist.

## 3. Configuration Annotations

1. `@Configuration`
   
   ```java
   @Configuration
   class AppConfig{}
   ```

   - Makes class as configuration

2. `@Bean`
   
   ```java
   @Bean
   public Laptop laptop(){
    return new Laptop();
   }
   ```

When to use @Bean?

- Third party classes
- Complex object creation
- External configs

## 4. Web/ Rest Annotations

1. Mapping annotations
   
   ```java
   @GetMapping("/users")
   @PostMapping("/users")
   @PutMapping("/users/{id}")
   @DeleteMapping("/users/{id}")
   ```

2. Request Handling
   
   ```java
   @GetMapping("/users/{id}")
   public User getUser(@PathVariable int id) {}
   ```

   ```java
   @GetMapping("/search")
   public List<User> search(@RequestParam String name) {}
   ```

   ```java
   @PostMapping
   public void create(@RequestBody User user) {}
   ```

## 5. Validation Annotations

1. @Valid
   
   ```java
   public void createUser(@Valid @RequestBody User user)
   ```

2. Common Validators
   
   ```java
   @NotNull
   @NotBlank
   @Size(min = 3)
   @Email
   ```

## 6. Exception Handling

1. `@ControllerAdvice`
   
   ```java
   @ControllerAdvice
   class GlobalExceptionHandler{}
   ```

2. `@ExceptionHandler`
   
   ```java
   @ExceptionHandler(Exception.class)
   public ResponseEntity<String> handle(Exception ex){}
   ```

## 7. Lifecycle Annotations

1. `@PostConstruct`
   - Runs after been initialization

2. `@PreDestroy`
   - Runs before bean destruction (not for scope = "prototype")

## 8. Scope Annotation

```java
@Scope("prototype")
```

“Annotations are not magic — they are instructions to the Spring container.”