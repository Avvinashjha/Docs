# Transactions (@Transactional)

## 1. What is a Transaction?

A transaction is a group of operations that must either:
- All Succeed
- or all Fail

Example:

Without Transaction:

```java
public void createOrder(){
    orderRepo.save(order); // success
    paymentRepo.save(payment); // fails
}
```

Result:
- Order saved
- Payment not saved

Inconsistent System.

With Transaction

```java
@Transactional
public void createOrder(){
    orderRepo.save(order);
    paymentRepo.save(payment);
}
```

- If payment fails:
  
  ```
  Rollback everything
  ```

Result:
- Nothing saved
- System stays consistent.

## 2. Where Does @Transactional Work?

Best Practice

```java
@Service
public class OrderService{
    @Transactional
    public void createOrder(){...}
}
```

Don't use in controller, Transactions belongs to business logic layer.

## 3. How it works internally?

Spring uses:
- AOP (proxy-based)
- Wraps your method

Behind the scenes:

```
Start Transaction
   ↓
Execute method
   ↓
If success → COMMIT
If exception → ROLLBACK
```

## 4. Types of Operations

### Write operations

```java
@Transactional
public void saveData(){}
```

Required for:
- INSERT
- UPDATE
- DELETE

### Read Operations

```java
@Transactional
public List<User> getUser(){}
```

Why Read only?
- Optimization
- Prevent accidental updates

## 5. Rollback Rules

### Default Behavior
- Rolls back only on
  
  ```
  RuntimeException (unchecked)
  ```

- Not Rolled back on:
  
  ```
  Checked exception
  ```

Example:

```java
@Transactional
public void test() trows Exception {
    repo.save(user);
    throw new Exception("Checked exception");
}
```
- Data will still be saved

Fix:

```java
@Transactional(rollbackFor= Exception.class)
```

## 6. Transaction Propagation 

Default:

```java
@Transactional
```

Uses:

```
REQUIRED
```

Meaning: 
- If transaction exits -> join it
- Else -> Create new

Example:

```java
@Transactional
public void methodA(){
    methodB();
}

@Transactional
public void methodB(){}
```

## 7. Common Pitfall

### Internal Method call Problem

```java
public void methodA() {
    methodB(); //  transactional may not apply
}

@Transactional
public void methodB() {}
```

Why?

Spring uses proxy, so:
- Internal calls bypass proxy

Fix:
- call via another bean
- Or restructure logic

## 8. Isolation Levels

Purpose: Control how transactions see other's data.

Common Levels:

| Level           | Meaning              |
| --------------- | -------------------- |
| READ_COMMITTED  | Default              |
| REPEATABLE_READ | Prevents dirty reads |
| SERIALIZABLE    | Strictest            |

## 9. Real Flow

1. Controller calls service
2. Transaction starts
3. DB operations happen
4. If everything OK → commit
5. If error → rollback

Full Example:

```java
@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final PaymentRepository paymentRepo;

    public OrderService(OrderRepository orderRepo, PaymentRepository paymentRepo) {
        this.orderRepo = orderRepo;
        this.paymentRepo = paymentRepo;
    }

    @Transactional
    public void placeOrder(Order order, Payment payment) {

        orderRepo.save(order);

        if (true) {
            throw new RuntimeException("Payment failed");
        }

        paymentRepo.save(payment);
    }
}
```

> Transaction ensure your database stays consistent, even when things fail.
