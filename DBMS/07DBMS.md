### **7. Transactions and Concurrency Control**

A **transaction** is a sequence of operations performed as a single logical unit of work. Concurrency control ensures that multiple transactions can execute simultaneously without compromising data integrity.

---

#### **1. Transaction Concepts**

1. **ACID Properties**:
   - **Atomicity**: A transaction is all-or-nothing. If any part fails, the entire transaction is rolled back.
   - **Consistency**: A transaction brings the database from one valid state to another.
   - **Isolation**: Transactions execute independently of one another.
   - **Durability**: Once committed, changes are permanent.

2. **Transaction States**:
   - **Active**: The transaction is executing.
   - **Partially Committed**: The final operation has been executed, but changes are not yet saved.
   - **Committed**: The transaction is successfully completed, and changes are saved.
   - **Failed**: The transaction cannot proceed due to an error.
   - **Aborted**: The transaction is rolled back, and the database is restored to its previous state.

---

#### **2. Concurrency Control**

Concurrency control ensures that multiple transactions can execute simultaneously without leading to inconsistencies.

1. **Problems Due to Concurrency**:
   - **Lost Update**: Two transactions update the same data, and one update is lost.
   - **Dirty Read**: A transaction reads uncommitted data from another transaction.
   - **Unrepeatable Read**: A transaction reads the same data twice, and the values differ.
   - **Phantom Read**: A transaction reads a set of rows twice, and the set differs.

2. **Lock-Based Protocols**:
   - **Shared Lock (S)**: Allows multiple transactions to read a resource.
   - **Exclusive Lock (X)**: Allows only one transaction to write to a resource.
   - **Two-Phase Locking (2PL)**:
     - **Growing Phase**: Locks are acquired.
     - **Shrinking Phase**: Locks are released.
     - Ensures serializability but can lead to deadlocks.

3. **Timestamp-Based Protocols**:
   - Each transaction is assigned a unique timestamp.
   - Ensures that transactions execute in timestamp order.
   - Example: If Transaction A has a smaller timestamp than Transaction B, A executes first.

4. **Deadlock Handling**:
   - **Deadlock Prevention**: Ensures that deadlocks cannot occur (e.g., by requiring all locks to be acquired at once).
   - **Deadlock Detection**: Periodically checks for deadlocks and resolves them (e.g., by aborting one transaction).
   - **Deadlock Avoidance**: Uses algorithms to avoid deadlocks (e.g., wait-die, wound-wait).

---

#### **3. Isolation Levels**

Isolation levels define how transactions interact with each other.

1. **Read Uncommitted**:
   - Allows dirty reads.
   - Lowest isolation level.

2. **Read Committed**:
   - Ensures that only committed data is read.
   - Prevents dirty reads but allows unrepeatable reads and phantom reads.

3. **Repeatable Read**:
   - Ensures that if a transaction reads the same data twice, the values are the same.
   - Prevents dirty reads and unrepeatable reads but allows phantom reads.

4. **Serializable**:
   - Ensures complete isolation.
   - Prevents dirty reads, unrepeatable reads, and phantom reads.
   - Highest isolation level.

---

#### **4. Example of a Transaction**

```sql
BEGIN TRANSACTION;

-- Deduct $100 from Account 1
UPDATE Accounts
SET Balance = Balance - 100
WHERE AccountID = 1;

-- Add $100 to Account 2
UPDATE Accounts
SET Balance = Balance + 100
WHERE AccountID = 2;

-- Commit the transaction
COMMIT;
```

---

### **Summary**

- **Transactions**: A sequence of operations with ACID properties.
- **Concurrency Control**: Ensures consistency in multi-user environments.
  - Problems: Lost update, dirty read, unrepeatable read, phantom read.
  - Protocols: Lock-based, timestamp-based, deadlock handling.
- **Isolation Levels**: Define how transactions interact (read uncommitted, read committed, repeatable read, serializable).

---

[Next](./08DBMS.md)
