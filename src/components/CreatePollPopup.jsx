import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router";

function CreatePollPopup({ open, setOpen }) {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [pollName, setPollName] = useState("");
  const [password, setPassword] = useState("");

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    return result;
  };

  const handleClickAndProceed = () => {
    if (userName && pollName && password) {
      const pollData = {
        pollId: generateCode(),
        createdBy: userName,
        pollName: pollName,
        password,
      };

      navigate("/createpoll", { state: pollData });
    } else {
      alert("Missing data");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 px-3">
      <div className="bg-blue-500 p-5 md:p-6 rounded-xl w-full max-w-md border-white border-2 text-white ">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Create Poll</h1>
          <IoMdCloseCircle
            size={26}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <label className="text-sm md:text-base">Your Name:</label>
            <input
              className="p-2 rounded border mt-1 outline-none text-white"
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm md:text-base">Poll Name:</label>
            <input
              className="p-2 rounded border mt-1 outline-none text-white"
              type="text"
              value={pollName}
              onChange={(e) => setPollName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm md:text-base">
              Poll Password:(Only you should know)
            </label>
            <input
              className="p-2 rounded border mt-1 outline-none text-white"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <input
            type="button"
            value="Create & Proceed"
            className="bg-red-400 text-white px-5 py-2 border rounded-xl w-full md:w-auto"
            onClick={handleClickAndProceed}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePollPopup;
