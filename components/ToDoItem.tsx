import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface ToDoItemProps {
  task: { id: string; text: string; completed: boolean; note?: string };
  onDelete: () => void;
  onComplete: () => void;
}

export function ToDoItem({ task, onDelete, onComplete}: ToDoItemProps) {
  return (
    <>
    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
        <div className="flex items-center gap-2">
          <Checkbox checked={task.completed} onCheckedChange={onComplete} />
          <span className={task.completed ? "line-through text-gray-500" : "text-black"}>
            {task.text}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              ⋮ 
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-orange-500"> Edit </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        {task.note && (
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
            <p className="mt-2 text-sm text-gray-600 pl-8">{task.note}</p>
          </div>
        )}
    </>
   
  );
}
