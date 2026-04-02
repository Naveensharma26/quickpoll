import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Const";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegThumbsUp, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";

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

  if (trendingData.length === 0) return null;

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {trendingData.map((t, i) => (
          <div
            key={t.pollId}
            className="flex flex-row items-center justify-between p-4 rounded-xl bg-white/80 hover:bg-white transition-all shadow-sm hover:shadow-md border border-white/20"
          >
            <div className="flex items-start gap-4">
              <span className="text-lg font-black text-yellow-500/50">
                {String(i + 1)}
              </span>

              <div>
                <h2 className="text-sm md:text-base font-bold text-gray-800 line-clamp-1">
                  {t.pollQuestion}
                </h2>

                <div className="flex gap-4 text-[10px] uppercase tracking-wider font-semibold text-gray-500 mt-1">
                  <span className="flex items-center gap-1.5">
                    <FaUser className="text-blue-400" /> {t.createdBy}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FaRegThumbsUp className="text-green-400" /> {t.totalVotes}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="ml-4 shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-full transition-transform active:scale-95"
              onClick={() => navigate(`/pollvote/${t.pollId}`)}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingPolls;
