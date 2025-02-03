import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";

const Topbar = () => {
  const { currentAuth } = useAuth();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <>
      <header className="relative w-full h-12 py-3 border-b border-gray-300 flex justify-between items-center px-5">
        <div className="toggle-bar">
          <button>
            sd agent
          </button>
        </div>
        <div className="profile flex items-center space-x-2">
          <button className="profile-img relative h-9 w-9 bg-secondary text-xl rounded-lg">
            <i className="ri-user-3-line"></i>
            <span className="live absolute -top-[1px] -right-3px h-2 rounded-full border-2 border-white w-2 bg-green-600"></span>
          </button>
          <div className="cursor-pointer">
            <div className="name-role leading-4 font-inter"><p className="font-inter">{currentAuth?.fullName}</p><p className="role font-inter text-xs text-zinc-500">{currentAuth?.role}</p></div>
          </div>
        </div>
      </header>
      {/* <div
        className={`${
          isOpenDrawer
            ? "translate-y-0 opacity-100"
            : "-translate-y-3 opacity-0 pointer-events-none"
        }  pointer-events-auto duration-300 border-gray-300 border shadow-lg bg-white right-6 rounded-t-none border-t-0 rounded-lg left-auto w-1/4 top-auto absolute`}
      >
        <ul className="p-3 w-full">
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
        </ul>
      </div> */}
    </>
  );
};

export default React.memo(Topbar);
