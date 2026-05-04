# Dependency Injection (DI)

## What is Dependency Injection?

DI = Providing dependencies to a class instead of letting it create them.

```java
class Laptop{
    void code(){}
}

class Developer{
    private final Laptop laptop;

    public Developer(Laptop laptop){
        this.laptop = laptop;
    }
}
```

In this Example:

- `Laptop` = dependency
- `Developer` = dependent class
- Passing via constructor = **Constructor Injection**

## Types of Dependency Injection

1. Constructor Injection (Best Practice)
   
   ```java
    @Component
    class Developer{
        private final Computer computer;
        public Developer(Computer computer){
            this.computer = computer;
        }
    }
   ```

   Why this is Best:
   - Valid state at creation time
   - Immutable dependencies (final)
   - Required dependency enforced
   - fail fast design
   - Easy to test
   - No null issues
   - used 90% of the time.

2. Setter Injection (Optional Dependencies)
   
   ```java
   @Component
   class Developer{
    private Computer computer;

    @Autowired
    public void setComputer(Computer computer){
        this.computer = computer;
    }
   }
   ```

   Use when:
   - Dependency is optional
   - You may change it later

3. Field Injection (Not Recommended)
   
   ```java
    @Component
    class Developer{
        @Autowired
        private Computer computer;
    }
   ```

   Why Not Recommended:
   - Hard to test
   - Breaks immutability
   - Hidden dependencies

## How Spring Preform DI

When Spring starts:

1. Finds classes with `@Component`
2. Create object (Beans)
3. Looks at constructor parameters
4. Automatically injects matching Beans

## Autowiring (Key concept)

Spring automatically wires dependencies

```java
@Autowired
public Developer(Computer computer){
    this.computer = computer;
}
```

- In modern Spring (Boot 3+) autowired is optional for constructors.

In Case of multiple implementations, Spring gets confused.

```java
@Component
class Laptop implements Computer{}

@Component
class Desktop implements Computer{}
```

To avoid the confusion we can use:

1. `@Qualifier` - tells IoC container which implementation is required

```java
public Developer(@Qualifier("laptop") Computer computer){
    this.computer = computer;
}
```

2. `@Primary` - makes the bean as default choice

```java
@Primary
@Component
class Laptop implements Computer{}
```

## Problem

1. Create:
   - Computer interface
   - Laptop and Desktop
2. Inject into Developer
3. Try:
   - Break it with multiple beans
   - Fix using @Qualifier
   - Fix using @Primary

Solution:

1. Computer Interface

```java
public interface Computer {
    void code();
}
```

2. Laptop and Desktop

```java
@Component
public class Laptop implements Computer{
    public void code() {
        System.out.println("Coding Laptop");
    }
}
```

```java
@Component
public class Desktop implements Computer{
    public void code(){
        System.out.println("Desktop code");
    }
}
```

3. Inject into developer

We need to inject it into develop and we need to use Spring so we need to use Spring context.

Main.java

```java
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        var context = SpringApplication.run(Main.class, args);

        Developer d1 = context.getBean(Developer.class);
        d1.code();
    }
}
```

- First we created a Spring application context and pass the Class and args
- the we create a Developer and now we are trying to get the bean of developer but the problem Spring facing is, since developer needs Computer so Spring IoC Container is not sure which bean to inject from Laptop and Desktop, so it will throw error.

```
Parameter 0 of constructor in com.system.designs.lessonTest.Developer required a single bean, but 2 were found:
	- desktop: defined in file [/Users/avinash.jh/Desktop/Private/designs/target/classes/com/system/designs/lessonTest/Desktop.class]
	- laptop: defined in file [/Users/avinash.jh/Desktop/Private/designs/target/classes/com/system/designs/lessonTest/Laptop.class]
```

So to fix that we have 2 ways:

1. Make a bean default choice using @Primary

Let's make Laptop as default choice, so if there we two implementation in that case Spring will choose the default bean

```java
@Component
@Primary
public class Laptop implements Computer{
    public void code() {
        System.out.println("Coding Laptop");
    }
}
```

2. Add @Qualifier in Constructor of developer, so that Spring container knows which bean is required in that constructor injection.

```java
@Component
public class Developer {
    private final Computer computer;

    @Autowired
    public Developer(@Qualifier("desktop") Computer computer){
        this.computer = computer;
    }

    public void code(){
        this.computer.code();
    }
}
```

What if @Primary is there and you also added @Qualifier, which will take precedence?

- @Qualifier will take precedence over @Primary.