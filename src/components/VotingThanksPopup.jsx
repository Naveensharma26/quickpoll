import { IoMdCheckmarkCircleOutline, IoMdCloseCircle } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

function VotingThanksPopup({ open }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 px-3">
      <div className="bg-green-400 p-5 md:p-6 rounded-xl w-full max-w-sm border-white border-2 flex flex-col justify-center items-center text-center">
        <h1 className="text-lg md:text-xl font-bold">Thanks for voting</h1>

        <IoMdCheckmarkCircleOutline className="mt-2" size={40} />

        <h1 className="mt-1 text-sm md:text-base">Your Vote is recorded</h1>

        <button
          className="bg-yellow-300 px-4 py-2 flex items-center justify-center gap-2 mt-4 shadow-sm cursor-pointer hover:shadow-md duration-300 w-full md:w-auto rounded-md"
          onClick={handleBackClick}
        >
          <IoArrowBackCircleOutline size={22} />
          Back to Home Page
        </button>
      </div>
    </div>
  );
}

export default VotingThanksPopup;
