# Query Types in Spring Data JPA

So far we used:

```java
repo.findById(id);
repo.findAll();
```

But real apps need:
- Find user by name
- Find orders by user id
- Filter + sort + conditions

## 1. Derived Queries (Method Name Magic)

So the idea is, Spring reads method name and generates query automatically.

Example:

```java
List<User> findByName(String name);
```

Spring generates:

```SQL
SELECT * FROM users WHERE name = ?
```

#### And Condition

```java
List<User> findByNameAndAge(String name, int age);
```

#### Like (Search)

```java
List<User> findByNameContaining(String name);
```

SQL:

```sql
SELECT * FROM users WHERE name LIKE %name%
```

#### Greater than

```java
List<User> findByAgeGreaterThan(int age);
```

#### Order By

```java
List<User> findByGreaterThanOrderByNameAsc(int age);
```

### How this works?

Spring parses:

```
findBy + Field + Condition
```

- Builds query dynamically

#### Limitations

- Method name becomes ugly
  
  ```java
  findByNameAndAgeAndStatusAndCreatedAtAfter...
  ```

## 2. @Query (JPQL - Java Style Query)

What is JPQL?
> JPQL = Query using entity names not table names

Your query:

```
User
```

Not:

```
users table
```

Example

```java
@Query("SELECT u FROM User u WHERE u.name = :name")
List<User> findByNameCustom(@Param("name") String name);
```

Breakdown

```
User u → entity
u.name → field (not column)
```

#### Multiple Conditions

```java
@Query("SELECT u FROM User u WHERE u.age > :age")
List<User> findOlderUsers(int age);
```

#### Join Example

```java
@Query("SELECT o FROM Order o WHERE o.user.id = :userId")
List<Order> findOrderByUser(int userId);
```

### Why JPQL?

Because it works with:
- Entities
- Relationship

Not raw tables.

## 3. Native Queries (Raw SQL)

What is it?
- Direct SQL query

Example:

```java
@Query(value="SELECT * FROM users WHERE name = :name", nativeQuery = true)
List<User> findByNameNative(String name);
```

Use Cases:
- Complex Joins
- DB-Specific features
- Performance tuning

Downsides
- Breaks abstraction, Now you depend on:
  - DB Schema
  - SQL Syntax
- Harder to maintain

## Compare All 3

| Type    | Uses              | Pros                | Cons           |
| ------- | ----------------- | ------------------- | -------------- |
| Derived | Simple queries    | Easy                | Limited        |
| JPQL    | Medium complexity | Clean, entity-based | Learning curve |
| Native  | Complex SQL       | Full power          | Less portable  |


## Internal Flow

When you call:

```java
repo.findByName("John");
```

Behind the scenes:

1. Spring parses method name
2. Builds JPQL/SQL
3. Hibernate executes it
4. Maps result -> Entity

Full Flow

```
Controller → Service → Repository
         ↓
      Query Generated
         ↓
      Hibernate
         ↓
      Database
         ↓
      Result → Entity → JSON
```

> Spring Data JPA gives you 3 levels of query control, from simple method names to fill SQL power.