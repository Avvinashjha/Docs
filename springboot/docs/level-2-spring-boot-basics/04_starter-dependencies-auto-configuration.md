# Starter Dependencies and Auto Configuration

This is the reason Spring Boot feels effortless.

## 1. Starter Dependencies (The Smart bundle)

Before Spring Boot, you had to manage dependencies like this:

```xml
spring-core
spring-web
spring-context
jackson
hibernate-validator
tomcat
...
```

- Easy to mess up versions.

With Starter, you just add:

```xml
spring-boot-starter-web
```

This includes:

- Spring MVC
- JSON Support (Jackson)
- Validation
- Embedded server

One dependency = full web stack

### Common Starters

| Starter                        | Purpose   |
| ------------------------------ | --------- |
| `spring-boot-starter-web`      | REST APIs |
| `spring-boot-starter-data-jpa` | Database  |
| `spring-boot-starter-security` | Security  |
| `spring-boot-starter-test`     | Testing   |


## 2. Auto Configurations (Real Magic)

Auto Configuration = Spring Boot automatically configures beans based on what's on the classpath.

Example:

You add:

```
spring-boot-starter-web
```

Spring Boot automatically:
- Configures DispatcherServlet
- Sets up Jackson
- Start Tomcat
- Enables Spring MVC

**How does it know what to configure?**

It checks:
- What dependencies are present?

## 3. How Auto Configuration works (Internally)

When you use:

```java
@SpringBootApplication
```

It enables:

```java
@EnableAutoConfiguration
```

### Inside Auto Configuration

Spring Boot loads:

```
META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
```

- This file contains hundreds of auto-config classes

Example Logic:

```java
@ConditionalOnClass(name = "org.springframework.web.servlet.DispatcherServlet")
public class WebMvcAutoConfiguration {
    // configure Spring MVC
}
```

Meaning:

- If DispatcherServlet exists -> Configure MVC
- Else -> Skip

## 4. Conditional Annotations (Very Important)

These control auto-config behavior.

Common Conditions:

- `@ConditionalClass` - Run config if class exists
- `@ConditionalOnMissingBean` - only create bean if not already defined
- `@ConditionalOnProperty` - Based on config value

Example:

```java
@Bean
@ConditionalOnMissingBean
public ObjectMapper objectMapper() {
    return new ObjectMapper();
}
```

- If yo define your onw Spring backs of

## 5. Override Auto Configuration

Spring Boot is smart, but not rigid.

### Example: Custom Bean

```java
@Bean
public ObjectMapper objectMapper(){
    return new ObjectMapper().findAndRegisterModules();
}
```

- This overrides default

### Disable specific auto-config

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```

## 6. Metal Model

Think:

```
Starter → brings dependencies
Auto-config → configures them automatically
```

Real Flow:

1. You add starter
2. Dependencies come in
3. Spring Boot detects them
4. Auto config kicks in
5. Bean created

> Spring Boot is not removing complexity - it is hiding it behind smart defaults.

> Spring Boot watches your classpath and configures the application accordingly.