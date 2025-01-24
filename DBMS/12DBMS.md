### **12. Distributed Databases**

A **distributed database** is a collection of multiple, logically interrelated databases distributed over a computer network. It allows data to be stored and accessed from different locations.

---

#### **1. Distributed Database Concepts**
1. **Fragmentation**:
   - Dividing a database into smaller parts (fragments) that are stored on different nodes.
   - Types:
     - **Horizontal Fragmentation**: Rows of a table are distributed.
     - **Vertical Fragmentation**: Columns of a table are distributed.
     - **Mixed Fragmentation**: Combines horizontal and vertical fragmentation.

2. **Replication**:
   - Storing multiple copies of data on different nodes for fault tolerance and faster access.

3. **Distributed Transaction Management**:
   - Ensures that transactions are executed consistently across multiple nodes.
   - Example: Two-phase commit protocol.

4. **CAP Theorem**:
   - States that a distributed system can only guarantee two out of the following three properties:
     - **Consistency**: All nodes see the same data at the same time.
     - **Availability**: Every request receives a response.
     - **Partition Tolerance**: The system continues to operate despite network partitions.

---

#### **2. Example of a Distributed Database**
Consider a distributed database for a global e-commerce platform:
- **Fragmentation**: Customer data is horizontally fragmented by region (e.g., North America, Europe).
- **Replication**: Product catalog is replicated across all regions for faster access.
- **Transaction Management**: Orders are processed using a two-phase commit protocol to ensure consistency.

---

### **Summary**
- **Fragmentation**: Dividing data into smaller parts (horizontal, vertical, mixed).
- **Replication**: Storing multiple copies of data for fault tolerance and faster access.
- **Distributed Transaction Management**: Ensuring consistency across multiple nodes.
- **CAP Theorem**: Consistency, Availability, Partition Tolerance.

---

[Next](./13DBMS.md)