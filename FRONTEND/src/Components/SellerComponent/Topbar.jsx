import React from "react";
import { useAuth } from "../../Contexts/AuthContext";

const Topbar = ({ setSidebarToggle, sidebarToggle }) => {
  const { currentAuth } = useAuth();
  return (
    <header className="relative w-full h-12 py-3 border-b border-gray-300 flex justify-between items-center px-5">
      <div className="toggle-bar">
        <button onClick={() => setSidebarToggle((prev) => (!prev))} className="w-9 border-dark h-9 bg-secondary rounded-lg border-2">
          <i className={`${sidebarToggle ? 'ri-menu-5-fill' : 'ri-close-large-fill'} text-xl`}></i>
          {/* <i className=""></i> */}
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
  );
};

export default React.memo(Topbar);
