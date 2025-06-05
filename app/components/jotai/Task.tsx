import { format } from "date-fns";
import { Calendar, Trash2 } from "lucide-react";

import { Sheet, SheetTrigger } from "../ui/sheet";
import { cn, logError } from "~/lib/utils";
import { Checkbox } from "../ui/checkbox";
import CircleButton from "../CircleButton";
import type { Todo } from "~/app.types";
import EditSheet from "./EditSheet";
import { useAtom } from "jotai";
import { checkTodoAtom, deleteTodoAtom } from "~/state/jotai/store";

type TaskProps = {
  task: Omit<Todo, "createdAt" | "updatedAt">;
};

export default function Task({ task }: TaskProps) {
  const check = useAtom(checkTodoAtom)[1];
  const remove = useAtom(deleteTodoAtom)[1];

  const handleCheck = () => {
    try {
      check(task.id);
    } catch (error) {
      logError(error);
    }
  };

  const handleDelete = () => {
    try {
      remove(task.id);
    } catch (error) {
      logError(error);
    }
  };

  return (
    <div className="bg-surface-prompt hover:border-surface-tertiary mb-3 flex items-center gap-4 rounded-[14px] border border-transparent px-4 py-3">
      <Checkbox
        className="border-content-primary size-4.5 cursor-pointer rounded-full"
        checked={task.isCompleted}
        onCheckedChange={handleCheck}
      />

      <Sheet>
        <SheetTrigger className="w-full cursor-pointer text-left">
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
        </SheetTrigger>
        <EditSheet taskId={task.id} />
      </Sheet>

      <CircleButton
        className="bg-accent-red/10 aspect-square size-9 border-0"
        onClick={handleDelete}
      >
        <Trash2 size={16} className="stroke-accent-red" />
      </CircleButton>
    </div>
  );
}
