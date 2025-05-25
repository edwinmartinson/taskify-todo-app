import type React from "react";
import { CircleCheck, CircleDashed } from "lucide-react";

type AppTabProps = {
  activeTab: "pending" | "completed";
  onTabChange: (tab: "pending" | "completed") => void;
};

export default function AppTab({ activeTab, onTabChange }: AppTabProps) {
  return (
    <div className="bg-surface-prompt border-surface-tertiary mx-auto flex w-fit items-center gap-2 rounded-3xl border-1">
      <TabButton
        variant={activeTab === "pending" ? "active" : "inactive"}
        onClick={() => onTabChange("pending")}
      >
        <CircleDashed size={16} className="stroke-accent-yellow" /> pending
      </TabButton>
      <TabButton
        variant={activeTab === "completed" ? "active" : "inactive"}
        onClick={() => onTabChange("completed")}
      >
        <CircleCheck size={16} className="stroke-accent-green" /> completed
      </TabButton>
    </div>
  );
}

type TabButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "active" | "inactive";
};

function TabButton({ children, variant, onClick }: TabButtonProps) {
  const base =
    "flex items-center justify-center gap-1.5 rounded-3xl px-3 py-1.5 cursor-pointer";
  const active = "bg-content-primary text-surface-primary";
  const inactive = "bg-transparent text-content-tertiary";

  return (
    <button
      type="button"
      className={`${base} ${variant === "active" ? active : inactive}`}
      role="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
