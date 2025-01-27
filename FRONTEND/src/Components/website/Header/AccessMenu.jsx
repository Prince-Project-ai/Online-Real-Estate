import React from "react";
import Signout from "../Auth/Signout.jsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext.jsx";


const AccessMenu = () => {
  const { currentAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { fullName, role } = currentAuth;
  return (
    <>
      {/* {
        isAuthenticated ? <Signout /> : <AuthModalManager />
      } */}
      <div className="relative w-full">
        <div className="profile-name flex items-center">
          <div className="profile me-1 text-center leading-7 rounded-lg overflow-hidden w-7 h-7 bg-dark">
            <img src={currentAuth?.avatar} alt={currentAuth?.avatar} />
          </div>
          <div className="name" onClick={() => setIsOpen((prev) => (!prev))}>
            <button className="me-1">{fullName}</button>
            <i className="ri-arrow-down-s-fill"></i>
          </div>
        </div>
        <div className={`w-40 ${isOpen ? 'absolute' : 'hidden'} border mt-2 shadow absolute rounded-lg bg-white top-auto right-0 menu-list-drawer`}>
          <ul className="p-2 space-y-2">
            <li onClick={() => setIsOpen(false)} className="font-description w-full text-[17px] space-x-1"><i className="ri-user-line bg-secondary p-1 rounded border"></i> <NavLink to={`${role === "Agent" ? "/dashboard-agent/profile" : role === "Seller" ? '/dashboard-seller/profile' : '/profile'}`} className="font-description">Profile</NavLink></li>
            <li onClick={() => setIsOpen(false)} className="font-description w-full text-[17px] space-x-1"><i className="ri-dashboard-fill bg-secondary p-1 rounded border"></i><NavLink to={"/dashboard-agent"} className="font-description">Dashboard</NavLink></li>
            {/* <li><AuthModalManager /></li> */}
          </ul>
          <ul className="border-t w-full p-2">
            <li className="font-description text-[17px] w-full"><Signout /></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccessMenu;
