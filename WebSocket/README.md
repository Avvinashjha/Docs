# Web Sockets

## 1. What is Web Sockets?

WebSockets are protocol that enables full-duplex, real-time communication between client (like web browser) and server over a **single**, **long-lived** connection.

Unlike the traditional HTTP request-response model, where the client has to repeatedly ask the server for updates (polling), WebSockets **allow both client and server to send data at any time** once the connection is established.

### Key Points

1. **Full-duplex communication**: Data can flow in both directions simultaneously.
2. **Persistent Connection**: After the initial handshake, the connection stays open, avoiding the overhead of repeatedly opening new connection.
3. **Real-time updates**: Ideal for live features like chat apps, stock tickers, multiplayer games, notifications, etc.
4. **Protocol**: WebSocket starts as HTTP connection (handshake) and then upgrades to WebSocket protocol.

### How It Works?

1. **Handshake**: The client sends a Websocket handshake request to the server over a HTTP.
2. **Upgrades**: Server responds, agreeing to upgrade the connection.
3. **Communication**: Now, Client and server can send messages freely without new HTTP requests.
4. **Closing**: Either side can close the connection when done.

Think of WebSockets as a direct, always-open phone line between the client and serve, rather than sending letters back and forth like HTTP requests.

## Difference Between WebSockets and HTTP/REST

### 1. Communication Style

| Feature       | HTTP/REST                                                                            | WebSockets                                                                                 |
| ------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Communication | **Request-Response**: Client sends request, server responds, then connection closes. | **Full-Duplex**: Both client and server can send messages anytime over an open connection. |
| Initiation    | Client always initiates.                                                             | Client initiates handshake, then both sides can send data.                                 |
| Use Case      | Fetching data occasionally (e.g., loading a webpage, API call).                      | Real-time updates (chat, notifications, live scores, stock tickers).                       |

### 2. Connection Lifespan

- **HTTP/REST**: short-lived. Each request creates a new connection -> server respond -> connection closes.
- **WebSocket**: Long-lived. connection remains open until either client or server closes it.

### 3. Overhead

- HTTP/REST: Each request carries HTTP header, so repeated request can be inefficient.
- WebSocket: After the handshake, messages have very little overhead, making it faster for frequent communication.

### 4. Example Scenario

Scenario: You are building a chat app.

HTTP/REST Approach:

- Client polls the server every 2 seconds to check for new messages.
- Lots of unnecessary requests when there's no new messages.
- Delay depends on polling frequency.

Web Socket Approach:

- Client opens a WebSocket connection.
- Server pushes a new messages instantly to the client.
- Minimal delay, very efficient.

### 5. Visual Comparison

HTTP/REST:

```js
Client -> Request -> Server -> Response
Client -> Request -> Server -> Response
Client -> Request -> Server -> Response
```

WebSocket:

```js
Client -> Server (persistent connection)
Client sends message
Server sends message
Client Sends another message
Server send another message
```

>Use HTTP/REST for occasional data fetching or CRUD operations. Use WebSockets when you need real-time, bidirectional communication.

## Why Can't we always use WebSocket instead of HTTP/REST?

WebSocket are not always the best tool for every situation, even though they are real time and persistent.

### 1. Complexity and Overhead

- WebSockets require a persistent connection between client and server.
- For simple CRUD operation (like fetching user profile, posting a comment), keeping an open connection is unnecessary.
- REST/HTTP is simpler, stateless and easier to scale.

### 2. Scalability

- REST/HTTP: servers are stateless. You can easily scale horizontally because each request is independent.
- WebSockets: Maintaining thousands or millions of open connections can stain the server. You need special infrastructure like load balancers that supports sticky sessions or pub/sub systems (e.g. Redis,Kafka) for distributing messages.

### 3. Caching

- Rest benefits from HTTP Caching (Browser or CDN), which can reduce the server load and latency.
- WebSockets can not use HTTP caching, because messages are dynamic and real-time.

### 4. Firewall and Proxy Issues

- Some firewall or corporate networks may block WebSocket connections, but HTTP works everywhere.

### 5. Use Case Suitability

- WenSockets: Ideal fro real-time, bidirectional communication (chat, live sports, notifications).
- REST/HTTP: Ideal For standard request-response tasks (CRUD operations, Loading pages, form submission).

### Rule of Thumb

Use WebSockets only when you need real-time, continuous communication. Otherwise, REST/HTTP is simpler, More scalable and widely supported.

### Chat App

now what i want is if a users comes

1. they will register them self basic registration, (name, password)
2. Then user can see other users and can select whome to message
3. User can create a group
4. User can join a group
5. User can leave the group
