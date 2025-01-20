import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpenList, setIsOpenList] = useState(false);
  // const handleOpenList = () => {};
  return (
    <aside className="max-w-60 w-full border-r border-gray-300 flex flex-col h-screen max-h-screen">
      <div className="logo p-2 h-12 flex justify-center items-center border-b border-gray-300">
        <h2 className="text-2xl text-center text-black">
          <span>
            <i className="ri-home-4-line"></i>
          </span>{" "}
          PropertyFy
        </h2>
      </div>
      <div className="p-2 mb-2 h-12 flex justify-center items-center border-b border-gray-300">
        <button
          type="button"
          className="bg-dark py-2 outline-none text-white w-full rounded-lg"
        >
          <span className="me-2 text-start">
            <i className=" ri-dashboard-horizontal-line"></i>
          </span>
          Dashboard
        </button>
      </div>

      <div className="menu-lists flex-1 max-h-screen overflow-hidden overflow-y-auto">
        <ul className="list-none px-2 space-y-2">
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <NavLink to="">Total Visiting</NavLink>
            <i className="ri-arrow-down-s-line"></i>
          </li>

          <li className="listing relative">
            <div
              onClick={() => setIsOpenList((prev) => !prev)}
              className="main-list flex items-start p-2 rounded-lg justify-between"
            >
              <NavLink to="">
                <span>
                  <i className="me-3 ri-home-3-fill"></i>
                </span>
                Listning
              </NavLink>
              <span>
                <i className="ri-arrow-down-s-line"></i>
              </span>
            </div>
            {isOpenList && (
              <div className="subList flex">
                {/* <div className="veri-line h-100 bg-black w-[1px] me-auto"></div> */}
                <ul className="ms-9 w-full rounded-lg space-x-3 bg-secondary">
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                </ul>
              </div>
            )}
          </li>
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <a href="">Dashboard</a>
          </li>
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <a href="">Dashboard</a>
          </li>
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <a href="">Dashboard</a>
          </li>
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <a href="">Dashboard</a>
          </li>
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <a href="">Dashboard</a>
          </li>
          {/* <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li>
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
          <li className="bg-secondary  p-2 rounded-lg"><span><i className="me-3 ri-verified-badge-line"></i></span><a href="">Dashboard</a></li> */}
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <a href="">Dashboard</a>
          </li>
          <li className="bg-secondary  p-2 rounded-lg">
            <span>
              <i className="me-3 ri-verified-badge-line"></i>
            </span>
            <a href="">Dashboard</a>
          </li>
        </ul>
      </div>
      <div className="footer p-2 h-12 border-t border-gray-300">
        <button
          type="button"
          className="bg-red-500 text-white h-full p-1 w-full rounded-lg"
        >
          Logout{" "}
          <span className="ms-2">
            <i className="ri-logout-circle-r-line"></i>
          </span>
        </button>
        {/* <h3 className="text text-center ">Logout</h3> */}
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
