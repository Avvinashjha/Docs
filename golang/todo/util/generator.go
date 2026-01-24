package util

import (
	"fmt"
	"math/rand"
	"time"
)

func GenerateID() string {
	now := time.Now()
	timeStamp := now.Format("20060115111201")
	random := rand.Intn(10000)
	return fmt.Sprintf("%s-%04d", timeStamp, random)
}
