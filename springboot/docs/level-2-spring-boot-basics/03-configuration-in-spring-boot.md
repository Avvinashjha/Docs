# Configuration in Spring Boot

## What is Configuration?

Configuration = externalizing values instead of hardcoding them.

**Bad Practice:**

```java
String dbUrl = "localhost:3306/mydb";
```

**Good Practice:**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
```
- Now you can change it without changing code.

## 2. application.properties

Default config file:

```
src/main/resources/application.properties
```

Example:

```properties
server.port=8081
spring.application.name=my-app
logging.level.root=INFO
```

## 3. application.yml (Alternative)

Same config, cleaner structure

```YAML
server:
  port: 8081

spring:
  application:
    name: my-app
```

### Properties vs YAML

| Feature     | Properties | YAML                     |
| ----------- | ---------- | ------------------------ |
| Simplicity  | ✅          | ⚠️ indentation-sensitive |
| Readability | Medium     | ✅ better for nested      |

## 4. Profile 

Profiles let you run the same app in different environments.

**Common Profiles:**

- dev -> local development
- test -> testing
- prod -> production

**Config Files**

```
application-dev.properties
application-test.properties
application-prod.properties
```

**Example:**

`application-dev.properties`

```properties
server.port=8081
spring.datasource.url=jdbc:mysql://localhost/devdb
```

`application-prod.properties`

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://prod-server/proddb
```

### Activate Profile

Option 1: properties file

```properties
spring.profiles.active=dev
```

Option 2: command line

```bash
--spring.profile.active=prod
```

Option 3: environment variable

```
SPRING_PROFILES_ACTIVE=prod
```

### How Profiles work Internally

Spring:
1. Loads application.properties
2. Then loads profile-specific file
3. Overrides values

## 5. Injecting values into code

### `@value`

```java
@Value("${server.port}")
private int port;
```

### Custom Properties

```properties
app.name=MyApp
app.version=1.0
```

```java
@Value("@{app.name}")
private String appName;
```

### Better approach: `@ConfigurationProperties`

Step 1: Define Properties

```properties
app.name=MyApp
app.version=1.0
```

Step 2: Bind to class

```java
@Component
@ConfigurationProperties(prefix="app")
private class AppConfig{
    private String name;
    private String version;

    // get and setters
}
```

Why this is better

- type safe
- Cleaner than multiple values
- Scales well

## 6. Environment variables

Spring Boot can read:

```bash
DB_HOST=localhost
DB_PORT=3306
```

Example:

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST}:${DB_PORT}/mydb
```

- used heavily in Docker and Kubernetes

> Code stays constant. Configuration changes per environment.


