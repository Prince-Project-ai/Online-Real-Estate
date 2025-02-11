import React, { useCallback, useState } from "react";
import { FaRegEdit } from "react-icons/fa";


const UpdateListingModel = ({ children }) => {
  const [modelState, setModelState] = useState(false);
  const openModel = useCallback(() => {
    setModelState(true);
  }, []);

  const closeModel = useCallback(() => {
    setModelState(false);
  }, []);

  return (
    <>
      <button
        onClick={openModel}
        className="bg-green-500 text-white rounded text-xl px-2"
      >
        <FaRegEdit />
      </button>
      {modelState &&
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm flex items-center justify-center p-4">
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="bg-white overflow-hidden border-gray-300 animate-slideDown border rounded-lg shadow-lg max-w-2xl w-full relative flex flex-col max-h-[80vh]">



                {/* Modal Header (Fixed) */}
                <div className="p-3 border-b border-gray-300 flex justify-between items-center sticky top-0 bg-white z-10">
                  <h2 className="text-xl font-inter font-bold text-dark">Edit Listing</h2>
                  <button
                    onClick={closeModel}
                    className="text-gray-600 hover:border border-gray-300 bg-secondary w-7 h-7 text-center rounded-lg leading-[7px] hover:text-gray-800"
                  >
                    <i className="ri-close-fill"></i>
                  </button>
                </div>



                <div className="model-body overflow-y-auto p-4 flex-1">
                  {
                    children
                  }
                </div>

                {/* Modal Footer (Fixed) */}
                <div className="p-3 border-t border-gray-300 flex justify-end stiSavecky bottom-0 bg-white z-10">
                  <button className="bg-dark text-white px-4 text-sm py-2 rounded font-description tracking-wider">Save</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      }

    </>
  );
};

export default React.memo(UpdateListingModel);
