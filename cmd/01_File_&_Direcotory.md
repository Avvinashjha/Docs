# File And Directory

## 1. `ls` - Lift Files

Basic Commands:

```bash
ls
ls -l    # Long listing
ls -a    # include hidden files
ls -lh   # human readable size
ls -lart # newest files at the bottom
```

## 2. `cd` - Change Directory

```bash
cd project/ # Go to project directory
cd ..       # up one directory
cd ../..    # up two directory
cd ~        # home directory
cd -        # previous directory
```

## 3. `pwd` - Print Working Directory

- Shows where you are in the file system
- /home/.../ currentWorkingDirectory

```bash
pwd
```

## 4. cp - Copy Files

1. Copy Files

    ```bash
    cp file1.txt file2.txt
    ```

2. Copy Directory

   - If backup directory is not present then it will create that for you

   ```bash
   cp -r src/ /backup
   ```

## 5. mv - Move or Rename

1. Move

   ```bash
   mv file.txt /tmp/
   ```

2. Rename

   ```bash
    mv oldName.txt newName.txt
   ```

## 5. rm - Remove Files

1. Remove file:
  
    ```bash
    rm file.txt
    ```

2. Remove Directory 

   ```bash
    rm -r folder/
   ```

   - Dangerous But common
  
  ```bash
  rm -rf / ## it will delete every thing from root so don't run it
  ```

## 7. mkdir - Make Directory

1. Make Single Directory

    ```bash
    mkdir src
    ```

2. Make Nested Directory

   ```bash
   mkdir -p project/src/utils
   ```

   - Idea: Make a bash or .sh ro create a whole folder structure with files and content

## 8. rmdir - Remove empty directory

- TO remove non empty directory you can use rm

```bash
rmdir empty_folder/
```

## 9. touch - Create Empty File / Update Timestamp

1. Create File:

   ```bash
   touch index.js
   ```

2. update timestamp

   ```bash
   touch existingFile
   ```

### Why Do we update time Stamp?

Every file in Linux has three timestamps:

- mtime ( modify time): When the file content last changed
- atime (Access time): when the file last accessed
- ctime (change time): when the files meta data changed (permission/owner, etc)

By updating the time stamp 

1. Trigger Build systems : Tools like make only rebuild files if they see the source file is newer
2. Trigger Deployment or CI systems: Some deployment pipelines checks timestamp to detect changes.
3. Reset file sync tools (rsync, backup system): if you want to re copy the file without editing it.
4. Fix timestamp problem: If you system clock was wrong when file was created, the file may appear to be from future of past.
5. Mark file as active or recently used: Some maintenance script deletes old files.


## 10. cat - View File Contents

- Read one file
  
  ```bash
  cat file.txt
  ```

- Read Multiple Files
  
  ```bash
  cat file1.txt file2.txt
  ```

- Combine files and save to one file
  
  ```bash
  cat file1.txt file2.txt > combined1.txt
  ```

## 11. less - View Files Interactively

```bash
less file.log
```

TO Navigate:

- q : quit less mode
- g : go to first line of the file
- G : Go to bottom of the file
- /text : search for that text

## head / tail - First / Last lines

1. First 10 Lines

   ```bash
   head file.log
   ```

2. First 20 Lines

   ```bash
   head -b 20 file.log
   ```

3. Last 10 Lines

   ```bash
   tail file.logs
   ```

4. Read Lat 20 Lines

   ```bash
    tail -n 20 file.logs
   ```

## 13. find - Most popular search tool

1. Find files by name

   ```bash
   find . -name "*.js"
   ```

   - It find all the file ending with `.js`.

   ```bash
   find . -name "*.js*"
   ```

   - It will find all the file whose extension starts with `.js` like `.js` `.json`

2. Find by type

   ```bash
   find . -type d -name "src"
   ```

3. Find By Size

   ```bash
    find /var -size +100M
   ```

4. Find & Delete:

   ```bash
   find . -name "*.temp" -delete
   ```

## 14. tree - View Folder structure 

```bash
tree
```

install if missing:

```bash
sudo apt install tree
```

```bash
brew install tree
```

## 15. stat - Detailed info about a file

```bash
stat file.txt
```

show size, permission, timestamp (access, modify, change), inode, etc.

## 16. du - Folder Size

```base
du -sh
du -sh /var/log
```

## 17. df - Disk Free Space

```bash
df -h
```

## 18. File Permission string

```bash
ls -l
```

```bash
-rw-r--r--  1 user group  120 Feb 10 10:20 file.txt
```

Let's decode it:

### Breakdown of `-rw-r--r--`

The string is 10 characters:

```bash
- rw- r-- r--
| |   |   |
| |   |   └── Other (everyone else)
| |   └────── Group
| └────────── Owner (user)
└──────────── File type
```

### 1, First character: File Type

| Symbol | Meaning          |
| ------ | ---------------- |
| `-`    | Regular file     |
| `d`    | Directory        |
| `l`    | Symbolic link    |
| `c`    | Character device |
| `b`    | Block device     |
| `p`    | Named pipe       |
| `s`    | Socket           |

So When I am doing

```bash
tree logs
```

Output:

```bash
logs
├── log.json
└── warning
    └── warn.json
```

Now 

```bash
ls -l logs/
```

Output:

```bash
-rw-r--r--@ 1 avinash.jh  staff   0 Nov  6 08:46 log.json
drwxr-xr-x@ 3 avinash.jh  staff  96 Nov  6 10:48 warning
```

- For `warning` first character is `d` -> directory
- For `log.json` first character is `-` -> Regular file

### 2. Next 9 characters: Permission

Grouped in sets of 3:

```bash
rw-   r--   r--
|     |     |
Owner Group Other
```

#### For Owner: `rw-`

- r = read
- w = write
- - = no execute

so owner can read, write, but not execute.

#### For Group: `r--`

- r = read
- -- = No Write no execute

So the group can only read.

### For others: `r--`

same as group.

### Permission  Value in numeric

Each Permission has a number:

| Permission | Letter | Value |
| ---------- | ------ | ----- |
| Read       | r      | 4     |
| Write      | w      | 2     |
| Execute    | x      | 1     |

So:

- rw- -> 4 + 2 + 0 = 6
- r-- -> 4 + 0 + 0 = 4

Thus:

```bash
-rw-r--r--
  6   4  4
```

Same as 

```bash
chmod 644 log.json
```

### Common permission values

| Symbolic  | Numeric | Meaning                              |
| --------- | ------- | ------------------------------------ |
| rwxrwxrwx | 777     | full access to everyone              |
| rwxr-xr-x | 755     | common for directories & executables |
| rw-r--r-- | 644     | common for files                     |
| rw------- | 600     | private file                         |
| r--r--r-- | 444     | read-only for all                    |

