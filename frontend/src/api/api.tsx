// contexts/TodosContext.tsx
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Priority, Status, Task } from "@/types/types";

const API_BASE_URL = "http://localhost:8080";

interface TodosContextType {
  todos: Task[];
  loading: boolean;
  addTodo: (title: string) => Promise<boolean>;
  deleteTodo: (id: number) => Promise<boolean>;
  toggleTodo: (id: number, completed: boolean) => Promise<boolean>;
  refetch: () => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/todos`);
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      } else {
        console.error("Fetch failed:", res.statusText);
      }
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const addTodo = useCallback(async (title: string) => {
    if (!title.trim()) return false;
    const newTask:Task = {
        id: Date.now().toString(), // Temporary ID, will be replaced by backend
        title,
        description: "",
        status: Status.TODO,
        createdAt: new Date(),
        deletedAt: null,
        deadline: null,
        priority: Priority.MEDIUM, // Default priority, can be changed later
        userId: "1", // Temporary user ID, replace with actual user ID logic
    };
    try {
      const res = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (res.ok) {
        await fetchTodos();
        return true;
      }
    } catch (e) {
      console.error("Add error:", e);
    }
    return false;
  }, [fetchTodos]);

  const deleteTodo = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchTodos();
        return true;
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
    return false;
  }, [fetchTodos]);

  const toggleTodo = useCallback(async (id: number, completed: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (res.ok) {
        await fetchTodos();
        return true;
      }
    } catch (e) {
      console.error("Toggle error:", e);
    }
    return false;
  }, [fetchTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <TodosContext.Provider
      value={{ todos, loading, addTodo, deleteTodo, toggleTodo, refetch: fetchTodos }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodos must be used within a TodosProvider");
  return context;
};
