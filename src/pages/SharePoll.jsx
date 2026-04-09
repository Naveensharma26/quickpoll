import React, { useContext, useEffect, useState } from "react";
import { FaRegClipboard, FaCheckCircle, FaRocket } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { API_BASE_URL } from "../Const";
import { ThemeContext } from "../contexts/ThemeContext";

function SharePoll() {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const location = useLocation();
  const pollId = location.state;
  const url = `${window.location.origin}/pollvote/${pollId}`;

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  useEffect(() => {
    if (!pollId) {
      // User refreshed or came here manually → send them home
      navigate("/", { replace: true });
    }
  }, [pollId, navigate]);

  return (
    <div
      className={`min-h-[calc(100vh-48px)] bg-linear-to-br flex items-center justify-center p-4 ${
        theme === "dark"
          ? "bg-linear-to-br from-blue-950 via-slate-900 to-blue-950 text-white "
          : "bg-linear-to-br from-yellow-100 to-blue-300"
      }`}
    >
      <div
        className={`${theme === "dark" ? "bg-black/30" : "bg-white"} p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 flex flex-col items-center text-center`}
      >
        <p className="text-sm text-red-500 font-semibold mb-4 ">
          ⚠️ Please note down your Poll ID — this page can't be accessed again!
        </p>

        {/* Success Icon */}
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <FaRocket className="text-blue-600 text-3xl" />
        </div>

        <h2 className="text-2xl font-bold  mb-2">Poll Created!</h2>
        <p className="text-slate-500 mb-8 text-base">
          Your poll is live. Share the link below to start gathering votes.
        </p>

        {/* Poll ID Section */}
        <div className="w-full mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider block mb-2 text-left px-1">
            Poll ID
          </span>
          <div
            className={`flex items-center justify-between ${theme === "dark" ? "bg-blue-900" : "bg-amber-50"} border border-amber-200 rounded-lg p-3 group transition-all hover:border-amber-400`}
          >
            <code
              className={`${theme === "dark" ? "text-white" : "text-amber-700"} font-mono font-bold text-xl `}
            >
              {pollId}
            </code>
            <button
              onClick={() => copyToClipboard(pollId, "id")}
              className="text-amber-600 hover:text-amber-800 transition-colors p-1"
            >
              {copiedId ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaRegClipboard />
              )}
            </button>
          </div>
        </div>

        {/* URL Section */}
        {/* URL Section */}
        <div className="w-full">
          <span
            className={`text-xs font-semibold uppercase tracking-wider block mb-2 text-left px-1 ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Share Link
          </span>

          <div
            className={`flex items-center border rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-400 ${
              theme === "dark"
                ? "bg-slate-900 border-slate-700"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <input
              readOnly
              value={url}
              className={`bg-transparent px-3 py-2 text-sm grow outline-none font-medium ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            />

            {/* Copy Button */}
            <button
              onClick={() => copyToClipboard(url, "url")}
              className={`px-4 py-3 transition-colors flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-700"
              }`}
            >
              {copiedUrl ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaRegClipboard />
              )}
            </button>

            {/* Open Link Button */}
            <button
              onClick={() => window.open(url, "_blank")}
              className={`px-3 py-3 transition-colors flex items-center border-l ${
                theme === "dark"
                  ? "bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600"
              }`}
            >
              <IoIosShareAlt />
            </button>
          </div>
        </div>
        <button
          className="mt-8 text-blue-600 font-semibold hover:underline text-sm"
          onClick={() => {
            navigate(`/pollResult/${pollId}`);
          }}
        >
          View Live Results
        </button>
      </div>
    </div>
  );
}

export default SharePoll;
