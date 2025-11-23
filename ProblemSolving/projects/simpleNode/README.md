# Project 1. Create task manager APP

- Users table
  
  ```sql
    name(unique),
    id, 
    create_at
  ```

- Tasks table
  
  ```sql
    title,
    description,
    status,
    user_id (fk) -> users(id),
    created_at,
    updated_at,
    completed_at
  ```

- API For user
  
  ```bash
  GET:
    /users -> Get all users
    /users/:id -> Get user with that id
  POST:
    /users -> add a new user
  DELETE:
    /users/:id -> delete the user with that id
  ```

- API for tasks
  
  ```bash
   GET:
     /tasks -> get all tasks
     /tasks?userId={id} -> get task of that user with id
     /task/id -> get task with that id
     /tasks?sortColumn="created_at"&sortOrder="asc/desc" -> it will return the data based on sort column and sort order
     /tasks?limit=10&offset=0 -> it will return 10 tasks (pagination)
     /tasks?searchQuery="test"&limit=10&offset=0
     /tasks?count=true -> return total count of task

    POST:
    /tasks -> add a new task
        {
            title, desc, status, userId
        }
    PUT:
        /tasks/:id 
            {
                title,desc, status
            }
    DELETE:
        /tasks/:id -> delete that task
  ```

Final tasks -> `http://localhost:5050/task?userId=1&limit=10&offset=10&searchQuery=a`