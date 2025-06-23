import { useTodos } from "@/api/api";
import TaskCard from "./task";

import { Task } from "@/types/types";


export default function TaskList() {
  const { todos } = useTodos();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}