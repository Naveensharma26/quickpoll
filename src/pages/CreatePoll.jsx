import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { AiOutlineThunderbolt } from "react-icons/ai";
import axios from "axios";
import { API_BASE_URL } from "../Const";
import Loader from "../components/Loader";

function CreatePoll() {
  const location = useLocation();
  const pollData = location.state;
  const navigate = useNavigate();

  const [optionCount, setOptionCount] = useState(2);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [duration, setDuration] = useState(24);
  const [createDisabled, setIsCreateDisabled] = useState(true);

  const handleCreatePoll = async () => {
    const finalData = {
      ...pollData,
      pollQuestion: question,
      isAnonymous: isPublic || isAnonymous ? "Y" : "N",
      isPublic: isPublic ? "Y" : "N",
      duration: duration,
    };

    try {
      setShowLoader(true);

      const response = await axios.post(`${API_BASE_URL}/addPoll`, finalData);

      const optionsData = options.map((opt) => ({
        pollOptionName: opt,
        pollId: response.data.pollId,
        voteCount: 0,
      }));

      await axios.post(`${API_BASE_URL}/addOptions`, optionsData);

      navigate("/sharePoll", { state: response.data.pollId });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    // Check if all options have non-empty text
    const allOptionsFilled = options.every((opt) => opt.trim() !== "");

    if (question.trim() && options.length > 1 && allOptionsFilled && duration) {
      setIsCreateDisabled(false);
    } else {
      setIsCreateDisabled(true);
    }
  }, [question, options, duration]);

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-yellow-100 to-blue-300 px-3 min-h-[calc(100vh-48px)]">
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
          <div className="flex flex-row gap-2 mt-2">
            <span className="text-gray-700 text-sm md:text-base">
              Poll Duration ?
            </span>
            <div className="flex flex-wrap gap-2">
              {["6", "12", "24", "0"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setDuration(time)}
                  className={`px-4 py-1.5 rounded-md text-sm transition-all duration-200 border ${duration == time ? "bg-blue-400" : ""}`}
                >
                  {time === "0" ? "Never" : `${time} Hours`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4  border-t border-gray-100">
            {/* Public Poll Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm md:text-base">
                Public Poll?
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex gap-2 items-center text-sm md:text-base">
              <input
                type="checkbox"
                id="anonymous"
                className={`h-4 w-4 accent-blue-500 ${isPublic ? "opacity-50 cursor-not-allowed" : ""}`}
                checked={isPublic || isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <label
                htmlFor="anonymous"
                className="text-gray-700 cursor-pointer"
              >
                Keep Poll Anonymous?
              </label>
            </div>
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
            className={`p-2 rounded-md cursor-pointer duration-300 shadow-gray-400 shadow hover:shadow-md flex justify-center items-center gap-2 text-white w-full md:w-auto ${createDisabled ? "bg-gray-400 cursor-not-allowed " : "bg-red-400 "}`}
            onClick={handleCreatePoll}
            disabled={createDisabled}
          >
            Create Poll <AiOutlineThunderbolt />
          </button>
        </div>
      </div>
      <Loader open={showLoader} />
    </div>
  );
}

export default CreatePoll;
