import React, { useState } from "react";

const Topbar = ({ setisOpenSidebar, isOpenSidebar }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
          <div className="toggle-menu cursor-pointer">
            <button onClick={() => setIsOpenDrawer((prev) => (!prev))} className="text-[18px] me-2">Super Admin</button>
            <i className="ri-arrow-down-wide-fill"></i>
          </div>
        </div>
      </header>
      <div className={`${isOpenDrawer ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'}  pointer-events-auto duration-300 border-gray-300 border shadow-lg bg-white right-6 rounded-t-none border-t-0 rounded-lg left-auto w-1/4 top-auto absolute`}>
        <ul className="p-3 w-full">
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
        </ul>
      </div>
    </>
  );
};

export default React.memo(Topbar);
