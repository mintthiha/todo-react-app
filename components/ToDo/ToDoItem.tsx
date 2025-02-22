import { Checkbox } from "@/components/ui/checkbox";
import DropDownTaskMenu from "./DropDownTaskMenu";
import { motion } from "framer-motion";

interface ToDoItemProps {
  task: { id: string; text: string; completed: boolean; note?: string };
  onDelete: () => void;
  onComplete: () => void;
}

// Displays a single task in the task list
export function ToDoItem({ task, onDelete, onComplete }: ToDoItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex flex-col sm:p-2 md:p-3 rounded-md bg-gray-100 dark:bg-gray-800 shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox checked={task.completed} onCheckedChange={onComplete} />
          <span className={task.completed ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100"}>
            {task.text}
          </span>
        </div>
        <DropDownTaskMenu onDelete={onDelete} />
      </div>
      {task.note && (
        <p
          className={
            task.completed
              ? "mt-2 text-sm text-gray-600 pl-8 line-through"
              : "mt-2 text-sm text-gray-600 dark:text-gray-300 pl-8"
          }
        >
          {task.note}
        </p>
      )}
    </motion.div>
  );
}