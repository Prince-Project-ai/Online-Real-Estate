import React, { useState } from "react";
import { useAdminAuth } from "../Contexts/ADMIN/AdminAuthContext";
import Sidebar from "../Components/dashboard/Sidebar";
import Topbar from "../Components/dashboard/Topbar";
import Footer from "../Components/dashboard/Footer";

const DashboardLayouts = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  const { isAdminAuthenticated } = useAdminAuth();
  if (!isAdminAuthenticated) return (<div className="dashboard-layout">
    {children}
  </div>)


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

export default DashboardLayouts;
