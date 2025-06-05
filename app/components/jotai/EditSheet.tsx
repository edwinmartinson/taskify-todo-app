import { useRef, type FormEvent } from "react";
import { Trash2, X } from "lucide-react";
import { useAtom } from "jotai";

import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { logError } from "~/lib/utils";
import { deleteTodoAtom, todosAtom, updateTodoAtom } from "~/state/jotai/store";

type EditSheetProps = {
  taskId: number;
};

export default function EditSheet({ taskId }: EditSheetProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const isCompletedRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const task = useAtom(todosAtom)[0].find((t) => t.id === taskId);
  const remove = useAtom(deleteTodoAtom)[1];
  const update = useAtom(updateTodoAtom)[1];

  const handleDelete = () => {
    if (!task) return;

    try {
      remove(task.id);
    } catch (error) {
      logError(error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task || titleRef.current?.value === "") return;

    try {
      update({
        id: task.id,
        title: titleRef.current?.value || task.title,
        description: descriptionRef.current?.value || task.description,
        isCompleted: isCompletedRef.current?.dataset.state === "checked",
      });
    } catch (error) {
      logError(error);
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
