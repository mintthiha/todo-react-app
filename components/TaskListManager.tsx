"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/ToDoList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ThemeToggle from "@/components/ThemeToggle";

export default function TaskListManager() {
  const [taskLists, setTaskLists] = useLocalStorage<{ id: string; title: string }[]>(
    "taskLists",
    []
  );
  const [newListTitle, setNewListTitle] = useState("");

  const addTaskList = () => {
    if (newListTitle.trim() !== "") {
      const newList = { id: crypto.randomUUID(), title: newListTitle };
      setTaskLists([...taskLists, newList]);
      setNewListTitle("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <ThemeToggle/>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter new list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTaskList()}
        />
        <Button onClick={addTaskList}>Add List</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {taskLists.map((list) => (
          <TaskList
            key={list.id}
            storageKey={`todo-list-${list.id}`}
            title={list.title}
          />
        ))}
      </div>
    </div>
  );
}