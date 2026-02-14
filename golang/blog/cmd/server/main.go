package main

import (
	"fmt"
	"go-blog/internal/common/logger"
	"go-blog/internal/domains/articles"
	"go-blog/internal/platform/templates"
	"go-blog/internal/shared/auth"
	"go-blog/internal/shared/config"
	"go-blog/internal/shared/database"
	"net/http"
)

func main() {
	// Load configuration
	cfg := config.Load()

	logger.Info("🚀 Starting Go Blog Server...")
	logger.Info("📊 Database: %s", cfg.Database.DSN)
	logger.Info("🔒 JWT Expiration: %v", cfg.JWT.Expiration)

	// Initialize database
	db, err := database.NewPostgresPool(cfg.Database.DSN)
	if err != nil {
		logger.Fatal("Failed to connect to database: %v", err)
	}
	defer db.Close()
	logger.Info("✅ Database connected")

	// Initialize template renderer
	templates.Init()
	logger.Info("✅ Templates loaded")

	// Initialize shared modules
	authModule := auth.NewModule(db, cfg)
	logger.Info("✅ Auth module initialized")

	// Initialize domain modules
	articlesModule := articles.NewModule(db)
	logger.Info("✅ Articles module initialized")

	// Setup HTTP router
	mux := http.NewServeMux()

	// Serve static files
	fs := http.FileServer(http.Dir("web/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// Register module routes
	authModule.RegisterRoutes(mux)
	articlesModule.RegisterRoutes(mux, authModule.Middleware())

	// Example: Add posts module when ready
	// postsModule := posts.NewModule(db, articlesModule.GetService())
	// postsModule.RegisterRoutes(mux, authModule.Middleware())

	// Start server
	addr := ":" + cfg.Server.Port
	logger.Info("🌐 Server is running on http://localhost%s", addr)
	logger.Info("📝 Visit http://localhost:5050 to view your blog")
	logger.Info("🔐 Visit http://localhost:5050/login to access admin panel")
	logger.Info("👤 Default credentials: admin / admin123")

	if err := http.ListenAndServe(addr, mux); err != nil {
		logger.Fatal("Failed to start server: %v", err)
	}
}
