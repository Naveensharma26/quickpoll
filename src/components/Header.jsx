import React, { useContext } from "react";
import DarkModeCheckbox from "./DarkModeCheckbox";
import { ThemeContext } from "../contexts/ThemeContext";
function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme === "dark" ? "bg-blue-900" : "bg-blue-500"} w-full flex flex-row justify-between items-center  h-12 shadow-md`}
    >
      {/* <img src={logo} alt="NA" /> */}
      <div className="flex flex-row gap-3 px-4 items-center">
        <h1
          className={`${theme === "dark" ? "text-yellow-400" : "text-yellow-300"} text-2xl font-bold `}
        >
          QuickPoll
        </h1>
        <p
          className={` md:text-xs text-xs font-medium opacity-80
            ${theme === "dark" ? "text-blue-200" : "text-blue-100"}`}
        >
          Making Polling Quick
        </p>
      </div>

      <DarkModeCheckbox />
    </div>
  );
}

export default Header;
