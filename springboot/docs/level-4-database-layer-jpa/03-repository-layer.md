# Repository Layer (JpaRepository)

This is where spring stats doing heavy lifting for you.

## 1. What is a Repository?

Repository = abstraction over data access layer

### Without Repository

You would write:

```java
SELECT * FROM users WHERE id = 1;
INSERT INTO users ...
UPDATE users ...
```

- manually everywhere

### With Repository

You just write:

```java
userRepository.findById(1);
userRepository.save(user);
```

- No SQL, but SQL is still executed internally.

### Where It Fits

```
Controller → Service → Repository → DB
```

- Repository is last Java Layer before database

## 2. JpaRepository (Core Interface)

Spring gives:

```java
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Integer>{}
```

When you extend JpaRepository, Spring gives you dozens of method automatically.

## 3. Out-of-the-Box Methods

### Save

```java
repo.save(user);
```

Handles:

- Insert(if new)
- Update(if exists)

### Find By ID

```java
repo.findById(1);
```

Returns:

```java
Optional<User>
```

### Find All

```java
repo.findAll();
```

### Delete

```java
repo.deleteById(1);
```

- You didn't implement anything... but everything works

How?

Spring uses:
- Proxy classes
- Reflection
- Runtime code generation

It creates implementation behind the scenes

## 4. How `save()` works Internally

This is important, don't treat it as magic.

### Case 1: New Entity

```java
User u = new User(); // id = 0 / null
repo.save(u)
```

Hibernate runs:

```sql
INSERT INTO users ...
```

### Case 2: Existing entity

```java
u.setId(1);
repo.save(u);
```

Hibernate Runs:

```sql
UPDATE users SET ...
```

Decision Logic

```
If ID is null -> Insert
If ID exists -> Update
```

- Save decides if insert of update based on the entity state

## 5. Optional

Example:

```java
Optional<User> user = repo.findById(1);
```

### Why Optional?

Because, User may or may not exists.

```java
User user = repo.findById(1); // risk
```

Good:

```java
User user = repo.findById(1).orElseThrow(()-> new RuntimeException("Not Found"));
```

- This will directly be handle by our exception handling.

## 6. Custom Methods

You can write:

```java
List<User> findByName(String name);
```

- Spring generate query automatically
- We will discuss this in details 

## Repository vs Service 

Don't do this:

```java
@RestController
class UserController {
    @Autowired UserRepository repo;
}
```

Correct:

```
Controller -> Service -> Repository
```

Why?

- Separation of concerns
- Business Logic in service
- DB logic in repository

## 8. Real Example Flow

Entity:

```java
@Entity
class User {
    @Id
    @GeneratedValue
    private int id;
    private String name;
}
```

Repository:

```java
interface UserRepository extends JpaRepository<User, Integer> {}
```

Service:

```java
@Service
class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User create(User u) {
        return repo.save(u);
    }
}
```

Controller:

```java
@PostMapping
public User create(@RequestBody User user) {
    return service.create(user);
}
```

Full Flow:

```
POST /users
   ↓
@RequestBody → User object
   ↓
Service
   ↓
Repository.save()
   ↓
Hibernate → SQL → DB
```

