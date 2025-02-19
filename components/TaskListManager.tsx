"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/ToDo/ToDoList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "sonner";

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

      toast.success(`Task list "${newListTitle}" added successfully!`, {
        position: "bottom-right",
      });
    } else{
      toast.warning("The task list title can't be empty!", {
        position: "bottom-right",
      });
    }
  };

  const deleteTaskList = (id: string) => {
    const deletedList = taskLists.find((list) => list.id === id);
    setTaskLists(taskLists.filter((list) => list.id !== id));

    if (deletedList) {
      toast.warning(`Deleted list "${deletedList.title}"`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 p-4 flex flex-col justify-between">
        <h1 className="text-3xl font-bold mb-4">Task List Manager</h1>
          <div>
            <Input
            placeholder="Enter new list title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTaskList()}
            />
            <div className="flex justify-center p-4">
              <Button onClick={addTaskList} className="w-[150px]">
                Add List
              </Button>
            </div>
          </div>
          
          <ThemeToggle/>
      </div>

      <div className="w-4/5 bg-secondary p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskLists.map((list) => (
            <div key={list.id} className="relative">
            <TaskList storageKey={`todo-list-${list.id}`} title={list.title} />
            
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => deleteTaskList(list.id)}
            > X
            </Button>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}