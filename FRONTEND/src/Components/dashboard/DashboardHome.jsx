import React from "react";
import DashContent from "./DashContent";

const DashboardHome = () => {
  return (
    <div className="wrapper h-screen w-full">
      <div className="flex">
        <main className="w-full">
          <div className="page-wrapper overflow-hidden max-h-screen h-screen flex flex-col">
            <DashContent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;
