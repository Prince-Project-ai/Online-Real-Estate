// import React, { useState } from "react";
// import { useMessage } from "../../Contexts/MessageContext";
// import { AdminLogoutApi } from "../../Api/dashboard/HandleAdminApi";
// import { useNavigate } from "react-router-dom";
// import { useAdminAuth } from "../../Contexts/ADMIN/AdminAuthContext";
// import Spinner from "../core/Spinner";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const { setIsAdminAuthenticated } = useAdminAuth();
//   const { showToast } = useMessage();
//   const [isLoading, isSetLoading] = useState(false);

//   const AdminLogout = async () => {
//     isSetLoading(true);
//     try {
//       const res = await AdminLogoutApi();
//       if (res?.data?.success) {
//         showToast("Logout Successfully", "success");
//         navigate("/dashboard/sign-in");
//         setIsAdminAuthenticated(false);
//       }
//     } catch (error) {
//       showToast(error?.response?.data?.message || error?.message, "error");
//     } finally {
//       isSetLoading(false);
//     }
//   }

//   return (
//     <aside className="max-w-60 w-full border-r border-gray-300 flex flex-col h-screen max-h-screen">
//       <div className="logo p-2 h-12 flex justify-center items-center border-b border-gray-300">
//         <h2 className="text-2xl text-center text-black"><span><i className="ri-home-4-line"></i></span> PropertyFy</h2>
//       </div>
//       <div className="p-2 mb-2 h-12 flex justify-center items-center border-b border-gray-300">
//         <button type="button" className="bg-dark py-2 outline-none text-white w-full rounded-lg">
//           <span className="me-2 text-start"><i className=" ri-dashboard-horizontal-line"></i></span>
//           Dashboard</button>
//       </div>

//       <div className="menu-lists flex-1 max-h-screen overflow-hidden overflow-y-auto">
//         <ul className="list-none px-2 space-y-2">
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li><li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//           <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
//         </ul>
//       </div>
//       <div className="footer p-2 h-12 border-t border-gray-300">
//         <button onClick={AdminLogout} type="button" className="bg-red-500 text-white h-full p-1 w-full rounded-lg">
//           {
//             isLoading ? <Spinner /> : <>Logout <span className="ms-2"><i className="ri-logout-circle-r-line"></i></span></>
//           }
//         </button>
//         {/* <h3 className="text text-center ">Logout</h3> */}
//       </div>
//     </aside>
//   );
// };

// export default React.memo(Sidebar);


import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdminAuth } from "../../Contexts/ADMIN/AdminAuthContext";
import { useMessage } from "../../Contexts/MessageContext";
import { AdminLogoutApi } from "../../Api/dashboard/HandleAdminApi";
import Spinner from "../core/Spinner";
import { TbUserSquareRounded } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineHomeWork } from "react-icons/md";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const { showToast } = useMessage();

  const { setIsAdminAuthenticated } = useAdminAuth();

  //   const [isLoading, isSetLoading] = useState(false)

  const [isLoading, isSetLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(null);

  const handleOpenMenu = (e) => {
    const target = e.target.closest("li");
    if (!target) return;
    setIsMenuOpen((prev) => (prev === target.id ? null : target.id));
  };

  const navigate = useNavigate();


  const AdminLogout = async () => {
    isSetLoading(true);
    try {
      const res = await AdminLogoutApi();
      if (res?.data?.success) {
        showToast("Logout Successfully", "success");
        navigate("/dashboard/sign-in");
        setIsAdminAuthenticated(false);
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error?.message, "error");
    } finally {
      isSetLoading(false);
    }
  }


  return (
    <motion.aside
      className={`${sidebarToggle ? 'lg:flex hidden' : 'lg:hidden absolute inset-0 bg-white z-10'} max-w-64 w-full  shadow-zinc-700 shadow-lg border-r border-zinc-400 flex flex-col h-screen`}
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
        <ul className="list-none space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
            }
          >
            <LuLayoutDashboard className="me-2 text-xl" /> Dashboard
          </NavLink>

          <li id="profile" className="relative">
            <NavLink
              to="/dashboard/profile"
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
                <MdOutlineHomeWork className="me-2 text-xl" />
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
                {/* <li className="w-full">
                  <NavLink
                    to="/dashboard/add-listing"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-dark text-white"
                        : "hover:bg-secondary hover:border"
                    }
                  >
                    Add Listing
                  </NavLink>
                </li> */}
                <li className="w-full">
                  <NavLink
                    to="/dashboard/approvals"
                    className="hover:bg-secondary hover:border w-full block py-2 px-4 rounded-lg"
                  >
                    Approval
                  </NavLink>
                </li>
                <li className="w-full">
                  <NavLink
                    to="/dashboard/all-property"
                    className="hover:bg-secondary hover:border w-full block py-2 px-4 rounded-lg"
                  >
                    All Property
                  </NavLink>
                </li>
              </motion.ul>
            )}
          </li>

          {/* <li id="Chat" className="relative">
            <NavLink
              to="/dashboard/seller-supprot"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                  : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
              }
            >
              <HiOutlineChatBubbleLeftRight className="me-2 text-xl" /> Chat
            </NavLink>
          </li> */}

          {/* <li id="Review" className="relative">
            <NavLink
              to="/dashboard/review"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                  : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
              }
            >
              <i className="ri-star-fill mr-2"></i> Review
            </NavLink>
          </li> */}

          {/* <li id="Viewers" className="relative">
            <NavLink
              to="/dashboard/view"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-dark w-full flex items-center py-2 px-4 rounded-lg"
                  : "flex items-center py-2 px-4 hover:bg-secondary w-full rounded-lg font-inter border"
              }
            >
              <i className="ri-eye-fill mr-2"></i> Viewers
            </NavLink>
          </li> */}
        </ul>
      </div>

      <div className="footer p-4 border-gray-300">
        <button onClick={AdminLogout} type="button" className="bg-red-500 text-white h-full p-1 w-full rounded-lg">
          {
            isLoading ? <Spinner /> : <>Logout <span className="ms-2"><i className="ri-logout-circle-r-line"></i></span></>
          }
        </button>
      </div>
    </motion.aside>
  );
};

export default React.memo(Sidebar);