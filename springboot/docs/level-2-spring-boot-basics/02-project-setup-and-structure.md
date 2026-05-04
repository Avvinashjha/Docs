# Project Setup + Structure

## 1. Creating a Spring Boot Project

Spring Boot Provides us [Spring Initializer](https://start.spring.io/), Spring Initializr is an online and API-based project generator for quickly bootstrapping new Spring Boot applications.

### Recommended Setup:

- Project: Maven
- Language: Java
- Spring Boot: Latest stable
- Dependencies
  - Spring Web
  - Spring Data JPA (optional for later)
  - Lombok (optional)

### What gets generated?

You download a ready-to-run project with:

- Build Config (pom.xml)
- Main class
- Basic Structure

## 2. Project Structure

Typical structure:

```
src/main/java/com/example/demo
│
├── DemoApplication.java   ← Entry point
│
├── controller/           ← API layer
├── service/              ← Business logic
├── repository/           ← DB layer
├── model/                ← Entities / DTOs
│
src/main/resources
├── application.properties
```

## 3. Entry Point (Heart of App)

```java
@SpringBootApplication
public class DemoApplication{
    public static void main(String[] args){
        SpringBootApplication.run(DemoApplication.class, args);
    }
}
```

- This class must be in root package. 
- Why?, because @ComponentScan scans downward only

Wrong Structure:

```
com.example.app.main
com.example.controller   ← NOT scanned
```

Correct Structure:

```
com.example
   ├── DemoApplication
   ├── controller
   ├── service
```

## 4. application.properties

This is your central configuration file.

Example:

```properties
server.port=8081
spring.application.name=my-app
```

Or you can use YAML:

```
server:
  port: 8081
spring:
  application:
    name: my-app
```

## 5. How Everything Connects

1. App Starts
   
   ```java
   SpringApplication.run()
   ```

2. Component Scan
   
   Spring finds:

   - @RestController
   - @Service
   - @Repository

3. Beans Created
   - Object instantiated
   - Dependencies injected

4. Embedded Server Starts
   - Tomcat runs
   - App listen on port 8080

5. Request Comes In
   
   ```
   GET /hello
   ```

6. Routed to Controller
   
   ```java
    @RestController
    class HelloController {
        @GetMapping("/hello")
        public String hello() {
            return "Hello";
        }
    }
   ```

   - Response Returned

## 6. pom.xml (Dependencies)

This is where starters live:

```XML
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

What this is for:

- Spring MVC
- Jackson
- Embedded Tomcat

## 7. Points to focus

- Putting class outside scan package, @ComponentScan will not be able to reach to your beans
- There should be only one main class
- Add dependencies carefully otherwise you might get dependency conflict.
- Keep architecture clean `controller -> service -> repository`
- Never put business logic in controller
- use meaningful package name

> Spring Boot projects are convention-driven, structure matters as much as code.

