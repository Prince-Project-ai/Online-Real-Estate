import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashContent from "./DashContent";
import Footer from "./Footer";

const AgenetHome = () => {
//   const [isOpenSidebar, setisOpenSidebar] = useState(true);
  return (
    <div className="wrapper h-screen w-full">
      <div className="flex">
        <Sidebar />
        {/* <Suspense>
          <Sidebar />
        </Suspense> */}
        <main className="w-full">
          <div className="page-wrapper overflow-hidden max-h-screen h-screen flex flex-col">
            <div className="page-header">
              <Topbar
              // setisOpenSidebar={setisOpenSidebar}
              // isOpenSidebar={isOpenSidebar}
              />
            </div>
            <DashContent />
            <div className="page-footer">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgenetHome;
