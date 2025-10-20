
## 📅 **Chapter 4: DevOps & Deployment Deployment, CI/CD, and Performance Optimization**

---

### **1. Deployment & CI/CD**

#### **1.1 Introduction to DevOps & CI/CD**
- What is DevOps? Culture + practices bridging development and operations
- CI/CD Pipeline:
  - **CI (Continuous Integration)**: Merge code → test → build
  - **CD (Continuous Delivery/Deployment)**: Automatically deploy to staging/production
- Benefits: Faster releases, fewer bugs, consistent environments

---

### **2. Dockerizing Node.js Apps**

#### **2.1 What is Docker?**
- Containerization platform: Package app + dependencies into isolated containers
- Containers vs Virtual Machines (lighter, faster startup)
- Key concepts:
  - **Image**: Blueprint of the app
  - **Container**: Running instance of an image
  - **Dockerfile**: Instructions to build an image
  - **Docker Compose**: Orchestrate multiple containers (e.g., app + DB + Redis)

#### **2.2 Creating a Dockerfile for Node.js**
```Dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "app.js"]
```
- Best practices:
  - Use `.dockerignore` to exclude `node_modules`, `.env`, etc.
  - Prefer `npm ci` over `npm install` in production
  - Use multi-stage builds for smaller images (optional)
  - Run as non-root user (security)

#### **2.3 Building & Running Containers**
- Build: `docker build -t my-node-app .`
- Run: `docker run -p 3000:3000 my-node-app`
- Tag & push to registry: `docker tag`, `docker push` (Docker Hub, AWS ECR)

#### **2.4 Docker Compose**
- Define services in `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - mongo
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```
- Start: `docker-compose up`
- Use in dev and production-like environments

---

### **3. PM2 (Process Management)**

#### **3.1 Why Use a Process Manager?**
- Node.js apps crash? PM2 keeps them alive
- Auto-restart on failure
- Cluster mode for CPU utilization
- Logging, monitoring, zero-downtime reloads

#### **3.2 PM2 Basics**
- Install: `npm install -g pm2`
- Start app: `pm2 start app.js`
- Monitor: `pm2 monit` or `pm2 list`
- Logs: `pm2 logs`, `pm2 flush`
- Stop: `pm2 stop app`, `pm2 delete app`

#### **3.3 Advanced PM2 Features**
- **Cluster Mode**: Use all CPU cores
  ```bash
  pm2 start app.js -i max  # max = number of CPU cores
  ```
- **Zero Downtime Reloads**:
  ```bash
  pm2 reload app
  ```
- **Startup Script**: Keep PM2 running after server reboot
  ```bash
  pm2 startup
  pm2 save
  ```
- **Ecosystem File** (`ecosystem.config.js`):
  ```js
  module.exports = {
    apps: [
      {
        name: 'api',
        script: 'app.js',
        instances: 'max',
        exec_mode: 'cluster',
        env: { NODE_ENV: 'development' },
        env_production: { NODE_ENV: 'production' }
      }
    ]
  };
  ```
- Use: `pm2 start ecosystem.config.js --env production`

---

### **4. AWS / Heroku / Vercel Deployment**

#### **4.1 Heroku (Beginner-Friendly)**
- Git-based deployment: `git push heroku main`
- Free tier (sleeps after inactivity)
- Add-ons: MongoDB Atlas, Redis, Papertrail
- Environment variables: `heroku config:set KEY=value`
- Logs: `heroku logs --tail`

#### **4.2 Vercel (Best for Frontend, Limited Backend)**
- Primarily for frontend (Next.js), but supports **Serverless Functions**
- Deploy Node.js API routes as serverless functions
- Great for lightweight APIs, not long-running services
- `vercel.json` for routing and build settings

#### **4.3 AWS (Production-Grade)**
- **EC2 (Elastic Compute Cloud)**
  - Launch virtual server (Linux/Ubuntu)
  - SSH into instance: `ssh -i key.pem ubuntu@public-ip`
  - Install Node.js, PM2, Nginx, MongoDB
  - Run app with PM2
- **Elastic Beanstalk (PaaS)**
  - Deploy Node.js app via CLI or console
  - Auto-scaling, load balancing, monitoring
  - Easier than raw EC2
- **RDS** (Relational DB Service): Managed PostgreSQL/MySQL
- **S3**: Static assets
- **CloudFront**: CDN
- IAM, Security Groups, VPC (basic awareness)

---

### **5. GitHub Actions / CI-CD Pipelines**

#### **5.1 Automating CI/CD with GitHub Actions**
- Define workflows in `.github/workflows/deploy.yml`
- Triggers: `push`, `pull_request`

