
### **1. [Introduction to DBMS](./01DBMS.md)**
- What is a DBMS?
- Difference between DBMS and File Systems
- Advantages of DBMS
- Applications of DBMS
- Types of DBMS (Relational, NoSQL, Hierarchical, Network)

---

### **2. [Database Architecture](./02DBMS.md)**
- 3-Tier Architecture:
  - External Level (View Level)
  - Conceptual Level (Logical Level)
  - Internal Level (Physical Level)
- Database Schema and Instance
- Data Independence:
  - Logical Data Independence
  - Physical Data Independence

---

### **3. [Data Models](./03DBMS.md)**
- Relational Model
- Entity-Relationship (ER) Model
  - Entities, Attributes, Relationships
  - ER Diagrams
- Hierarchical Model
- Network Model
- Object-Oriented Model
- NoSQL Data Models (Document, Key-Value, Column, Graph)

---

### **4. [Relational Database Concepts](./04DBMS.md)**
- Tables, Rows, and Columns
- Keys:
  - Primary Key
  - Foreign Key
  - Candidate Key
  - Super Key
  - Composite Key
- Integrity Constraints:
  - Entity Integrity
  - Referential Integrity
  - Domain Integrity
- Relational Algebra:
  - Selection, Projection, Union, Set Difference, Cartesian Product, Join

---

### **5. [Structured Query Language (SQL)](./05DBMS.md)**
- **DDL (Data Definition Language)**:
  - CREATE, ALTER, DROP, TRUNCATE
- **DML (Data Manipulation Language)**:
  - INSERT, UPDATE, DELETE, SELECT
- **DCL (Data Control Language)**:
  - GRANT, REVOKE
- **TCL (Transaction Control Language)**:
  - COMMIT, ROLLBACK, SAVEPOINT
- Advanced SQL:
  - Joins (INNER, LEFT, RIGHT, FULL, CROSS)
  - Subqueries
  - Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)
  - GROUP BY and HAVING
  - Window Functions
  - Views
  - Indexes

---

### **6. [Database Design and Normalization](./06DBMS.md)**
- Functional Dependencies
- Normalization:
  - 1NF (First Normal Form)
  - 2NF (Second Normal Form)
  - 3NF (Third Normal Form)
  - BCNF (Boyce-Codd Normal Form)
  - 4NF (Fourth Normal Form)
  - 5NF (Fifth Normal Form)
- Denormalization

---

### **7. [Transactions and Concurrency Control](./07DBMS.md)**
- Transaction Concepts:
  - ACID Properties (Atomicity, Consistency, Isolation, Durability)
- Transaction States:
  - Active, Partially Committed, Committed, Failed, Aborted
- Concurrency Control:
  - Lost Update Problem
  - Dirty Read Problem
  - Unrepeatable Read Problem
  - Phantom Read Problem
- Lock-Based Protocols:
  - Shared and Exclusive Locks
  - Two-Phase Locking (2PL)
- Timestamp-Based Protocols
- Deadlock Handling

---

### **8. [Indexing and Hashing](./08DBMS.md)**
- Indexing:
  - Single-Level Indexing
  - Multi-Level Indexing
  - B-Trees and B+ Trees
- Hashing:
  - Hash Functions
  - Static and Dynamic Hashing
- Clustered vs. Non-Clustered Indexes

---

### **9. [Query Processing and Optimization](./09DBMS.md)**
- Query Processing Steps:
  - Parsing and Translation
  - Optimization
  - Execution
- Query Optimization Techniques:
  - Heuristic Optimization
  - Cost-Based Optimization
- Execution Plans

---

### **10. [Database Security and Authorization](./10DBMS.md)**
- Security Threats
- Authorization:
  - Roles and Privileges
- Encryption and Decryption
- Authentication Mechanisms
- Audit Trails

---

### **11. [Backup and Recovery](./11DBMS.md)**
- Types of Failures:
  - Transaction Failure
  - System Failure
  - Media Failure
- Backup Techniques:
  - Full Backup
  - Incremental Backup
  - Differential Backup
- Recovery Techniques:
  - Log-Based Recovery
  - Checkpointing
  - Shadow Paging

---

### **12. [Distributed Databases](./12DBMS.md)**
- Distributed Database Concepts
- Fragmentation:
  - Horizontal, Vertical, Mixed
- Replication
- Distributed Transaction Management
- CAP Theorem (Consistency, Availability, Partition Tolerance)

---

### **13. [NoSQL Databases](./13DBMS.md)**
- Introduction to NoSQL
- Types of NoSQL Databases:
  - Document-Based (MongoDB)
  - Key-Value (Redis)
  - Column-Based (Cassandra)
  - Graph-Based (Neo4j)
- Use Cases for NoSQL

---

### **14. [Advanced Topics](./14DBMS.md)**
- Data Warehousing and Data Mining
- Big Data and Hadoop
- Cloud Databases
- Blockchain and Databases
- Temporal Databases
- Spatial Databases

---

### **15. [Practical Implementation](./15DBMS.md)**
- Setting up a DBMS (MySQL, PostgreSQL, MongoDB, etc.)
- Designing and Implementing a Database
- Writing Complex Queries
- Performance Tuning
- Real-World Projects:
  - E-Commerce Database
  - Library Management System
  - Social Media Database

---

### **16. [Tools and Technologies](./16DBMS.md)**
- Popular DBMS Tools:
  - MySQL, PostgreSQL, Oracle, SQL Server
- NoSQL Tools:
  - MongoDB, Cassandra, Redis
- Database Design Tools:
  - ER/Studio, Lucidchart, Draw.io
- Query Optimization Tools:
  - EXPLAIN in SQL

---

### **17. [Resources for Learning](./17DBMS.md)**
- Books:
  - "Database System Concepts" by Abraham Silberschatz
  - "SQL for Smarties" by Joe Celko
- Online Courses:
  - Coursera, Udemy, edX
- Practice Platforms:
  - LeetCode, HackerRank, SQLZoo

---

### **18. [Projects and Case Studies](./18DBMS.md)**
- Build a small database system (e.g., Student Management System)
- Analyze real-world database designs (e.g., Amazon, Netflix)
- Optimize queries for performance
- Migrate a relational database to a NoSQL database

