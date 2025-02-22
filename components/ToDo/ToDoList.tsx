"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
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

// Displays the task list and the tasks within it
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.4)" }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full h-[400px] flex flex-col overflow-hidden border border-gray-300 dark:border-gray-700 rounded-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 pl-5">{title}</h2>
            <ToDoTabs setFilter={setFilter} />
          </div>

          <DisplayToDos filteredTasks={filteredTasks} deleteTodo={deleteTodo} completeToDO={completeToDo} />

          <TodoAddTask onAdd={addTodo} />
        </Card>
      </motion.div>
    </motion.div>
  );
}
