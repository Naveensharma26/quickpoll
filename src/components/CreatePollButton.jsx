import React, { useContext } from "react";
import { IoIosCreate } from "react-icons/io";
import { ThemeContext } from "../contexts/ThemeContext";

function CreatePollButton({ setOpen }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex justify-center">
      <button
        className={`
          py-6 px-10 rounded-2xl text-lg shadow-lg text-white font-bold 
          cursor-pointer duration-300 hover:scale-105 active:scale-95 
          flex flex-col items-center gap-2 max-w-xs w-72 transition-all
          ${
            theme === "dark"
              ? "bg-linear-to-br from-[#0b213b] to-[#1066c2] border border-white"
              : "bg-linear-to-br from-[#0054b4] to-[#62acfb]"
          }
        `}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div
          className={`${theme === "dark" ? "bg-white/20" : "bg-black/10"} p-3 rounded-full mb-1`}
        >
          <IoIosCreate size={35} />
        </div>
        <span className="tracking-wide">Create a Poll</span>
      </button>
    </div>
  );
}

export default CreatePollButton;
