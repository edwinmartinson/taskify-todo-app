import { useState } from "react";
import AppTab from "./AppTab";
import Task from "./Task";
import { useLiveQuery } from "dexie-react-hooks";
import db from "~/dexie/db";
import NoTask from "./NoTask";

type AppTabType = "pending" | "completed";

export default function AppContent() {
  const [activeTab, setActiveTab] = useState<AppTabType>("pending");
  const todos = useLiveQuery(() => {
    return db.todos.toArray();
  });

  const pendingTodos = () =>
    todos?.filter((todo) => !todo.isCompleted).sort((a, b) => b.id! - a.id!) ||
    [];
  const completedTodos = () =>
    todos?.filter((todo) => todo.isCompleted).sort((a, b) => b.id! - a.id!) ||
    [];

  return (
    <>
      <AppTab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="scrollbar w-full overflow-y-auto">
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
