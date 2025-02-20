"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/ToDo/ToDoList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { customToast } from "./ui/customToast";
import { createSwapy, Swapy } from 'swapy';
import TaskListMangerSideBar from "./TaskListManagerSideBar";

export default function TaskListManager() {
  const [taskLists, setTaskLists] = useLocalStorage<{ id: string; title: string }[]>(
    "taskLists",
    []
  );
  const [newListTitle, setNewListTitle] = useState("");
  const swapyRef = useRef<Swapy | null>(null)
  const containerRef = useRef<HTMLDivElement>(null);

  const addTaskList = () => {
    if (newListTitle.trim() === "") {
      customToast({ message: "The task list title can't be empty!", type: "warning" });
      return;
    }
  
    if (newListTitle.length > 25) {
      customToast({ message: "Task list title cannot exceed 25 characters!", type: "error" });
      return;
    }
  
    const newList = { id: crypto.randomUUID(), title: newListTitle };
    setTaskLists([...taskLists, newList]);
    setNewListTitle("");
  
    customToast({ message: `Task list "${newListTitle}" added successfully!`, type: "success" });
  };

  const deleteTaskList = (id: string) => {
    const deletedList = taskLists.find((list) => list.id === id);
    setTaskLists(taskLists.filter((list) => list.id !== id));

    if (deletedList) {
      customToast({message: `Deleted list "${deletedList.title}"`, type: "info"})
    }
  };

  useEffect(() => {
    const container = document.querySelector("#swapy-container") as HTMLElement;
    if (container) {
      swapyRef.current = createSwapy(container, {
        animation: 'dynamic',
        swapMode: 'drop',
        autoScrollOnDrag: true,
        dragAxis: 'both'
      })
    }
  }, []);
  
  // Will fix later

  // useEffect(() => {
  //   swapyRef.current?.update();
  //   swapyRef.current?.onSwapEnd((event) => {
  //     console.log(event.slotItemMap.asArray);
  //     const newOrder = event.slotItemMap.asArray.map(({ item }) => {
  //       return taskLists.find((list) => list.id === item);
  //     }).filter(Boolean) as { id: string; title: string }[];
  
  //     setTaskLists(newOrder);
  
  //     console.log("Updated Task Order:", newOrder);
  //   });

  // }, [setTaskLists, taskLists]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <TaskListMangerSideBar newListTitle={newListTitle} setNewListTitle={setNewListTitle} addTaskList={addTaskList} />

      <div className="w-full lg:w-4/5 bg-secondary p-4 overflow-y-auto" id="swapy-container" ref={containerRef}>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskLists.map((list) => (
            <div key={list.id} data-swapy-slot={list.id} className="relative">
              <div data-swapy-item={list.id}>
                <div className="absolute top-2 left-2 cursor-grab text-2xl leading-none text-gray-400" data-swapy-handle> ⋮⋮ </div>
                <TaskList storageKey={`todo-list-${list.id}`} title={list.title} />
                
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => deleteTaskList(list.id)}
                > X
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}