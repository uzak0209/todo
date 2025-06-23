"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskList from "@/components/original/TaskList";
import { useTodos,TodosProvider} from "@/api/api"; // Adjust the import path as necessary
export default function Home() {
  return (
    <div className="max-w-md mx-auto py-12">
      <TodosProvider>
        <SubHome />
      </TodosProvider>
    </div>
  );
}
const SubHome=()=> {
  const [input, setInput] = useState("");
  const { addTodo ,loading} = useTodos();
  const handleAdd = async () => {
    addTodo(input);
  };
  return (
    <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold mb-6 text-center">TODOアプリ</h1>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="新しいタスクを入力..."
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleAdd()
            }
          />
          <Button onClick={handleAdd}>追加</Button>
        </div>
        {loading ? (
          <div className="text-center">読み込み中...</div>
        ) : (
          <ul className="space-y-2">
            <TaskList />
          </ul>
        )}
    </div>
  );
}
