import React, { useCallback, useState } from "react";


const Model = ({ children, ModelOutSideBtn, ModelLable, modelActionValue }) => {
  const [modelState, setModelState] = useState(false);

  const openModel = useCallback(() => {
    setModelState(true);
  }, []);

  const closeModel = useCallback(() => {
    setModelState(false);
  }, []);

  const handlePrimaryEvent = (e) => {
    e.preventDefault();
    // switch (key) {
    //   case value:

    //     break;

    //   default:
    //     break;
    // }
    console.log(e.target.value);
  }



  return (
    <>
      <button
        onClick={openModel}
        className="bg-dark border py-2 px-4 rounded-lg text-white font-inter text-xs"
      >
        {ModelOutSideBtn}
      </button>
      {modelState ? (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="bg-white border-gray-300 animate-slideDown border rounded-lg shadow-lg max-w-md w-full relative">
                {/* model header */}
                <div className="p-3 border-b border-gray-300 flex justify-between items-center" >
                  <h2 className="text-xl font-inter font-bold text-dark">{ModelLable}</h2>
                  <button
                    onClick={closeModel}
                    className="text-gray-600 hover:border border-gray-300 bg-secondary w-7 h-7 text-center rounded-lg leading-[7px] hover:text-gray-800"
                  >
                    <i className="ri-close-fill"></i>
                  </button>
                </div>
                {
                  children
                }
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Model;
