// contexts/TodosContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Priority, Status, Task } from "@/types/types";

const API_BASE_URL = "http://localhost:8080";

interface TodosContextType {
  todos: Task[];
  loading: boolean;
  addTodo: (title: string, description: string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  toggleTodo: (task: Task) => Promise<boolean>;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
        useEffect(() => {
          console.log("現在のtodos:", todos);
        }, [todos]); // todosが変わるたびにログ出力
  const initializeTodos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/todos`);
      if (res.ok) {
        console.log("Fetch successful:", res.body);
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

  const addTodo = useCallback(async (title: string, description: string) => {
    if (!title.trim()) return false;
    const newTask: Task = {
      id: Date.now().toString(), // Temporary ID, will be replaced by backend
      title,
      description: description,
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
        const addedTask: Task = await res.json();
        setTodos((prevTodos) => [...prevTodos, addedTask]);
      }
    } catch (e) {
      console.error("Add error:", e);
    }
    return false;
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const deleted: Task = await res.json();
        console.log("Deleted task:", deleted);
        setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id));
        return true;
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
    return false;
  }, []);

  const toggleTodo = useCallback(async (task: Task) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todos/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        const updatedTask: Task = await res.json();
        console.log("Updated task:", updatedTask);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === updatedTask.id ? updatedTask : todo))
        );
        return true;
      }
    } catch (e) {
      console.error("Toggle error:", e);
    }
    return false;
  }, []);

  useEffect(() => {
    initializeTodos();
  }, [initializeTodos]);

  return (
    <TodosContext.Provider
      value={{ todos, loading, addTodo, deleteTodo, toggleTodo }}
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
