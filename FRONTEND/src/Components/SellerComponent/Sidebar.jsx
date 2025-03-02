import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMessage } from "../../Contexts/MessageContext";
import { useAuth } from "../../Contexts/AuthContext";
import { logoutAuth } from "../../Api/website/HandleUserApi";
import ButtonSpinner from "../Loaders/ButtonSpinner";
import { motion } from "framer-motion";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { LuHousePlus } from "react-icons/lu";
import { TbUserSquareRounded } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { TfiComments } from "react-icons/tfi";
import { MdOutlineUploadFile } from "react-icons/md";


const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const { showToast } = useMessage();
  const { setCurrentAuth, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(null);

  const handleOpenMenu = (e) => {
    const target = e.target.closest("li");
    if (!target) return;
    setIsMenuOpen((prev) => (prev === target.id ? null : target.id));
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
    <motion.aside
      className={`${sidebarToggle ? 'lg:flex hidden' : 'lg:hidden absolute inset-0 bg-white z-10'} max-w-64 w-full  shadow-slate-700 shadow-2xl flex flex-col h-screen`}
    >
      <div className="logo p-4 h-16 flex lg:justify-center justify-between items-center">
        <h2 className="text-2xl font-heading text-black flex items-center">
          <i className="ri-home-4-line mr-2"></i> PropertyFy
        </h2>
        <button
          onClick={() => setSidebarToggle((prev) => !prev)}
          className="w-9 h-9 lg:hidden bg-secondary rounded-lg border-2 border-dark flex items-center justify-center"
        >
          <i className={`${sidebarToggle ? 'ri-menu-5-fill' : 'ri-close-line'} text-xl`}></i>
        </button>
      </div>

      <div className="menu-lists flex-1 overflow-y-auto p-4">
        <ul className="list-none space-y-3">
          <NavLink
            to="/dashboard-seller"
            end
            className={({ isActive }) =>
              isActive
                ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
            }
          >
            <RxDashboard className="me-2 text-xl" /> Dashboard
          </NavLink>

          <li id="profile" className="relative">
            <NavLink
              to="/dashboard-seller/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                  : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
              }
            >
              <TbUserSquareRounded className="me-2 text-2xl" /> Profile

            </NavLink>
          </li>

          <li id="myListing" className="relative" onClick={handleOpenMenu}>
            <div className="flex justify-between cursor-pointer py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border">
              <div className="flex items-center">
                <LuHousePlus className="me-2 text-xl" />
                <p>Listing</p>
              </div>
              <i className={`ri-arrow-${isMenuOpen === "myListing" ? 'up' : 'down'}-s-fill`}></i>
            </div>
            {isMenuOpen === "myListing" && (
              <motion.ul
                className="space-y-1 mt-1 font-inter pl-4"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <li className="w-full">
                  <NavLink
                    to="/dashboard-seller/add-listing"
                    className={({ isActive }) =>
                      `block w-full py-2 px-4 rounded-lg transition ${isActive ? "bg-dark text-white" : "hover:bg-secondary hover:border"
                      }`
                    }
                  >
                    Add Listing
                  </NavLink>
                </li>
                <li className="w-full">
                  <NavLink
                    to="/dashboard-seller/view-approvals"
                    className={({ isActive }) =>
                      `block w-full py-2 px-4 rounded-lg transition ${isActive ? "bg-dark text-white" : "hover:bg-secondary hover:border"
                      }`
                    }
                  >
                    View Approval
                  </NavLink>
                </li>
                <li className="w-full">
                  <NavLink
                    to="/dashboard-seller/total-listing"
                    className={({ isActive }) =>
                      `block w-full py-2 px-4 rounded-lg transition ${isActive ? "bg-dark text-white" : "hover:bg-secondary hover:border"
                      }`
                    }
                  >
                    Total Listing
                  </NavLink>
                </li>
              </motion.ul>
            )}

          </li>

          <li id="Chat" className="relative">
            <NavLink
              to="/dashboard-seller/seller-supprot"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                  : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
              }
            >
              <HiOutlineChatBubbleLeftRight className="me-2 text-xl" /> Chat

            </NavLink>
          </li>

          <li id="Review" className="relative">
            <NavLink
              to="/dashboard-seller/review"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                  : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
              }
            >
              <TfiComments className="me-2 text-xl" /> Review
            </NavLink>
          </li>

          <li id="Viewers" className="relative">
            <NavLink
              to="/dashboard-seller/view"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                  : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
              }
            >
              <MdOutlineUploadFile className="me-2 text-xl" /> Upload Excel
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="footer p-4 border-gray-300">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white w-full rounded-lg py-2 flex items-center justify-center"
        >
          {isLoading ? <ButtonSpinner /> : "Logout"}
          <i className="ri-logout-circle-r-line ml-2"></i>
        </button>
      </div>
    </motion.aside>
  );
};

export default React.memo(Sidebar);