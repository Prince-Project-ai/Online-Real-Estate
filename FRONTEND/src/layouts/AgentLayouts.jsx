import React from "react";
import Sidebar from "../Components/AgentComponent/Sidebar";
import Topbar from "../Components/AgentComponent/Topbar";
import Footer from "../Components/AgentComponent/Footer";

const AgentLayouts = ({ children }) => {
  return (
    <div className="wrapper h-screen w-full">
      <div className="flex">
        <Sidebar />
        <main className="w-full">
          <div className="page-wrapper overflow-hidden max-h-screen h-screen flex flex-col">
            <div className="page-header">
              <Topbar />
            </div>
            <div className="w-full p-5 page-body bg-secondary flex-1 overflow-hidden overflow-y-auto">
              {children}
            </div>
            <div className="page-footer">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentLayouts;
