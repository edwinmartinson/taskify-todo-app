import ThemeSwitcher from "./ThemeSwitcher";
import AppLogo from "./AppLogo";

function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <AppLogo />
      <ThemeSwitcher />
    </nav>
  );
}

export default Navbar;
