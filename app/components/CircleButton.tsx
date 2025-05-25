import { cn } from "~/lib/utils";

type CircleButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function CircleButton({
  children,
  className,
  onClick,
}: CircleButtonProps) {
  return (
    <button
      className={cn(
        `flex cursor-pointer items-center justify-center rounded-full border-1`,
        "transition-all duration-150 ease-in-out hover:scale-115",
        className,
      )}
      onClick={onClick}
      type="button"
      aria-label="Circle Button"
    >
      {children}
    </button>
  );
}
