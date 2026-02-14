# 🚀 Quick Start Guide

## Get Running in 5 Minutes

### 1. Start Database
```bash
docker-compose up -d
```

### 2. Run Migrations
```bash
# Articles table
psql -h localhost -p 5433 -U bloguser -d goblog -f migrations/001_create_articles.sql

# Users table (includes default admin user)
psql -h localhost -p 5433 -U bloguser -d goblog -f migrations/002_create_users.sql
```

### 3. Set Environment Variables (Optional)
```bash
export JWT_SECRET="change-this-in-production"
export DATABASE_URL="postgres://bloguser:blogpass@localhost:5433/goblog?sslmode=disable"
export PORT="5050"
```

### 4. Start Server
```bash
go run cmd/server/main.go
```

### 5. Access Application
- **Blog Home**: http://localhost:5050
- **Admin Login**: http://localhost:5050/login
  - **Username**: `admin`
  - **Password**: `admin123`

---

## 🎯 What You Get

✅ **JWT Authentication** - Secure, stateless auth
✅ **Modern UI** - Beautiful, responsive design  
✅ **Admin Panel** - Full CRUD for articles
✅ **HTMX** - Dynamic content without page reloads
✅ **PostgreSQL** - Robust database
✅ **Clean Code** - Production-ready architecture

---

## 📝 Common Tasks

### Create New Article
1. Login at `/login`
2. Go to admin dashboard
3. Click "Add New Article"
4. Fill form and submit

### Change Admin Password
```bash
# Generate hash
go run cmd/hash/main.go newpassword

# Update in database
psql -h localhost -p 5433 -U bloguser -d goblog
UPDATE users SET password_hash='<new-hash>' WHERE username='admin';
```

### Change JWT Secret
```bash
# Generate strong secret
openssl rand -base64 32

# Set environment variable
export JWT_SECRET="your-generated-secret"
```

---

## 🐛 Troubleshooting

**Database won't connect?**
```bash
docker ps  # Check if PostgreSQL is running
docker-compose restart
```

**Can't login?**
```bash
# Verify user exists
psql -h localhost -p 5433 -U bloguser -d goblog
SELECT * FROM users;
```

**CSS not loading?**
- Check browser console
- Verify `web/static/css/style.css` exists
- Check server logs for 404 errors

---

## 📚 Learn More

- **Full Setup**: See `SETUP.md`
- **All Changes**: See `IMPROVEMENTS.md`
- **Architecture**: Explore `internal/` folders

---

**Happy Blogging! 🎉**
