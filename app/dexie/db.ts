import Dexie from "dexie";
import type { Config, ConfigsTable, TodosTable } from "~/app.types";

const db = new Dexie("localDB") as Dexie & {
  configs: ConfigsTable;
  todos: TodosTable;
};

db.version(1).stores({
  configs: "++id",
  todos: "++id, dueDate",
});

db.on("populate", (transaction) => {
  transaction.table<Omit<Config, "id">>("configs").add({
    dbName: "localDB",
    dbVersion: 1,
    dbTables: ["configs", "todos"],
    theme: "LIGHT",
  });
});

export default db;
