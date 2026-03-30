import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { AiOutlineThunderbolt } from "react-icons/ai";
import axios from "axios";
import { API_BASE_URL } from "../Const";

function CreatePoll() {
  const location = useLocation();
  const pollData = location.state;
  const navigate = useNavigate();

  const [optionCount, setOptionCount] = useState(2);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  function getTodayDateAndTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleCreatePoll = async () => {
    const finalData = {
      ...pollData,
      poll_question: question,
      created_at: getTodayDateAndTime(),
      is_anonymous: isAnonymous ? "Y" : "N",
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/addPoll`, finalData);

      const optionsData = options.map((opt) => ({
        poll_option_name: opt,
        pollId: response.data.poll_id,
        vote_count: 0,
      }));

      const resp2 = await axios.post(`${API_BASE_URL}/addOptions`, optionsData);
      console.log("Success:", response.data);
      console.log("Success:", resp2.data);
      navigate("/sharePoll", { state: response.data.poll_id });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-yellow-100 to-blue-300 min-h-screen px-3">
      <div className="p-4 md:p-6 m-auto w-full md:w-3/6 shadow-lg shadow-gray-500 bg-white rounded-xl">
        <h1 className="text-center text-xl md:text-2xl text-blue-500 font-bold">
          Add Poll Details
        </h1>

        <div className="flex flex-col gap-3 mt-4">
          {/* Question */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <h1 className="bg-red-400 p-2 w-10 md:w-12 flex justify-center items-center">
              Q
            </h1>
            <input
              type="text"
              placeholder="Type Your Question ?"
              className="w-full outline-0 p-2 text-sm md:text-base"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Options */}
          {Array.from({ length: optionCount }).map((_, index) => (
            <div
              key={index}
              className="flex items-center border pr-2 rounded-md overflow-hidden"
            >
              <h1 className="bg-blue-400 p-2 w-10 md:w-12 flex justify-center items-center">
                {index + 1}
              </h1>

              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                className="w-full outline-0 p-2 text-sm md:text-base"
                value={options[index]}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
              />

              {index > 1 && (
                <IoMdCloseCircle
                  size={22}
                  className="cursor-pointer"
                  onClick={() => {
                    const newOptions = options.filter((_, i) => i !== index);
                    setOptions(newOptions);
                    setOptionCount(optionCount - 1);
                  }}
                />
              )}
            </div>
          ))}

          {/* Anonymous */}
          <div className="flex gap-2 items-center text-sm md:text-base">
            <input
              type="checkbox"
              id="anonymous"
              className="h-4 w-4"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label htmlFor="anonymous">Keep Poll Anonymous?</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-2 mt-4">
          <button
            className="bg-blue-400 p-2 rounded-md cursor-pointer duration-300 shadow-gray-400 shadow hover:shadow-md w-full md:w-auto"
            onClick={() => {
              setOptionCount(optionCount + 1);
              setOptions([...options, ""]);
            }}
          >
            Add Option
          </button>

          <button
            className="bg-red-400 p-2 rounded-md cursor-pointer duration-300 shadow-gray-400 shadow hover:shadow-md flex justify-center items-center gap-2 text-white w-full md:w-auto"
            onClick={handleCreatePoll}
          >
            Create Poll <AiOutlineThunderbolt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;
