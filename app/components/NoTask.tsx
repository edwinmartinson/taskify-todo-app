import { NotepadText } from "lucide-react";

export default function NoTask() {
  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <NotepadText
        size={100}
        className="stroke-accent-yellow rotate-[-30deg] stroke-1"
      />
      <p className="text-lg">No task available</p>
    </div>
  );
}
