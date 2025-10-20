## 📅 Chapter 05: Cutting-Edge & Specialized Development

### **1. Serverless Architecture**

#### **1.1 What is Serverless?**
- Misconception: "No servers" → Reality: **No server management**
- You write functions; cloud provider runs them on-demand
- Pay-per-execution (cost-efficient for sporadic traffic)
- Auto-scaling: From zero to thousands of instances instantly
- Use cases: APIs, cron jobs, file processing, webhooks

#### **1.2 Key Concepts**
- **Function as a Service (FaaS)**: AWS Lambda, Firebase Functions
- **Cold Start**: Delay when function is invoked after inactivity
- **Execution Limits**: Time (e.g., 15 min in Lambda), memory, timeout
- **Event Sources**: API Gateway, S3, DynamoDB, SQS, etc.
- **Stateless**: No persistent memory between calls
- **Vendor Lock-in**: Consider OpenFaaS or Netlify Functions for portability

---

### **2. AWS Lambda / Firebase Functions**

#### **2.1 AWS Lambda**
- Create a Lambda function in AWS Console or CLI
- Runtime: Node.js 18.x or 20.x
- Handler function:
  ```js
  exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello from Lambda!" }),
    };
  };
  ```
- **Event object**: Contains request data (from API Gateway, S3, etc.)
- **Context object**: Execution metadata (request ID, time remaining)
- **Integrate with API Gateway** to expose HTTP endpoints
- **Environment Variables**: Store config securely
- **Layers**: Share libraries (e.g., Node modules) across functions
- **Monitoring**: CloudWatch Logs & Metrics
- **Deployment**: ZIP upload, SAM, or Terraform

#### **2.2 Firebase Functions (Google Cloud Functions)**
- Part of Firebase ecosystem
- Simpler setup than AWS
- Triggered by:
  - HTTP requests (`onRequest`)
  - Firestore changes (`onCreate`, `onUpdate`)
  - Authentication events, Storage uploads
- Example:
  ```js
  const functions = require('firebase-functions');
  exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
  });
  ```
- Deploy with: `firebase deploy --only functions`
- Free tier available
- Great for startups, MVPs, and mobile backends

#### **2.3 Best Practices**
- Keep functions small and focused (Single Responsibility)
- Minimize package size to reduce cold start
- Use connection pooling (e.g., reuse DB connections outside handler)
- Handle errors gracefully
- Secure endpoints (JWT, API keys)

---

### **3. TypeScript with Node.js**

#### **3.1 Why TypeScript?**
- Static typing catches bugs at compile time
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Essential for large-scale applications

#### **3.2 Setting Up TypeScript in Node.js**
- Install: `npm install -D typescript ts-node @types/node`
- Init config: `npx tsc --init` → generates `tsconfig.json`
- Key `tsconfig.json` settings:
  ```json
  {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
  ```
- Folder structure:
  ```
  src/
    index.ts
    routes/
    models/
  dist/ (compiled JS)
  ```
- Scripts in `package.json`:
  ```json
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
  ```

#### **3.3 Core TypeScript Features**
- Types: `string`, `number`, `boolean`, `any`, `unknown`, `void`
- Interfaces & Types:
  ```ts
  interface User {
    id: number;
    name: string;
    email?: string;
  }
  ```
- Generics: `function identity<T>(arg: T): T`
- Enums: `enum Role { Admin, User }`
- Union/Intersection Types: `string | number`, `User & Auth`
- Type assertions: `const el = document.getElementById("app") as HTMLDivElement;`

#### **3.4 Integrating with Express, Mongoose, etc.**
- Express with TS:
  ```ts
  import express, { Request, Response } from 'express';
  const app = express();
  app.get('/user', (req: Request, res: Response) => {
    res.json({ id: 1, name: 'John' });
  });
  ```
- Mongoose with TypeScript: Use class-based models or interfaces
- Use `@types/express`, `@types/mongoose`, etc.

---

### **4. TypeORM (for Databases)**

#### **4.1 What is TypeORM?**
- ORM for TypeScript and JavaScript
- Supports both Active Record and Data Mapper patterns
- Works with PostgreSQL, MySQL, SQLite, MongoDB, SQL Server

