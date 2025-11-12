# Node Js


## Task 1:

1. Create an array of user
2. Create an array of todo


```js
users = [
    {
        id: 1,
        name: "Avinash"
    },
    {
        id: 2,
        name: "Raunak"
    }
]

todos = [
    {
        id: 1,
        userId: 1,
        title: "test",
        description: "hello"
    },
     {
        id: 2,
        userId: 2,
        title: "test-1",
        description: "hello-1"
    }
]

GET /users -> All users
GET /users/id -> Get user with that id -> http://localhost:5050/users/1
POST /users -> Add a new user

GET /todos -> All todos
GET /todos/userId -> Get todo for that user id
POST /todos -> Add a new todo {userId, title, description}
```