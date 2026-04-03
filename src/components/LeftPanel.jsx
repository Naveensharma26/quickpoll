import React from "react";
import CreatePollButton from "./CreatePollButton";
import ManagePollButton from "./ManagePollButton";

function LeftPanel({ setOpen, setManageOpen }) {
  return (
    <div className="md:min-h-screen bg-blue-950 flex flex-col items-center">
      <div className="sticky top-0 bg-blue-950 w-full flex md:flex-col flex-row items-center gap-2 ">
        <img src="quickpoll.png" alt="" width={80} className="mt-0 md:mt-10" />
        <h1 className="text-yellow-400 text-4xl">QuickPoll</h1>
        <p className="text-white">Polling Made Quick</p>
      </div>
      <div className="m-8">
        <CreatePollButton setOpen={setOpen} />
      </div>
      <div className="m-8">
        <ManagePollButton setOpen={setManageOpen} />
      </div>
    </div>
  );
}

export default LeftPanel;
