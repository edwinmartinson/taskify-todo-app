import type { Route } from "./+types/app.tsx";

import AddTodo from "~/components/AddTodo";
import AppContent from "~/components/AppContent.js";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Taskify - Advanced Todo App",
      name: "description",
      content: "Your advanced todo app for efficient task management.",
    },
  ];
}

export default function App({}: Route.MetaArgs) {
  return (
    <main className="mx-auto grid max-h-full w-full max-w-[608px] grid-rows-[40px_106px_36px_1fr] gap-4 px-3 py-6 md:px-0">
      <Navbar />
      <AddTodo />
      <AppContent />
    </main>
  );
}
