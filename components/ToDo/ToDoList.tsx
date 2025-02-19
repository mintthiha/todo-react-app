"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ToDoTabs from "./ToDoTabs";
import DisplayToDos from "./DisplayToDos";
import TodoAddTask from "./ToDoAddTask";
import { customToast } from "../ui/customToast";

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
  const [tasks, setTasks] = useLocalStorage<Task[]>(storageKey, []);
  const [filter, setFilter] = useState("all");

  const addTodo = (taskText: string, noteText: string) => {
    if (taskText.trim() !== "") {
      const newTask: Task = {
        id: crypto.randomUUID(),
        text: taskText,
        completed: false,
        note: noteText,
      };

      setTasks([...tasks, newTask]);

      customToast({ message: `Task "${taskText}" added successfully!`, type: "success" });
    }
  }; 

  const deleteTodo = (id: string) => {
    // Find deletedTask to print in Toast
    const deletedTask = tasks.find((task) => task.id === id);
    // Removes task with associated index
    setTasks(tasks.filter((task) => task.id !== id));

    if (deletedTask) {
      customToast({ message: `Task "${deletedTask.text}" deleted!`, type: "info" })
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

      <TodoAddTask onAdd={addTodo} />
    </Card>
  );
}
