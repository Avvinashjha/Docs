# Basic Linux Commands

Linux is a powerful operating system widely used by developers for its flexibility, stability, and performance. Mastering essential Linux commands can significantly improve productivity, streamline workflows, and help troubleshoot issues effectively. Below is a categorized list of **essential Linux commands** that every developer should know:

---

### **1. File and Directory Management**
These commands are fundamental for navigating and managing files and directories.

- **`ls`**: List directory contents.
  ```bash
  ls -l        # Long listing format
  ls -a        # Show hidden files
  ls -lh       # Human-readable file sizes
  ```

- **`cd`**: Change directory.
  ```bash
  cd /path/to/directory   # Navigate to a specific directory
  cd ..                   # Move up one directory
  cd ~                    # Go to the home directory
  ```

- **`pwd`**: Print the current working directory.
  ```bash
  pwd
  ```

- **`mkdir`**: Create a new directory.
  ```bash
  mkdir my_folder         # Create a single directory
  mkdir -p path/to/folder # Create nested directories
  ```

- **`touch`**: Create an empty file or update the timestamp of an existing file.
  ```bash
  touch file.txt
  ```

- **`rm`**: Remove files or directories.
  ```bash
  rm file.txt             # Remove a file
  rm -r folder            # Recursively remove a directory
  rm -rf folder           # Forcefully remove a directory (use with caution!)
  ```

- **`cp`**: Copy files or directories.
  ```bash
  cp source_file destination_file
  cp -r source_dir destination_dir
  ```

- **`mv`**: Move or rename files or directories.
  ```bash
  mv old_name new_name    # Rename a file
  mv file.txt /path/to/destination
  ```

---

### **2. File Viewing and Editing**
These commands allow you to view, edit, and manipulate file contents.

- **`cat`**: Concatenate and display file contents.
  ```bash
  cat file.txt
  cat file1.txt file2.txt > combined.txt  # Combine files
  ```

- **`less`**: View file contents page by page.
  ```bash
  less file.txt
  ```

- **`head` and `tail`**: Display the beginning or end of a file.
  ```bash
  head file.txt          # Show the first 10 lines
  tail file.txt          # Show the last 10 lines
  tail -f file.txt       # Monitor file in real-time
  ```

- **`nano`, `vim`, or `vi`**: Text editors for editing files directly in the terminal.
  ```bash
  nano file.txt
  vim file.txt
  ```

- **`echo`**: Print text or variables to the terminal.
  ```bash
  echo "Hello, World!"
  echo $PATH
  ```

- **`grep`**: Search for text patterns within files.
  ```bash
  grep "pattern" file.txt
  grep -r "pattern" /path/to/search  # Recursive search
  ```

---

### **3. System Information and Monitoring**
These commands provide insights into system performance and resource usage.

- **`top` or `htop`**: Monitor system processes in real-time.
  ```bash
  top
  htop                     # Requires installation (better UI)
  ```

- **`df`**: Display disk space usage.
  ```bash
  df -h                    # Human-readable format
  ```

- **`du`**: Check disk usage of files and directories.
  ```bash
  du -sh /path/to/directory
  ```

- **`free`**: Show memory usage.
  ```bash
  free -h                  # Human-readable format
  ```

- **`ps`**: Display active processes.
  ```bash
  ps aux                   # Show all running processes
  ```

- **`kill`**: Terminate a process by its PID.
  ```bash
  kill <PID>
  kill -9 <PID>            # Forcefully terminate
  ```

- **`uptime`**: Show how long the system has been running.
  ```bash
  uptime
  ```

---

### **4. Networking**
These commands are essential for managing and troubleshooting network connections.

- **`ping`**: Test connectivity to a host.
  ```bash
  ping google.com
  ```

- **`curl` or `wget`**: Download files or interact with APIs.
  ```bash
  curl https://example.com
  wget https://example.com/file.txt
  ```

- **`ifconfig` or `ip`**: Display or configure network interfaces.
  ```bash
  ifconfig
  ip addr show
  ```

- **`netstat`**: Display network connections and statistics.
  ```bash
  netstat -tuln           # Show listening ports
  ```

- **`ssh`**: Securely connect to remote servers.
  ```bash
  ssh user@hostname
  ```

- **`scp`**: Securely copy files between local and remote systems.
  ```bash
  scp file.txt user@hostname:/path/to/destination
  ```

---

### **5. Permissions and Ownership**
Managing file permissions is crucial for security and collaboration.

- **`chmod`**: Change file permissions.
  ```bash
  chmod 755 file.txt      # Set permissions (owner: read/write/execute, group/others: read/execute)
  chmod +x script.sh      # Make a script executable
  ```

- **`chown`**: Change file ownership.
  ```bash
  chown user:group file.txt
  ```

- **`sudo`**: Execute commands with superuser privileges.
  ```bash
  sudo apt update
  ```

---

### **6. Package Management**
Package managers simplify software installation and updates.

- **APT (Debian/Ubuntu)**:
  ```bash
  sudo apt update         # Update package lists
  sudo apt install <package>
  sudo apt remove <package>
  ```

- **YUM/DNF (RHEL/CentOS/Fedora)**:
  ```bash
  sudo yum install <package>
  sudo dnf update
  ```

- **Pacman (Arch Linux)**:
  ```bash
  sudo pacman -S <package>
  ```

---

### **7. Miscellaneous**
These commands cover various other useful tasks.

- **`history`**: View command history.
  ```bash
  history
  ```

- **`alias`**: Create shortcuts for frequently used commands.
  ```bash
  alias ll='ls -la'
  ```

- **`tar`**: Archive and compress files.
  ```bash
  tar -czvf archive.tar.gz folder/  # Compress
  tar -xzvf archive.tar.gz          # Extract
  ```

- **`find`**: Search for files and directories.
  ```bash
  find /path/to/search -name "*.txt"
  ```

- **`man`**: Access manual pages for commands.
  ```bash
  man ls
  ```

- **`which` or `whereis`**: Locate the binary/executable of a command.
  ```bash
  which python
  whereis gcc
  ```

---

### **8. Shell Scripting Basics**
Developers often write shell scripts to automate repetitive tasks.

- **Shebang**: Start your script with `#!/bin/bash`.
- **Variables**:
  ```bash
  name="John"
  echo "Hello, $name"
  ```
- **Conditionals**:
  ```bash
  if [ "$name" == "John" ]; then
      echo "Welcome, John!"
  fi
  ```
- **Loops**:
  ```bash
  for i in {1..5}; do
      echo "Iteration $i"
  done
  ```

---
