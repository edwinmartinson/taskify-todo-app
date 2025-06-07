import type React from "react";
import { href, NavLink, useNavigation } from "react-router";
import { cn } from "~/lib/utils";

export default function NavLinks() {
  return (
    <div className="flex items-center gap-2">
      <CircleLink link={href("/")}>
        <p>🏚️</p>
      </CircleLink>
      <CircleLink link={href("/redux")}>
        <p>⚛️</p>
      </CircleLink>
      <CircleLink link={href("/zustand")}>
        <p>🐻</p>
      </CircleLink>
      <CircleLink link={href("/jotai")}>
        <p>👻</p>
      </CircleLink>
    </div>
  );
}

type NavLinkProps = {
  link: string;
  children: React.ReactNode;
};

function CircleLink({ link, children }: NavLinkProps) {
  const { location, state } = useNavigation();
  const isActive = location?.pathname === link;

  return (
    <NavLink to={link}>
      <div
        className={cn(
          "bg-surface-secondary ring-surface-secondary hover:ring-surface-tertiary flex size-10 items-center justify-center rounded-full ring-1 transition-all duration-150 ease-in-out hover:scale-115",
          isActive && "ring-accent-blue",
          state === "loading" && "animate-pulse",
        )}
      >
        {children}
      </div>
    </NavLink>
  );
}
