"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { customToast } from "../ui/customToast";

interface ToDoAddTaskProps {
  onAdd: (task: string, note: string) => void;
}

export default function TodoAddTask({ onAdd }: ToDoAddTaskProps) {
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAdd = () => {
    if (task.trim() !== "") {
      onAdd(task, note);
      setTask("");
      setNote("");
      setIsDialogOpen(false);
    } else {
      customToast({ message: "The task name can't be empty!", type: "warning" });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add a task</Button>
      </DialogTrigger>
      <DialogContent className="p-6 w-full sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add A New Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Task Name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()} 
            autoFocus
          />
          <Input
            placeholder="Optional: Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button onClick={handleAdd} className="w-full">Add Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
