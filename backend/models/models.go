package models

import (
	"encoding/json"
	"fmt"
	"time"
)

type Priority int
type Status int

const (
	HIGH Priority = iota
	MEDIUM
	LOW
)

const (
	TODO Status = iota
	IN_PROGRESS
	DONE
)

type Todo struct {
	ID        string     `json:"id" gorm:"primaryKey"`
	Title     string     `json:"title"`
	Deadline  *time.Time `json:"deadline"`
	CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime"`
	Priority  Priority   `json:"priority"`
	Delitedat *time.Time `json:"delited_at,omitempty" gorm:"default:null"`
	Status    Status     `json:"status"`
	Userid    string     `json:"user_id" gorm:"not null"`
}

func (s *Status) UnmarshalJSON(data []byte) error {
	var value int
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	switch value {
	case 0, 1, 2:
		*s = Status(value)
		return nil
	default:
		return fmt.Errorf("invalid status value: %d", value)
	}
}
func (p *Priority) UnmarshalJSON(data []byte) error {
	var value int
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	switch value {
	case 0, 1, 2:
		*p = Priority(value)
		return nil
	default:
		return fmt.Errorf("invalid priority value: %d", value)
	}
}
