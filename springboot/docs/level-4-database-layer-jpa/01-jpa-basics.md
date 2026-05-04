# JPA Basics

## 1. What is JPA?

JPA is not a tool, JPA is a specification (set of rules/interfaces) for how Java interacts with databases.

JPA itself does not:
- Connect to DB
- executes SQL
- store data

It only defines **How it should be done**

### Then who does the actual work?

Hibernate ORM

Hibernate ORM is an open-source object–relational mapping (ORM) framework for Java that automates the mapping of Java classes to relational database tables.

Hibernate sits between an application and its relational database, translating Java object operations into SQL statements. It manages sessions, caching, and transactions while ensuring ACID compliance. Entities—typically Plain Old Java Objects (POJOs)—are annotated or mapped via XML to define table relationships, keys, and constraints. Its two-level cache and lazy-loading features optimize performance in large-scale systems 

### Relationship

```
Code -> JPA(rules) -> Hibernate (implementations) -> database
```

So:
- JPA - driving rules
- Hibernate - driver
- DB - road

Why JPA Exists?

Before JPA:
- Each ORM tool had its own API
- Switching tool = rewrite code

JAP Standardizes everything.

## 2. ORM Concept 
This is the most important concept in this level.

### What is ORM?

ORM = Object Relational Mapping

Problem Statement

You have:

Java Object:

```java
User user = new User(1, "Avinash");
```

Database Table:

```
users
------
id | name
```

Gap:

- Java = Objects
- DB = Tables

These are completely different worlds.

ORM Solves this:

```
Object <-> Table
Field <-> Column
Instance <-> Row
```

Example Mapping:

Java:

```java
class User {
    int id;
    String name;
}
```

DB:

```
users
------
id | name
```

ORM connects:

```
user.id -> users.id
user.name -> users.name
```

### What ORM Actually Does Internally

When you call:

```java
repo.save(user);
```

Behind the scenes:

1. ORM inspects object
2. Convert to SQL: Inset into users(id, name) values (?, ?)
3. Executes query
4. Maps result back if needed

### Without ORM vs With ORM

Without ORM (JDBC)

```java
PrepareStatement stmt = conn.prepareStatement(
    "INSERT INTO users(name) VALUES (?)"
);
stmt.setString(1, user.getName());
```

With ORM:

```java
repo.save(user);
```

- Same result, but abstraction is higher.

> ORM is not removing SQL, It is generating SQL for you.

## Common Misconception

1. I don't need to Know SQL if I use JPA
   
   Wrong, You still need SQL knowledge to:
   - Debug queries
   - Optimize Performance

2. JPA stores object
   
   No, Database still stores rows and columns

In Production:
- ORM saves time
- But developer still:
  - analyze queries
  - Optimize joins
  - handle performance issues

> JAP defines the rules, Hibernate executes them, and ORM bridges Java Objects with database tables.