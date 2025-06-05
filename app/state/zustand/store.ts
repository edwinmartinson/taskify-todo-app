import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo, NewTodoInput, UpdateTodoInput } from "~/app.types";

type TodoStore = {
  todos: Todo[];
  actions: TodoStoreActions;
};

type TodoStoreActions = {
  add: (input: NewTodoInput) => void;
  delete: (id: number) => void;
  check: (id: number) => void;
  update: (input: UpdateTodoInput) => void;
};

const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      actions: {
        add: (input) => {
          set((state) => ({
            todos: [
              ...state.todos,
              {
                id: Date.now(),
                title: input.title,
                description: "",
                dueDate: input.dueDate,
                isCompleted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          }));
        },
        delete: (id) => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          }));
        },
        check: (id) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id
                ? { ...todo, isCompleted: !todo.isCompleted }
                : todo,
            ),
          }));
        },
        update: (input) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === input.id
                ? {
                    ...todo,
                    title: input.title,
                    description: input.description,
                    isCompleted: input.isCompleted,
                    updatedAt: new Date().toISOString(),
                  }
                : todo,
            ),
          }));
        },
      },
    }),
    {
      name: "zustandTodoDB",
      partialize: (state) => ({ todos: state.todos }),
    },
  ),
);

export const useTodos = () => useTodoStore((state) => state.todos);

export const useTodo = (id: number) => {
  const todos = useTodoStore((state) => state.todos);
  return todos.find((todo) => todo.id === id) ?? null;
};

export const useTodoActions = () => useTodoStore((state) => state.actions);
