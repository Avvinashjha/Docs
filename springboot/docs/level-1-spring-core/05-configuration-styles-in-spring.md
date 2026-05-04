# Configuration Styles in Spring

This is about, How we tell Spring what beans to create and how to wire them.

There are 3 stage:

```
XML -> Java Config -> Annotation Bases (modern)
```

## 1. XML Configuration

THis is how Spring started.

Example:

```xml
<beans>
    <bean id="laptop" class="com.example.Laptop"/>
    <bean id="developer" class="com.example.Developer">
        <constructor-arg ref="laptop"/>
    </bean>
</beans>
```

What is happening?

- You explicitly define:
  - Bean creation
  - Dependency wiring
- Spring reads XML -> Creates object

Problems:

- Very verbose
- Hard to maintain
- No type safety
- Refactoring is painful

Status:

- Almost dead in modern projects
- Only know it for interviews

## 2. Java-Based Configuration (Programmatic)

Instead if XML, we use Java Classes.

Example:

```java
@Configuration
public class AppConfig {
    @Bean
    public Laptop laptop(){
        return new Laptop();
    }

    @Bean 
    public Developer developer(){
        return new Developer(laptop());
    }
}
```

What is happening?

- @Configuration -> make config class
- @Bean -> Tells Spring: This methods returns a Bean.

```java
return new Developer(laptop())
```

Looks like normal method call, but:

- Spring intercepts it
- Ensures **singleton behavior**

Advantages:

- Type-safe
- Refactor friendly
- No XML

When to use this?

- You need manual control
- Third party classes
- Complex object creation

## 3. Annotation based Configuration

This is what we mostly use.

Example:

```java
@Component
class Laptop{}

@Component
class Developer {
    private final Laptop laptop;
    public Developer(Laptop laptop){
        this.laptop = laptop;
    }
}
```

**What is happening?**

- Spring scans package
- Finds @Component
- Automatically creates beans
- Automatically injects dependencies

**Behind the Scene**

Enabled by:

```java
@ComponentScan
```

- In Spring Boot, this is auto-enabled via:

```java
@SpringBootApplication
```

## How do they work together?

In real project, you often mix:

- Annotations ->for most beans
- Java Config (@Bean) -> for special cases

Example:

```java
@Component
class Laptop{}
```

```java
@Configuration
class AppConfig{
    @Bean
    public Developer developer(Laptop laptop){
        return new Developer(laptop)
    }
}
```

- Annotations  are just implicit configuration.
- Use @Bean only when needed
- If package structure is wrong, Main class not at root -> beans are not detected
