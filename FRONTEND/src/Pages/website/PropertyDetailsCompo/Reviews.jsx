import React, { useRef, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useCurrentData } from '../../../Contexts/UserContext';
import { useAuth } from '../../../Contexts/AuthContext';
import EditReview from './EditReview';


const Review = ({ review, onToggleDropdown, isOpen, dropdownRef, setOpenDropdownIndex }) => {
  const { currentAuth } = useAuth();
  const { handleDelete, handleEditReview } = useCurrentData();
  return (
    <div className="bg-white rounded-md p-4 border-b-4 mb-2 border-2">
      <div className="flex w-full items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src={review.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold">{review.name}</h3>
            <p className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex text-yellow-500">
          {[...Array(review.rating)].map((_, index) => (
            <span key={index} className="text-lg"><FaStar /></span>
          ))}
        </div>
      </div>
      <div className="w-full relative">
        <div className="flex items-center justify-between">
          <p className="text-sm w-full">{review.comment}</p>
          {
            currentAuth._id === review.userId && (
              <div
                className="action self-start m-1 w-9 flex items-center justify-center h-9 rounded-full border hover:bg-secondary cursor-pointer"
                onClick={onToggleDropdown}
                ref={dropdownRef} // Reference for positioning
              >
                <CiMenuKebab />
              </div>
            )
          }
        </div>
        {isOpen && (
          <div className="absolute z-10 right-0 w-32 bg-white border rounded-lg shadow-lg">
            <ul className="py-1">
              <li
                role="button"
                onClick={(e) => handleEditReview(e, review._id)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>

              <li
                role="button"
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={() => {
                  handleDelete(review._id);
                  setOpenDropdownIndex(null);
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Reviews = () => {
  const { reviews, isEdited } = useCurrentData();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };


  return (
    <div className="container mx-auto space-y-1">
      {reviews.map((review, index) => (
        <div key={review._id}>
          {
            isEdited === review._id ? (<EditReview setOpenDropdownIndex={setOpenDropdownIndex} review={review} />) : (<Review
              key={review._id}
              review={review}
              isOpen={openDropdownIndex === index}
              onToggleDropdown={() => toggleDropdown(index)}
              dropdownRef={dropdownRef}
              setOpenDropdownIndex={setOpenDropdownIndex}
            />)
          }
        </div>
      )
      )}

    </div>
  );
};

export default React.memo(Reviews);