#### **5.2 Sample Workflow (Node.js + Docker + AWS)**
```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - run: npm ci
      - run: npm test

      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USER }}
          password: ${{ secrets.DOCKER_PASS }}

      - name: Push to Docker Hub
        run: |
          docker tag myapp:${{ github.sha }} ${{ secrets.DOCKER_USER }}/myapp:latest
          docker push ${{ secrets.DOCKER_USER }}/myapp:latest

      - name: Deploy to AWS (via SSH or AWS CLI)
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.AWS_HOST }}
          username: ubuntu
          key: ${{ secrets.AWS_SSH_KEY }}
          script: |
            cd /home/ubuntu/myapp
            docker pull ${{ secrets.DOCKER_USER }}/myapp:latest
            docker stop myapp || true
            docker rm myapp || true
            docker run -d -p 3000:3000 --name myapp ${{ secrets.DOCKER_USER }}/myapp:latest
```

#### **5.3 Key CI/CD Concepts**
- **Linting**: `npm run lint`
- **Testing**: Run unit & integration tests
- **Build**: Compile, bundle, Dockerize
- **Deploy**: Push to staging/production
- **Notifications**: Slack, email on failure
- **Secrets Management**: Never hardcode API keys

---

### **6. Performance Optimization**

#### **6.1 Load Balancing (Nginx)**
- What is Nginx? High-performance web server & reverse proxy
- Use cases:
  - Serve static files
  - Reverse proxy for Node.js apps
  - Load balancing across multiple Node instances
  - SSL termination

##### **Nginx as Reverse Proxy**
```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

##### **Load Balancing with Nginx**
```nginx
upstream node_app {
  least_conn;
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
  server 127.0.0.1:3002;
}

server {
  location / {
    proxy_pass http://node_app;
  }
}
```
- Load balancing methods: `round-robin`, `least_conn`, `ip_hash`

#### **6.2 Clustering (Node.js Cluster Module)**
- Node.js is single-threaded → underutilizes multi-core CPUs
- **Cluster Module**: Fork multiple child processes (workers)
- Master process distributes connections

##### **Basic Cluster Setup**
```js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart
  });
} else {
  // Workers share the same port
  require('./app.js');
}
```
- PM2 does this automatically with `-i max`

#### **6.3 Profiling & Memory Leaks**

##### **Memory Leaks in Node.js**
- Common causes:
  - Global variables
  - Event listeners not removed
  - Closures holding references
  - Caching without TTL
- Symptoms: Increasing memory usage, crashes

##### **Tools for Detection**
- **Node.js Inspector + Chrome DevTools**
  - Take heap snapshots
  - Compare over time to find leaks
- **Clinic.js** (by NearForm)
  - `clinic doctor`, `clinic bubbleprof`
  - Visualize performance issues
- **0x** – Flame graphs for CPU profiling
- **process.memoryUsage()** – Monitor RSS, heap

##### **Garbage Collection (GC) Basics**
- V8’s generational GC: Young vs Old space
- Force GC (for testing): `node --expose-gc`
- Monitor GC events with `--trace-gc`

##### **Best Practices**
- Avoid global state
- Clean up event listeners
- Use weak maps for caches
- Monitor memory in production (e.g., AWS CloudWatch)

---

### ✅ **Best Practices & Production Checklist**

| Category | Checklist |
|--------|-----------|
| **Security** | Use HTTPS, Helmet, rate limiting, sanitize inputs |
| **Logging** | Structured logs, log levels, central aggregation |
| **Monitoring** | Uptime (Pingdom), errors (Sentry), performance (New Relic) |
| **Backups** | DB backups (MongoDB Atlas, RDS snapshots) |
| **Disaster Recovery** | Replicas, failover, rollback strategy |
| **Scalability** | Horizontal scaling (more instances), load balancer |
| **Observability** | Logs, Metrics, Traces (OpenTelemetry) |

---

### 🧪 **Hands-On Projects (Phase 4 Capstone)**

1. **Deploy Your Fullstack App**
   - Backend: Express + MongoDB + Redis
   - Frontend: React (optional)
   - Deploy via Docker on AWS EC2 with Nginx

2. **CI/CD Pipeline**
   - GitHub repo with tests
   - Auto-deploy to Heroku or AWS on `main` push
   - Run linting, tests, and build

3. **Clustered Node App**
   - Use Cluster Module or PM2 to run 4 instances
   - Load test with `autocannon` or `k6`
   - Compare single vs multi-core performance

4. **Memory Leak Simulation & Fix**
   - Intentionally create a leak (e.g., global array)
   - Profile with Chrome DevTools
   - Fix and verify

---

### 🚀 You’re Now Production-Ready!

By the end of **Phase 4**, you’ll be able to:
- **Containerize** apps with Docker
- **Deploy** to cloud platforms (AWS, Heroku)
- **Automate** testing and deployment with CI/CD
- **Scale** apps using clustering and load balancing
- **Monitor** and **optimize** performance
