

## 📅 Chapter 2: Building Web Servers & APIs


### **1. Express.js Framework**

#### **1.1 Introduction to Express.js**
- What is Express.js? Minimalist web framework for Node.js
- Why use Express? Fast setup, middleware support, large ecosystem
- Installing Express: `npm install express`
- Creating a basic server: `app.listen()`, `app.get()`, etc.

#### **1.2 Routing**
- Route methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Route paths: Static, dynamic (with parameters: `/:id`), regex
- Route parameters: `req.params`, `req.query`, `req.body`
- Router module: `express.Router()` for modular route organization
- Nested routers (e.g., `/api/users`, `/api/posts`)
- Best practices: RESTful naming, plural nouns, consistent structure

#### **1.3 Middleware**
- What is middleware? Functions that sit between request and response
- Types:
  - Application-level: `app.use()`
  - Router-level: `router.use()`
  - Error-handling: `(err, req, res, next)`
  - Built-in: `express.json()`, `express.urlencoded()`
  - Third-party: `cors`, `helmet`, `morgan`
- Order matters: Middleware executes sequentially
- Custom middleware: Logging, authentication checks, input validation
- `next()` function: Passing control to next middleware
- Terminating vs non-terminating middleware

#### **1.4 REST API Design**
- Principles of REST (Representational State Transfer)
- HTTP methods and their semantics
- Status codes: 200, 201, 400, 401, 403, 404, 500
- API structure: `/api/v1/resource`
- Request/Response format: JSON
- Versioning APIs: URL vs header
- HATEOAS (optional, advanced)
- Designing clean, consistent endpoints (e.g., `/users`, `/users/:id`)

#### **1.5 Error Handling**
- Throwing errors in async routes
- Centralized error handling with middleware
- Custom error classes (e.g., `ApiError extends Error`)
- Logging errors (console, file, or tools like Winston)
- Sending structured error responses
- Handling 404: "Route not found" middleware
- Async error handling: Wrapping async routes or using libraries like `express-async-errors`

---

### **2. Authentication & Security**

#### **2.1 JWT (JSON Web Tokens)**
- What is JWT? Stateless token format for authentication
- Structure: Header, Payload, Signature
- How JWT works: Login → server issues token → client stores → sends in `Authorization: Bearer <token>`
- Signing tokens: `jsonwebtoken` library (`jwt.sign()`)
- Verifying tokens: `jwt.verify()`
- Storing tokens: localStorage, cookies (secure vs insecure)
- Token expiration: `expiresIn`
- Refresh tokens: Rotating access tokens
- Security: Never store sensitive data in payload

#### **2.2 OAuth (Google, GitHub Login)**
- What is OAuth? Delegated authorization (not authentication)
- OAuth 2.0 flow: Authorization Code Grant (most common)
- Using Passport.js: Strategy-based auth middleware
  - `passport-google-oauth20`
  - `passport-github`
- Setting up OAuth apps (Google Cloud Console, GitHub Developer Settings)
- Callback URLs and environment variables
- User profile retrieval and session management
- Storing OAuth user data in DB (e.g., `googleId`, `githubId`)
- Security: CSRF protection, state parameter

#### **2.3 bcrypt (Password Hashing)**
- Why hash passwords? Never store plain text
- How bcrypt works: Salt + hashing, adaptive (slow by design)
- Using `bcryptjs` or `bcrypt`:
  - `bcrypt.hash(password, saltRounds)`
  - `bcrypt.compare(password, hash)`
- Salt generation and reuse
- Best practices: 10–12 salt rounds, avoid weak passwords

#### **2.4 Security Best Practices (Middleware & Setup)**
- **Helmet.js**: Secures HTTP headers (e.g., XSS, frame protection)
  - `app.use(helmet())`
- **CORS (Cross-Origin Resource Sharing)**
  - What is CORS? Browser security policy
  - Using `cors()` middleware
  - Whitelisting origins, credentials support
- **Rate Limiting**
  - Prevent brute-force and DDoS attacks
  - Using `rate-limiter-flexible` or `express-rate-limit`
  - Per-IP or per-user limits
- Input validation: Using `Joi`, `express-validator`, or `zod`
- Sanitization: Preventing XSS, SQL injection
- Environment variables: Using `dotenv` for secrets (e.g., `JWT_SECRET`, `DB_URL`)
- HTTPS enforcement in production

---

### **3. Working with Databases**

#### **3.1 MongoDB (NoSQL)**
- What is MongoDB? Document-based NoSQL database
- BSON format: Binary JSON
- Collections vs Documents (vs Tables vs Rows)
- Installing MongoDB: Local setup or cloud (MongoDB Atlas)
- Connecting via `mongoose`

##### **Mongoose ODM (Object Data Modeling)**
- What is Mongoose? ORM/ODM for MongoDB
- Schema definition: `new mongoose.Schema({})`
- Data types: `String`, `Number`, `Date`, `ObjectId`, `Array`, `Boolean`
- Validators: `required`, `min`, `max`, `unique`, custom
- Middleware (hooks): `pre('save')`, `post('save')`
- Virtuals and getters/setters
- Model creation: `mongoose.model('User', schema)`
- Connecting to DB: `mongoose.connect()`

