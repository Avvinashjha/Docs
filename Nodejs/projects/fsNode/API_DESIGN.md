# fs - File System Module

## File Operations

- read a file:        /files/read
- edit a file         /files/edit
- create a file       /files/create
- rename a file       /files/rename
- delete a file       /files/delete
- soft delete a file  /files/soft/delete
- move a file         /files/move

## Directory Operations

- readFolder       /dir/read
- edit a Folder.   /dir/edit
- create a Folder. /dir/create
- rename a Folder  /dir/rename
- delete a Folder. /dir/delete
- soft delete dir  /dir/soft/delete
- move a Folder.   /dir/move

## Search Files and Dir

- search files by ext name. /files/search/ext
- search files by name.     files/search/name

## path - Path Module

- dirname: method return directory name of a path
- delimiter: separating character depends on os platform
- join: Join string and creates a valid path
- extname
- parse
- format
- basename
- resolve: to get complete absolute path

### What is absolute path

- root/.../currentDir

/Users/avinash.jh/Desktop/Private/Docs/Nodejs/projects/fsNode/temp/java/test.java

### What is relative path

temp/java
temp/java/code
temp/java/test.java
src/temp
src/temp/java/test.java

## Tech Stack

Backend

- Node js: Backend library/ runtime env
- express : helper package
- jwt: auth
- mongodb : database
- dotenv

Frontend

- React
- SASS (SCSS)

## Read file

```js
├── raunak
│   ├── code
│   │   └── test.java
│   └── test
│       └── test.java
└── test.java
```
