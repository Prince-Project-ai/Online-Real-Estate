import React, { useEffect, useState } from 'react';
import { TiStarFullOutline } from "react-icons/ti";
import { useAuth } from '../../../Contexts/AuthContext';
import { useMessage } from "../../../Contexts/MessageContext";
import { addReviewByProduct } from '../../../Api/website/HandleUserApi';
import { useParams } from 'react-router-dom';

const AddReviewForm = () => {
  const { currentAuth } = useAuth();
  const { showToast } = useMessage();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('rating', rating);
      formData.append('comment', comment);
      formData.append('avatar', currentAuth?.avatar);
      formData.append('name', currentAuth?.fullName);

      const reponse = await addReviewByProduct(formData, data);
      if (reponse?.success) {
        showToast('Review added successfully', 'success');
        setRating(0);
        setComment('');
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };


  const [toggleButton, setToggleButton] = useState(false);
  const handleHideButtons = () => {
    if (comment.length > 0) return;
    setToggleButton(!toggleButton);
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

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto"; // Reset height to auto before recalculating
    event.target.style.height = event.target.scrollHeight + "px"; // Set new height
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 px-0 rounded-lg w-full mx-auto">
      {/* User Profile & Input */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 self-start rounded-full border border-dark overflow-hidden">
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
                isLoading ? 'Comment...' : 'Commnet'
              }

            </button>

          </div>
        )
      }
    </form>
  );
};

export default React.memo(AddReviewForm);
