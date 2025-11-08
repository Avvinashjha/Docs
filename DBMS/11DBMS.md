### **11. Backup and Recovery**

Backup and recovery strategies are essential for protecting data from loss and ensuring that the database can be restored to a consistent state after a failure.

---

#### **1. Types of Failures**

1. **Transaction Failure**:
   - A transaction cannot complete due to errors (e.g., deadlock, constraint violation).

2. **System Failure**:
   - The database system crashes due to hardware or software issues.

3. **Media Failure**:
   - The storage device fails, leading to data loss.

---

#### **2. Backup Techniques**

1. **Full Backup**:
   - Backs up the entire database.
   - Example: `BACKUP DATABASE StudentDB TO DISK = 'C:\backup.bak';`

2. **Incremental Backup**:
   - Backs up only the changes since the last backup.
   - Example: `BACKUP DATABASE StudentDB TO DISK = 'C:\backup.bak' WITH DIFFERENTIAL;`

3. **Differential Backup**:
   - Backs up all changes since the last full backup.
   - Example: `BACKUP DATABASE StudentDB TO DISK = 'C:\backup.bak' WITH INCREMENTAL;`

---

#### **3. Recovery Techniques**

1. **Log-Based Recovery**:
   - Uses transaction logs to restore the database to a consistent state.
   - Example: `RESTORE DATABASE StudentDB FROM DISK = 'C:\backup.bak' WITH RECOVERY;`

2. **Checkpointing**:
   - Periodically saves the database state to reduce recovery time.
   - Example: `CHECKPOINT;`

3. **Shadow Paging**:
   - Maintains a shadow copy of the database for recovery.

---

### **Summary**

- **Types of Failures**: Transaction, system, media.
- **Backup Techniques**: Full, incremental, differential.
- **Recovery Techniques**: Log-based, checkpointing, shadow paging.

---

[Next](./12DBMS.md)
