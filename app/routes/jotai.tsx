import type { Route } from "./+types/jotai.js";

import AddTodo from "~/components/jotai/AddTodo";
import AppContent from "~/components/jotai/AppContent";
import Navbar from "~/components/Navbar";
import PoweredBy from "~/components/PoweredBy";

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
    <main className="mx-auto grid max-h-full w-full max-w-[608px] grid-rows-[40px_106px_36px_1fr_24px] gap-4 px-3 py-6 md:px-0">
      <Navbar />
      <AddTodo />
      <AppContent />
      <PoweredBy varient="JOTAI" />
    </main>
  );
}
