# Beans (Core Spring)

A Bean = an object that is created, managed, and controlled by Spring IoC Container.

Normal Java Object:

```java
Laptop laptop = new Laptop();
```

- You create it
- You manage it
- You destroy it

Spring Bean

```java
@Component
class Laptop{}
```

- Spring creates it
- Spring manages it
- Spring injects it
- Spring destroys it

That object becomes bean.

## How Bean is Created (Lifecycle overview)

Spring does not just do new, it follows a lifecycle:

### Bean Lifecycle

1. **Instantiation**
   
   ```
    spring creates object (using constructor)
   ```

2. **Dependency Injection**
   
   ```
    Dependencies are injected (@Autowired / constructor)
   ```

3. **Initialization**
   
   ```
    Custom logic runs (init method)
   ```

4. **Ready to Use**
   
   ```
   Bean is now in container
   ```

5. **Destruction**
   
   ```
   Cleanup logic runs when app shuts down
   ```

### Example: Full Bean Lifecycle

```java
@Component
public class Desktop implements Computer{
    public Desktop(){
        System.out.println("1. Constructor called");
    }

    @PostConstruct
    public void init(){
        System.out.println("2. Bean Initialized");
    }

    public void code(){
        System.out.println("3. Using bean");
    }

    @PreDestroy
    public void destroy(){
        System.out.println("4. Bean Destroyed");
    }
}
```


```
2026-04-30T14:04:48.822+05:30  INFO 87112 --- [designs] [           main] b.w.c.s.WebApplicationContextInitializer : Root WebApplicationContext: initialization completed in 460 ms
1. Constructor called
2. Bean Initialized
2026-04-30T14:04:49.072+05:30  INFO 87112 --- [designs] [           main] o.s.boot.tomcat.TomcatWebServer          : Tomcat started on port 8001 (http) with context path '/'
2026-04-30T14:04:49.075+05:30  INFO 87112 --- [designs] [           main] com.system.designs.lessonTest.Main       : Started Main in 0.974 seconds (process running for 1.183)
3. Using bean
2026-04-30T14:04:57.595+05:30  INFO 87112 --- [designs] [ionShutdownHook] o.s.boot.tomcat.GracefulShutdown         : Commencing graceful shutdown. Waiting for active requests to complete
2026-04-30T14:04:57.599+05:30  INFO 87112 --- [designs] [tomcat-shutdown] o.s.boot.tomcat.GracefulShutdown         : Graceful shutdown complete
4. Bean Destroyed

```

## Bean Scope (Very Important)

1. Singleton (Default): Only one Instance in entire app.
   
   All classes shares same object.

   ```java
   @Component
   class Laptop{}
   ```

2. Prototype: New Object every-time requested.
   
   ```java
    @Scope("prototype")
    @Component
    class Laptop{}
   ```

3. Web Scope (for later)
   - Request
   - Session

### Singleton vs Prototype

| Feature                 | Singleton | Prototype         |
| ----------------------- | --------- | ----------------- |
| Instances               | One       | Many              |
| Managed fully by Spring | ✅         | ❌ (partial)       |
| Use case                | Services  | Temporary objects |

If prototype, does spring manage lifecycle?

Only partially:

- Spring creates it
- But does not destroys it.

## How Beans are Registered

1. **Component Scanning** (Most common)
   
   ```java
    @Component
    @Service
    @Repository
    @Controller
   ```
   - All are specialized Beans

2. Manual Bean Creation
   
   ```java
    @Configuration
    class AppConfig {
        @Bean
        public Laptop laptop(){
            return new Laptop();
        }
    }
   ```
   - Useful when:
     - Third-party classes
     - Custom configuration needed

## Internal Working

When App Stars:
1. Spring scans packages
2. Finds `@Component`
3. Creates Bean definition
4. Builds dependency graph
5. Instantiate Beans in order
6. Stores them in container

## Real World Analogy

Think of Spring like a factory warehouse:

- Bean = Products
- IoC container = factory manager
- DI = assembly line

You don't build parts manually, factory does it.

## Problem 

1. Create a Bean with
   - Constructor log
   - @PostConstruct
   - @PreDestroy
2. Run app and observer order
3. Change scope to prototype and see behavior difference

Solution:

1. Create a Bean 
   ```java
    @Component
    @Scope("prototype")
    public class Desktop implements Computer{
        public Desktop(){
            System.out.println("1. Constructor called");
        }

        @PostConstruct
        public void init(){
            System.out.println("2. Bean Initialized");
        }

        public void code(){
            System.out.println("3. Using bean");
        }

        @PreDestroy
        public void destroy(){
            System.out.println("4. Bean Destroyed");
        }
    }
   ```

   Output:

   ```
    1. Constructor called
    2. Bean Initialized
    3. Using bean
   ```

   So in case of Scope prototype @PreDestroy is not getting executed. So In case of Scope prototype Spring partially manages the lifecycle, it is responsible for 
   ```
   instantiation -> dependency injection -> initialization -> use 
   ```

   but Spring is not destroying that bean instance.


   
