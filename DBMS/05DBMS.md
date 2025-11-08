## **5. Structured Query Language (SQL)**

SQL is divided into several categories based on its functionality. Let’s break it down into subtopics:

---

#### **1. Data Definition Language (DDL)**

DDL is used to define and modify the structure of database objects like tables, indexes, and views.

**Key Commands**:

1. **CREATE**:
   - Creates a new table, index, or view.
   - Example:

     ```sql
     CREATE TABLE Student (
         ID INT PRIMARY KEY,
         Name VARCHAR(50),
         Age INT
     );
     ```

2. **ALTER**:
   - Modifies an existing table (e.g., adds or deletes columns).
   - Example:

     ```sql
     ALTER TABLE Student ADD COLUMN Department VARCHAR(50);
     ```

3. **DROP**:
   - Deletes a table, index, or view.
   - Example:

     ```sql
     DROP TABLE Student;
     ```

4. **TRUNCATE**:
   - Removes all rows from a table but keeps the table structure.
   - Example:

     ```sql
     TRUNCATE TABLE Student;
     ```

---

#### **2. Data Manipulation Language (DML)**

DML is used to manipulate data within tables.

**Key Commands**:

1. **INSERT**:
   - Adds new rows to a table.
   - Example:

     ```sql
     INSERT INTO Student (ID, Name, Age)
     VALUES (1, 'John', 21);
     ```

2. **UPDATE**:
   - Modifies existing rows in a table.
   - Example:

     ```sql
     UPDATE Student
     SET Age = 22
     WHERE ID = 1;
     ```

3. **DELETE**:
   - Removes rows from a table.
   - Example:

     ```sql
     DELETE FROM Student
     WHERE ID = 1;
     ```

4. **SELECT**:
   - Retrieves data from one or more tables.
   - Example:

     ```sql
     SELECT Name, Age FROM Student;
     ```

---

#### **3. Data Control Language (DCL)**

DCL is used to control access to data in the database.

**Key Commands**:

1. **GRANT**:
   - Gives users access privileges to the database.
   - Example:

     ```sql
     GRANT SELECT ON Student TO 'user1';
     ```

2. **REVOKE**:
   - Removes access privileges from users.
   - Example:

     ```sql
     REVOKE SELECT ON Student FROM 'user1';
     ```

---

#### **4. Transaction Control Language (TCL)**

TCL is used to manage transactions in the database.

**Key Commands**:

1. **COMMIT**:
   - Saves changes made during the current transaction.
   - Example:

     ```sql
     COMMIT;
     ```

2. **ROLLBACK**:
   - Undoes changes made during the current transaction.
   - Example:

     ```sql
     ROLLBACK;
     ```

3. **SAVEPOINT**:
   - Sets a savepoint within a transaction to which you can later roll back.
   - Example:

     ```sql
     SAVEPOINT sp1;
     ```

---

#### **5. Advanced SQL**

1. **Joins**:
   - Combines rows from two or more tables based on a related column.
   - Types:
     - **INNER JOIN**: Returns matching rows.
     - **LEFT JOIN**: Returns all rows from the left table and matching rows from the right table.
     - **RIGHT JOIN**: Returns all rows from the right table and matching rows from the left table.
     - **FULL JOIN**: Returns all rows when there is a match in either table.
   - Example:

     ```sql
     SELECT Student.Name, Course.Title
     FROM Student
     INNER JOIN Enrollment ON Student.ID = Enrollment.StudentID
     INNER JOIN Course ON Enrollment.CourseID = Course.ID;
     ```

2. **Subqueries**:
   - A query nested inside another query.
   - Example:

     ```sql
     SELECT Name FROM Student
     WHERE Age = (SELECT MAX(Age) FROM Student);
     ```

3. **Aggregate Functions**:
   - Perform calculations on a set of values.
   - Examples: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.
   - Example:

     ```sql
     SELECT AVG(Age) FROM Student;
     ```

4. **GROUP BY and HAVING**:
   - `GROUP BY` groups rows with the same values into summary rows.
   - `HAVING` filters groups based on a condition.
   - Example:

     ```sql
     SELECT Department, AVG(Age)
     FROM Student
     GROUP BY Department
     HAVING AVG(Age) > 20;
     ```

5. **Views**:
   - Virtual tables created by a query.
   - Example:

     ```sql
     CREATE VIEW AdultStudents AS
     SELECT Name, Age FROM Student WHERE Age >= 18;
     ```

6. **Indexes**:
   - Improve the speed of data retrieval.
   - Example:

     ```sql
     CREATE INDEX idx_name ON Student (Name);
     ```

---

### **Summary**

- **DDL**: Defines and modifies database structure (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`).
- **DML**: Manipulates data (`INSERT`, `UPDATE`, `DELETE`, `SELECT`).
- **DCL**: Controls access (`GRANT`, `REVOKE`).
- **TCL**: Manages transactions (`COMMIT`, `ROLLBACK`, `SAVEPOINT`).
- **Advanced SQL**: Joins, subqueries, aggregate functions, `GROUP BY`, `HAVING`, views, and indexes.

---

[Next](./06DBMS.md)
