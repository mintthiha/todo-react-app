import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DropdownTaskMenuProps {
  onDelete: () => void;
}

const DropDownTaskMenu = ({ onDelete }: DropdownTaskMenuProps) => {
  return (
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
  )
}

export default DropDownTaskMenu