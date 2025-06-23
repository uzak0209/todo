import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, AlertCircle, Calendar } from 'lucide-react';
import { Priority,Status,Task } from '@/types/types';
export default function TaskCard(task: Task) {
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case Status.DONE:
        return <Check className="w-4 h-4 text-green-600" />;
      case Status.IN_PROGRESS:
        return <Clock className="w-4 h-4 text-blue-600" />;
      case Status.TODO:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
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
    const [input, setInput] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("low"); // 追加: 優先度の状態管理
  const getStatusBadge = (status:Status) => {
    const statusConfig = {
      [Status.DONE]: { label: '待機中', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
      [Status.IN_PROGRESS]: { label: '進行中', className: 'bg-blue-100 text-blue-800 border-blue-300' },
      [Status.TODO]: { label: '完了', className: 'bg-green-100 text-green-800 border-green-300' }
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {getStatusIcon(status)}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getPriorityBadge = (priority:Priority) => {
    const priorityConfig = {
      high: { label: '高', className: 'bg-red-50 text-red-700 border-red-200' },
      medium: { label: '中', className: 'bg-orange-50 text-orange-700 border-orange-200' },
      low: { label: '低', className: 'bg-gray-50 text-gray-700 border-gray-200' }
    };
    
    const config = priorityConfig[priority];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  return (
        <Card key={task.id} className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {task.title}
              </CardTitle>
              <div className="flex gap-2">
                {getPriorityBadge(task.priority)}
                {getStatusBadge(task.status)}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <CardDescription className="text-gray-600 mb-3">
              {task.description}
            </CardDescription>
            
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              期限: {task.deadline? new Date(task.deadline).toLocaleDateString() : '未設定'}
            </div>
          </CardContent>
        </Card>
  );
}