import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ToDoTabsProps {
  setFilter: (filter: string) => void;
}

// Displays the tabs for the task list with an animated underline
const ToDoTabs = ({ setFilter }: ToDoTabsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    // Find the active tab's DOM element and style it with underline
    const activeTabElement = tabsRef.current.find((tab) => tab?.dataset.value === activeTab);
    if (activeTabElement) {
      setUnderlineStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <Tabs
      defaultValue="all"
      onValueChange={(value) => {
        setFilter(value);
        setActiveTab(value);
      }}
    >
      <div className="relative">
        <TabsList className="flex justify-center relative">
          {["all", "complete", "incomplete"].map((value, index) => (
            <TabsTrigger
              key={value}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              data-value={value}
              value={value}
              className="relative px-4 py-2"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <motion.div
          className="absolute bottom-0 h-[2px] bg-primary rounded-lg"
          animate={underlineStyle}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>
    </Tabs>
  );
};

export default ToDoTabs;