### **4. Relational Database Concepts**

Relational databases are based on the **relational model**, which organizes data into tables (relations). Let’s break this down into subtopics:

---

#### **1. Tables, Rows, and Columns**
- **Table (Relation)**:
  - A collection of related data organized into rows and columns.
  - Example: A `Student` table.
- **Row (Tuple)**:
  - A single record in a table.
  - Example: A student with `ID = 1`, `Name = "John"`, `Age = 21`.
- **Column (Attribute)**:
  - A specific field in a table.
  - Example: `ID`, `Name`, `Age`.

**Example Table**:
```
+----+--------+-----+
| ID | Name   | Age |
+----+--------+-----+
| 1  | John   | 21  |
| 2  | Alice  | 22  |
| 3  | Bob    | 20  |
+----+--------+-----+
```

---

#### **2. Keys**
Keys are used to uniquely identify rows and establish relationships between tables.

1. **Primary Key**:
   - A column (or set of columns) that uniquely identifies each row in a table.
   - Example: `ID` in the `Student` table.

2. **Foreign Key**:
   - A column that establishes a link between two tables.
   - It refers to the primary key of another table.
   - Example: `CourseID` in the `Enrollment` table refers to `CourseID` in the `Course` table.

3. **Candidate Key**:
   - A set of columns that can uniquely identify a row.
   - Example: `Email` or `ID` in the `Student` table.

4. **Super Key**:
   - A set of columns that can uniquely identify a row (may include extra columns).
   - Example: `ID + Name` in the `Student` table.

5. **Composite Key**:
   - A primary key that consists of two or more columns.
   - Example: `StudentID + CourseID` in the `Enrollment` table.

---

#### **3. Integrity Constraints**
Integrity constraints ensure the accuracy and consistency of data in a database.

1. **Entity Integrity**:
   - Ensures that the primary key cannot be null and must be unique.
   - Example: Every `Student` must have a unique `ID`.

2. **Referential Integrity**:
   - Ensures that a foreign key value must match a primary key value in the referenced table.
   - Example: A `CourseID` in the `Enrollment` table must exist in the `Course` table.

3. **Domain Integrity**:
   - Ensures that all values in a column are valid and within a defined domain.
   - Example: `Age` must be a positive integer.

---

#### **4. Relational Algebra**
Relational algebra is a theoretical framework for querying relational databases. It consists of a set of operations that take one or more relations (tables) as input and produce a new relation as output.

**Basic Operations**:
1. **Selection (σ)**:
   - Selects rows that satisfy a condition.
   - Example: `σ(Age > 20)(Student)` selects students older than 20.

2. **Projection (π)**:
   - Selects specific columns.
   - Example: `π(Name, Age)(Student)` retrieves only the `Name` and `Age` columns.

3. **Union (∪)**:
   - Combines rows from two tables (must have the same structure).
   - Example: `Student ∪ Teacher`.

4. **Set Difference (−)**:
   - Retrieves rows that are in one table but not in another.
   - Example: `Student − Teacher`.

5. **Cartesian Product (×)**:
   - Combines all rows from two tables.
   - Example: `Student × Course`.

6. **Join (⨝)**:
   - Combines rows from two tables based on a condition.
   - Types: Inner Join, Outer Join, Natural Join.

---

#### **5. Example Queries**
Here are some examples of relational algebra operations:

1. **Selection**:
   - Select students older than 20:
     ```
     σ(Age > 20)(Student)
     ```

2. **Projection**:
   - Retrieve only `Name` and `Age`:
     ```
     π(Name, Age)(Student)
     ```

3. **Join**:
   - Join `Student` and `Enrollment` on `StudentID`:
     ```
     Student ⨝(Student.ID = Enrollment.StudentID) Enrollment
     ```

---

### **Summary**
- **Tables, Rows, and Columns**: Basic structure of relational databases.
- **Keys**: Primary key, foreign key, candidate key, super key, composite key.
- **Integrity Constraints**: Entity, referential, and domain integrity.
- **Relational Algebra**: Operations like selection, projection, union, and join.

---

[Next](./05DBMS.md)