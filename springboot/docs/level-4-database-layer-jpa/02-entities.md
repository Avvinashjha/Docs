# Entities (How Java becomes a Table)

This is where ORM becomes real.

## 1. What is an entity?

An Entity is a Java class that represents a table in database.

Mapping:

```
Class -> Table
Object -> Row
Field -> Column
```

Example:

```java
import jakarta.persistence.*;

@Entity
public class User {
    @Id
    private int id;

    private String name;
}
```

What happens internally?

When your app starts:

```
Spring Boot -> Hibernate -> Database
```

Hibernate sees @Entity and creates

```
user
------
id | name
```

## 2. Core Annotations

1. `@Entity`
   
   ```java
    @Entity
   ```

   Tells JPA:
   - This class should be mapped to a database table.

   Important Rules:
   - Must have a default constructor
   - Must have a primary key (@Id)

2. `@Table`
   
   ```java
    @Entity
    @Table(name="users")
    public class User{}
   ```

   Why use it?
   - Default table name = class name, But you may want
   - Naming conventions
   - Avoid reserved keywords

3. `@Id `(Primary Key)
   
   ```java
   @Id
   private int id;
   ```

   - Every entity must have a unique identifier, Because ORM needs to
     - Track objects
     - Update/delete correctly

4. `@GeneratedValue`
   
   ```java
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
   ```

   - Database will auto-generate ID

   Common Strategy:

   | Strategy   | Meaning                        |
   | ---------- | ------------------------------ |
   | `IDENTITY` | Auto-increment (DB handles it) |
   | `AUTO`     | Let JPA decide                 |

4. `@Columns`
   
   ```java
   @Column(name = "user_name", nullable = false, length = 50)
   private String name;
   ```

   Why to use it?
   - Control
     - Column name
     - Nullability
     - Length
     - Uniqueness

## 3. Full Example (Proper Entity)

```java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_name", nullable = false)
    private String name;

    @Column(nullable = false)
    private int age;

    // default constructor
    public User() {}

    // getters/setters
}
```

## 4. What Happens at Runtime

When app starts:

1. Spring Boot starts
2. Hibernate scans @Entity classes
3. Builds metadata
4. Generates SQL
5. Execute SQL (if ddl-auto=update)

### Important Config

```
spring.jpa.hibernate.ddl-auto=update
```

Meaning:

| Value      | Behavior               |
| ---------- | ---------------------- |
| `create`   | Drop + recreate tables |
| `update`   | Update schema          |
| `validate` | Only validate          |
| `none`     | Do nothing             |


- Never use, create/update in production blindly.

## 5. Entity Lifecycle

An entity goes through states:

```
Transient → Persistent → Detached → Removed
```

### Transient

```java
User u = new User()
```

- Not yet saved

### Persistent

```java
repo.save(u)
```

- Managed by Hibernate

### Detached

```
Entity exists but not tracked
```

### Removed

```java
repo.delete(u)
```

- This matters later (transactional, updates)

> Entity is a bridge where java Objects become database tables.

