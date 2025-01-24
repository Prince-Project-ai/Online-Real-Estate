import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMessage } from "../../Contexts/MessageContext";
import { useAuth } from "../../Contexts/AuthContext";
import { logoutAuth } from "../../Api/website/HandleUserApi";
import ButtonSpinner from "../Loaders/ButtonSpinner";

const Sidebar = () => {
    const { showToast } = useMessage();
    const [isOpenList, setIsOpenList] = useState(false);
    const { setCurrentAuth, setIsAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);


    const handleLogout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await logoutAuth();
            if (response?.success) {
                setCurrentAuth(null)
                setIsAuthenticated(false);
                showToast(response?.message, "success");
            };
        } catch (error) {
            console.log("Error Message : ", error?.response?.data?.message);
            showToast(error?.response?.data?.message || error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <aside className="max-w-60 w-full border-r border-gray-300 flex flex-col h-screen max-h-screen">
            <div className="logo p-2 h-12 flex justify-center items-center border-b border-gray-300">
                <h2 className="text-2xl text-center font-heading text-black">
                    <span>
                        <i className="ri-home-4-line"></i>
                    </span>{" "}
                    PropertyFy
                </h2>
            </div>


            <div className="menu-lists flex-1 max-h-screen overflow-hidden overflow-y-auto">
                <ul className="list-none px-2 space-y-2">

                    <li className="cursor-pointer bg-dark py-3 mt-2 px-3 rounded-lg">
                        <span className="me-2">
                            <i className="text-white ri-dashboard-horizontal-line"></i>
                        </span>
                        <NavLink to="/dashboard-agent" className="text-white font-description">Dashboard</NavLink>
                    </li>

                    <li className="listing hover:bg-secondary hover:transition-all duration-150 rounded-lg cursor-pointer relative">
                        <div
                            onClick={() => setIsOpenList((prev) => !prev)}
                            className="main-list font-description flex items-start p-2 rounded-lg justify-between"
                        >
                            <NavLink to="" className="font-description">
                                <span>
                                    <i className="me-3 ri-user-3-fill"></i>
                                </span>
                                Profile
                            </NavLink>
                            <span>
                                {/* <i className="ri-arrow-down-s-line"></i> */}
                                <i className={`${isOpenList ? 'ri-subtract-fill' : 'ri-arrow-down-wide-line'}`}></i>


                            </span>
                        </div>
                        {isOpenList && (
                            <div className="subList flex mt-1">
                                {/* <div className="veri-line h-100 bg-black w-[1px] me-auto"></div> */}
                                <ul className="ms-9 w-full rounded-lg mb-2 space-y-1">
                                    <li className="hover:bg-white me-2 font-description py-2 px-3 rounded-lg">
                                        <NavLink to="/dashboard-agent/profile">
                                            <i className="ri-user-settings-fill me-2"></i>Edit Profile
                                        </NavLink>
                                    </li>
                                    <li className="hover:bg-white me-2 font-description py-2 px-3 rounded-lg"><i className="ri-shield-check-fill me-2"></i>Approvals</li>
                                    {/* <li className="bg-secondary py-1 px-3 rounded-lg">Hello</li > */}
                                </ul>
                            </div>
                        )}
                    </li>

                    <li className="listing cursor-pointer relative">
                        <div
                            onClick={() => setIsOpenList((prev) => !prev)}
                            className="main-list font-description flex items-start p-2 rounded-lg justify-between"
                        >
                            <NavLink to="" className="font-description">
                                <span>
                                    <i className="me-3 ri-home-3-fill"></i>
                                </span>
                                My Listings
                            </NavLink>
                            <span>
                                {/* <i className="ri-arrow-down-s-line"></i> */}
                                <i className={`${isOpenList ? 'ri-subtract-fill' : 'ri-arrow-down-wide-line'}`}></i>


                            </span>
                        </div>
                        {isOpenList && (
                            <div className="subList flex mt-1">
                                {/* <div className="veri-line h-100 bg-black w-[1px] me-auto"></div> */}
                                <ul className="ms-9 w-full rounded-lg space-y-1">
                                    <li className="font-description py-2 px-3 rounded-lg"><i className="ri-home-gear-line me-2"></i>My Listing</li>
                                    <li className="font-description py-2 px-3 rounded-lg"><i className="ri-shield-check-fill me-2"></i>Approvals</li>
                                    {/* <li className="bg-secondary py-1 px-3 rounded-lg">Hello</li > */}
                                </ul>
                            </div>
                        )}
                    </li>

                    <li className="cursor-pointer p-2 rounded-lg">
                        <span>
                            <i className="me-3 ri-verified-badge-line"></i>
                        </span>
                        <NavLink className="font-description">Dashboard</NavLink>
                    </li>

                    <li className="cursor-pointer p-2 rounded-lg">
                        <span>
                            <i className="me-3 ri-verified-badge-line"></i>
                        </span>
                        <NavLink className="font-description">Dashboard</NavLink>
                    </li>
                    <li className="p-2 rounded-lg">
                        <span>
                            <i className="me-3 ri-verified-badge-line"></i>
                        </span>
                        <NavLink className="font-description">Dashboard</NavLink>
                    </li>
                    <li className="bg-secondary  p-2 rounded-lg">
                        <span>
                            <i className="me-3 ri-verified-badge-line"></i>
                        </span>
                        <NavLink path="/client" className="font-description">View Client</NavLink>

                    </li>
                    <li className="bg-secondary  p-2 rounded-lg">
                        <span>
                            <i className="me-3 ri-verified-badge-line"></i>
                        </span>
                        <NavLink className="font-description">Dashboard</NavLink>

                    </li>
                </ul>
            </div>
            <div className="footer p-2 h-14 border-t border-gray-300">
                <button
                    onClick={handleLogout}
                    type="button"
                    className="bg-red-500 text-white h-full p-1 w-full rounded-lg"
                >
                    {
                        isLoading ? <ButtonSpinner /> : "Logout"
                    }
                    <span className="ms-2">
                        <i className="ri-logout-circle-r-line"></i>
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default React.memo(Sidebar);
