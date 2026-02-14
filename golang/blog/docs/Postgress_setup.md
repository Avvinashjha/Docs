# Postgres with docker

- Run postgres via docker
- connect Go -> Postgres
- Use pgx
- Replace in-memory repo with DB repo
- Keep architecture unchanged

## Add Docker postgres

at Project root, create docker-compose.yml

```yml
version: "3.9"

services:
  postgres:
    image: postgres:16
    container_name: go_blog_postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: bloguser
      POSTGRES_PASSWORD: blogpass
      POSTGRES_DB: goblog
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Why Docker?

- Consistent DB version
- Easy to reset
- No Local install headaches
- Matches real production setup

Run it:

```bash
docker compose up -d
```

Check the process

```bash
docker ps
```

## Database concepts

Before coding, understand this

- Go does not Open a new DB connection per request
- Go creates a connection pool, reuse connections, Manage concurrency automatically and that is why we pass
  
  ```go
    *sql.DB // or *pgxpool.Pool
  ```

- Shared long lived and pointer based

## Add pgx dependency

```bash
go get github.com/jackc/pgx/v5
```

- We will use pgx native pool, not ORM

## Database connection

