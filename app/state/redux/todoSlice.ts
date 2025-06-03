import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "~/app.types";

type TodoState = { value: Todo[] };

const initialState: TodoState = {
  value: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Pick<Todo, "title" | "dueDate">>) {
      state.value.push({
        id: Date.now(),
        title: action.payload.title,
        description: "",
        dueDate: action.payload.dueDate,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.value = state.value.filter((todo) => todo.id !== action.payload);
    },
    checkTodo(state, action: PayloadAction<number>) {
      const task = state.value.find((todo) => todo.id === action.payload);

      if (task) {
        task.isCompleted = !task.isCompleted;
        task.updatedAt = new Date().toISOString();
      }
    },
    updateTodo(
      state,
      action: PayloadAction<
        Pick<Todo, "id" | "title" | "description" | "isCompleted">
      >,
    ) {
      const task = state.value.find((todo) => todo.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.isCompleted = action.payload.isCompleted;
        task.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { addTodo, deleteTodo, checkTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
