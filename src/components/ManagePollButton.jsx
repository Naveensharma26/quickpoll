import React, { useContext } from "react";
import { MdManageAccounts } from "react-icons/md";
import { ThemeContext } from "../contexts/ThemeContext";

function ManagePollButton({ setOpen }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex justify-center">
      <button
        className={`bg-linear-to-br  ${
          theme === "dark"
            ? "from-gray-950 to-slate-600 border border-white"
            : "from-yellow-400 to-yellow-300"
        }
        py-6 px-10 rounded-xl text-lg shadow-md text-white font-semibold 
        cursor-pointer duration-300 hover:shadow-xl hover:scale-105 
        active:scale-95 flex flex-col items-center gap-2 max-w-xs w-72`}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <MdManageAccounts size={40} />
        Manage Your Poll
      </button>
    </div>
  );
}

export default ManagePollButton;
