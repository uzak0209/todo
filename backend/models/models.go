package models

import "time"

type Todo struct {
    ID        uint      `json:"id" gorm:"primaryKey"`
    Title     string    `json:"title"`
    Completed bool      `json:"completed"`
    Deadline  time.Time `json:"deadline"`
}