import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMessage } from "../../Contexts/MessageContext";
import { useAuth } from "../../Contexts/AuthContext";
import { logoutAuth } from "../../Api/website/HandleUserApi";
import ButtonSpinner from "../Loaders/ButtonSpinner";

const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {

  const { showToast } = useMessage();
  const { setCurrentAuth, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(null);

  const handleOpenMenu = (e) => {
    const target = e.target.closest("li");
    if (!target) return;
    setIsMenuOpen((prev) => (prev === target.id ? null : target.id)); // Toggles menu
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await logoutAuth();
      if (response?.success) {
        setCurrentAuth(null);
        setIsAuthenticated(false);
        showToast(response?.message, "success");
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <aside className={`${sidebarToggle ? 'lg:flex hidden' : 'lg:hidden absolute inset-0 bg-white z-10'} max-w-64 w-full border-r border-gray-300 flex flex-col h-screen`}>
      <div className="logo p-2 h-12 flex lg:justify-center justify-between items-center border-b border-gray-300">
        <h2 className="text-2xl font-heading text-black">
          <i className="ri-home-4-line"></i> PropertyFy
        </h2>
        <button onClick={() => setSidebarToggle((prev) => (!prev))} className="w-9 border-dark h-9 lg:hidden bg-secondary rounded-lg border-2">
          <i className={`${sidebarToggle ? 'ri-menu-5-fill' : 'ri-close-large-fill'} text-xl`}></i>
        </button>
      </div>

      <div className="menu-lists flex-1 overflow-y-auto">
        <ul className="list-none px-2 space-y-2">

          <NavLink
            to="/dashboard-seller" end className={({ isActive }) =>
              isActive
                ? "text-white font-inter py-3 mt-2 px-3 bg-dark w-full flex items-center"
                : "flex items-center py-3 px-3 mt-2 hover:bg-secondary w-full font-inter border"
            }
          >
            <i className="ri-dashboard-2-fill me-2"></i> Dashboard
          </NavLink>


          {/* Profile */}
          <li id="profile" className="relative">
            <div className="flex justify-between cursor-pointer">
              <NavLink to="/dashboard-seller/profile" className={({ isActive }) => isActive ? "text-white font-inter py-3 px-3 bg-dark w-full flex items-center" : "flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border"}>
                <i className="ri-user-3-fill me-2"></i> Profile
              </NavLink>
            </div>
          </li>

          <li id="myListing" className="relative" onClick={handleOpenMenu}>
            <div className="flex justify-between cursor-pointer">
              <div className="flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border">
                <i className="ri-home-5-fill me-2"></i>
                <div className="flex justify-between w-full">
                  <p>Listing</p>
                  <i className={`ri-arrow-${isMenuOpen === "myListing" ? 'up' : 'down'}-wide-fill`}></i>
                </div>
              </div>
            </div>
            {
              isMenuOpen === "myListing" && (<ul className="space-y-1 font-inter">
                <li className="w-[85%] ms-auto "><NavLink dir="ltl" className={({ isActive }) => ` ${isActive ? 'bg-dark text-white' : 'hover:bg-secondary hover:border'} w-full block rounded-s-full py-2 px-3  `} to="/dashboard-seller/add-listing">Add Listing</NavLink></li>

                <li className="w-[85%] ms-auto "><NavLink dir="ltl" className=" w-full block  rounded-s-full py-2 px-3  hover:bg-secondary hover:border" to="/dashboard-seller/view-approvals">View Approval</NavLink></li>

                <li className=" ms-auto w-[85%]"><NavLink dir="ltl" className=" w-full block  rounded-s-full py-2 px-3  hover:bg-secondary hover:border" to="/dashboard-seller/total-listing">Total Listing</NavLink></li>

              </ul>)
            }
          </li>

          <li id="Chat" className="relative">
            <div className="flex justify-between cursor-pointer">
              <NavLink to="/dashboard-seller/chat" className={({ isActive }) => isActive ? "text-white font-inter py-3 px-3 bg-dark w-full flex items-center" : "flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border"}>
                <i className="ri-message-fill me-2"></i> Chating
              </NavLink>
            </div>
          </li>

          <li id="Review" className="relative">
            <div className="flex justify-between cursor-pointer">
              <NavLink to="/dashboard-seller/review" className={({ isActive }) => isActive ? "text-white font-inter py-3 px-3 bg-dark w-full flex items-center" : "flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border"}>
                <i className="ri-message-fill me-2"></i> Review
              </NavLink>
            </div>
          </li>

          <li id="Viewers" className="relative">
            <div className="flex justify-between cursor-pointer">
              <NavLink to="/dashboard-seller/view" className={({ isActive }) => isActive ? "text-white font-inter py-3 px-3 bg-dark w-full flex items-center" : "flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border"}>
                <i className="ri-message-fill me-2"></i> Viewers
              </NavLink>
            </div>
          </li>

        </ul>
      </div>
      <div className="footer p-2 border-t border-gray-300">
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 w-full rounded-lg">
          {isLoading ? <ButtonSpinner /> : "Logout"}
          <i className="ri-logout-circle-r-line ms-2"></i>
        </button>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);