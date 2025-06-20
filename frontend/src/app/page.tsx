"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // APIからTodo一覧取得
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8080/todos");
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!input.trim()) return;
    const res = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input.trim(), completed: false }),
    });
    if (res.ok) {
      setInput("");
      fetchTodos();
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  // 完了切り替えはAPI経由でサーバー反映
  const handleToggle = async (id: number, completed: boolean) => {
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">TODOアプリ</h1>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd}>追加</Button>
      </div>
      {loading ? (
        <div className="text-center">読み込み中...</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
              <Checkbox checked={todo.completed} onCheckedChange={() => handleToggle(todo.id, todo.completed)} />
              <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(todo.id)}>
                削除
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
