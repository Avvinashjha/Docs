# Relationship in JPA

## First Thin Database Terms

Before JPA, think tables.

Example Table

```
User
------
id | name

Order
------
id | user_id
```

This is a relationship:

```
One User -> Many Tables
```

Relationship in JPA are just foreign keys in database.

## 1. Many-to-One 

Scenario:

Many Orders belongs to one User

```
Many Orders -> One User
```

Database:

```
orders
------
id | user_id
```

JPA Mapping:

```java
@Entity
public class Order {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
```

What @JoinColumn does?

Creates:

```
user_id column in orders table
```

Connection

```
order.user -> User object
```

## 2. One to Many

Same Relationship (reverse side)

One User -> Many Order

```java
@Entity
public class User{
    @Id
    @GeneratedValue
    private int id;

    @OneToMany(mappedBy="user")
    private List<Order> orders;
}
```

What is `mappedBy` means?

This is not the owner.

### Owner vs Non-Owner

Owning side

```java
@ManyToOne
@JoinColumn
```

- Controls foreign key

Non-Owning side

```java
@OneToMany(mappedBy = "user")
```

- Just reference

Rule:
- Foreign key lives in owning side.

## 3. One-to-One

Example:

```
One User -> One Profile
```

DB

```
profile
------
id | user_id
```

Mapping

```java
@Entity
public class Profile{
    @Id
    @GeneratedValue
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
```

Reverse Side

```java
@Entity
public class User{
    @Id
    @GeneratedValue
    private int id;

    @OneToOne(mappedBy="user")
    private Profile profile;
}
```

## 4. Many-to-Many

Example

```
Many users <-> Many Roles
```

DB needs Join table

```
user_role
----------
user_id | role_id
```

Mapping

```java
@Entity
public class User {

    @ManyToMany
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;
}
```

What Happens

Hibernate creates:
- user table
- role table
- user_role tables

Important Rule
- Many-to-Many = hidden join table

## 5. Fetch Types

Default Behavior

| Relation  | Default Fetch |
| --------- | ------------- |
| ManyToOne | EAGER         |
| OneToMany | LAZY          |

### Eager

```
Fetch immediately
```

### Lazy

```
Fetch when accessed
```

Example:

```java
user.getOrders();
```

- Trigger DB query (if Lazy)
  
### Problem: N + 1 Queries 

Lazy loading can cause 
- multiple DB calls
- Performance issue

We will discuss this later.

## 6. Cascade 

Example

```java
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
private List<Order> orders;
```

Meaning:

```
Save user -> save order
Delete user -> delete orders
```

>User carefully

## 7. Circular Reference Problem

Problem

```java
User → List<Order>
Order → User
```

JSON Response:
```
User → Orders → User → Orders → infinite loop 😵
```

Result:

```
StackOverflowError
```

Solution:

Option 1: `@JsonIgnore`

```java
@JsonIgnore
private User user;
```

Option 2: `@JsonManagedReference` / `@JsonBackReference`

```java
@JsonManagedReference
private List<Order> orders;

@JsonBackReference
private User user;
```

Option 3: Use DTOs

## Full Example

User:

```java
@Entity
class User {

    @Id
    @GeneratedValue
    int id;

    String name;

    @OneToMany(mappedBy = "user")
    List<Order> orders;
}
```

Order:

```java
@Entity
class Order {

    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
```

Flow:

```
User object
   ↓
Orders list
   ↓
Each Order has user_id
   ↓
DB stores relation
```

> JPA relationship are just object representation of foreign key relationship in the database.

