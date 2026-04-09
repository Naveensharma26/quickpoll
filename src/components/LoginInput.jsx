import React, { useContext } from "react";
import { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";

function LoginInput() {
  const [pollId, setPollId] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const handlePollVote = () => {
    navigate(`/pollvote/${pollId}`);
  };

  const handlePollIdChange = (e) => {
    const currPollId = e.target.value;
    setPollId(currPollId);
    if (currPollId.length === 6) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div
        className={`
        border-2  ${theme === "dark" ? "bg-blue-900 border-blue-950 shadow-none" : "bg-blue-500/90 border-white"} backdrop-blur-md rounded-3xl 
        px-4 py-4 
        flex flex-col sm:flex-row 
        justify-between items-center 
        gap-3 sm:gap-4 
        shadow-lg shadow-gray-600 
        w-full sm:w-8/12 md:w-6/12 lg:w-6/12
      `}
      >
        <label className="text-yellow-200 text-lg sm:text-xl font-bold text-center">
          Are you a participant?
        </label>

        <input
          type="text"
          className={`
            p-2 outline-none border-b 
            ${theme === "dark" ? "bg-black text-white placeholder:text-white" : "bg-white  placeholder:text-black"} rounded-3xl 
            text-center w-full sm:w-auto
          `}
          placeholder="# Enter Code Here"
          maxLength={6}
          value={pollId}
          onChange={(e) => {
            //
            handlePollIdChange(e);
          }}
        />
        <AiOutlineLogin
          size={36}
          className={`p-2 rounded-4xl duration-300 
            ${
              disableLogin
                ? "bg-gray-300 cursor-not-allowed opacity-50 text-black"
                : "bg-yellow-400 cursor-pointer hover:scale-125"
            }
          `}
          onClick={() => {
            if (!disableLogin) {
              handlePollVote();
            }
          }}
        />
      </div>
    </div>
  );
}

export default LoginInput;
