import { format } from "date-fns";
import { Calendar, Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import CircleButton from "./CircleButton";
import type { Todo } from "~/app.types";
import { cn } from "~/lib/utils";
import db from "~/dexie/db";

type TaskProps = {
  task: Omit<Todo, "createdAt" | "updatedAt">;
};

export default function Task({ task }: TaskProps) {
  const handleCheck = async () => {
    await db.todos.update(task.id, {
      isCompleted: !task.isCompleted,
      updatedAt: new Date().toISOString(),
    });

    console.log(
      `Task ${task.id} marked as ${!task.isCompleted ? "completed" : "pending"}`,
    );
  };

  const handleDelete = async () => {
    await db.todos.delete(task.id);
    console.log(`Task ${task.id} deleted`);
  };

  return (
    <div className="bg-surface-prompt hover:border-surface-tertiary mb-3 flex items-center gap-4 rounded-[14px] border border-transparent px-4 py-3">
      <Checkbox
        className="border-content-primary size-4.5 cursor-pointer rounded-full"
        checked={task.isCompleted}
        onCheckedChange={handleCheck}
      />
      <div className="w-full">
        <button type="button">
          <p
            className={cn(
              task.isCompleted && "text-content-secondary line-through",
            )}
          >
            {task.title}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Calendar size={14} className="stroke-accent-blue" />
            <p className="text-content-secondary text-xs">
              {format(task.dueDate, "PPP")}
            </p>
          </div>
        </button>
      </div>
      <CircleButton
        className="bg-accent-red/10 aspect-square size-9 border-0"
        onClick={handleDelete}
      >
        <Trash2 size={16} className="stroke-accent-red" />
      </CircleButton>
    </div>
  );
}
