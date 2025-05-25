import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "~/lib/utils";

type DatePickerProps = {
  field: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  };
};

export default function DatePicker({ field }: DatePickerProps) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Select Date"
            role="button"
            className={cn(
              "border-surface-tertiary flex h-9 w-fit cursor-pointer items-center gap-2 rounded-3xl border px-3",
              "transition-all duration-150 ease-in-out hover:scale-105",
              field.value && "bg-surface-prompt text-content-primary",
              !field.value && "bg-surface-secondary text-content-tertiary",
            )}
          >
            <CalendarIcon
              className={cn(`h-4 w-4`, field.value && "stroke-accent-blue")}
            />
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
