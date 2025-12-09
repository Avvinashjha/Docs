import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


function ThemeSwitcher() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null; // safety check

  const { theme, setTheme } = themeContext;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Switch to {theme === "dark" ? "light" : "dark"} mode
    </button>
  );
}

export default ThemeSwitcher;