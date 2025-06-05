import { type EntityTable } from "dexie";

export type Todo = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Config = {
  id: number;
  dbName: string;
  dbVersion: number;
  dbTables: string[];
  theme: "LIGHT" | "DARK";
};

export type ConfigsTable = EntityTable<Config, "id">;
export type TodosTable = EntityTable<Todo, "id">;

export type NewTodoInput = Pick<Todo, "title" | "dueDate">;

export type UpdateTodoInput = Pick<
  Todo,
  "id" | "title" | "description" | "isCompleted"
>;
