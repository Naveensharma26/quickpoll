import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "../Const";
import Loader from "../components/Loader";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaTrophy } from "react-icons/fa";

function PollResult() {
  const { id } = useParams();

  const [pollData, setPollData] = useState({});
  const [pollOptionData, setPollOptionData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        setShowLoader(true);

        const res = await axios.get(`${API_BASE_URL}/getPollById/${id}`);
        const response = await axios.get(`${API_BASE_URL}/getOptions/${id}`);

        // ✅ Directly use response (already camelCase)
        setPollData(res.data);
        setPollOptionData(response.data);
      } catch (error) {
        console.error("Error fetching vote data:", error);
      } finally {
        setShowLoader(false);
      }
    };

    fetchVoteData();
  }, [id]);

  const totalVotes = pollOptionData.reduce(
    (sum, option) => sum + option.voteCount,
    0,
  );

  return (
    <div
      className={`min-h-[calc(100vh-48px)] pt-6 md:pt-10 bg-linear-to-br  px-3 md:px-0 ${
        theme === "dark"
          ? "bg-linear-to-br from-blue-950 via-slate-900 to-blue-950 text-white "
          : "bg-linear-to-br from-yellow-100 to-blue-300"
      }`}
    >
      <div
        className={`w-full md:w-4/6 p-4 md:p-6 m-auto rounded-xl ${theme === "dark" ? "bg-black border-white border" : "bg-white"}`}
      >
        <h1
          className={`text-xl md:text-2xl flex justify-center items-center font-bold gap-2 `}
        >
          Poll Result
          <FaTrophy className="text-yellow-400 " />
        </h1>

        {/* Question */}
        <div
          className={`flex flex-col md:flex-row items-start md:items-center border border-gray-300 ${theme === "dark" ? "bg-blue-950" : "bg-blue-100"} rounded-md overflow-hidden mt-6 md:mt-10 justify-between gap-2 md:gap-0  md:pr-2`}
        >
          <div className="flex w-full">
            <h1 className="bg-blue-500 text-white p-2 w-10 md:w-12 flex justify-center items-center">
              Q
            </h1>

            <input
              type="text"
              className="w-full outline-none p-2 text-sm md:text-base"
              value={pollData.pollQuestion || ""}
              disabled
            />
          </div>

          <div className="text-sm md:text-base font-medium  w-40">
            Total Votes : {totalVotes}
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col md:flex-row justify-between items-start mt-5 gap-5">
          {/* Left: Options */}
          <div className="flex flex-col w-full md:w-6/12 gap-2">
            {pollOptionData.map((p, i) => (
              <div
                className={`flex items-center border rounded-md overflow-hidden ${theme === "dark" ? "border-white/20" : "border-gray-300"}`}
              >
                <h1
                  className={`${theme === "dark" ? "bg-yellow-600 text-black" : "bg-yellow-400"} p-2 w-10 md:w-12 flex justify-center items-center font-black`}
                >
                  {i + 1}
                </h1>

                <div className="flex justify-between w-full items-center">
                  <input
                    type="text"
                    className={`w-full outline-none p-2 text-sm md:text-base bg-transparent ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                    value={p.pollOptionName}
                    readOnly
                  />
                  <h1 className="p-2 text-sm md:text-base font-bold">
                    {p.voteCount}
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full md:w-5/12 gap-2">
            {pollOptionData.map((p, i) => {
              const percent = totalVotes ? (p.voteCount * 100) / totalVotes : 0;

              return (
                <div key={i} className="flex items-center gap-2 w-full">
                  <div
                    className={`flex-1 ${theme === "dark" ? "bg-slate-600" : "bg-gray-300"}  rounded overflow-hidden`}
                  >
                    <div
                      className={`h-6 md:h-10 ${theme === "dark" ? "bg-yellow-600" : "bg-yellow-400"} rounded transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <h1 className="w-10 text-right text-xs md:text-sm">
                    {percent.toFixed(1)}%
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Loader open={showLoader} />
    </div>
  );
}

export default PollResult;
