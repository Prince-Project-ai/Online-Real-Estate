import React from "react";
const Sidebar = () => {
  return (
    <aside className="max-w-60 border-r border-gray-400 flex flex-col w-full h-screen max-h-screen">
      <div className="logo p-2 h-14 flex justify-center items-center border-b border-gray-400">
        <h2 className="text-2xl text-center text-black"><span><i className="ri-home-4-line"></i></span> PropertyFy</h2>
      </div>
      <div className="p-2 h-14 flex justify-center items-center border-b border-gray-400">
        <button type="button" className="bg-dark py-2 outline-none text-white w-full rounded-md">
          <span className="me-2 text-start"><i className=" ri-dashboard-horizontal-line"></i></span>
          Dashboard</button>
      </div>

      <div className="menu-lists flex-1 max-h-screen overflow-hidden overflow-y-auto">
        <ul className="list-none px-2 space-y-2">
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li><li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
          <li className="bg-gray-200 p-2 rounded"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
        </ul>
      </div>
      <div className="footer p-2 h-14 border-t border-gray-400">
        <button type="button" className="bg-red-500 text-white h-full p-1 w-full rounded-md">Logout <span className="ms-2"><i className="ri-logout-circle-r-line"></i></span></button>
        {/* <h3 className="text text-center ">Logout</h3> */}
      </div>
    </aside>
  );
};

export default Sidebar;
