package models

import "time"

type priority int

const (
	High priority = iota
	Medium
	Low
)

type Todo struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	Deadline  time.Time `json:"deadline"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	Priority  priority  `json:"priority"`
}
