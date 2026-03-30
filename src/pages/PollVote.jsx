import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AiOutlineThunderbolt } from "react-icons/ai";
import VotingThanksPopup from "../components/VotingThanksPopup";
import { API_BASE_URL } from "../Const";
import Loader from "../components/Loader";

function PollVote() {
  const { id } = useParams();
  const [pollData, setPollData] = useState({});
  const [votedBy, setVotedBy] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [showThanksPopup, setShowThanksPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

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
    if (pollData.is_anonymous === "Y" && selectedOption) {
      setDisableSubmit(false);
    } else if (pollData.is_anonymous === "N" && votedBy && selectedOption) {
      setDisableSubmit(false);
    }
  }, [selectedOption, votedBy, pollData]);

  const handleSubmitClick = async () => {
    if (disableSubmit) return;

    setDisableSubmit(true);
    setShowLoader(true);
    const poll = pollOptions.find((p) => p.poll_option_name === selectedOption);

    const data = {
      poll_option_name: selectedOption,
      poll_option_id: poll?.poll_options_id,
      voted_by: poll?.is_anonymous === "Y" ? "" : votedBy,
      poll_id: id,
    };

    await axios.post(`${API_BASE_URL}/voteOption`, data);

    const data2 = {
      poll_options_id: poll?.poll_options_id,
      pollId: id,
      vote_count: poll?.vote_count + 1,
    };

    await axios.put(`${API_BASE_URL}/updateCount`, data2);

    localStorage.setItem(`voted_${id}`, "Y");
    setShowLoader(false);
    setShowThanksPopup(true);
  };

  useEffect(() => {
    const loc = localStorage.getItem(`voted_${id}`);
    if (loc === "Y") {
      setShowThanksPopup(true);
    }
  }, [id]);

  return (
    <div className="mt-10 md:mt-20 bg-gray-50 min-h-screen px-3">
      <div className="w-full md:w-4/6 p-4 md:p-6 m-auto bg-white border-slate-100 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <h1 className="text-lg md:text-2xl text-blue-600 font-bold">
            Poll Name {pollData.poll_name}
          </h1>
          <h1 className="text-gray-600 text-sm md:text-base">
            Created By : {pollData.created_by}
          </h1>
          <h1 className="text-gray-600 text-sm md:text-base">
            Created On : {pollData.created_at}
          </h1>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          {pollData?.is_anonymous === "N" && (
            <div className="w-full md:w-fit border-2 border-blue-500 rounded-md">
              <input
                type="text"
                id="name"
                value={votedBy}
                onChange={(e) => setVotedBy(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full p-2 outline-none focus:ring-2 focus:ring-blue-300 rounded-md text-sm md:text-base"
              />
            </div>
          )}

          <div className="flex flex-row items-center md:items-center border border-gray-300 bg-blue-100 rounded-md overflow-hidden">
            <h1 className="bg-blue-500 text-white p-2 w-10 md:w-10 flex justify-center items-center">
              Q
            </h1>
            <input
              type="text"
              className="w-full outline-none p-2 bg-blue-50 text-sm md:text-base"
              value={pollData.poll_question}
              disabled
            />
          </div>

          {/* Options */}
          {pollOptions.map((p, i) => (
            <div
              key={i}
              className="flex items-center border border-gray-300 rounded-md overflow-hidden"
            >
              <h1 className="bg-yellow-400 p-2 w-10 md:w-12 flex justify-center items-center font-medium">
                {i + 1}
              </h1>

              <input
                type="text"
                className={`w-full outline-none p-2 cursor-pointer transition-all duration-200 text-sm md:text-base
              ${
                selectedOption === p.poll_option_name
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-blue-100"
              }`}
                onClick={(e) => setSelectedOption(e.target.value)}
                value={p.poll_option_name}
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex mt-4">
          <button
            disabled={disableSubmit}
            className={`w-full md:w-auto p-2 px-4 rounded-md transition-all duration-200
          ${
            disableSubmit
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow"
          }`}
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </div>
      </div>

      <VotingThanksPopup open={showThanksPopup} />
      <Loader open={showLoader} />
    </div>
  );
}

export default PollVote;
