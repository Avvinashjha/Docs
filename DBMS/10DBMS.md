### **10. Database Security and Authorization**

Database security involves protecting the database from unauthorized access, misuse, and threats. Authorization ensures that users have appropriate access to data.

---

#### **1. Security Threats**

1. **Unauthorized Access**:
   - Access by users who do not have permission.

2. **Data Breaches**:
   - Unauthorized access to sensitive data.

3. **SQL Injection**:
   - Malicious SQL code is injected into queries.

4. **Denial of Service (DoS)**:
   - Overloading the database to make it unavailable.

---

#### **2. Authorization**

1. **Roles and Privileges**:
   - **Roles**: Groups of users with similar access needs.
   - **Privileges**: Permissions granted to roles or users.
   - Example: `GRANT SELECT ON Student TO 'user1';`

2. **Access Control**:
   - **Discretionary Access Control (DAC)**: Owners control access to their data.
   - **Mandatory Access Control (MAC)**: Access is controlled by a central authority.

3. **Audit Trails**:
   - Logs of all database activities for monitoring and auditing.

---

#### **3. Encryption and Decryption**

1. **Data Encryption**:
   - Encrypts data to protect it from unauthorized access.
   - Example: Encrypt sensitive data like passwords.

2. **SSL/TLS**:
   - Encrypts data transmitted between the database and clients.

---

### **Summary**

- **Security Threats**: Unauthorized access, data breaches, SQL injection, DoS.
- **Authorization**: Roles, privileges, access control, audit trails.
- **Encryption**: Protects data at rest and in transit.

---

[Next](./11DBMS.md)
