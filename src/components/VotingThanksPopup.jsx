import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function VotingThanksPopup({ open }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleBackClick = () => {
    navigate("/");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm px-3 z-50">
      <div
        className={`p-6 md:p-8 rounded-2xl w-full max-w-sm border-2 flex flex-col justify-center items-center text-center shadow-2xl transition-all
        ${
          theme === "dark"
            ? "bg-slate-900 border-green-500/50 text-white"
            : "bg-green-500 border-white text-white"
        }`}
      >
        {/* Success Icon with Pulse effect */}
        <div
          className={`p-3 rounded-full mb-4 ${theme === "dark" ? "bg-green-500/20" : "bg-white/20"}`}
        >
          <IoMdCheckmarkCircleOutline
            size={50}
            className={theme === "dark" ? "text-green-400" : "text-white"}
          />
        </div>

        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
          Thanks for voting!
        </h1>

        <p
          className={`mt-2 text-sm md:text-base font-medium ${theme === "dark" ? "text-slate-400" : "text-green-50"}`}
        >
          Your response has been successfully recorded.
        </p>

        <button
          className={`group flex items-center justify-center gap-2 mt-8 px-6 py-3 duration-300 w-full md:w-auto rounded-xl font-bold shadow-lg active:scale-95
          ${
            theme === "dark"
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-yellow-400 hover:bg-yellow-300 text-black"
          }`}
          onClick={handleBackClick}
        >
          <IoArrowBackCircleOutline
            size={24}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default VotingThanksPopup;
