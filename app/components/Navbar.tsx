import AppLogo from "./AppLogo";
import NavLinks from "./NavLinks";
import { useEffect } from "react";

function Navbar() {
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.body.classList.add("app-dark", "dark");
    } else document.body.classList.remove("app-dark", "dark");
  }, []);

  return (
    <nav className="flex items-center justify-between">
      <AppLogo />
      <NavLinks />
      {/* <ThemeSwitcher /> */}
    </nav>
  );
}

export default Navbar;
