import { useState } from "react";
import AppTab from "./AppTab";
import Task, { JotaiTask, ReduxTask, ZustandTask } from "./Task";
import { useLiveQuery } from "dexie-react-hooks";
import db from "~/dexie/db";
import NoTask from "./NoTask";
import { useSelector } from "react-redux";
import type { RootState } from "~/state/redux/store";
import { useTodos } from "~/state/zustand/store";
import { useAtom } from "jotai";
import { todosAtom } from "~/state/jotai/store";

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

export function ReduxAppContent() {
  const [activeTab, setActiveTab] = useState<AppTabType>("pending");
  const todos = useSelector((state: RootState) => state.todos.value);

  const pendingTodos = () =>
    todos.filter((todo) => !todo.isCompleted).sort((a, b) => b.id! - a.id!);
  const completedTodos = () =>
    todos.filter((todo) => todo.isCompleted).sort((a, b) => b.id! - a.id!);

  return (
    <>
      <AppTab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="scrollbar w-full overflow-y-auto mask-b-from-90%">
        {activeTab === "pending" && pendingTodos().length > 0 ? (
          pendingTodos().map((todo) => <ReduxTask key={todo.id} task={todo} />)
        ) : activeTab === "completed" && completedTodos().length > 0 ? (
          completedTodos().map((todo) => (
            <ReduxTask key={todo.id} task={todo} />
          ))
        ) : (
          <NoTask />
        )}
      </div>
    </>
  );
}

export function ZustandAppContent() {
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
          pendingTodos().map((todo) => (
            <ZustandTask key={todo.id} task={todo} />
          ))
        ) : activeTab === "completed" && completedTodos().length > 0 ? (
          completedTodos().map((todo) => (
            <ZustandTask key={todo.id} task={todo} />
          ))
        ) : (
          <NoTask />
        )}
      </div>
    </>
  );
}

export function JotaiAppContent() {
  const [activeTab, setActiveTab] = useState<AppTabType>("pending");
  const [todos] = useAtom(todosAtom);

  const pendingTodos = () =>
    todos.filter((todo) => !todo.isCompleted).sort((a, b) => b.id! - a.id!);
  const completedTodos = () =>
    todos.filter((todo) => todo.isCompleted).sort((a, b) => b.id! - a.id!);

  return (
    <>
      <AppTab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="scrollbar w-full overflow-y-auto mask-b-from-90%">
        {activeTab === "pending" && pendingTodos().length > 0 ? (
          pendingTodos().map((todo) => <JotaiTask key={todo.id} task={todo} />)
        ) : activeTab === "completed" && completedTodos().length > 0 ? (
          completedTodos().map((todo) => (
            <JotaiTask key={todo.id} task={todo} />
          ))
        ) : (
          <NoTask />
        )}
      </div>
    </>
  );
}
