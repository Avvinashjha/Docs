## **3. Data Models**

---

#### **1. Relational Model**
- The **relational model** is the most widely used data model.
- Data is organized into **tables (relations)** consisting of rows (tuples) and columns (attributes).
- Each table represents an entity, and relationships between tables are established using **keys** (primary key, foreign key).

**Key Concepts**:
- **Tables**: Represent entities (e.g., `Student`, `Course`).
- **Rows**: Represent records (e.g., a specific student).
- **Columns**: Represent attributes (e.g., `StudentID`, `Name`).
- **Keys**:
  - **Primary Key**: Uniquely identifies a row (e.g., `StudentID`).
  - **Foreign Key**: Establishes relationships between tables.

**Example**:
```
+------------+-----------+----------+
| StudentID  | Name      | CourseID |
+------------+-----------+----------+
| 1          | John      | C101     |
| 2          | Alice     | C102     |
+------------+-----------+----------+
```

---

#### **2. Entity-Relationship (ER) Model**
The ER model is a conceptual model used to design databases. It represents data as **entities**, **attributes**, and **relationships**.

**Key Components**:
1. **Entities**:
   - Represent real-world objects (e.g., `Student`, `Course`).
   - Shown as rectangles in ER diagrams.

2. **Attributes**:
   - Properties of entities (e.g., `StudentID`, `Name`).
   - Shown as ovals connected to entities.

3. **Relationships**:
   - Associations between entities (e.g., a student enrolls in a course).
   - Shown as diamonds in ER diagrams.

**ER Diagram Example**:
```
+--------+          +------------+          +--------+
| Student|----------| Enrolls In |----------| Course |
+--------+          +------------+          +--------+
   |                     |                     |
   |                     |                     |
+--------+          +------------+          +--------+
| Name   |          | Grade      |          | Title  |
| ID     |          | Date       |          | Code   |
+--------+          +------------+          +--------+
```

---

#### **3. Hierarchical Model**
- The **hierarchical model** organizes data in a **tree-like structure**.
- Each record has a **parent-child relationship**.
- Suitable for representing one-to-many relationships.

**Example**:
```
Department
   |
   +-- Employee 1
   |      |
   |      +-- Project A
   |      +-- Project B
   |
   +-- Employee 2
          |
          +-- Project C
```

---

#### **4. Network Model**
- The **network model** extends the hierarchical model by allowing **many-to-many relationships**.
- Data is represented as a graph with nodes (records) and edges (relationships).

**Example**:
```
Student 1 ------> Course A
   |               ^
   |               |
   +-------------> Course B
```

---

#### **5. Object-Oriented Model**
- The **object-oriented model** combines database capabilities with object-oriented programming concepts.
- Data is stored as **objects**, which include both data and methods (functions).

**Key Concepts**:
- **Classes**: Define the structure of objects (e.g., `Student` class).
- **Objects**: Instances of classes (e.g., `Student John`).
- **Inheritance**: Classes can inherit properties from other classes.

**Example**:
```python
class Student:
    def __init__(self, id, name):
        self.id = id
        self.name = name

student1 = Student(1, "John")
```

---

#### **6. NoSQL Data Models**
NoSQL databases are designed for unstructured or semi-structured data. They are highly scalable and flexible.

**Types of NoSQL Data Models**:
1. **Document-Based**:
   - Data is stored as **documents** (e.g., JSON, XML).
   - Example: MongoDB.
   ```json
   {
       "id": 1,
       "name": "John",
       "courses": ["C101", "C102"]
   }
   ```

2. **Key-Value**:
   - Data is stored as **key-value pairs**.
   - Example: Redis.
   ```
   Key: "Student1", Value: "{'name': 'John', 'age': 21}"
   ```

3. **Column-Based**:
   - Data is stored in **columns** instead of rows.
   - Example: Cassandra.
   ```
   Row Key: "Student1"
   Columns: {"Name": "John", "Age": 21}
   ```

4. **Graph-Based**:
   - Data is stored as **nodes and edges**.
   - Example: Neo4j.
   ```
   (Student1) -[:ENROLLED_IN]-> (CourseA)
   ```

---

### **Summary**
- **Relational Model**: Tables, rows, columns, and keys.
- **ER Model**: Entities, attributes, relationships, and ER diagrams.
- **Hierarchical Model**: Tree-like structure with parent-child relationships.
- **Network Model**: Graph-like structure with many-to-many relationships.
- **Object-Oriented Model**: Combines data and methods in objects.
- **NoSQL Models**: Document, key-value, column, and graph-based.

---

[Next](./04DBMS.md)