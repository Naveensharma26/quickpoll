import React, { useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useNavigate } from "react-router";

function ExpiredPopup({ open }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl transition-all">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <AiOutlineClockCircle className="text-4xl text-blue-500" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900">Poll Expired</h3>
        <p className="mt-2 text-gray-500">
          This poll is no longer accepting votes. Thank you for your interest!
        </p>

        <div className="mt-8">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition-colors hover:bg-red-600 active:bg-red-700"
          >
            Go Back
          </button>
        </div>

        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-50 opacity-50"></div>
      </div>
    </div>
  );
}

export default ExpiredPopup;
