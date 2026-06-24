# Link Pulse 

A high performance Link analytics and shortener service.

## Project Structure

```
linkpulse/
├── src/
│   ├── config/         # DB connections, env vars
│   ├── controllers/    # Request handlers
│   ├── models/         # DB schemas (MySQL & Mongo)
│   ├── services/       # Business logic (separate from controllers)
│   ├── middleware/     # Auth, Rate limiting, Validation
│   ├── routes/         # API endpoints
│   ├── utils/          # Helpers (ID generation, validation)
│   └── app.ts          # Express app setup
├── .env
├── package.json
└── tsconfig.json
```

## Step 1: Initialization and Dependencies

Let's setup the project with modern Node.js standards.

Initialize a node project

```
npm init -y
```

Install Dependencies:

```
npm install express mysql2 mongoose ioredis dotenv cors helmet morgan uuid bcryptjs jsonwebtoken zod
```

Install Dev Dependencies

```
npm install --save-dev typescript @types/node @types/express @types/mongoose @types/cors @types/morgan @types/bcryptjs @types/jsonwebtoken ts-node nodemon
```

Initialize Typescript

```
npx tsc --init
```

and update tsconfig.json to enable ES module and strict mode:

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

Update Package.json and add scripts:

```
"scripts": {
  "dev": "nodemon --exec ts-node src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js"
}
```

## 2. Environment Setup

Create a new `.env` file. You will need local instance of MongoDB, MySQL, Redis (running in docker)

```env
PORT=3000
NODE_ENV=development

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=linkpulse_meta

# MongoDB
MONGO_URI=mongodb://localhost:27017/linkpulse_analytics

# Redis
REDIS_URL=redis://localhost:6379

# JWT Secret
JWT_SECRET=supersecretkey_change_this_in_production
```

## Database Connections