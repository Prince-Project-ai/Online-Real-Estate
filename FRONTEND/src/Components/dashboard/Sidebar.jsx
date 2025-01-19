import React, { useState } from "react";
import { useMessage } from "../../Contexts/MessageContext";
import { AdminLogoutApi } from "../../Api/dashboard/HandleAdminApi";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../Contexts/ADMIN/AdminAuthContext";
import Spinner from "../core/Spinner";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setIsAdminAuthenticated } = useAdminAuth();
  const { showToast } = useMessage();
  const [isLoading, isSetLoading] = useState(false);

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
    <aside className="max-w-60 w-full border-r border-gray-300 flex flex-col h-screen max-h-screen">
      <div className="logo p-2 h-12 flex justify-center items-center border-b border-gray-300">
        <h2 className="text-2xl text-center text-black"><span><i className="ri-home-4-line"></i></span> PropertyFy</h2>
      </div>
      <div className="p-2 mb-2 h-12 flex justify-center items-center border-b border-gray-300">
        <button type="button" className="bg-dark py-2 outline-none text-white w-full rounded-lg">
          <span className="me-2 text-start"><i className=" ri-dashboard-horizontal-line"></i></span>
          Dashboard</button>
      </div>

      <div className="menu-lists flex-1 max-h-screen overflow-hidden overflow-y-auto">
        <ul className="list-none px-2 space-y-2">
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li><li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
        </ul>
      </div>
      <div className="footer p-2 h-12 border-t border-gray-300">
        <button onClick={AdminLogout} type="button" className="bg-red-500 text-white h-full p-1 w-full rounded-lg">
          {
            isLoading ? <Spinner /> : <>Logout <span className="ms-2"><i className="ri-logout-circle-r-line"></i></span></>
          }
        </button>
        {/* <h3 className="text text-center ">Logout</h3> */}
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
