package store

import (
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/Avvinashjha/todo/domain"
)

type FileStore struct {
	Path string
}

type fileData struct {
	Todos []domain.Todo `json:"todos"`
}

func (fs FileStore) Load() ([]domain.Todo, error) {
	// File does not exits -> return empty list
	if _, err := os.Stat(fs.Path); os.IsNotExist(err) {
		return []domain.Todo{}, nil
	}

	data, err := os.ReadFile(fs.Path)

	if err != nil {
		return nil, err
	}

	var fd fileData

	if err := json.Unmarshal(data, &fd); err != nil {
		return nil, err
	}

	return fd.Todos, nil
}

func (fs FileStore) Save(todos []domain.Todo) error {
	dir := filepath.Dir(fs.Path)

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	fd := fileData{Todos: todos}

	data, err := json.MarshalIndent(fd, "", " ")

	if err != nil {
		return err
	}

	tmp := fs.Path + ".tmp"

	if err := os.WriteFile(tmp, data, 0644); err != nil {
		return err
	}
	return os.Rename(tmp, fs.Path)
}
