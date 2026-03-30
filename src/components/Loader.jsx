import React from "react";

function Loader({ open }) {
  if (!open) return;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 px-3 flex-col ">
      <div className="bg-transparent border-8 border-gray-300 border-t-black w-20 h-20 overflow-visible animate-spin rounded-full "></div>
      <div className="text-white">Loading Data ...</div>
    </div>
  );
}

export default Loader;
