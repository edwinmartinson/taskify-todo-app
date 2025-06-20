import type { Route } from "./+types/redux.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "~/state/redux/store";
import AddTodo from "~/components/redux/AddTodo";
import AppContent from "~/components/redux/AppContent";
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className="mx-auto grid max-h-full w-full max-w-[608px] grid-rows-[40px_106px_36px_1fr_24px] gap-4 px-3 py-6 md:px-0">
          <Navbar />
          <AddTodo />
          <AppContent />
          <PoweredBy varient="REDUX" />
        </main>
      </PersistGate>
    </Provider>
  );
}
