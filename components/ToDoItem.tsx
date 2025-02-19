import { Checkbox } from "@/components/ui/checkbox";
import DropDownTaskMenu from "./DropDownTaskMenu";

interface ToDoItemProps {
  task: { id: string; text: string; completed: boolean; note?: string };
  onDelete: () => void;
  onComplete: () => void;
}

export function ToDoItem({ task, onDelete, onComplete }: ToDoItemProps) {
  return (
    <div className="flex flex-col p-3 bg-gray-100 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <Checkbox checked={task.completed} onCheckedChange={onComplete} />
          <span className={task.completed ? "line-through text-gray-500" : "text-black"}>{task.text}</span>
        </div>

        <DropDownTaskMenu onDelete={onDelete} />
      </div>

      {task.note && <p className="mt-2 text-sm text-gray-600 pl-8">{task.note}</p>}
    </div>
  );
}