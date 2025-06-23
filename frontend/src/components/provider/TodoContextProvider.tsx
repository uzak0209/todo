// ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "@/types/types";
import { useEffect } from "react";
  const TasksContext = createContext<
    | { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }
    | undefined
  >(undefined);
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

const [tasks, setTasks] = useState<Task[]>([]);

