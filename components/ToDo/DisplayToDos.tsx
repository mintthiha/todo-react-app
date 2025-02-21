"use client";

import React, { useEffect, useRef, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import { createSwapy, Swapy } from "swapy";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface DisplayToDosProp {
  filteredTasks: { id: string; text: string; completed: boolean; note?: string }[];
  deleteTodo: (id: string) => void;
  completeToDO: (id: string) => void;
}

const DisplayToDos = ({ filteredTasks, deleteTodo, completeToDO }: DisplayToDosProp) => {
  const swapyRef = useRef<Swapy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [taskOrder, setTaskOrder] = useLocalStorage<string[]>("taskOrderToDo", []);
  const [orderedTasks, setOrderedTasks] = useState(filteredTasks);

  // Initializes swapy and orders when first render.
  useEffect(() => {
    if (!containerRef.current || swapyRef.current) return;

    swapyRef.current = createSwapy(containerRef.current, {
      animation: "dynamic",
      swapMode: "drop",
      autoScrollOnDrag: true,
      dragAxis: "y"
    });

    if (taskOrder.length > 0) {
      const ordered = taskOrder
        .map((id) => filteredTasks.find((task) => task.id === id))
        .filter(Boolean) as typeof filteredTasks;
      setOrderedTasks(ordered);
    }

    return () => {
      swapyRef.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get current order and saves to localStorage.
  useEffect(() => {
    if (!swapyRef.current) return;

    swapyRef.current.onSwapEnd((event) => {
      const newOrder = event.slotItemMap.asArray.map(({ item }) => item);
      console.log("New Order of Task Lists:", newOrder);

      setTaskOrder(newOrder);
    });

    swapyRef.current.update();
  }, [filteredTasks, setTaskOrder]);

  // Take order from localStorage and orders the tasks.
  useEffect(() => {
    setOrderedTasks((prev) => {
      const taskMap = new Map(prev.map((task) => [task.id, task]));
      filteredTasks.forEach((task) => taskMap.set(task.id, task));
      return Array.from(taskMap.values());
    });
  }, [filteredTasks]);

  return (
    <div className="flex-grow overflow-y-auto p-4" id="todo-swapy-container" ref={containerRef}>
      <div className="space-y-2">
        {orderedTasks.map((task) => (
          <div key={task.id} data-swapy-slot={task.id}>
            <div data-swapy-item={task.id}>
              <ToDoItem
                task={task}
                onDelete={() => deleteTodo(task.id)}
                onComplete={() => completeToDO(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayToDos;
