// Despite this precision, the page is still causing a hydration error.
'use client';

import dynamic from "next/dynamic";

//Fixes Hydration error, since the TodoList component will only be rendered on client side.
const TodoList = dynamic(() => import("@/components/ToDoList"), { ssr: false });

export default function Page() {
  return <TodoList />;
}