##### **CRUD Operations**
- Create: `Model.create()`, `new Model().save()`
- Read: `Model.find()`, `findById()`, `findOne()`
- Update: `findByIdAndUpdate()`, `findOneAndUpdate()`
- Delete: `findByIdAndDelete()`, `deleteOne()`
- Chaining queries: `.select()`, `.limit()`, `.sort()`, `.skip()`
- Promises & async/await with Mongoose

##### **Aggregation & Indexing**
- Aggregation pipeline: `$match`, `$group`, `$sort`, `$project`, `$lookup` (joins)
- Use cases: Analytics, reporting, complex queries
- Indexing: Improving query performance
  - Single field: `.createIndex({ email: 1 })`
  - Compound: `{ name: 1, age: -1 }`
  - Unique, TTL, text indexes
- Explain plans: `Model.find().explain("executionStats")`

---

#### **3.2 MySQL / PostgreSQL (SQL)**
- Relational databases: Tables, rows, relationships
- ACID properties
- Choosing MySQL vs PostgreSQL (PostgreSQL preferred for JSON, geospatial, etc.)

##### **Sequelize ORM**
- What is Sequelize? Promise-based Node.js ORM
- Installation: `npm install sequelize pg pg-hstore` (PostgreSQL) or `mysql2`
- Connection setup: `new Sequelize('database', 'user', 'pass', { dialect: 'postgres' })`
- Defining models: `sequelize.define('User', { attributes })`
- Associations:
  - One-to-One: `hasOne`, `belongsTo`
  - One-to-Many: `hasMany`, `belongsTo`
  - Many-to-Many: `belongsToMany` (with junction table)
- Syncing models: `sequelize.sync()` (dev only), migrations (production)
- Querying:
  - `User.findAll()`, `findByPk()`, `findOne()`
  - `where`, `include` (for joins), `attributes`, `order`, `limit`
  - Raw queries: `sequelize.query()`

##### **Raw Queries & Transactions**
- When to use raw queries: Complex joins, performance
- Using `sequelize.query('SELECT * FROM users WHERE active = ?', [...])`
- Transactions: Ensuring data consistency
  - `const t = await sequelize.transaction()`
  - Commit: `await t.commit()`
  - Rollback: `await t.rollback()`
  - Auto-cleanup with `try/catch`
- Use cases: Bank transfers, order processing

---

### **4. File Uploads & Cloud Storage**

#### **4.1 Multer (Handling File Uploads)**
- What is Multer? Middleware for handling `multipart/form-data`
- Installing: `npm install multer`
- Single file: `upload.single('avatar')`
- Multiple files: `upload.array('photos', 5)`
- File metadata: `req.file`, `req.files`
- Storage options:
  - Memory storage (for small files)
  - Disk storage: `destination`, `filename`
- File filtering: Accept only images, PDFs, etc.
- Validation: File size, type, extension
- Handling errors: `multer({ limits: { fileSize: 5 * 1024 * 1024 } })`

#### **4.2 AWS S3 / Firebase Storage**
- Why cloud storage? Scalability, reliability, CDN support

##### **AWS S3 (Amazon Simple Storage Service)**
- Setting up AWS account and IAM user
- Access keys: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- Using `aws-sdk` or `@aws-sdk/client-s3`
- Uploading files: `putObject()` or `upload()` (with streams)
- Generating signed URLs for private file access
- Setting ACLs (public-read, private)
- Deleting files: `deleteObject()`
- Best practices: Don’t hardcode keys, use environment variables

##### **Firebase Storage**
- Setting up Firebase project and service account
- Using `firebase-admin` SDK
- Initializing app: `admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })`
- Uploading files: `bucket.upload()`
- Getting download URLs: `getSignedUrl()` or public URLs
- Folder organization: `/users/:id/avatar.jpg`
- Deleting and listing files

##### **Bonus: Local vs Cloud Trade-offs**
- Local: Simpler, cheaper (dev), but not scalable
- Cloud: Scalable, secure, CDN-ready, but costs money
- Hybrid: Upload to local, then push to cloud (optional)

---

### ✅ **Best Practices & Tools**

- **Environment Management**: `.env` files with `dotenv`
- **Configuration**: Separate `config/development.js`, `config/production.js`
- **Validation**: Use `Joi` or `zod` for request validation
- **Logging**: `winston` or `pino` for structured logs
- **Testing**: Intro to `Jest` or `Supertest` (optional in Phase 2)
- **API Documentation**: `Swagger (OpenAPI)` or `Postman`
- **Error Monitoring**: `Sentry`, `LogRocket` (advanced)

---

### 🧪 **Hands-On Project Ideas (Phase 2 Capstone)**

1. **RESTful Blog API**
   - Users, Posts, Comments
   - JWT Auth, CRUD, file upload (cover image)
   - Deploy with MongoDB Atlas + AWS S3

2. **Task Management App (Like Trello)**
   - Boards, Lists, Cards
   - OAuth login (Google), real-time updates (later with WebSockets)
   - PostgreSQL + Sequelize

3. **E-Commerce Backend**
   - Products, Categories, Orders
   - Admin & User roles
   - File uploads for product images

4. **Social Media API**
   - Follow system, posts, likes
   - Aggregation for feeds
   - Rate limiting on actions
