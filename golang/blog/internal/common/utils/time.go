package utils

import "time"

// FormatDate formats a time to a human-readable date
func FormatDate(t time.Time) string {
	return t.Format("January 2, 2006")
}

// FormatDateTime formats a time to a human-readable date and time
func FormatDateTime(t time.Time) string {
	return t.Format("January 2, 2006 at 3:04 PM")
}

// ParseDate parses a date string (YYYY-MM-DD)
func ParseDate(s string) (time.Time, error) {
	return time.Parse("2006-01-02", s)
}
