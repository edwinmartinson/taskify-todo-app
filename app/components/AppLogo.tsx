import { Pencil } from "lucide-react";

export default function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-surface-prompt border-surface-tertiary flex size-10 items-center justify-center rounded-full border-1">
        <Pencil size={16} className="stroke-accent-blue" />
      </div>
      <span className="text-lg">Taskify</span>
    </div>
  );
}
