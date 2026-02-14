package logger

import (
	"fmt"
	"log"
	"os"
)

// Logger provides structured logging
type Logger struct {
	*log.Logger
}

// New creates a new logger
func New() *Logger {
	return &Logger{
		Logger: log.New(os.Stdout, "", log.LstdFlags),
	}
}

// Info logs an info message
func (l *Logger) Info(format string, v ...interface{}) {
	l.Printf("[INFO] "+format, v...)
}

// Error logs an error message
func (l *Logger) Error(format string, v ...interface{}) {
	l.Printf("[ERROR] "+format, v...)
}

// Debug logs a debug message
func (l *Logger) Debug(format string, v ...interface{}) {
	l.Printf("[DEBUG] "+format, v...)
}

// Warn logs a warning message
func (l *Logger) Warn(format string, v ...interface{}) {
	l.Printf("[WARN] "+format, v...)
}

// Fatal logs a fatal error and exits
func (l *Logger) Fatal(format string, v ...interface{}) {
	l.Printf("[FATAL] "+format, v...)
	os.Exit(1)
}

// Default logger instance
var Default = New()

// Package-level convenience functions
func Info(format string, v ...interface{}) {
	Default.Info(format, v...)
}

func Error(format string, v ...interface{}) {
	Default.Error(format, v...)
}

func Debug(format string, v ...interface{}) {
	Default.Debug(format, v...)
}

func Warn(format string, v ...interface{}) {
	Default.Warn(format, v...)
}

func Fatal(format string, v ...interface{}) {
	Default.Fatal(format, v...)
}

func Println(v ...interface{}) {
	fmt.Println(v...)
}
