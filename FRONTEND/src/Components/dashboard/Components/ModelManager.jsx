import React from "react";
import CreateForm from "./CreateForm";

const ModelManager = () => {
    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 overflow-y-auto bg-yellow-100">
                <div className="min-h-full flex  items-center justify-center border border-dark p-4">
                    {/* <button className="py-2 px-5 text-red-500 bg-white">Click</button>
                    <button className="py-2 px-5 text-red-500 bg-white">Click</button>
                    <button className="py-2 px-5 text-red-500 bg-white">Click</button>
                    <button className="py-2 px-5 text-red-500 bg-white">Click</button>
                    <div className="">
                        <button className="py-2 px-5 text-red-500 bg-white">Click</button>
                        <button className="py-2 px-5 text-red-500 bg-white">Click</button>                        <button className="py-2 px-5 text-red-500 bg-white">Click</button>
                    </div> */}
                    <CreateForm />
                </div>
            </div>
        </div>
    );
};

export default ModelManager;
