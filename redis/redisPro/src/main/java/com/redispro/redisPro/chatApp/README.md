## System Design for Chat App Using Redis
## **1. Requirements**

### **Functional Requirements**
1. **Real-Time Messaging**:
    - Users can send messages to each other in real time.
2. **Channels or Rooms**:
    - Support multiple chat rooms where users can join and leave dynamically.
3. **Message History (Optional)**:
    - Store recent messages for each room so new users can see the conversation history.
4. **Presence Tracking (Optional)**:
    - Track users who are online/offline in a chat room.
5. **Scalability**:
    - Handle thousands of concurrent users and messages.

### **Non-Functional Requirements**
1. **Low Latency**:
    - Messages should be delivered with minimal delay.
2. **Reliability**:
    - Ensure messages are not lost during transmission.
3. **Fault Tolerance**:
    - The system should handle failures gracefully.
4. **Security**:
    - Protect against unauthorized access and malicious users.

---

## **2. High-Level Design**

### **Components**
1. **Web Server**:
    - Handles incoming HTTP requests and WebSocket connections.
    - Built using Spring Boot in this case.

2. **Redis Pub/Sub**:
    - Used for real-time messaging between clients.
    - Clients subscribe to channels (chat rooms) and receive messages in real time.

3. **Redis Lists (Optional)**:
    - Store message history for each chat room.

4. **Client Applications**:
    - Web or mobile apps that connect to the server via WebSocket.

5. **Load Balancer**:
    - Distributes traffic across multiple instances of the web server.

6. **Monitoring & Analytics**:
    - Tracks system performance, errors, and usage statistics.

---

### **Data Flow**
1. **User Joins a Chat Room**:
    - The client subscribes to a Redis channel (e.g., `room:general`).
    - Optionally, the server retrieves recent messages from Redis lists and sends them to the client.

2. **Sending a Message**:
    - A user sends a message via WebSocket.
    - The server publishes the message to the corresponding Redis channel.

3. **Receiving a Message**:
    - All subscribed clients receive the message in real time.

4. **Storing Message History**:
    - The server appends the message to a Redis list for the chat room.

---

## **3. Detailed Design**

### **1. Redis Pub/Sub**
Redis Pub/Sub is the backbone of the real-time messaging system:
- **Publish**: When a user sends a message, the server publishes it to the appropriate channel.
- **Subscribe**: Clients subscribe to channels to receive messages in real time.

#### **Example Commands**
- Publish a message:
  ```bash
  PUBLISH room:general "Hello, world!"
  ```
- Subscribe to a channel:
  ```bash
  SUBSCRIBE room:general
  ```

---

### **2. Redis Lists (Message History)**
To store message history for each chat room:
- Use Redis lists to store the last `N` messages (e.g., the last 100 messages).
- Example:
  ```bash
  LPUSH room:general:message-history "Hello, world!"
  LTRIM room:general:message-history 0 99  # Keep only the last 100 messages
  ```

---

### **3. WebSocket Communication**
WebSocket is used for bidirectional communication between the client and server:
- **Client → Server**:
    - The client sends messages to the server via WebSocket.
- **Server → Client**:
    - The server sends messages to the client via WebSocket when it receives them from Redis Pub/Sub.

---

### **4. Scalability**

#### **Horizontal Scaling**
- Deploy multiple instances of the web server behind a load balancer.
- Use Redis as a centralized message broker to ensure all server instances share the same state.

#### **Sharding**
- If the number of chat rooms grows significantly, you can shard Redis channels across multiple Redis instances.

---

### **5. Security**

#### **Authentication**
- Use tokens (e.g., JWT) to authenticate users before allowing them to join chat rooms.

#### **Authorization**
- Ensure users can only access authorized chat rooms.

#### **Input Validation**
- Validate messages to prevent malicious inputs (e.g., XSS attacks).

#### **Encryption**
- Use secure WebSocket (`wss://`) to encrypt communication between the client and server.

---

## **4. APIs**

### **1. Join a Chat Room**
- **Endpoint**: `POST /api/chat/join`
- **Request**:
  ```json
  {
    "roomId": "general",
    "userId": "user123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Joined room: general"
  }
  ```

### **2. Send a Message**
- Sent via WebSocket:
  ```json
  {
    "roomId": "general",
    "userId": "user123",
    "message": "Hello, world!"
  }
  ```

### **3. Receive Messages**
- Received via WebSocket:
  ```json
  {
    "roomId": "general",
    "userId": "user123",
    "message": "Hello, world!",
    "timestamp": "2023-10-01T12:34:56Z"
  }
  ```

---

## **5. Deployment Architecture**

### **1. Components**
- **DNS**: Maps the domain name (e.g., `chat.example.com`) to the load balancer.
- **Load Balancer**: Distributes traffic across multiple web server instances.
- **Web Servers**: Handle WebSocket connections and interact with Redis.
- **Redis**: Acts as the message broker and optionally stores message history.
- **Monitoring**: Tools like Prometheus and Grafana for performance monitoring.

### **2. Diagram**
```
Client -> Load Balancer -> Web Server -> Redis
```

---

## **6. Optional Enhancements**

### **1. Presence Tracking**
- Use Redis sets to track users currently online in a chat room:
  ```bash
  SADD room:general:online user123
  SMEMBERS room:general:online
  ```

### **2. Typing Indicators**
- Notify users when someone is typing in a chat room.

### **3. File Sharing**
- Allow users to share files (e.g., images, documents) in chat rooms.

### **4. Push Notifications**
- Send push notifications to users who are offline.

---

## **7. Trade-Offs**

### **Advantages of Redis Pub/Sub**
- **Speed**: Redis Pub/Sub provides sub-millisecond latency for message delivery.
- **Simplicity**: Easy to implement real-time messaging without complex infrastructure.

### **Disadvantages**
- **No Persistence**: Messages published via Pub/Sub are not stored unless explicitly saved to Redis lists or another database.
- **Scalability Limits**: Redis Pub/Sub does not support message sharding out of the box.

---

## **8. Next Steps**
1. Implement the core functionality (real-time messaging and joining chat rooms).
2. Add optional features like message history and presence tracking.
3. Deploy the application using Docker and test under load.
