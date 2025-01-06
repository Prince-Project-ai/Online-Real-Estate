import React from "react";
import { NavLink } from "react-router-dom";
import AuthModalManager from "../Auth/AuthModelManager";
import { useAuth } from "../../../Contexts/AuthContext";
let i = 0;
const Header = () => {
  const { currentAuth } = useAuth();
  console.log(currentAuth);
  return (
    // Header Section
    <header className="border-b">
      <nav className="max-w-7xl md:px-4 lg:px-0 container mx-auto flex items-center justify-between py-3">
        <div className="logo"><h2 className="text-2xl tracking-normal font-heading">PropertyFy</h2></div>
        <div className="menus">
          <ul className="flex flex-wrap items-center space-x-5 tracking-wider">
            <li className="border-b transition-border duration-200 border-white hover:border-b hover:border-b-black"><NavLink to={"/"}>Home</NavLink></li>
            <li className="border-b transition-border duration-200 border-white hover:border-b hover:border-b-black"><NavLink to={"/"}>render : {i++}</NavLink></li>
            <li className="border-b transition-border duration-200 border-white hover:border-b hover:border-b-black"><NavLink to={"/"}>About Us</NavLink></li>
            <li className="border-b transition-border duration-200 border-white hover:border-b hover:border-b-black"><NavLink to={"/"}>Contact us</NavLink></li>
            <li className="border-b transition-border duration-200 border-white hover:border-b hover:border-b-black"><NavLink to={"/"}>History</NavLink></li>
            <li className="border-b transition-border duration-200 border-white hover:border-b hover:border-b-black"><NavLink to={"/profile"}>Profile</NavLink></li>
            <li className="border-b transition-border duration-200 border-white hover:border-b hover:border-b-black"><NavLink to={"/profile"}>{currentAuth?.fullName}</NavLink></li>
          </ul>
        </div>
        <div className="menu flex flex-shrink-0 items-center">
          <div className="auth flex space-x-5">
            {/* <SignIn /> */}
            {/* <SignUp /> */}
            <AuthModalManager />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
