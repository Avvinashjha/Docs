### **13. NoSQL Databases**

NoSQL databases are designed to handle unstructured or semi-structured data and provide high scalability and flexibility. They are widely used in big data and real-time web applications.

---

#### **1. Introduction to NoSQL**
- **NoSQL** stands for "Not Only SQL".
- Designed to handle large volumes of data and high user loads.
- Suitable for unstructured or semi-structured data.

---

#### **2. Types of NoSQL Databases**
1. **Document-Based**:
   - Stores data as documents (e.g., JSON, XML).
   - Example: MongoDB.
   ```json
   {
       "id": 1,
       "name": "John",
       "age": 21,
       "courses": ["C101", "C102"]
   }
   ```

2. **Key-Value**:
   - Stores data as key-value pairs.
   - Example: Redis.
   ```
   Key: "user1", Value: "{'name': 'John', 'age': 21}"
   ```

3. **Column-Based**:
   - Stores data in columns instead of rows.
   - Example: Cassandra.
   ```
   Row Key: "user1"
   Columns: {"name": "John", "age": 21}
   ```

4. **Graph-Based**:
   - Stores data as nodes and edges.
   - Example: Neo4j.
   ```
   (User1) -[:FRIENDS_WITH]-> (User2)
   ```

---

#### **3. Use Cases for NoSQL**
1. **Big Data**: Handling large volumes of unstructured data.
2. **Real-Time Web Applications**: Providing low-latency access to data.
3. **Content Management Systems**: Storing and retrieving diverse content types.
4. **Social Networks**: Managing complex relationships and interactions.

---

### **Summary**
- **NoSQL Databases**: Designed for unstructured or semi-structured data.
- **Types**: Document-based, key-value, column-based, graph-based.
- **Use Cases**: Big data, real-time web applications, content management, social networks.

---

[Next](./14DBMS.md)