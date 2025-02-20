import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { TiStarFullOutline } from "react-icons/ti";
import { updateReview } from "../../../Api/website/HandleUserApi";
import { useCurrentData } from "../../../Contexts/UserContext";
import { useMessage } from "../../../Contexts/MessageContext";


const EditReview = ({ review, setOpenDropdownIndex }) => {

  const { currentAuth } = useAuth();
  const { showToast } = useMessage();
  const { isEdited, setIsEdited, setReviews } = useCurrentData();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const handleHideButtons = () => {
    if (comment.length > 0) return;
    setToggleButton(!toggleButton);
  }

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto"; // Reset height to auto before recalculating
    event.target.style.height = event.target.scrollHeight + "px"; // Set new height
  };

  const handleUpdateSubmit = async (e) => {
    setIsLoading(true);
    setIsDisabled(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('rating', rating);
      formData.append('comment', comment);
      formData.append('avatar', currentAuth?.avatar);
      formData.append('name', currentAuth?.fullName);
      const response = await updateReview(isEdited, formData);
      if (response?.success) {
        showToast(response?.message, "success");
        setIsEdited(null);
        setReviews((prev) => ([...prev, response?.data]));
        setOpenDropdownIndex(null);
      }
    } catch (error) {
      console.error(error);
      showToast(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (comment.length > 8) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    return () => {
      if (comment.length > 8) {
        setIsDisabled(false);
      }
    };
  }, [comment]);
  return (
    <form onSubmit={handleUpdateSubmit} className="rounded-lg w-full mx-auto">
      {/* User Profile & Input */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 self-start rounded-full border border-dark overflow-hidden">
          <img src={currentAuth.avatar} className="h-full w-full object-cover" alt="User" />
        </div>
        <textarea
          className="flex-1 border-b border-gray-300 focus:border-dark outline-none p-2 text-sm resize-none overflow-hidden"
          placeholder="Write your review..."
          onFocus={() => setToggleButton(true)}
          onBlur={handleHideButtons}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            adjustTextareaHeight(e);
          }}
          rows={1} // Initial row count
        ></textarea>
      </div>

      <div className="flex items-center justify-end mb-2">
        {/* Star Rating */}
        <div className="text-center">
          {/* <p className="text-gray-700 font-medium mb-2">Rate Your Experience</p> */}
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition-transform transform ${star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300'}`}
              >
                <TiStarFullOutline />
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Buttons */}
      {
        toggleButton && (
          <div className="flex justify-end space-x-3 mt-3">

            <button
              type="button"
              className="text-dark font-inter tracking-wide"
              onClick={() => {
                setRating(0);
                setComment('');
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isDisabled || isLoading}
              className="bg-dark disabled:opacity-35 text-sm text-white px-4 py-2 rounded font-inter tracking-wide"
            >
              {
                isLoading ? 'Saving...' : 'Save'
              }

            </button>

          </div>
        )
      }
    </form>
  );
};

export default EditReview;
