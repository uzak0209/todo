package routes

import (
	"backend/db"
	"backend/models"
	"fmt"
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
	fmt.Println("Retrieved todos:", todos) // Debugging output
	c.JSON(http.StatusOK, todos)
}

func createTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// fmt.Printf prints struct details for debugging
	fmt.Printf("Creating todo: %+v\n", todo)
	db.DB.Create(&todo)
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
	if err := db.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}
	db.DB.Save(&todo)
	c.JSON(http.StatusOK, todo)
}

func deleteTodo(c *gin.Context) {
	id := c.Param("id")
	db.DB.Delete(&models.Todo{}, id)
	c.Status(http.StatusNoContent)
}
