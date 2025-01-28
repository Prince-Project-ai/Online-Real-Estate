import React from "react";

const CreateForm = ({ onClose }) => {
  return (
    <>
      <div className="bg-white animate-tada rounded-lg shadow-lg max-w-md w-full relative">
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-inter font-bold text-dark">
            Create Form
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 bg-secondary w-7 h-7 text-center rounded-lg leading-[7px] hover:text-gray-800"
          >
            <i className="ri-close-fill"></i>
          </button>
        </div>
        <div className="p-6">
          <form></form>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 tracking-wide animate-tada bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 disabled:cursor-not-allowed hover:ring-black focus:ring-black"
          >
            Add New
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(CreateForm);
