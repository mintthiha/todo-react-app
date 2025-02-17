"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">My Todo App</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Enter task here!"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              {t}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
