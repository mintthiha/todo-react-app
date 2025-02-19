"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ToDoItem } from "@/components/ToDoItem";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import ToDoTabs from "./ToDoTabs";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  note?: string;
}

interface TodoListProps {
  storageKey: string;
  title: string;
}

export default function TodoList({ storageKey, title }: TodoListProps) {
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useLocalStorage<Task[]>(storageKey, []);
  const [filter, setFilter] = useState("all");
  const [showInput, setShowInput] = useState(false);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: crypto.randomUUID(), text: task, completed: false, note: note }]);
      setTask("");
      setNote("");
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
    <div className="flex flex-col items-center justify-center pt-20 pb-20 pl-4 pr-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        
        <ToDoTabs setFilter={setFilter}></ToDoTabs>

        <div className="space-y-2">
          {filteredTasks.map((task) => (
              <ToDoItem key={task.id} task={task} onDelete={() => deleteTodo(task.id)} onComplete={() => completeToDO(task.id)}/>
            ))}
        </div>

        <div
          className={cn(
            "relative transition-all rounded-md",
            showInput ? "bg-white shadow-lg p-3" : "bg-inherit cursor-pointer opacity-50"
          )}
          onMouseEnter={() => setShowInput(true)}
          onMouseLeave={() => !task && setShowInput(false)}
          onClick={() => setShowInput(true)}
        >
          {showInput ? (
            <div className="space-y-2">
              <Input
                placeholder="Enter task here!"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                autoFocus
              />
              <Input
                placeholder="Optional: Add a note!"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
            </div>
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
