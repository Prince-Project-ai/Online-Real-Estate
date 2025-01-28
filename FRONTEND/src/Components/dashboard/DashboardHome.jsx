import React, { useState, Suspense, lazy } from "react";
const Sidebar = lazy(() => import("./Sidebar"));
const Topbar = lazy(() => import("./Topbar"));
import DashContent from "./DashContent";
const Footer = lazy(() => import("./Footer"));

const DashboardHome = () => {
  const [isOpenSidebar, setisOpenSidebar] = useState(true);
  return (
    <div className="wrapper h-screen w-full">
      <div className="flex">
        <Suspense fallback={<p>Loading Sidebar..</p>}>
          {
            isOpenSidebar && <Sidebar />
          }
        </Suspense>
        {/* <Suspense>
          <Sidebar />
        </Suspense> */}
        <main className="w-full">
          <div className="page-wrapper overflow-hidden max-h-screen h-screen flex flex-col">
            <div className="page-header">
              <Suspense fallback={<p>Loading Topbar..</p>}>
                <Topbar
                  setisOpenSidebar={setisOpenSidebar}
                  isOpenSidebar={isOpenSidebar}
                />
              </Suspense>
            </div>
            <DashContent />
            <div className="page-footer">
              <Suspense fallback={<p>Loading Footer..</p>}>
                <Footer />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;
