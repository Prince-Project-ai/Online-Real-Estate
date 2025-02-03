import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMessage } from "../../Contexts/MessageContext";
import { useAuth } from "../../Contexts/AuthContext";
import { logoutAuth } from "../../Api/website/HandleUserApi";
import ButtonSpinner from "../Loaders/ButtonSpinner";

const Sidebar = () => {
  const { showToast } = useMessage();
  const { setCurrentAuth, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

  // const handleMenuAction = useCallback((e) => {
  //   const target = e.target.closest("li");
  //   if (!target) return;
  //   const id = target.id;
  //   setOpenDropdown((prev) => (prev === id ? null : id));
  // }, []);

  return (
    <aside className="max-w-60 w-full border-r border-gray-300 flex flex-col h-screen">
      <div className="logo p-2 h-12 flex justify-center items-center border-b border-gray-300">
        <h2 className="text-2xl font-heading text-black">
          <i className="ri-home-4-line"></i> PropertyFy Agent.
        </h2>
      </div>

      <div className="menu-lists flex-1 overflow-y-auto">
        <ul className="list-none px-2 space-y-2">

          <NavLink
            to="/dashboard-agent" end className={({ isActive }) =>
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
              <NavLink to="/dashboard-agent/profile" className={({ isActive }) => isActive ? "text-white font-inter py-3 px-3 bg-dark w-full flex items-center" : "flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border"}>
                <i className="ri-user-3-fill me-2"></i> Profile
              </NavLink>
            </div>
          </li>

          <li id="myListing" className="relative">
            <div className="flex justify-between cursor-pointer">
              <NavLink to="/dashboard-agent/seller-add-property" className={({ isActive }) => isActive ? "text-white font-inter py-3 px-3 bg-dark w-full flex items-center" : "flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border"}>
                <i className="ri-home-5-fill me-2"></i> Add Listing
              </NavLink>
            </div>
          </li>

          <li id="Chat" className="relative">
            <div className="flex justify-between cursor-pointer">
              <NavLink to="/dashboard-agent/chat" className={({ isActive }) => isActive ? "text-white font-inter py-3 px-3 bg-dark w-full flex items-center" : "flex items-center py-3 px-3 hover:bg-secondary w-full font-inter border"}>
                <i className="ri-message-fill me-2"></i> Chating
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