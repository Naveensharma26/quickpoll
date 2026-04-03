import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Const";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegThumbsUp, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loader from "./Loader";

function TrendingPolls() {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);

        const resp = await axios.get(`${API_BASE_URL}/getTrendingPolls`);

        setTrendingData(resp.data);
      } catch (err) {
        console.error("Error fetching trending polls", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (trendingData.length === 0) return;
  return (
    <div className="w-full p-4 md:p-6 rounded-2xl bg-white/40 backdrop-blur-xl shadow-lg">
      {/* Header */}
      <div className="mb-6 border-yellow-400 pb-3 border-b-2 flex items-center gap-3">
        <IoMdTrendingUp size={32} className="text-green-500" />
        <h1 className="text-xl md:text-2xl font-black text-blue-900">
          Trending Polls
        </h1>
      </div>

      {/* Poll Grid */}
      <div className="grid grid-cols-1  gap-4">
        {trendingData.map((t, i) => (
          <div
            key={t.pollId}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-white/80 hover:bg-white transition-all shadow-sm hover:shadow-md border border-white/20 gap-4"
          >
            <div className="flex items-start gap-4 w-full">
              <span className="text-lg font-black text-yellow-500/50 shrink-0">
                {String(i + 1)}
              </span>

              <div className="flex-1 min-w-0">
                {" "}
                 <h2 className="text-base md:text-lg font-bold text-gray-800 leading-tight">
                  {t.pollQuestion}
                </h2>
                <div className="flex gap-4 text-[10px] uppercas e tracking-wider font-semibold text-gray-500 mt-2">
                  <span className="flex items-center gap-1.5">
                    <FaUser className="text-blue-400" /> {t.createdBy}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaRegThumbsUp className="text-green-400" /> {t.totalVotes}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 w-full md:w-auto">
              <button
                className="flex-1 md:flex-none bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-transform active:scale-95"
                onClick={() => navigate(`/pollResult/${t.pollId}`)}
              >
                Results
              </button>
              <button
                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-transform active:scale-95"
                onClick={() => navigate(`/pollvote/${t.pollId}`)}
              >
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
      <Loader open={loading} />
    </div>
  );
}

export default TrendingPolls;
