
## 📅 Chapter 3: **Performance, Scalability, Real-Time, and Testing**


### **1. Performance & Scalability**

#### **1.1 Caching**
- Why cache? Reduce database load, improve response time
- Cache-aside pattern (Lazy Loading): Check cache → DB if miss
- Write-through, write-behind, TTL (Time-to-Live)

##### **Redis (Remote Dictionary Server)**
- In-memory data store (key-value)
- Use cases:
  - **Caching API responses**
  - **Session storage** (vs JWT or database sessions)
  - Rate limiting counters
  - Queues (with Bull or ioredis)
- Installing Redis: Local (`redis-server`) or cloud (Redis Labs, AWS ElastiCache)
- Connecting Node.js: `redis` or `ioredis` client
- Basic operations:
  - `SET key value`, `GET key`
  - `EXPIRE key 3600` (TTL in seconds)
  - `DEL key`, `TTL key`
- Storing complex data: JSON strings, hashes
- Example: Cache a `/api/products` response for 5 minutes
- Cache invalidation strategies: On update, on expiry
- Cluster & persistence (advanced)

##### **Caching Strategies in Practice**
- Full-page vs partial (fragment) caching
- HTTP caching headers: `Cache-Control`, `ETag`, `Last-Modified`
- When to use Redis vs in-memory (e.g., `Map`) vs CDNs
- Monitoring: Cache hit/miss ratio

---

### **2. Real-time Communication**

#### **2.1 WebSockets**
- Limitations of HTTP: Polling, long-polling, inefficiency
- What are WebSockets? Full-duplex, persistent connection
- Use cases: Chat apps, live notifications, dashboards, multiplayer games

##### **Socket.io**
- Higher-level library over WebSockets with fallbacks (long-polling)
- Installing: `npm install socket.io`
- Server setup:
  - Attach to HTTP server
  - Listen for connections: `io.on('connection', (socket) => {})`
- Events:
  - `socket.emit()` → to client
  - `socket.broadcast.emit()` → to all except sender
  - `io.emit()` → to all clients
- Rooms & namespaces:
  - Join/leave rooms: `socket.join('room')`
  - Use cases: Group chat, private messaging
- Handling disconnections: `socket.on('disconnect')`
- Error handling and reconnection logic
- Broadcasting from outside Socket context (e.g., from API routes)
- Security: Authentication with JWT or cookies, rate limiting

##### **Real-World Use Cases**
- Live chat application
- Real-time notifications (e.g., "User X liked your post")
- Collaborative editing (e.g., Google Docs-style)
- Stock ticker or live sports updates

---

### **3. Microservices & APIs**

#### **3.1 REST vs GraphQL**
- **REST Recap**
  - Fixed endpoints, multiple round trips
  - Over-fetching and under-fetching issues
  - Versioning challenges

##### **GraphQL (with Apollo Server)**
- What is GraphQL? Query language for APIs
- Advantages:
  - Client defines what data it needs
  - Single endpoint: `/graphql`
  - No over/under-fetching
- Installing: `npm install apollo-server-express graphql`
- Schema Definition Language (SDL):
  - Define `type Query`, `type Mutation`, custom types
  - Example:
    ```graphql
    type User {
      id: ID!
      name: String!
      posts: [Post]
    }
    ```
- Resolvers: Functions that return data for each field
- Queries vs Mutations vs Subscriptions (real-time)
- Apollo Server integration with Express
- GraphiQL/GraphQL Playground: Interactive API docs
- Input validation: `@requireAuth`, custom directives
- DataLoader: Batch and cache DB requests to avoid N+1
- Security: Rate limiting, depth limiting, persisted queries

#### **3.2 gRPC Basics**
- What is gRPC? High-performance RPC framework by Google
- Uses Protocol Buffers (`.proto` files) for schema
- Binary format: Faster than JSON
- HTTP/2 based: Multiplexing, streaming
- 4 types of RPC:
  1. Unary (1 request → 1 response)
  2. Server streaming
  3. Client streaming
  4. Bidirectional streaming
- Use cases: Internal microservices communication, low-latency systems
- Installing: `@grpc/grpc-js`, `protobufjs`
- Define `.proto` file:
  ```proto
  service UserService {
    rpc GetUser (UserRequest) returns (User);
  }
  ```
