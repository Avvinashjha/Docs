# What is Spring Boot
Spring Boot is a framework that simplifies Spring application development using **auto-configuration, embedded servers, and starter dependencies**.
## The code problem (before spring boot)

Before Spring Boot, building app was painful.

You have to do:

- Configuration XML or Java config manually
- Setup server (Tomcat/jetty)
- Manage Dependencies carefully
- Writes tons of boilerplate code

Example:

To run a simple REST API, you needed:
- Dispatcher servlet config
- View resolver
- Component scan
- Web config
- Server setup

This is way too much setup for a simple app.

>Spring Boot = Opinionated layer on top of Spring that removes configuration pain.

## Key Features

1. Auto Configuration
   
   Spring Boot automatically configures your app based on dependencies.

   Example:

   If you add:

   ```xml
    spring-boot-starter-web
   ```

   Spring Boot auto configures:
   - Dispatcher servlet
   - Jackson (JSON)
   - Tomcat server
   - Spring MVC

   Without Boot: You have to configure everything manually and with spring boot you just add the starter dep and you are ready to go.

2. Starter Dependencies
   
   Instead of adding 10 dependencies, you add one:

   ```xml
    spring-boot-starter-web
   ```

   Includes:
   - Spring MVC
   - Jackson
   - Validation
   - Embedded server

3. Embedded Server
   
   No need to install Tomcat or Jetty Separately.

   Spring Boot includes:
   - Tomcat (default)
   - Jetty
   - Underflow

   Run app like this:

   ```java
    SpringApplication.run(Main.class, args);
   ```

4. Convention over Configuration
   
   Spring Boot makes smart defaults:
   
   | Feature | Default |
   | ------- | ------- |
   | Server  | Tomcat  |
   | Port    | 8080    |
   | JSON    | Jackson |

   You override only when needed.

5. Production Ready Features
   - Monitoring
   - Health Checks
   - Metrics

## How Spring Boot Works Internally (High Level)

When you run:

```java
@SpringBootApplication
```

It actually combines:

```java
@Configuration
@EnableAutoConfiguration
@ComponentScan
```

### Breakdown

1. @ComponentScan
   - Finds your beans

2. @EnableAutoConfiguration
   
   Magic happens here, Spring Boot:
   - Checks class path
   - Applies configurations conditionally

   Example:

   If it sees:

   ```
   spring-web dependency
   ```

   It enables:
   - Spring MVC config

3. @Configuration
   - Allows bean definition

## First Spring Boot App

```java
@SpringBootApplication
public class Main{
    public static void main(String[] args){
        SpringApplication.run(Main.class, args);
    }
}
```

Add Controller

```java
@RestController
class HelloController {
    @GetMapping("/hello")
    public String hello(){
        return "Hello World!";
    }
}
```

Run -> open browser:

```
http://localhost:8080/hello
```

Done. No Config

## Spring Vs Spring Boot

| Feature   | Spring   | Spring Boot |
| --------- | -------- | ----------- |
| Setup     | Manual   | Auto        |
| Config    | Heavy    | Minimal     |
| Server    | External | Embedded    |
| Dev Speed | Slow     | Fast        |


- Spring = Engine
- Spring Boot = Car (ready to drive)

Common Misconception

1. Spring boot replaces Spring
   - No, it uses Spring internally

2. Auto Config means no control
   - You can override everything

>Spring Boot removes Boilerplate, so you can focus on business logic.

