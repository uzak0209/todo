package main

import (
	"routes"

	"github.com/gin-gonic/gin"
)

func main() {
	InitDB() // DB接続とマイグレーション

	r := gin.Default()
	routes.RegisterTodoRoutes(r)

	r.Run(":8080")
}