- Generating code from `.proto`
- Pros: Speed, type safety, streaming
- Cons: Not browser-friendly, steeper learning curve
- When to use: Internal APIs, mobile backends, IoT

---

### **4. Testing & Debugging**

#### **4.1 Unit Testing (Jest, Mocha)**
- What is unit testing? Testing individual functions/modules
- **Jest** (Recommended)
  - Zero-config, built-in assertion, mocking, coverage
  - `describe()`, `it()`, `expect().toBe()`, `toEqual()`
  - Mocking: `jest.fn()`, `jest.spyOn()`, `jest.mock()`
  - Async testing: `async/await`, `resolves`, `rejects`
  - Setup/teardown: `beforeEach()`, `afterEach()`
  - Code coverage: `--coverage`, `collectCoverageFrom`

- **Mocha + Chai (Alternative)**
  - Mocha: Test runner
  - Chai: Assertion library (`expect`, `should`, `assert`)
  - Need additional tools: `sinon` for spies/stubs, `nyc` for coverage
  - More flexible but requires config

- Example: Test a utility function (e.g., `calculateTax()`)

#### **4.2 Integration Testing (Supertest)**
- What is integration testing? Test API endpoints and DB interactions
- Using `supertest`: Simulate HTTP requests
- Example:
  ```js
  request(app)
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(done);
  ```
- Testing routes with authentication (pass JWT)
- Mocking external services (e.g., Stripe, AWS)
- Using in-memory DB (e.g., MongoDB Memory Server) for clean tests
- Running tests in isolation: Reset DB before each test
- Testing error cases: 400, 401, 404

#### **4.3 Debugging**
- **Console Debugging**
  - `console.log()` (basic)
  - `console.table()`, `console.time()`, `console.trace()`

- **Node.js Inspector**
  - Built-in V8 inspector
  - Start with: `node --inspect app.js`
  - Use Chrome DevTools: `chrome://inspect`
  - Breakpoints, step-through, call stack

- **VS Code Debugger**
  - Launch configuration: `.vscode/launch.json`
  - Attach to running process
  - Watch expressions, variable inspection

- **Logging**
  - Why structured logging? Easier to search and monitor
  - Using `winston` or `pino`
  - Log levels: `error`, `warn`, `info`, `debug`
  - Transports: Console, file, HTTP, cloud (e.g., Datadog)
  - Logging in production: Avoid `console.log`, use logger
  - Correlation IDs: Track requests across services

- **Error Monitoring Tools (Advanced)**
  - Sentry, LogRocket, New Relic
  - Capture unhandled exceptions, promise rejections
  - Source maps for minified code

---

### ✅ **Best Practices & Architecture (Week 8 Focus)**

- **Monolith vs Microservices**
  - Monolith: Simpler, easier to test
  - Microservices: Scalable, independent deployment
  - When to split: Team size, scaling needs, domain complexity

- **Service Communication**
  - Synchronous: REST, gRPC
  - Asynchronous: Message queues (RabbitMQ, Kafka)

- **API Gateway Pattern**
  - Single entry point for multiple services
  - Handle auth, rate limiting, routing

- **Observability**
  - Logging, Monitoring, Tracing (OpenTelemetry)

- **CI/CD Basics**
  - GitHub Actions, GitLab CI
  - Run tests on push
  - Linting, building, deploying

---

### 🧪 **Hands-On Project Ideas (Phase 3 Capstone)**

1. **Real-Time Chat App**
   - Express + Socket.io
   - Rooms, private messages, typing indicators
   - Deploy with Redis (for scaling)

2. **E-Commerce API with GraphQL**
   - Apollo Server + MongoDB
   - Product search, user orders, reviews
   - DataLoader to fix N+1

3. **Microservices Setup**
   - Auth Service (JWT), Product Service (REST), Order Service (gRPC)
   - Communicate via HTTP/gRPC
   - Use Redis for shared session or caching

4. **News Aggregator with Caching**
   - Fetch from external APIs (e.g., NewsAPI)
   - Cache responses in Redis
   - Serve via GraphQL or REST

5. **Testing Suite for Existing API**
   - Add Jest + Supertest
   - 80%+ coverage
   - Mock DB and external APIs

---

This phase **elevates your backend skills** to **production-grade level**, covering **performance, real-time systems, modern API patterns, and robust testing** — all essential for senior backend roles or scalable applications.

