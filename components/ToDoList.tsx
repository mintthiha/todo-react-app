"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToDoItem } from "@/components/ToDoItem";
import { Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useLocalStorage<Task[]>("todos", []);
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    // Assign Current time as date, need to change later
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTodo = (index: number) => {
    // Removes task with associated index
    setTasks(tasks.filter((oldTask, i) => i !== index));
  };

  const completeToDO = (index: number) => {
    setTasks(
      tasks.map((task) => (task.id === index ? { ...task, completed: !task.completed } : task))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "complete") return t.completed;
    if (filter === "incomplete") return !t.completed;
    return true;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Title</h1>
        
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="flex justify-center">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
            <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Input
            placeholder="Enter task here!"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <div className="space-y-2">
          {filteredTasks.map((task) => (
              <ToDoItem key={task.id} task={task} onDelete={() => deleteTodo(task.id)} onComplete={() => completeToDO(task.id)}/>
            ))}
        </div>
      </Card>
    </div>
  );
}
