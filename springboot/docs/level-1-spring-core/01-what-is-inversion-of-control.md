# Inversion of Control

**IoC means**: you don't control object creation and dependency wiring, the framework does it for you.

## Traditional Way

You control everything manually.

```java
class Engine{
    void start(){
        System.out.println("Engine Started");
    }
}

class Car{
    private Engine engine;

    public Car(){
        engine = new Engine(); // tightly coupled
    }

    void drive(){
        engine.start();
        System.out.println("Car is driving");
    }
}
```

Problems:

- Tight coupling (Car depends on engine)
- Hard to test
- Hard to replace Engine (e.g. ElectricEngine)

## With IoC Concept

Remove **control from you code** and give it to container.

```java
class Car{
    private Engine engine;

    public Car(Engine engine){
        this.engine = engine; // dependency injected 
    }
}
```

Now:

- Car does not create engine
- Someone creating Car instance will have to provide engine

and that someone is Spring.

## IoC in Spring

Spring uses IoC container, this container:

- Create objects (Beans)
- Manages Lifecycle
- Injects dependencies

## What is Bean?

A **Bean is an object** managed by Spring IoC container.

Example:

```java
@Component
class Engine{}

@Component
class Car{
    private final Engine engine;

    public Car(Engine engine){
        this.engine = engine;
    }
}
```

Spring will:

1. Create Engine
2. Create Car
3. Inject Engine into Car

## Why is it called `Inversion`?

Because control is reversed(Control is inverted from you to container)

| Traditional             | With IoC                    |
| ----------------------- | --------------------------- |
| You create objects      | Spring creates objects      |
| You manage dependencies | Spring injects dependencies |
| You control flow        | Framework controls flow     |

## How Spring Does this Internally (High-Level)

1. Scans classes (`@Component`)
2. Register them as Beans
3. Build dependency graph
4. Instantiate in correct order
5. Injects dependencies

## Type of IoC (Conceptually)

Ioc can be achieved via:

1. **Dependency Injection (DI) (Used in Spring)**
   - Constructor injection
   - Setter injection

2. **Dependency Lookup(less used)**
   - You ask container for object

## Why IoC Matters?

- Loose Coupling
- Easy testing (mock dependencies)
- Better modular design
- Swappable implementation

## Common misconception

IoC is not a Spring feature, **IoC is a design principle** and Spring is just an implementation.

So as per IoC, Don't Create objects, declare what you need, Spring will provide it.

## Question

Try to convert this to IoC:

```java
class Laptop{
    void code(){}
}

class Developer{
    private Laptop laptop = new Laptop()
}
```

Solution:

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

Or you can create an interface and it is better to depend on interface than class.

```java
interface Computer {
    void code();
}

class Laptop implements Computer {
    public void code(){}
}

class Developer{
    private final Computer computer;

    public Developer(Computer computer){
        this.computer = computer;
    }
}
```

- Prefer depending on interface not on concrete class.

Now we can Swap:

- Laptop
- Desktop
- RemoteServer
Without touching developer.
