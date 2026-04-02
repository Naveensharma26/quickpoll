import axios from "axios";
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../Const";

function ManagePollPopup({ open, setOpen }) {
  const [pollId, setPollId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickAndProceed = async () => {
    if (pollId && password) {
      const data = {
        pollId: pollId,
        password: password,
      };
      const response = await axios.post(`${API_BASE_URL}/verifyUser`, data);
      if (response.data) {
        navigate(`/pollResult/${pollId}`);
      } else {
        alert("wrong password");
      }
      console.log("response is ", response);
    } else {
      alert("Missing data");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 px-3">
      <div className="bg-amber-400 p-5 md:p-6 rounded-xl w-full max-w-md border-white border-2">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Manage Poll</h1>
          <IoMdCloseCircle
            size={26}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <label className="text-sm md:text-base font-medium">Poll Id</label>
            <input
              className="p-2 rounded border mt-1 outline-none"
              type="text"
              value={pollId}
              onChange={(e) => setPollId(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm md:text-base font-medium">
              Poll Password
            </label>
            <input
              className="p-2 rounded border mt-1 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            className="bg-red-400 text-white px-6 py-2 rounded-xl hover:shadow-md transition-all duration-200 w-full md:w-auto"
            onClick={handleClickAndProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagePollPopup;
