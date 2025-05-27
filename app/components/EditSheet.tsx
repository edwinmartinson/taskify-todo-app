import { Trash2, X } from "lucide-react";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import { useRef, type FormEvent } from "react";
import db from "~/dexie/db";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { useLiveQuery } from "dexie-react-hooks";

type EditSheetProps = {
  taskId: number;
};

export default function EditSheet({ taskId }: EditSheetProps) {
  const task = useLiveQuery(() => db.todos.get(taskId), [taskId]);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const isCompletedRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = async () => {
    if (!task) return;

    try {
      await db.todos.delete(task.id);
      console.log(`Task ${task.id} deleted`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error deleting task: ${error.message}`);
      } else console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!task || titleRef.current?.value === "") return;

      await db.todos
        .update(task.id, {
          title: titleRef.current?.value || task.title,
          description: descriptionRef.current?.value || task.description,
          isCompleted: isCompletedRef.current?.dataset.state === "checked",
          updatedAt: new Date().toISOString(),
        })
        .then(() => console.log(`Task ${task.id} updated`));
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error updating task: ${error.message}`);
      } else console.error(error);
    } finally {
      closeButtonRef.current?.click();
    }
  };

  return (
    <SheetContent className="bg-surface-primary p-4">
      <div className="flex justify-between">
        <SheetClose
          className="cursor-pointer transition-all duration-150 ease-in-out hover:scale-115"
          onClick={handleDelete}
        >
          <Trash2 size={18} className="stroke-accent-red" />
        </SheetClose>

        <SheetClose
          ref={closeButtonRef}
          className="cursor-pointer transition-all duration-150 ease-in-out hover:scale-115"
        >
          <X size={18} className="stroke-content-primary" />
        </SheetClose>
      </div>

      <SheetTitle className="text-content-primary">Edit Task</SheetTitle>

      <SheetDescription>
        Modify and update you task details and completion status.
      </SheetDescription>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="task-title"
            className="text-content-secondary mb-2 block text-sm"
          >
            Title
          </label>
          <Input
            id="task-title"
            type="text"
            placeholder="Title of the task"
            className="bg-surface-prompt"
            defaultValue={task?.title}
            required
            ref={titleRef}
          />
        </div>
        <div>
          <label
            htmlFor="task-description"
            className="text-content-secondary mb-2 block text-sm"
          >
            Description
          </label>
          <Textarea
            id="task-description"
            placeholder="Description of the task"
            className="bg-surface-prompt h-36 resize-none"
            defaultValue={task?.description}
            ref={descriptionRef}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="task-status"
            className=""
            defaultChecked={task?.isCompleted}
            ref={isCompletedRef}
          />
          <label
            htmlFor="task-status"
            className="text-content-secondary text-sm"
          >
            Mask task as completed.
          </label>
        </div>

        <Button type="submit" className="mt-4 w-full">
          Save
        </Button>
      </form>

      <SheetFooter className="text-center text-xs text-neutral-400">
        Last update: {task ? new Date(task.updatedAt).toLocaleString() : "N/A"}
      </SheetFooter>
    </SheetContent>
  );
}
