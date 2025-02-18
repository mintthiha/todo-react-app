import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface ToDoItemProps {
  task: { id: string; text: string; completed: boolean };
  onDelete: () => void;
  onComplete: () => void;
}

export function ToDoItem({ task, onDelete, onComplete }: ToDoItemProps) {
  return <div className="p-2 bg-gray-100 rounded-md"> 
  
    <Checkbox checked={task.completed} onCheckedChange={onComplete} />
    {task.text}
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-orange-500"> Edit </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="text-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  </div>;
}