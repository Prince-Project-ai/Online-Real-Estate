import React from "react";

const ModelFooter = ({ closeModel }) => {
    return (
        <div className="p-3 space-x-3 border-t border-gray-200 text-end">

            <button
                type="submit"
                onClick={closeModel}
                className="font-inter py-2 text-xs px-4 tracking-wide bg-secondary text-darks rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 disabled:cursor-not-allowed hover:ring-black focus:ring-black"
            >
                cancel
            </button>
            <button
                type="submit"
                onClick={handleEvent}
                // value={}
                className="font-inter py-2 text-xs px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 disabled:cursor-not-allowed hover:ring-black focus:ring-black"
            >
                {modelInsideBtn}
            </button>

        </div>
    );
};

export default React.memo(ModelFooter);
