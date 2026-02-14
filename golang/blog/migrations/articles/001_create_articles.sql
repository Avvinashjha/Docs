-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL
);

-- Create index for better query performance
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
