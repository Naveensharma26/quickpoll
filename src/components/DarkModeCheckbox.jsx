import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { PiSunLight } from "react-icons/pi";

function DarkModeCheckbox() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center gap-2 px-2 py-1 rounded-xl font-bold transition-all duration-300 active:scale-95
        ${
          isDark
            ? "bg-black text-blue-400 border border-blue-500/20 shadow-lg"
            : "bg-yellow-100 text-yellow-700 border border-yellow-400/50 shadow-sm"
        }
      `}
    >
      <div className="relative">
        {isDark ? (
          <MdDarkMode size={22} className="animate-pulse" />
        ) : (
          <PiSunLight size={22} />
        )}
      </div>

      <span className="text-sm uppercase tracking-wider">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}

export default DarkModeCheckbox;
