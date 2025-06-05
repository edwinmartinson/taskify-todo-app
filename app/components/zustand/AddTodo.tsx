import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";

import { useTodoActions } from "~/state/zustand/store";
import { logError } from "~/lib/utils";
import DatePicker from "../DatePicker";
import CircleButton from "../CircleButton";

export default function AddTodo() {
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { add } = useTodoActions();

  const handleAddTodo = async () => {
    if (task.trim() === "" || !date) return;

    try {
      add({
        title: task,
        dueDate: date.toISOString(),
      });
    } catch (error) {
      logError(error);
    } finally {
      setTask("");
      setDate(new Date());
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTodo();
  };

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      name="taskbox"
      className="bg-surface-prompt border-surface-tertiary block h-fit rounded-3xl border p-4"
    >
      <input
        className="mb-3 w-full focus:border-0 focus:outline-0"
        type="text"
        name="task"
        id="task-field"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What's on your mind?"
      />

      <div className="flex items-center justify-between">
        <DatePicker
          field={{
            value: date,
            onChange: (date) => setDate(date),
          }}
        />
        <CircleButton
          className="bg-surface-primary border-surface-tertiary size-9"
          onClick={handleAddTodo}
        >
          <Plus size={16} className="stroke-content-primary" />
        </CircleButton>
      </div>
    </form>
  );
}
