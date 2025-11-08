# `lsof` List Open Files

`lsof` is a Unix/Linux command used to display information about files opened by processes. Since everything is a file in Unix (regular files, directories, sockets, pipes, port, devices), lsof is powerful diagnostic tool.

## Basic Use

1. Shows all open files by all processes

    ```bash
    lsof
    ```

2. Find which process is using a given file

   ```bash
    lsof /path/to/file
   ```

3. Find process using a port

   ```bash
   lsof -i :port
   ```

4. List all network connections

   ```bash
   lsof -i
   ```

5. Show process using tcp / udp
   - This can be slow because of recursive search
  
   ```bash
   lsof -i tcp
   lsof -i udp
   ```

6. Get the process id of a port

   ```bash
   lsof -t -i :port
   ```

7. Kill the process using the port

   ```bash
    kill -9 $(lsof -t -i :8080)
   ```

8. Seep open files by specific user

   ```bash
    lsof -u username
   ```

9. See open files exclude one user

    ```bash
    lsof -u ^username
    ```

