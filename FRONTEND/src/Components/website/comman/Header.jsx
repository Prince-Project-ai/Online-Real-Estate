import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthModalManager from "../Auth/AuthModelManager";
import { useAuth } from "../../../Contexts/AuthContext";
import Signout from "../Auth/Signout";

const Header = () => {
  const { currentAuth } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const result = currentAuth ? "logged in" : "You are Exire"
  console.log(result);

  // Memoize the menu items to prevent re-creation on each render
  const menuItems = useMemo(
    () => [
      { path: "/", label: "Home" },
      { path: "/about", label: "About Us" },
      { path: "/contact", label: "Contact Us" },
      { path: "/history", label: "History" },
      { path: "/profile", label: "Profile" },
    ],
    []
  );

  return (
    <header className="border-b">
      <nav className="max-w-7xl md:px-4 lg:px-0 container mx-auto flex items-center justify-between py-2 relative">
        {/* Logo Section */}
        <Logo />

        {/* Hamburger Menu (Visible on small screens) */}
        <button
          className="text-2xl lg:hidden focus:outline-none z-50"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>

        {/* Navigation Menu */}
        <NavigationMenu
          menuItems={menuItems}
          currentAuth={currentAuth}
          isMenuOpen={isMenuOpen}
        />

        {/* Authentication Section */}
        <AuthSection currentAuth={currentAuth} />
      </nav>
    </header>
  );
};

const Logo = React.memo(() => (
  <div className="logo">
    <h2 className="text-2xl tracking-normal font-heading">PropertyFy</h2>
  </div>
));

const NavigationMenu = React.memo(({ menuItems, currentAuth, isMenuOpen }) => (
  <div
    className={`menus lg:flex lg:items-center ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
      } lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto transition-all duration-300 absolute lg:static bg-white w-full lg:w-auto top-full left-0 shadow-md lg:shadow-none z-40`}
  >
    <ul className="flex flex-col lg:flex-row items-center lg:space-x-5 lg:tracking-wider">
      {menuItems.map(({ path, label }) => (
        <li
          key={path}
          className="border-b lg:border-0 transition-border duration-300 border-white hover:border-black lg:hover:border-none"
        >
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 lg:p-0 text-center lg:text-left border-b-2 border-black hover:border-black"
                : "block border-b-2 border-transparent px-4 py-2 lg:p-0 text-center hover:border-black  lg:text-left"
            }
          >
            {label}
          </NavLink>
        </li>
      ))}

      {/* {currentAuth && (
        <li className="border-b lg:border-0 transition-border duration-200 border-white hover:border-black lg:hover:border-none">
          <NavLink
            to="/profile"
            className="block px-4 py-2 lg:p-0 text-center lg:text-left"
          >
            {currentAuth.fullName}
          </NavLink>
        </li>
      )} */}
    </ul>
  </div>
));


const AuthSection = React.memo(({ currentAuth }) => (
  <div className="menu hidden lg:flex flex-shrink-0 items-center">
    <div className="auth">

      {
        currentAuth ? <Signout /> : <AuthModalManager />
      }
      {/* <AuthModalManager /> */}
    </div>
  </div>
));

export default React.memo(Header);
