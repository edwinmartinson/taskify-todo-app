import { useState } from "react";

import AppTab from "../AppTab";
import Task from "./Task";
import NoTask from "../NoTask";
import { useTodos } from "~/state/zustand/store";

type AppTabType = "pending" | "completed";

export default function AppContent() {
  const [activeTab, setActiveTab] = useState<AppTabType>("pending");
  const todos = useTodos();

  const pendingTodos = () =>
    todos.filter((todo) => !todo.isCompleted).sort((a, b) => b.id! - a.id!);
  const completedTodos = () =>
    todos.filter((todo) => todo.isCompleted).sort((a, b) => b.id! - a.id!);

  return (
    <>
      <AppTab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="scrollbar w-full overflow-y-auto mask-b-from-90%">
        {activeTab === "pending" && pendingTodos().length > 0 ? (
          pendingTodos().map((todo) => <Task key={todo.id} task={todo} />)
        ) : activeTab === "completed" && completedTodos().length > 0 ? (
          completedTodos().map((todo) => <Task key={todo.id} task={todo} />)
        ) : (
          <NoTask />
        )}
      </div>
    </>
  );
}
