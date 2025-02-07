import React, { useState } from "react";
import Sidebar from "../Components/SellerComponent/Sidebar";
import Topbar from "../Components/SellerComponent/Topbar";
import Footer from "../Components/SellerComponent/Footer";
// import Sidebar from "../Components/AgentComponent/Sidebar";
// import Topbar from "../Components/AgentComponent/Topbar";
// import Footer from "../Components/AgentComponent/Footer";

const SellerLayout = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  return (
    <div className="wrapper h-screen w-full">
      <div className="flex">
        <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <main className="w-full">
          <div className="page-wrapper overflow-hidden max-h-screen h-screen flex flex-col">
            <div className="page-header">
              <Topbar setSidebarToggle={setSidebarToggle} sidebarToggle={sidebarToggle} />
            </div>
            <div className="w-full p-4 page-body bg-secondary flex-1 overflow-hidden overflow-y-auto">
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

export default React.memo(SellerLayout);
