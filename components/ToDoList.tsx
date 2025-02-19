"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ToDoTabs from "./ToDoTabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import DisplayToDos from "./DisplayToDos";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: crypto.randomUUID(), text: task, completed: false, note: note }]);

      toast.success(`Task "${task}" added successfully!`, {
        position: "bottom-right",
      });

      setTask("");
      setNote("");
      setIsDialogOpen(false);
    }
  };   

  const deleteTodo = (id: string) => {
    // Find deletedTask to print in Toast
    const deletedTask = tasks.find((task) => task.id === id);
    // Removes task with associated index
    setTasks(tasks.filter((task) => task.id !== id));

    if (deletedTask) {
      toast.warning(`Task "${deletedTask.text}" deleted!`, {
        position: "bottom-right",
      });
    }
  };

  const completeToDo = (index: string) => {
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
    <Card className="w-full h-[400px] flex flex-col overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <ToDoTabs setFilter={setFilter} />
      </div>

      <DisplayToDos filteredTasks={filteredTasks} deleteTodo={deleteTodo} completeToDO={completeToDo}></DisplayToDos>

      <div className="p-4 flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add a task</Button>
          </DialogTrigger>
          <DialogContent className="p-6">
            <DialogHeader>
              <DialogTitle>Add A New Task</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input placeholder="Task Name" value={task} onChange={(e) => setTask(e.target.value)} autoFocus />
              <Input placeholder="Optional: Add a note" value={note} onChange={(e) => setNote(e.target.value)} />
              <Button onClick={addTodo} className="w-full">Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
