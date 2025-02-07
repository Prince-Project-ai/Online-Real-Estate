import React from "react";

const SellerSupport = () => {
    return (
        <div className="border border-dark grid w-full h-screen grid-cols-12 bg-white">
            <div className="chat-user col-span-3 w-full border border-dark flex flex-col h-full overflow-hidden">


                <div className="header-users space-y-3 border-b p-3">
                    {/* <h1 className="text-xl text-center font-semibold font-description">Message</h1> */}
                    <div className="current-user-profile flex items-center space-x-2 w-full justify-center">
                        <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="current-chat" className="w-14 h-14 rounded-full" />
                        <div className="profile-content">
                            <h3>Mike Nielsen</h3>
                            <p className="text-xs">Marketing Director</p>
                        </div>
                    </div>
                    <div className="search-user">
                        <div className="relative">
                            <input type="text" className="bg-secondary rounded-full p-5 w-full border text-xs pl-9 py-3 outline-none" />
                            <i className="ri-search-line absolute top-1/2 left-3 -translate-y-1/2"></i>
                        </div>
                    </div>
                </div>


                <div className="flex-1 py-2 bg-white relative overflow-hidden overflow-y-auto">
                    <ul className="space-y-1">

                        <li className="p-3 bg-secondary">
                            <div className="user-box w-full flex items-center space-x-3">
                                <div className="profile-img shrink-0">
                                    <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-photo" className="w-14 h-14 rounded-full" />
                                </div>
                                <div className="user-chat-content flex justify-between">
                                    <div className="user-name">
                                        <h5>Mike Nielsen</h5>
                                        <p className="text-xs leading-[12px]">I want more detailed information.</p>
                                    </div>
                                    <div className="user-time flex flex-col justify-between">
                                        <p className="text-xs self-start">15mins</p>
                                        <p className="text-xs self-end"><i className="ri-check-double-line text-xl"></i></p>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="p-3">
                            <div className="user-box w-full flex items-center space-x-3">
                                <div className="profile-img shrink-0">
                                    <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-photo" className="w-14 h-14 rounded-full" />
                                </div>
                                <div className="user-chat-content flex justify-between">
                                    <div className="user-name">
                                        <h5>Mike Nielsen</h5>
                                        <p className="text-xs leading-[12px]">I want more detailed information.</p>
                                    </div>
                                    <div className="user-time flex flex-col justify-between">
                                        <p className="text-xs self-start">15mins</p>
                                        <p className="text-xs self-end"><i className="ri-check-double-line text-xl"></i></p>
                                    </div>
                                </div>
                            </div>
                        </li>


                        <li className="p-3">
                            <div className="user-box w-full flex items-center space-x-3">
                                <div className="profile-img shrink-0">
                                    <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-photo" className="w-14 h-14 rounded-full" />
                                </div>
                                <div className="user-chat-content flex justify-between">
                                    <div className="user-name">
                                        <h5>Mike Nielsen</h5>
                                        <p className="text-xs leading-[12px]">I want more detailed information.</p>
                                    </div>
                                    <div className="user-time flex flex-col justify-between">
                                        <p className="text-xs self-start">15mins</p>
                                        <p className="text-xs self-end"><i className="ri-check-double-line text-xl"></i></p>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* <li className="p-3">
                            <div className="user-box w-full flex items-center space-x-3">
                                <div className="profile-img shrink-0">
                                    <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-photo" className="w-14 h-14 rounded-full" />
                                </div>
                                <div className="user-chat-content flex justify-between">
                                    <div className="user-name">
                                        <h5>Mike Nielsen</h5>
                                        <p className="text-xs leading-[12px]">I want more detailed information.</p>
                                    </div>
                                    <div className="user-time flex flex-col justify-between">
                                        <p className="text-xs self-start">15mins</p>
                                        <p className="text-xs self-end"><i className="ri-check-double-line text-xl"></i></p>
                                    </div>
                                </div>
                            </div>
                        </li>


                        <li className="p-3">
                            <div className="user-box w-full flex items-center space-x-3">
                                <div className="profile-img shrink-0">
                                    <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-photo" className="w-12 h-12 rounded-full" />
                                </div>
                                <div className="user-chat-content flex justify-between">
                                    <div className="user-name">
                                        <h5>Mike Nielsen</h5>
                                        <p className="text-xs leading-[12px]">I want more detailed information.</p>
                                    </div>
                                    <div className="user-time flex flex-col justify-between">
                                        <p className="text-xs self-start">15mins</p>
                                        <p className="text-xs self-end"><i className="ri-check-double-line text-xl"></i></p>
                                    </div>
                                </div>
                            </div>
                        </li>


                        <li className="p-3">
                            <div className="user-box w-full flex items-center space-x-3">
                                <div className="profile-img shrink-0">
                                    <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-photo" className="w-14 h-14 rounded-full" />
                                </div>
                                <div className="user-chat-content flex justify-between">
                                    <div className="user-name">
                                        <h5>Mike Nielsen</h5>
                                        <p className="text-xs leading-[12px]">I want more detailed information.</p>
                                    </div>
                                    <div className="user-time flex flex-col justify-between">
                                        <p className="text-xs self-start">15mins</p>
                                        <p className="text-xs self-end"><i className="ri-check-double-line text-xl"></i></p>
                                    </div>
                                </div>
                            </div>
                        </li>


                        <li className="p-3">
                            <div className="user-box w-full flex items-center space-x-3">
                                <div className="profile-img shrink-0">
                                    <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-photo" className="w-14 h-14 rounded-full" />
                                </div>
                                <div className="user-chat-content flex justify-between">
                                    <div className="user-name">
                                        <h5>Mike Nielsen</h5>
                                        <p className="text-xs leading-[12px]">I want more detailed information.</p>
                                    </div>
                                    <div className="user-time flex flex-col justify-between">
                                        <p className="text-xs self-start">15mins</p>
                                        <p className="text-xs self-end"><i className="ri-check-double-line text-xl"></i></p>
                                    </div>
                                </div>
                            </div>
                        </li> */}
                    </ul>
                </div>

            </div>
            <div className="message-body flex flex-col w-full col-span-6 border border-dark h-screen">
                <div className="chat-header border-b flex items-center justify-between">
                    <div className="profile-info-content flex items-center">
                        <div className="profile-img-header px-4 py-2">
                            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="current-chat" className="w-14 h-14 rounded-full" />
                        </div>
                        <div className="userinfo">
                            <h4 className="font-semibold text-xl leading-[25px]">Mike Nielsen</h4>
                            <p className="text-sm leading-[15px]">Mike Nielsen</p>
                        </div>
                    </div>
                    <div className="px-4">
                        <i className="ri-more-2-fill text-2xl cursor-pointer"></i>
                    </div>
                </div>
                <div className="chat-body flex-1 h-full overflow-hidden overflow-y-auto bg-secondary">
                    <ul className="flex flex-col w-full">
                        <li className="self-start">Hello World !</li>
                        <li className="self-end">Hello World !</li>
                        <li>Hello World !</li>
                        <li>Hello World !</li>
                        <li>Hello World !</li>
                        <li>Hello World !</li>
                        <li>Hello World !</li>
                        <li>Hello World !</li>
                        <li>Hello World !</li>
                    </ul>
                </div>
                <div className="chat-footer border-t border-dark py-3">
                    <input type="text" className="outline-none w-full py-1 border" />
                </div>
            </div>
            <div className="user-profile w-full col-span-3 border border-dark p-2 overflow-hidden overflow-y-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className="profile-image">
                        <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="user-profile" className="w-32 h-32 rounded-full" />
                    </div>
                    <div className="profile-name mt-4">
                        <h1 className="name text-3xl font-semibold">Mike Nielsen</h1>
                        <p className="text-center">Active 1m ago</p>
                    </div>
                    <div className="recent-photos grid grid-cols-3 gap-[3px] w-full borde mt-4 border-t pt-2">
                        <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

                        <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

                        <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSupport;
