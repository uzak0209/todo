package routes

import (
	"backend/db"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterTodoRoutes(r *gin.Engine) {
	r.GET("/todos", getTodos)
	r.POST("/todos", createTodo)
	r.PATCH("/todos/:id", updateTodo)
	r.DELETE("/todos/:id", deleteTodo)
}

func getTodos(c *gin.Context) {
	var todos []models.Todo
	db.DB.Find(&todos)
	c.JSON(http.StatusOK, todos)
}

func createTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Create(&todo)
	c.JSON(http.StatusOK, todo)
}

func updateTodo(c *gin.Context) {
	id := c.Param("id")
	var body models.Todo
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ID を明示的に上書きして、既存レコードの更新であることを明確にする
	body.ID = id

	if err := db.DB.Save(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update"})
		return
	}

	c.JSON(http.StatusOK, body)
}

func deleteTodo(c *gin.Context) {
	id := c.Param("id")
	db.DB.Delete(&models.Todo{}, id)
	c.JSON(http.StatusOK, gin.H{"id": id})
}
