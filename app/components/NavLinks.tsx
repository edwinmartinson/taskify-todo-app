import type React from "react";
import { href, NavLink, useNavigation } from "react-router";
import { cn } from "~/lib/utils";
import { TooltipContent, Tooltip, TooltipTrigger } from "./ui/tooltip";

export default function NavLinks() {
  return (
    <div className="flex items-center gap-2">
      <CircleLink link={href("/")} label="Dexie">
        <p>🏚️</p>
      </CircleLink>
      <CircleLink link={href("/redux")} label="Redux">
        <p>⚛️</p>
      </CircleLink>
      <CircleLink link={href("/zustand")} label="Zustand">
        <p>🐻</p>
      </CircleLink>
      <CircleLink link={href("/jotai")} label="Jotai">
        <p>👻</p>
      </CircleLink>
    </div>
  );
}

type NavLinkProps = {
  link: string;
  label: string;
  children: React.ReactNode;
};

function CircleLink({ link, children, label }: NavLinkProps) {
  const { location, state } = useNavigation();
  const isActive = location?.pathname === link;

  return (
    <NavLink to={link}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "bg-surface-secondary ring-surface-secondary hover:ring-surface-tertiary flex size-10 items-center justify-center rounded-full ring-1 transition-all duration-150 ease-in-out hover:scale-115",
              isActive && "ring-accent-blue",
              state === "loading" && "animate-pulse",
            )}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </NavLink>
  );
}
