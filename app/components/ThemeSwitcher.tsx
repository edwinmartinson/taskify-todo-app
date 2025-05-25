import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "~/dexie/db";
import CircleButton from "./CircleButton";

export default function ThemeSwitcher() {
  const config = useLiveQuery(() => {
    return db.configs.toArray();
  });
  const theme = config?.[0]?.theme;

  const handleClick = () => {
    if (config?.[0]) {
      db.configs.update(config[0].id, {
        theme: theme === "DARK" ? "LIGHT" : "DARK",
      });
    }
  };

  useEffect(() => {
    if (theme === "DARK") {
      document.body.classList.add("app-dark", "dark");
    } else if (theme === "LIGHT") {
      document.body.classList.remove("app-dark", "dark");
    }
  }, [theme]);

  return (
    <CircleButton
      className="bg-surface-prompt border-surface-tertiary size-10"
      onClick={handleClick}
    >
      {theme === "DARK" ? (
        <Moon size={"18px"} color="rgba(255, 255, 255, 1)" />
      ) : (
        <Sun size={"18px"} color="rgba(38, 38, 38, 1)" />
      )}
    </CircleButton>
  );
}
