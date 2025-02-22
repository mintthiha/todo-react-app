"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

interface TaskListMangerSideBar {
  newListTitle: string;
  setNewListTitle: (title: string) => void;
  addTaskList: () => void;
}

// Displays the side bar for the task list manager
export default function TaskListMangerSideBar({ newListTitle, setNewListTitle, addTaskList }: TaskListMangerSideBar) {
  return (
    <div className="w-full lg:w-1/5 p-4 flex flex-col justify-between border-r border-gray-300 dark:border-gray-700">
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
      <ThemeToggle />
    </div>
  );
}
