import { atom } from "jotai";
import type { NewTodoInput, Todo, UpdateTodoInput } from "~/app.types";

export const todosAtom = atom<Todo[]>([]);

export const addTodoAtom = atom(null, (_, set, input: NewTodoInput) => {
  set(todosAtom, (state) => [
    ...state,
    {
      id: Date.now(),
      title: input.title,
      description: "",
      dueDate: input.dueDate,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
});

export const deleteTodoAtom = atom(null, (_, set, id: number) => {
  set(todosAtom, (state) => state.filter((todo) => todo.id !== id));
});

export const checkTodoAtom = atom(null, (_, set, id: number) => {
  set(todosAtom, (state) =>
    state.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    ),
  );
});

export const updateTodoAtom = atom(null, (_, set, input: UpdateTodoInput) => {
  set(todosAtom, (state) =>
    state.map((todo) =>
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
  );
});
