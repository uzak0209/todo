import { useTodos } from "@/api/api";
import TaskCard from "./task";

import { Task } from "@/types/types";
import React from "react";

interface TaskListProps {}

const TaskList: React.FC<TaskListProps> = React.memo(() => {
  const { todos } = useTodos();
  return (
    <div className="grid gap-4 w-full">
      {todos.map((task: Task) => (
        <div className="w-full" key={task.id}>
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
});
export default TaskList;
