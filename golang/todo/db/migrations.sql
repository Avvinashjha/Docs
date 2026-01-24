CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    priority INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo_id TEXT NOT NULL,
    name TEXT NOT NULL,
    UNIQUE(todo_id, name),
    FOREIGN KEY(todo_id) REFERENCES todos(id) ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    todo_id TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE
)