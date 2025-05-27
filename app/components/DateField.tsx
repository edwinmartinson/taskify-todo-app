import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

type DateFieldProps = {
  field: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  };
};

export default function DateField({ field }: DateFieldProps) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
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
