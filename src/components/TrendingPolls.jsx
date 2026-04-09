import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Const";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegThumbsUp, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import { ThemeContext } from "../contexts/ThemeContext";

function TrendingPolls() {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Helper for dynamic classes based on theme
  const isDark = theme === "dark";

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
    <div className={`w-full p-4 md:p-6 rounded-2xl transition-colors duration-300 shadow-lg backdrop-blur-xl 
      ${isDark ? "bg-slate-900/60 text-white border border-white/10" : "bg-white/40 text-gray-900"}`}>
      
      {/* Header */}
      <div className={`mb-6 pb-3 border-b-2 flex items-center gap-3 ${isDark ? "border-yellow-500/50" : "border-yellow-400"}`}>
        <IoMdTrendingUp size={32} className={isDark ? "text-green-400" : "text-green-500"} />
        <h1 className={`text-xl md:text-2xl font-black ${isDark ? "text-blue-400" : "text-blue-900"}`}>
          Trending Polls
        </h1>
      </div>

      {/* Poll Grid */}
      <div className="grid grid-cols-1 gap-4">
        {trendingData.map((t, i) => (
          <div
            key={t.pollId}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl transition-all shadow-sm hover:shadow-md border gap-4
              ${isDark 
                ? "bg-slate-800/50 hover:bg-slate-800 border-white/5" 
                : "bg-white/80 hover:bg-white border-white/20"}`}
          >
            <div className="flex items-start gap-4 w-full">
              <span className={`text-lg font-black shrink-0 ${isDark ? "text-yellow-400/40" : "text-yellow-500/50"}`}>
                {String(i + 1)}
              </span>

              <div className="flex-1 min-w-0">
                <h2 className={`text-base md:text-lg font-bold leading-tight ${isDark ? "text-slate-100" : "text-gray-800"}`}>
                  {t.pollQuestion}
                </h2>
                <div className={`flex gap-4 text-[10px] uppercase tracking-wider font-semibold mt-2 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  <span className="flex items-center gap-1.5">
                    <FaUser className="text-blue-400" /> {t.createdBy}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaRegThumbsUp className="text-green-400" /> {t.totalVotes}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons - Keep branding colors but tweak hover states */}
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
