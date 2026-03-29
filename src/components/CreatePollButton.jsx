import React from "react";
import { IoIosCreate } from "react-icons/io";

function CreatePollButton({ setOpen }) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-linear-to-br from-[#0054b4] to-[#62acfb] 
        py-6 px-10 rounded-xl text-lg shadow-md text-white font-semibold 
        cursor-pointer duration-300 hover:shadow-xl hover:scale-105 
        active:scale-95 flex flex-col items-center gap-2 max-w-xs w-72"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <IoIosCreate size={40} />
        Create a Poll
      </button>
    </div>
  );
}

export default CreatePollButton;
