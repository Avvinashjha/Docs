# Go Blog - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Go 1.25+ installed
- PostgreSQL database running
- Git (optional)

### Installation Steps

1. **Clone or navigate to the project**
   ```bash
   cd /path/to/go-blog
   ```

2. **Set up environment variables (optional)**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Install dependencies**
   ```bash
   go mod download
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL using Docker Compose
   docker-compose up -d
   
   # Run migrations (create tables)
   psql -h localhost -p 5433 -U bloguser -d goblog -f migrations/001_create_articles.sql
   psql -h localhost -p 5433 -U bloguser -d goblog -f migrations/002_create_users.sql
   ```

5. **Create an admin user**
   ```bash
   # Generate a password hash
   go run cmd/hash/main.go yourpassword
   
   # Insert user into database
   psql -h localhost -p 5433 -U bloguser -d goblog
   INSERT INTO users (username, password_hash) VALUES ('admin', 'your-hashed-password');
   ```

6. **Run the server**
   ```bash
   go run cmd/server/main.go
   ```

7. **Access the application**
   - Blog: http://localhost:5050
   - Admin Login: http://localhost:5050/login

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Login**: `/login` - Authenticate and receive JWT token stored in HTTP-only cookie
- **Logout**: `/logout` - Clear JWT token
- **Protected Routes**: All `/admin/*` routes require valid JWT token

### JWT Configuration

Set the JWT secret in your environment:
```bash
export JWT_SECRET="your-secure-secret-key"
```

**Important**: Use a strong, random secret in production!

## 📁 Project Structure

```
go-blog/
├── cmd/
│   ├── server/          # Main application entry point
│   └── hash/            # Password hashing utility
├── internal/
│   ├── config/          # Configuration management
│   ├── handler/         # HTTP handlers
│   │   ├── article.go   # Article routes
│   │   ├── admin.go     # Admin panel routes
│   │   ├── auth.go      # Authentication routes
│   │   └── template.go  # Template management
│   ├── middleware/      # HTTP middleware
│   │   └── auth.go      # JWT authentication middleware
│   ├── model/           # Domain models
│   │   ├── article.go
│   │   └── user.go
│   ├── repository/      # Database layer
│   │   ├── article.go
│   │   ├── article_postgres.go
│   │   ├── user_postgres.go
│   │   └── postgres.go
│   └── service/         # Business logic
│       ├── article.go
│       ├── auth_service.go
│       └── jwt_service.go
├── web/
│   ├── static/
│   │   └── css/
│   │       └── style.css   # Application styles
│   └── templates/          # HTML templates
│       ├── layout.html
│       ├── home.html
│       ├── article.html
│       ├── login.html
│       ├── admin_dashboard.html
│       ├── admin_add.html
│       └── admin_edit.html
├── migrations/             # Database migrations
├── go.mod
└── README.md
```

## 🎨 Features

### Frontend
- ✅ Modern, responsive UI with custom CSS
- ✅ HTMX for dynamic content loading
- ✅ Clean, accessible design
- ✅ Mobile-friendly layout

### Backend
- ✅ JWT authentication with HTTP-only cookies
- ✅ Middleware-based route protection
- ✅ Environment-based configuration
- ✅ PostgreSQL database with connection pooling
- ✅ Clean architecture (handlers → services → repositories)

### Security
- ✅ JWT tokens for stateless authentication
- ✅ HTTP-only cookies prevent XSS attacks
- ✅ Bcrypt password hashing
- ✅ CSRF protection ready (via HTMX)
- ✅ SQL injection prevention (parameterized queries)

## 🛠️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://bloguser:blogpass@localhost:5433/goblog?sslmode=disable` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-change-in-production` |
| `PORT` | Server port | `5050` |

### Database Schema

**Articles Table:**
```sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL
);
```

**Users Table:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
```

## 📝 API Routes

### Public Routes
- `GET /` - List all articles
- `GET /article?id={id}` - View single article
- `GET /login` - Login form
- `POST /login` - Authenticate user

### Protected Routes (Requires JWT)
- `GET /admin` - Admin dashboard
- `GET /admin/add` - New article form
- `POST /admin/add` - Create article
- `GET /admin/edit?id={id}` - Edit article form
- `POST /admin/edit` - Update article
- `DELETE /admin/delete?id={id}` - Delete article
- `GET /logout` - Logout

## 🧪 Development

### Running Tests
```bash
go test ./...
```

### Building for Production
```bash
go build -o blog-server cmd/server/main.go
./blog-server
```

### Docker Deployment
```bash
docker-compose up -d
```

## 🔒 Security Best Practices

1. **Always use HTTPS in production**
   - Set `Secure: true` in cookie configuration
   
2. **Use strong JWT secrets**
   - Generate with: `openssl rand -base64 32`
   
3. **Keep dependencies updated**
   ```bash
   go get -u ./...
   go mod tidy
   ```

4. **Enable CORS properly if needed**
5. **Implement rate limiting for login attempts**
6. **Regular security audits**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or production!

## 🆘 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# Check connection
psql -h localhost -p 5433 -U bloguser -d goblog
```

### JWT Token Issues
- Clear browser cookies
- Check JWT_SECRET environment variable
- Verify token hasn't expired (default: 24 hours)

### Template Not Found Errors
- Ensure all templates are in `web/templates/`
- Check file names match exactly in `template.go`
- Restart server after template changes

## 📚 Resources

- [Go Documentation](https://golang.org/doc/)
- [HTMX Documentation](https://htmx.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
