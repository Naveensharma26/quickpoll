import React from "react";

function Header() {
  return (
    <div className="bg-blue-500 w-full flex items-center gap-3 px-4 h-12 shadow-md">
      <h1 className="text-2xl font-bold text-yellow-400">QuickPoll</h1>
      <p className="text-white text-sm">Making Polling Quick</p>
    </div>
  );
}

export default Header;
