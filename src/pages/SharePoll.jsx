import React, { useState } from "react";
import { FaRegClipboard, FaCheckCircle, FaRocket } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { API_BASE_URL } from "../Const";

function SharePoll() {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

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

  return (
    <div className="min-h-[calc(100vh-50px)] bg-linear-to-br from-yellow-100 to-blue-300  flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <FaRocket className="text-blue-600 text-3xl" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Poll Created!
        </h2>
        <p className="text-slate-500 mb-8 text-base">
          Your poll is live. Share the link below to start gathering votes.
        </p>

        {/* Poll ID Section */}
        <div className="w-full mb-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2 text-left px-1">
            Poll ID
          </span>
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-3 group transition-all hover:border-amber-400">
            <code className="text-amber-700 font-mono font-bold text-xl">
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
        <div className="w-full">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2 text-left px-1">
            Share Link
          </span>
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 transition-all">
            <input
              readOnly
              value={url}
              className="bg-transparent px-3 py-2 text-sm text-slate-600 grow outline-none font-medium"
            />
            <button
              onClick={() => copyToClipboard(url, "url")}
              className="bg-slate-200 hover:bg-slate-300 px-4 py-3 transition-colors flex items-center gap-2"
            >
              {copiedUrl ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <IoIosShareAlt className="text-slate-700" />
              )}
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
