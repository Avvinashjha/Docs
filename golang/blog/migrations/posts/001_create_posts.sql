-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    article_id INTEGER REFERENCES articles(id) ON DELETE SET NULL,
    quiz_id INTEGER, -- Will reference quizzes when that module is added
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_posts_article_id ON posts(article_id);
CREATE INDEX idx_posts_quiz_id ON posts(quiz_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
