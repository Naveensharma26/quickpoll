import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AiOutlineThunderbolt } from "react-icons/ai";
import VotingThanksPopup from "../components/VotingThanksPopup";
import { API_BASE_URL } from "../Const";
import Loader from "../components/Loader";
import ExpiredPopup from "../components/ExpiredPopup";
import { ThemeContext } from "../contexts/ThemeContext";

function PollVote() {
  const { id } = useParams();
  const [pollData, setPollData] = useState({});
  const [votedBy, setVotedBy] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [showThanksPopup, setShowThanksPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isPollExpired, setIsPollExpired] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoader(true);
        const res = await axios.get(`${API_BASE_URL}/getPollById/${id}`);
        const res2 = await axios.get(`${API_BASE_URL}/getOptions/${id}`);
        setPollData(res.data);
        setPollOptions(res2.data);
      } catch (err) {
        console.error(err);
      } finally {
        setShowLoader(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!isPollExpired && pollData.isAnonymous === "Y" && selectedOption) {
      setDisableSubmit(false);
    } else if (pollData.isAnonymous === "N" && votedBy && selectedOption) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [selectedOption, votedBy, pollData, isPollExpired]);

  const handleSubmitClick = async () => {
    if (disableSubmit) return;
    setDisableSubmit(true);
    setShowLoader(true);
    const poll = pollOptions.find((p) => p.pollOptionsId === selectedOption);

    const data = {
      pollOptionName: selectedOption,
      pollOptionsId: poll?.pollOptionsId,
      votedBy: pollData?.isAnonymous === "Y" ? "" : votedBy,
      pollId: id,
    };

    await axios.post(`${API_BASE_URL}/vote`, data);
    localStorage.setItem(`voted_${id}`, "Y");
    setShowLoader(false);
    setShowThanksPopup(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const getTimeLeft = (expiry) => {
    if (!expiry) return "Never ends";
    const now = new Date();
    const exp = new Date(expiry);
    const diffMs = exp - now;
    if (diffMs <= 0) return "Expired";
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (minutes < 60) return `${minutes} min`;
    if (hours < 24) return `${hours} hr`;
    return `${days} d`;
  };

  const checkIsExpired = (expiry) => {
    if (!expiry) return false;
    const now = new Date();
    const exp = new Date(expiry);
    return exp <= now;
  };

  useEffect(() => {
    const loc = localStorage.getItem(`voted_${id}`);
    if (loc === "Y") {
      setShowThanksPopup(true);
    }
  }, [id]);

  useEffect(() => {
    setIsPollExpired(checkIsExpired(pollData.expiresAt));
  }, [pollData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPollExpired(checkIsExpired(pollData.expiresAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [pollData]);

  return (
    <div
      className={`min-h-[calc(100vh-48px)] pt-10 md:pt-20 px-3 ${
        theme === "dark"
          ? "bg-linear-to-br from-blue-950 via-slate-900 to-blue-950 text-white"
          : "bg-linear-to-br from-yellow-100 to-blue-300"
      }`}
    >
      <div
        className={`w-full md:w-4/6 p-4 md:p-6 m-auto rounded-xl shadow-md ${
          theme === "dark" ? "bg-black border-white border" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <h1 className="text-lg md:text-2xl text-blue-500 font-bold">
            {pollData.pollName}
          </h1>
          <div className="flex flex-col md:items-end">
            <h1
              className={`${theme === "dark" ? "text-slate-400" : "text-gray-600"} text-sm md:text-base`}
            >
              Created By : {pollData.createdBy}
            </h1>
            <h1
              className={`${theme === "dark" ? "text-slate-400" : "text-gray-600"} text-sm md:text-base`}
            >
              Created On : {formatDate(pollData.createdAt)}
            </h1>
          </div>
        </div>

        {pollData.expiresAt && !isPollExpired && (
          <div className="flex flex-row justify-start my-2 md:justify-end text-red-500 font-medium">
            <h1>Poll expires in : {getTimeLeft(pollData.expiresAt)}</h1>
          </div>
        )}

        {isPollExpired && (
          <div className="flex flex-row justify-center text-red-500 font-bold my-4">
            <h1>POLL IS EXPIRED, CAN'T VOTE NOW</h1>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-6">
          {pollData?.isAnonymous === "N" && (
            <div
              className={`w-full md:w-fit border-2 border-blue-500 rounded-md overflow-hidden ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}
            >
              <input
                type="text"
                id="name"
                value={votedBy}
                onChange={(e) => setVotedBy(e.target.value)}
                placeholder="Enter Your Name"
                className={`w-full p-2 outline-none text-sm md:text-base bg-transparent ${theme === "dark" ? "text-white" : "text-black"}`}
              />
            </div>
          )}

          {/* Question Box */}
          <div
            className={`flex flex-row items-center border rounded-md overflow-hidden ${
              theme === "dark"
                ? "bg-blue-950 border-gray-600"
                : "bg-blue-100 border-gray-300"
            }`}
          >
            <h1 className="bg-blue-500 text-white p-2 w-10 md:w-12 flex justify-center items-center font-bold">
              Q
            </h1>
            <input
              type="text"
              className={`w-full outline-none p-2 text-sm md:text-base bg-transparent ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              value={pollData.pollQuestion || ""}
              disabled
            />
          </div>

          {/* Options List */}
          {pollOptions.map((p, i) => (
            <div
              key={i}
              className={`flex items-center border rounded-md overflow-hidden transition-all duration-200 ${
                theme === "dark" ? "border-white/20" : "border-gray-300"
              }`}
            >
              <h1
                className={`${
                  theme === "dark"
                    ? "bg-yellow-600 text-black"
                    : "bg-yellow-400 text-black"
                } p-2 w-10 md:w-12 flex justify-center items-center font-black`}
              >
                {i + 1}
              </h1>

              <button
                type="button"
                className={`w-full text-left outline-none p-2 transition-all duration-200 text-sm md:text-base font-medium
                  ${
                    selectedOption === p.pollOptionsId
                      ? "bg-blue-500 text-white"
                      : theme === "dark"
                        ? "bg-transparent text-white hover:bg-white/10"
                        : "bg-white text-gray-800 hover:bg-blue-50"
                  }`}
                onClick={() =>
                  !isPollExpired && setSelectedOption(p.pollOptionsId)
                }
              >
                {p.pollOptionName}
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex mt-8">
          <button
            disabled={disableSubmit}
            className={`w-full md:w-auto p-2 px-8 rounded-md font-bold transition-all duration-200 shadow-md
              ${
                disableSubmit
                  ? theme === "dark"
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
              }`}
            onClick={handleSubmitClick}
          >
            Submit Vote
          </button>
        </div>
      </div>

      <VotingThanksPopup open={showThanksPopup} />
      <Loader open={showLoader} />
      <ExpiredPopup open={isPollExpired} />
    </div>
  );
}

export default PollVote;
