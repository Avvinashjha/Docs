# API Docs

## Users API

### Get all users

```bash
curl http://localhost:5050/users
```

### Get user by ID

```bash
curl http://localhost:5050/users/1
```

### Create new user

```bash
curl -X POST http://localhost:5050/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Brown","email":"alice@example.com"}'
```

### Update user

```bash
curl -X PUT http://localhost:5050/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'
```

### Delete user

```bash
curl -X DELETE http://localhost:5050/users/1
```

### Health check

```bash
curl http://localhost:5050/health
```

---

## TODO APIs

### 1. Get All Todos

```bash
curl http://localhost:5050/todos
```

### 2. Get Todos by User ID

```bash
# Replace {userId} with actual user ID (1, 2, or 3 from your sample data)
curl http://localhost:5050/todos/user/1
```

### 3. Create a New Todo

```bash
curl -X POST http://localhost:5050/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the Todo API",
    "userId": 1
  }'
```

```bash
curl -X POST http://localhost:5050/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread, Fruits",
    "userId": 2
  }'
```

```bash
# Minimal request (only title and userId)
curl -X POST http://localhost:5050/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Call John",
    "userId": 3
  }'
```

### 4. Update a Todo

```bash
# Update title and description
curl -X PUT http://localhost:5050/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task title",
    "description": "Updated description here"
  }'
```

```bash
# Update status to in_progress
curl -X PUT http://localhost:5050/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }'
```

```bash
# Update status to completed
curl -X PUT http://localhost:5050/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

```bash
# Update multiple fields
curl -X PUT http://localhost:5050/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Final project review",
    "description": "Review the complete project before submission",
    "status": "completed"
  }'
```

### 5. Delete a Todo

```bash
# Replace {id} with actual todo ID
curl -X DELETE http://localhost:5050/todos/1
```

### Complete Testing Script

Here's a complete testing script you can run:

```bash
#!/bin/bash

echo "=== Testing Todo API ==="
echo

BASE_URL="http://localhost:5050"

echo "1. Getting all todos:"
curl -s $BASE_URL/todos | jq .
echo

echo "2. Getting todos for user 1:"
curl -s $BASE_URL/todos/user/1 | jq .
echo

echo "3. Creating a new todo:"
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Todo Item",
    "description": "This is a test todo item",
    "userId": 1
  }')
echo $CREATE_RESPONSE | jq .

# Extract the todo ID from the create response
TODO_ID=$(echo $CREATE_RESPONSE | jq -r '.data.id')
echo "Created todo ID: $TODO_ID"
echo

echo "4. Updating the todo:"
curl -s -X PUT $BASE_URL/todos/$TODO_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "title": "Updated Test Todo"
  }' | jq .
echo

echo "5. Getting all todos after update:"
curl -s $BASE_URL/todos | jq .
echo

echo "6. Deleting the todo:"
curl -s -X DELETE $BASE_URL/todos/$TODO_ID | jq .
echo

echo "7. Final list of todos:"
curl -s $BASE_URL/todos | jq .
```

### Testing with Different Scenarios

#### Error Cases Testing

**Invalid user ID:**

```bash
curl http://localhost:5050/todos/user/abc
```

**Create todo with missing title:**

```bash
curl -X POST http://localhost:5050/todos \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Missing title",
    "userId": 1
  }'
```

**Create todo with missing userId:**

```bash
curl -X POST http://localhost:5050/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Missing userId"
  }'
```

**Update with no fields:**

```bash
curl -X PUT http://localhost:5050/todos/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Delete non-existent todo:**

```bash
curl -X DELETE http://localhost:5050/todos/999
```

#### Using Environment Variables for Testing

```bash
# Set variables for easier testing
export API_BASE="http://localhost:5050"
export USER_ID=1
export TODO_ID=1

# Now use variables in commands
curl $API_BASE/todos/user/$USER_ID
curl -X DELETE $API_BASE/todos/$TODO_ID
```

### Expected Responses

**Success Response:**

```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 5
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Title and userId are required"
}
```

### Tips for Testing

1. **Install jq** for pretty JSON output: `brew install jq` (Mac) or `sudo apt-get install jq` (Linux)
2. **Use Postman** or **Thunder Client** (VSCode extension) for GUI testing
3. **Test sequentially** - Create → Read → Update → Delete
4. **Check the database** directly to verify changes: `SELECT * FROM todos;`

Make sure your server is running (`npm run dev`) before testing!
