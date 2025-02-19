import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ToDoTabsProps {
  setFilter: (filter: string) => void;
}

const ToDoTabs = ({ setFilter }: ToDoTabsProps) => {
  return (
    <Tabs defaultValue="all" onValueChange={setFilter}>
      <TabsList className="flex justify-center">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="complete">Complete</TabsTrigger>
        <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ToDoTabs;