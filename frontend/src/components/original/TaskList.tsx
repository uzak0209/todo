import { useTodos } from "@/api/api";
import TaskCard from "./task";

import { Task } from "@/types/types";
import React from "react";
type Props = object;  

const TaskList: React.FC<Props> = () => {
  const { todos ,toggleTodo,deleteTodo} = useTodos();
  return (
    <div className="grid gap-4 w-full">
      {todos.map((task: Task) => (
        <div className="w-full" key={task.id}>
          <TaskCard task={task} deleteTodo={deleteTodo}toggleTodo={toggleTodo}/>
        </div>
      ))}
    </div>
  );
};
export default TaskList;
