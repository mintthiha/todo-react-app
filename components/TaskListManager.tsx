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
  const [taskOrder, setTaskOrder] = useLocalStorage<string[]>("taskOrder", []);

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
    if (!containerRef.current || swapyRef.current) return;
  
    swapyRef.current = createSwapy(containerRef.current, {
      animation: "dynamic",
      swapMode: "drop",
      autoScrollOnDrag: true,
      dragAxis: "both"
    });
  
    if (taskOrder.length > 0) {
      const orderedTasks = taskOrder
        .map((id) => taskLists.find((task) => task.id === id))
        .filter(Boolean) as { id: string; title: string }[];
  
      setTaskLists(orderedTasks);
    }
  
    return () => {
      swapyRef.current?.destroy();
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (!swapyRef.current) return;
  
    swapyRef.current.onSwapEnd((event) => {
      const newOrder = event.slotItemMap.asArray.map(({ item }) => item);
      console.log("New Order of Task IDs:", newOrder);
      setTaskOrder(newOrder);
    });
  
    swapyRef.current.update();
  }, [taskLists, setTaskOrder]);  

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