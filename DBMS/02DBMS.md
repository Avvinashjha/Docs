### **2. Database Architecture**

Database architecture refers to the design and structure of a database system. It defines how data is stored, organized, and accessed. The most common architecture is the **3-Tier Architecture**, which separates the database system into three levels.

---

#### **1. 3-Tier Architecture**
The 3-tier architecture divides the database system into three levels of abstraction:

1. **External Level (View Level)**:
   - This is the **user-facing layer**.
   - It provides different **views** of the database for different users or applications.
   - Users interact with the database through this level without needing to know the underlying structure.
   - Example: A student sees their grades, while a teacher sees all students' grades.

2. **Conceptual Level (Logical Level)**:
   - This is the **middle layer** that defines the **logical structure** of the entire database.
   - It describes what data is stored in the database and the relationships between the data.
   - It acts as a bridge between the external and internal levels.
   - Example: Defines tables, attributes, and relationships (e.g., `Student`, `Course`, `Enrollment`).

3. **Internal Level (Physical Level)**:
   - This is the **lowest level** that deals with the **physical storage** of data.
   - It describes how data is stored on the storage device (e.g., hard disk).
   - It includes details like file structures, indexing, and data compression.
   - Example: Data is stored in binary format on disk.

---

#### **2. Database Schema and Instance**
- **Schema**:
  - The **logical structure** of the database.
  - Defines tables, columns, data types, constraints, and relationships.
  - Example: A schema for a university database might include tables like `Student`, `Course`, and `Enrollment`.

- **Instance**:
  - The actual **data stored in the database** at a particular moment.
  - It represents the current state of the database.
  - Example: The `Student` table contains rows of student data like `(1, "John", "CS")`.

| **Aspect**       | **Schema**                          | **Instance**                        |
|-------------------|-------------------------------------|-------------------------------------|
| **Definition**    | Blueprint of the database.          | Snapshot of the database at a given time. |
| **Changes**       | Rarely changes (static).            | Changes frequently (dynamic).       |
| **Example**       | Table structure (columns, data types). | Actual data in the table (rows).    |

---

#### **3. Data Independence**
Data independence allows changes to the database schema at one level without affecting the schema at another level. There are two types of data independence:

1. **Logical Data Independence**:
   - The ability to change the **conceptual schema** without affecting the **external schema**.
   - Example: Adding a new column to a table does not require changes to the user views.

2. **Physical Data Independence**:
   - The ability to change the **internal schema** without affecting the **conceptual schema**.
   - Example: Changing the storage structure (e.g., from a B-tree to a hash index) does not affect the logical structure.

---

### **Summary**
- **3-Tier Architecture**:
  - **External Level**: User-facing views.
  - **Conceptual Level**: Logical structure of the database.
  - **Internal Level**: Physical storage details.
- **Schema vs. Instance**:
  - Schema is the blueprint; instance is the actual data.
- **Data Independence**:
  - **Logical**: Changes to conceptual schema do not affect external schema.
  - **Physical**: Changes to internal schema do not affect conceptual schema.
---

### **1. 3-Tier Architecture Diagram**
Here’s how you can visualize the **3-Tier Architecture**:

```
+-------------------+       +-------------------+       +-------------------+
|   External Level  |       | Conceptual Level  |       |   Internal Level  |
|  (View Level)     |       | (Logical Level)   |       | (Physical Level)  |
+-------------------+       +-------------------+       +-------------------+
| User 1 View       |       | Tables, Columns,  |       | File Structures,  |
| User 2 View       | <---> | Relationships     | <---> | Indexing, Storage |
| User 3 View       |       | Constraints       |       | Data Compression  |
+-------------------+       +-------------------+       +-------------------+
```

**Explanation**:
- **External Level**: Represents different views for different users.
- **Conceptual Level**: Defines the logical structure of the database.
- **Internal Level**: Handles the physical storage of data.

---

### **2. Schema vs. Instance Diagram**
Here’s how you can visualize the difference between **Schema** and **Instance**:

#### **Schema**:
```
+-------------------+
|   Student Table   |
+-------------------+
| ID (INT, PK)      |
| Name (VARCHAR)    |
| Department (CHAR) |
+-------------------+
```

#### **Instance**:
```
+----+--------+------------+
| ID | Name   | Department |
+----+--------+------------+
| 1  | John   | CS         |
| 2  | Alice  | EE         |
| 3  | Bob    | ME         |
+----+--------+------------+
```

**Explanation**:
- **Schema**: Defines the structure (columns, data types, constraints).
- **Instance**: Contains the actual data (rows).

---

### **3. Data Independence Diagram**
Here’s how you can visualize **Logical and Physical Data Independence**:

```
+-------------------+       +-------------------+       +-------------------+
|   External Level  |       | Conceptual Level  |       |   Internal Level  |
|  (View Level)     |       | (Logical Level)   |       | (Physical Level)  |
+-------------------+       +-------------------+       +-------------------+
| User 1 View       |       | Tables, Columns,  |       | File Structures,  |
| User 2 View       | <---> | Relationships     | <---> | Indexing, Storage |
| User 3 View       |       | Constraints       |       | Data Compression  |
+-------------------+       +-------------------+       +-------------------+
```

**Explanation**:
- **Logical Data Independence**: Changes to the **Conceptual Level** do not affect the **External Level**.
- **Physical Data Independence**: Changes to the **Internal Level** do not affect the **Conceptual Level**.

[Next](./03DBMS.md)