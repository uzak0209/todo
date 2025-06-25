package models

import (
	"time"
)

type Priority string
type Status string

const (
	HIGH   Priority = "high"
	MEDIUM Priority = "midium"
	LOW    Priority = "low"
)

const (
	TODO        Status = "todo"
	IN_PROGRESS Status = "in_progress"
	DONE        Status = "done"
)

type Todo struct {
	ID          string     `json:"id" gorm:"primaryKey"`
	Title       string     `json:"title"`
	Deadline    *time.Time `json:"deadline"`
	CreatedAt   time.Time  `json:"created_at" gorm:"autoCreateTime"`
	Priority    Priority   `json:"priority"`
	Delitedat   *time.Time `json:"delited_at,omitempty" gorm:"default:null"`
	Status      Status     `json:"status"`
	Userid      string     `json:"user_id" gorm:"not null"`
	Description string     `json:"description,omitempty" gorm:"default:null"`
	UpdatedAt   *time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
