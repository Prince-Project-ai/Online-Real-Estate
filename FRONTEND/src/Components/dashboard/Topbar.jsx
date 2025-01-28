import React, { useState } from "react";

const Topbar = ({ setisOpenSidebar, isOpenSidebar }) => {
  return (
    <>
      <header className="relative w-full h-12 py-3 border-b border-gray-300 flex justify-between items-center px-5">
        <div className="toggle-bar">
          <button
            onClick={() => setisOpenSidebar((prev) => (!prev))}
            className="h-8 w-8 bg-secondary text-xl rounded-lg"><i className={`${isOpenSidebar ? 'ri-xrp-line' : 'ri-menu-4-fill'}`}></i></button>
        </div>
        <div className="profile flex items-center space-x-2">
          <button className="profile-img h-8 w-8 bg-secondary text-xl rounded-lg">
            <i className="ri-user-3-line"></i>
          </button>
          <div className="toggle-menu">
            <h2 className="text-[18px] font-inter me-2">Super Admin</h2>
          </div>
        </div>
      </header>
    </>
  );
};

export default React.memo(Topbar);
