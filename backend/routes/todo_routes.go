package routes

import (
	// DB変数のあるパッケージ
	"backend/models"
	"main"
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
	main.DB.Find(&todos)
	c.JSON(http.StatusOK, todos)
}

func createTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	main.DB.Create(&todo)
	c.JSON(http.StatusOK, todo)
}

func updateTodo(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Completed bool `json:"completed"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var todo models.Todo
	if err := main.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}
	todo.Completed = body.Completed
	main.DB.Save(&todo)
	c.JSON(http.StatusOK, todo)
}

func deleteTodo(c *gin.Context) {
	id := c.Param("id")
	main.DB.Delete(&models.Todo{}, id)
	c.Status(http.StatusNoContent)
}
