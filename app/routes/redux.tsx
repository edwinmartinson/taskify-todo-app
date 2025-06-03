import type { Route } from "./+types/redux.tsx";
import { Provider } from "react-redux";
import { store } from "~/state/redux/store";

import { ReduxAddTodo } from "~/components/AddTodo";
import { ReduxAppContent } from "~/components/AppContent.js";
import Navbar from "~/components/Navbar";
import PoweredBy from "~/components/PoweredBy.js";

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
    <Provider store={store}>
      <main className="mx-auto grid max-h-full w-full max-w-[608px] grid-rows-[40px_106px_36px_1fr_24px] gap-4 px-3 py-6 md:px-0">
        <Navbar />
        <ReduxAddTodo />
        <ReduxAppContent />
        <PoweredBy varient="REDUX" />
      </main>
    </Provider>
  );
}
