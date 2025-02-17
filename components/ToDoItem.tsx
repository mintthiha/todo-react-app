import { Checkbox } from "@/components/ui/checkbox";

interface ToDoItemProps {
  task: string;
}

export function ToDoItem({ task }: ToDoItemProps) {
  return <li className="p-2 bg-gray-100 rounded-md"> <Checkbox/> {task} </li>;
}