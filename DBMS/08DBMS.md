### **8. Indexing and Hashing**

Indexing and hashing are techniques used to speed up data access in a database. They help reduce the number of disk accesses required to retrieve data.

---

#### **1. Indexing**
An **index** is a data structure that improves the speed of data retrieval operations on a database table. It works like a book index, allowing quick access to specific data.

**Types of Indexes**:
1. **Single-Level Index**:
   - A simple index that maps a key to a record.
   - Example: An index on the `StudentID` column.

2. **Multi-Level Index**:
   - A hierarchical index with multiple levels.
   - Example: A B-tree index.

3. **Clustered Index**:
   - The physical order of rows in the table matches the index order.
   - Example: A primary key index.

4. **Non-Clustered Index**:
   - The physical order of rows in the table does not match the index order.
   - Example: An index on a non-primary key column.

**Example**:
```sql
CREATE INDEX idx_name ON Student (Name);
```

---

#### **2. Hashing**
Hashing is a technique used to map data to a fixed-size table (hash table) for fast data access.

**Key Concepts**:
1. **Hash Function**:
   - A function that maps a key to a hash value.
   - Example: `h(key) = key % 10`.

2. **Hash Table**:
   - A table that stores data based on hash values.
   - Example: A hash table with 10 buckets.

**Types of Hashing**:
1. **Static Hashing**:
   - The size of the hash table is fixed.
   - Example: A hash table with 100 buckets.

2. **Dynamic Hashing**:
   - The size of the hash table can change dynamically.
   - Example: Extendible hashing.

**Example**:
```sql
-- Assuming a hash function h(key) = key % 10
INSERT INTO HashTable (Key, Value)
VALUES (1, 'John'), (11, 'Alice'), (21, 'Bob');
```

---

#### **3. B-Trees and B+ Trees**
B-trees and B+ trees are balanced tree data structures used for indexing.

1. **B-Tree**:
   - A self-balancing tree where each node can have multiple keys and children.
   - Example: A B-tree of order 3.

2. **B+ Tree**:
   - A variant of the B-tree where all data is stored in the leaf nodes.
   - Example: A B+ tree of order 3.

**Example**:
```sql
CREATE INDEX idx_name ON Student (Name) USING BTREE;
```

---

#### **4. Indexing Strategies**
1. **Primary Index**:
   - An index on the primary key of a table.
   - Example: An index on the `StudentID` column.

2. **Secondary Index**:
   - An index on a non-primary key column.
   - Example: An index on the `Name` column.

3. **Composite Index**:
   - An index on multiple columns.
   - Example: An index on the `Name` and `Age` columns.

**Example**:
```sql
CREATE INDEX idx_name_age ON Student (Name, Age);
```

---

### **Summary**
- **Indexing**: Improves data retrieval speed using data structures like B-trees and B+ trees.
  - Types: Single-level, multi-level, clustered, non-clustered.
- **Hashing**: Maps data to a fixed-size table for fast access.
  - Types: Static hashing, dynamic hashing.
- **B-Trees and B+ Trees**: Balanced tree structures used for indexing.
- **Indexing Strategies**: Primary, secondary, and composite indexes.

---

[Next](./09DBMS.md)