import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import CreatePollButton from "../components/CreatePollButton";
import CreatePollPopup from "../components/CreatePollPopup";
import ManagePollButton from "../components/ManagePollButton";
import ManagePollPopup from "../components/ManagePollPopup";

function Home() {
  const [open, setOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  return (
    <div className="bg-linear-to-br from-yellow-100 to-blue-300 min-h-screen px-4 py-6">
      <div className="mb-6">
        <LoginInput />
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-full md:w-auto">
          <CreatePollButton setOpen={setOpen} />
        </div>

        <div className="w-full md:w-auto">
          <ManagePollButton setOpen={setManageOpen} />
        </div>
      </div>

      <CreatePollPopup open={open} setOpen={setOpen} />
      <ManagePollPopup open={manageOpen} setOpen={setManageOpen} />
    </div>
  );
}

export default Home;
