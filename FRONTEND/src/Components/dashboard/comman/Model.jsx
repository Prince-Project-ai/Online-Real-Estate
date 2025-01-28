import React, { useCallback, useState } from "react";

const Model = ({ lable, modelInsideBtn, ModelOutSideBtn, children }) => {
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
                className="bg-dark border py-2 px-4 rounded-lg text-white font-inter text-xs"
            >
                {ModelOutSideBtn}
            </button>
            {modelState && (
                <div className="fixed inset-0 z-50">
                    <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
                        <div className="min-h-full flex items-center justify-center border p-4">
                            <div className="bg-white animate-slideDown border rounded-lg shadow-lg max-w-md w-full relative">
                                <div className="p-3 border-b border-gray-300 flex justify-between items-center">
                                    <h2 className="text-xl font-inter font-bold text-dark">{lable}</h2>
                                    <button
                                        onClick={closeModel}
                                        className="text-gray-600 hover:border bg-secondary w-7 h-7 text-center rounded-lg leading-[7px] hover:text-gray-800"
                                    >
                                        <i className="ri-close-fill"></i>
                                    </button>
                                </div>
                                <div className="model-body p-3">
                                    {children}
                                </div>
                                {/* Modal Footer */}
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
                                        className="font-inter py-2 text-xs px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 disabled:cursor-not-allowed hover:ring-black focus:ring-black"
                                    >
                                        {modelInsideBtn}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Model;