#### **4.2 Entity Definition**
```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

#### **4.3 CRUD with TypeORM**
- Connect to DB:
  ```ts
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [User],
    synchronize: true // dev only
  });
  ```
- Operations:
  ```ts
  const user = new User();
  user.name = "Alice";
  await user.save();

  const users = await User.find();
  const user = await User.findOneBy({ id: 1 });
  await User.update(1, { name: "Bob" });
  await User.delete(1);
  ```

#### **4.4 Migrations**
- Generate migration: `typeorm migration:generate -n CreateUser`
- Run migration: `typeorm migration:run`
- Essential for production DB schema changes

#### **4.5 Relations**
- One-to-One, One-to-Many, Many-to-Many
- Example:
  ```ts
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
  ```

---

### **5. Message Brokers (Event-Driven Systems)**

#### **5.1 What is a Message Broker?**
- Middleware that decouples services using messages
- Enables asynchronous communication
- Improves scalability, resilience, and fault tolerance

#### **5.2 RabbitMQ**
- Open-source message broker using AMQP protocol
- Concepts:
  - **Producer**: Sends messages
  - **Consumer**: Receives messages
  - **Exchange**: Routes messages (direct, topic, fanout, headers)
  - **Queue**: Stores messages until consumed
  - **Binding**: Link between exchange and queue
- Use cases: Email queue, order processing, notifications
- Node.js client: `amqplib`
- Example:
  ```js
  // Producer
  channel.sendToQueue('tasks', Buffer.from('Hello World'));

  // Consumer
  channel.consume('tasks', (msg) => {
    console.log(msg.content.toString());
    channel.ack(msg);
  });
  ```

#### **5.3 Apache Kafka**
- Distributed event streaming platform
- High throughput, durable, fault-tolerant
- Concepts:
  - **Topics**: Categories/feeds (e.g., `user-events`)
  - **Partitions**: Parallelism within topics
  - **Brokers**: Kafka servers in a cluster
  - **Producers & Consumers**
  - **Consumer Groups**: Scale consumption
- Use cases: Real-time analytics, log aggregation, microservices
- Node.js client: `kafkajs`
- Retains messages for configurable time (not just "fire and forget")

#### **5.4 When to Use Which?**
| Feature | RabbitMQ | Kafka |
|--------|--------|------|
| Throughput | Medium | Very High |
| Latency | Low | Very Low |
| Persistence | Optional | Built-in |
| Ordering | Per queue | Per partition |
| Use Case | Task queues | Event streaming, logs |

---

### **6. Web Scraping & Automation**

#### **6.1 Use Cases**
- Price monitoring
- Data aggregation
- SEO analysis
- Testing dynamic sites

#### **6.2 Puppeteer**
- Headless Chrome/Chromium automation
- Control browser via Node.js
- Install: `npm install puppeteer`
- Capabilities:
  - Take screenshots, PDFs
  - Crawl SPAs (React, Angular)
  - Fill forms, click buttons
  - Handle authentication
- Example:
  ```js
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const title = await page.title();
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
  ```

#### **6.3 Cheerio**
- jQuery-like server-side DOM manipulation
- Fast, no browser needed
- Parse HTML from `axios` or `node-fetch`
- Example:
  ```js
  const $ = cheerio.load(html);
  $('h1').each((i, el) => {
    console.log($(el).text());
  });
  ```

#### **6.4 Best Practices & Ethics**
- Respect `robots.txt`
- Add delays (`await new Promise(r => setTimeout(r, 1000))`)
- Handle CAPTCHAs? Avoid or use services
- Rotate User-Agents and IPs (proxies)
- Legal risks: Some sites prohibit scraping

---

### **7. Blockchain & Web3 (Optional)**

#### **7.1 Introduction to Web3**
- Decentralized web: Built on blockchain
- Smart contracts, wallets, tokens
- Node.js role: Backend for dApps (decentralized apps)

#### **7.2 Ethereum & Solana APIs**
- **Ethereum**
  - Use `ethers.js` or `web3.js`
  - Connect to nodes via Infura or Alchemy
  - Read blockchain data:
    ```js
    const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_KEY');
    const balance = await provider.getBalance('0x...');
    ```
  - Send transactions (with wallet)
  - Interact with smart contracts (ABI + address)

- **Solana**
  - Use `@solana/web3.js`
  - Connect to RPC node
  - Get account balance, send transactions
  - Build NFT mints, token swaps

#### **7.3 Building APIs for Blockchain**
- Create REST API that:
  - Fetches wallet balances
  - Monitors transactions
  - Triggers on-chain events (via webhooks or polling)
  - Signs and sends transactions (securely!)
- Use case: Crypto dashboard, NFT marketplace backend

#### **7.4 Wallet Integration (Backend Role)**
- Verify wallet signatures (e.g., "Sign this message to login")
- Authenticate users via signed messages
- Never store private keys!

#### **7.5 Considerations**
- Security: Private keys, transaction replay
- Speed: Blockchain is slow vs traditional DB
- Cost: Gas fees on Ethereum
- Scalability: Layer 2 solutions (Polygon, Arbitrum)

---

### ✅ **Best Practices Across Advanced Topics**

| Area | Recommendation |
|------|----------------|
| **Serverless** | Optimize cold starts, use provisioned concurrency |
| **TypeScript** | Enforce strict mode, use interfaces over `any` |
| **Message Brokers** | Implement retry logic, dead-letter queues |
| **Web Scraping** | Be ethical, avoid aggressive scraping |
| **Blockchain** | Use trusted providers, validate on-chain data |

---

### 🧪 **Advanced Project Ideas**

1. **Serverless Blog API**
   - AWS Lambda + API Gateway + DynamoDB
   - Deploy via AWS SAM or Serverless Framework

2. **TypeScript Microservice**
   - Express + TypeORM + PostgreSQL
   - Dockerized, CI/CD pipeline

3. **Event-Driven Order System**
   - User service → RabbitMQ → Email/Inventory services
   - Simulate async processing

4. **Crypto Price Tracker**
   - Scrape or use APIs (CoinGecko)
   - Push alerts via WebSocket
   - Store data in MongoDB

5. **NFT Metadata API**
   - Fetch NFTs from wallet address
   - Cache using Redis
   - Serve via REST or GraphQL

---

### 🎓 Final Notes

This **Advanced Phase** transforms you from a **backend developer** into a **full-stack architect** capable of:
- Designing **scalable, event-driven systems**
- Working with **modern tooling (TS, Docker, CI/CD)**
- Exploring **emerging domains (Web3, automation)**

 **NOTE**:  **these topics can be explored over months** — they represent **lifelong learning paths** in software engineering.
