#!/bin/bash

echo "=== Testing Todo API ==="
echo

BASE_URL="http://localhost:5050"

echo "1. Getting all todos:"
curl -s $BASE_URL/todos
echo

echo "2. Getting todos for user 1:"
curl -s $BASE_URL/todos/user/1
echo

echo "3. Creating a new todo:"
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Todo Item",
    "description": "This is a test todo item",
    "userId": 1
  }')
echo $CREATE_RESPONSE

# Extract the todo ID manually (without jq)
TODO_ID=$(echo $CREATE_RESPONSE | grep -o '"id":[0-9]*' | cut -d: -f2)
echo "Created todo ID: $TODO_ID"
echo

echo "4. Updating the todo:"
curl -s -X PUT $BASE_URL/todos/$TODO_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "title": "Updated Test Todo"
  }'
echo

echo "5. Getting all todos after update:"
curl -s $BASE_URL/todos
echo

echo "6. Deleting the todo:"
curl -s -X DELETE $BASE_URL/todos/$TODO_ID
echo

echo "7. Final list of todos:"
curl -s $BASE_URL/todos