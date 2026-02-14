package service

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"
)

// JWTService handles JWT token creation and validation
type JWTService struct {
	secret     []byte
	expiration time.Duration
}

// JWTClaims represents the JWT payload
type JWTClaims struct {
	UserID    int    `json:"user_id"`
	Username  string `json:"username"`
	IssuedAt  int64  `json:"iat"`
	ExpiresAt int64  `json:"exp"`
}

// NewJWTService creates a new JWT service
func NewJWTService(secret string, expiration time.Duration) *JWTService {
	return &JWTService{
		secret:     []byte(secret),
		expiration: expiration,
	}
}

// GenerateToken creates a new JWT token for a user
func (s *JWTService) GenerateToken(userID int, username string) (string, error) {
	now := time.Now()
	claims := JWTClaims{
		UserID:    userID,
		Username:  username,
		IssuedAt:  now.Unix(),
		ExpiresAt: now.Add(s.expiration).Unix(),
	}

	// Create header
	header := map[string]string{
		"alg": "HS256",
		"typ": "JWT",
	}

	headerJSON, err := json.Marshal(header)
	if err != nil {
		return "", err
	}

	claimsJSON, err := json.Marshal(claims)
	if err != nil {
		return "", err
	}

	// Encode header and claims
	headerEncoded := base64.RawURLEncoding.EncodeToString(headerJSON)
	claimsEncoded := base64.RawURLEncoding.EncodeToString(claimsJSON)

	// Create signature
	message := headerEncoded + "." + claimsEncoded
	signature := s.createSignature(message)
	signatureEncoded := base64.RawURLEncoding.EncodeToString(signature)

	// Combine all parts
	token := message + "." + signatureEncoded

	return token, nil
}

// ValidateToken validates a JWT token and returns the claims
func (s *JWTService) ValidateToken(token string) (*JWTClaims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}

	// Verify signature
	message := parts[0] + "." + parts[1]
	signature := s.createSignature(message)
	expectedSignature := base64.RawURLEncoding.EncodeToString(signature)

	if parts[2] != expectedSignature {
		return nil, errors.New("invalid token signature")
	}

	// Decode claims
	claimsJSON, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, errors.New("invalid token claims")
	}

	var claims JWTClaims
	if err := json.Unmarshal(claimsJSON, &claims); err != nil {
		return nil, errors.New("invalid token claims")
	}

	// Check expiration
	if time.Now().Unix() > claims.ExpiresAt {
		return nil, errors.New("token expired")
	}

	return &claims, nil
}

// createSignature creates HMAC-SHA256 signature
func (s *JWTService) createSignature(message string) []byte {
	h := hmac.New(sha256.New, s.secret)
	h.Write([]byte(message))
	return h.Sum(nil)
}

// ExtractUserID is a convenience method to get user ID from token
func (s *JWTService) ExtractUserID(token string) (int, error) {
	claims, err := s.ValidateToken(token)
	if err != nil {
		return 0, err
	}
	return claims.UserID, nil
}

// ExtractUsername is a convenience method to get username from token
func (s *JWTService) ExtractUsername(token string) (string, error) {
	claims, err := s.ValidateToken(token)
	if err != nil {
		return "", err
	}
	return claims.Username, nil
}

// GetTokenFromCookie extracts JWT token from cookie
func GetTokenFromCookie(cookieValue string) (string, error) {
	if cookieValue == "" {
		return "", fmt.Errorf("empty cookie value")
	}
	return cookieValue, nil
}
