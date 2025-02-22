"use client";

import { ToDoItem } from "./ToDoItem";

interface DisplayToDosProp {
  filteredTasks: { id: string; text: string; completed: boolean; note?: string }[];
  deleteTodo: (id: string) => void;
  completeToDO: (id: string) => void;
}

// Displays the tasks in the task list
const DisplayToDos = ({ filteredTasks, deleteTodo, completeToDO }: DisplayToDosProp) => {

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            onDelete={() => deleteTodo(task.id)}
            onComplete={() => completeToDO(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayToDos;
