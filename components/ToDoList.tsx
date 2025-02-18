"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ToDoItem } from "@/components/ToDoItem";
import { Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";


interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useLocalStorage<Task[]>("todos", []);
  const [filter, setFilter] = useState("all");
  const [showInput, setShowInput] = useState(false);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: crypto.randomUUID(), text: task, completed: false }]);
      setTask("");
      setShowInput(false);
    }
  };

  const deleteTodo = (index: string) => {
    // Removes task with associated index
    setTasks(tasks.filter((task) => task.id !== index));
  };

  const completeToDO = (index: string) => {
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

        <div className="space-y-2">
          {filteredTasks.map((task) => (
              <ToDoItem key={task.id} task={task} onDelete={() => deleteTodo(task.id)} onComplete={() => completeToDO(task.id)}/>
            ))}
        </div>

        <div
          className={cn(
            "relative transition-all rounded-md",
            showInput ? "bg-white shadow-lg" : "bg-inherit cursor-pointer opacity-50"
          )}
          onMouseEnter={() => setShowInput(true)}
          onMouseLeave={() => !task && setShowInput(false)}
          onClick={() => setShowInput(true)}
        >
          {showInput ? (
            <Input
              placeholder="Enter task here!"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              autoFocus
            />
          ) : (
            <div className="relative flex items-center justify-center">
              <p className="relative z-10 px-2 bg-inherit text-gray-500 text-sm">+ Add a task</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
