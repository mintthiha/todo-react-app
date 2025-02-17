import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface ToDoItemProps {
  task: string;
  onDelete: () => void;
}

export function ToDoItem({ task, onDelete }: ToDoItemProps) {
  return <li className="p-2 bg-gray-100 rounded-md"> 
  
    <Checkbox/> 
    {task}
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
  
  </li>;
}