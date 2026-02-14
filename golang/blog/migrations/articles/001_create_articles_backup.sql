CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    published_at DATE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);