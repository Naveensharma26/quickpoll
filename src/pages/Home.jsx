import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import CreatePollButton from "../components/CreatePollButton";
import CreatePollPopup from "../components/CreatePollPopup";
import ManagePollButton from "../components/ManagePollButton";
import ManagePollPopup from "../components/ManagePollPopup";
import Loader from "../components/Loader";
import TrendingPolls from "../components/TrendingPolls";
import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";

function Home() {
  const [open, setOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:w-3/12 md:min-h-screen">
        <LeftPanel setOpen={setOpen} setManageOpen={setManageOpen} />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-9/12">
        <div className="p-4">
          <LoginInput />
        </div>
        <TrendingPolls />
      </div>

      {/* Popups */}
      <CreatePollPopup open={open} setOpen={setOpen} />
      <ManagePollPopup open={manageOpen} setOpen={setManageOpen} />
    </div>
  );
}

export default Home;
