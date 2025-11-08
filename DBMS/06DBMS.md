### **6. Database Design and Normalization**

Database design involves organizing data into tables and defining relationships between them. **Normalization** is the process of structuring a database to reduce redundancy and improve data integrity. Let’s break this down into subtopics:

---

#### **1. Functional Dependencies**

- A **functional dependency** occurs when the value of one attribute (or set of attributes) determines the value of another attribute.
- Notation: `X → Y` (X determines Y).
- Example: In a `Student` table, `StudentID → Name` means that `StudentID` determines `Name`.

---

#### **2. Normalization**

Normalization is the process of organizing data to minimize redundancy and dependency. It involves dividing tables into smaller, related tables.

**Normal Forms**:

1. **First Normal Form (1NF)**:
   - Eliminate duplicate columns and ensure atomicity (each column contains indivisible values).
   - Example:

     ```
     Before 1NF:
     +----+--------+-------------------+
     | ID | Name   | Courses           |
     +----+--------+-------------------+
     | 1  | John   | C101, C102        |
     +----+--------+-------------------+

     After 1NF:
     +----+--------+---------+
     | ID | Name   | Course  |
     +----+--------+---------+
     | 1  | John   | C101    |
     | 1  | John   | C102    |
     +----+--------+---------+
     ```

2. **Second Normal Form (2NF)**:
   - Meet 1NF and remove partial dependencies (all non-key attributes depend on the entire primary key).
   - Example:

     ```
     Before 2NF:
     +----+--------+---------+-------+
     | ID | Name   | Course  | Grade |
     +----+--------+---------+-------+
     | 1  | John   | C101    | A     |
     +----+--------+---------+-------+

     After 2NF:
     Student Table:
     +----+--------+
     | ID | Name   |
     +----+--------+
     | 1  | John   |
     +----+--------+

     Enrollment Table:
     +----+---------+-------+
     | ID | Course  | Grade |
     +----+---------+-------+
     | 1  | C101    | A     |
     +----+---------+-------+
     ```

3. **Third Normal Form (3NF)**:
   - Meet 2NF and remove transitive dependencies (non-key attributes depend only on the primary key).
   - Example:

     ```
     Before 3NF:
     +----+--------+---------+------------+
     | ID | Name   | Course  | Instructor |
     +----+--------+---------+------------+
     | 1  | John   | C101    | Dr. Smith  |
     +----+--------+---------+------------+

     After 3NF:
     Student Table:
     +----+--------+
     | ID | Name   |
     +----+--------+
     | 1  | John   |
     +----+--------+

     Course Table:
     +---------+------------+
     | Course  | Instructor |
     +---------+------------+
     | C101    | Dr. Smith  |
     +---------+------------+
     ```

4. **Boyce-Codd Normal Form (BCNF)**:
   - A stronger version of 3NF where every determinant is a candidate key.
   - Example:

     ```
     Before BCNF:
     +---------+------------+-------+
     | Course  | Instructor | Room  |
     +---------+------------+-------+
     | C101    | Dr. Smith  | R101  |
     +---------+------------+-------+

     After BCNF:
     Instructor Table:
     +------------+-------+
     | Instructor | Room  |
     +------------+-------+
     | Dr. Smith  | R101  |
     +------------+-------+

     Course Table:
     +---------+------------+
     | Course  | Instructor |
     +---------+------------+
     | C101    | Dr. Smith  |
     +---------+------------+
     ```

5. **Fourth Normal Form (4NF)**:
   - Meet BCNF and eliminate multi-valued dependencies.
   - Example:

     ```
     Before 4NF:
     +----+--------+---------+------------+
     | ID | Name   | Course  | Hobby      |
     +----+--------+---------+------------+
     | 1  | John   | C101    | Reading    |
     | 1  | John   | C101    | Swimming   |
     +----+--------+---------+------------+

     After 4NF:
     Student Table:
     +----+--------+
     | ID | Name   |
     +----+--------+
     | 1  | John   |
     +----+--------+

     Course Table:
     +----+---------+
     | ID | Course  |
     +----+---------+
     | 1  | C101    |
     +----+---------+

     Hobby Table:
     +----+------------+
     | ID | Hobby      |
     +----+------------+
     | 1  | Reading    |
     | 1  | Swimming   |
     +----+------------+
     ```

6. **Fifth Normal Form (5NF)**:
   - Meet 4NF and eliminate join dependencies.
   - Example:

     ```
     Before 5NF:
     +---------+------------+-------+
     | Course  | Instructor | Room  |
     +---------+------------+-------+
     | C101    | Dr. Smith  | R101  |
     +---------+------------+-------+

     After 5NF:
     Course-Instructor Table:
     +---------+------------+
     | Course  | Instructor |
     +---------+------------+
     | C101    | Dr. Smith  |
     +---------+------------+

     Course-Room Table:
     +---------+-------+
     | Course  | Room  |
     +---------+-------+
     | C101    | R101  |
     +---------+-------+
     ```

---

#### **3. Denormalization**

- **Denormalization** is the process of combining tables to improve read performance at the cost of redundancy.
- Used in data warehousing and reporting systems where read speed is critical.

---

### **Summary**

- **Functional Dependencies**: Define relationships between attributes.
- **Normalization**: Reduces redundancy and improves data integrity.
  - 1NF: Atomic values.
  - 2NF: Remove partial dependencies.
  - 3NF: Remove transitive dependencies.
  - BCNF: Stronger 3NF.
  - 4NF: Remove multi-valued dependencies.
  - 5NF: Remove join dependencies.
- **Denormalization**: Improves read performance by introducing redundancy.

---

[Next](./07DBMS.md)
