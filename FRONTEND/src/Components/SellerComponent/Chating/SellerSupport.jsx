import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SlPlus } from "react-icons/sl";
import { LuSendHorizontal } from "react-icons/lu";



const SellerSupport = () => {

  const [message, setMessage] = useState("");

  useEffect(() => {
  }, []);

  const handleSendMessage = () => {
    const socket = io("http://localhost:9998"); 
    socket.emit("client", message);
    setMessage("");
  }



  return (
    <div className="grid w-full max-h-screen grid-cols-12 bg-white">
      <div className="chat-user col-span-3 w-full border border-dark flex flex-col h-full overflow-hidden">


        <div className="header-users space-y-3 border-b border-dark p-3">
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


        <div className="flex-1 py-2 bg-white relative max-h-screen overflow-hidden overflow-y-auto">
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








      <div className="message-body flex flex-col w-full col-span-6 h-screen">
        <div className="chat-header border-y border-dark flex items-center justify-between">
          <div className="profile-info-content flex items-center">
            <div className="profile-img-header px-4 py-2">
              <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="current-chat" className="w-10 h-10 rounded-full" />
            </div>
            <div className="userinfo">
              <h4 className="font-semibold text-lg leading-[25px]">Mike Nielsen</h4>
              <p className="text-xs leading-[15px]">Mike Nielsen</p>
            </div>
          </div>
          <div className="px-4">
            <i className="ri-more-2-fill text-2xl cursor-pointer"></i>
          </div>
        </div>






        <div className="chat-body flex-1 h-full overflow-hidden overflow-y-auto bg-secondary">
          <ul className="flex flex-col w-full p-2 gap-y-3  ">
            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center px-3 py-2 border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                  {/* <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" className="h-20 w-20" alt="" /> */}
                </div>

              </div>
            </li>

            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center p-2 border text-xs font-inter">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" className="h-20 w-20 rounded object-cover" alt="" />
                </div>

              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center px-3 py-2 border-dark border text-xs font-description">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </h5>

                </div>
                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center p-1 border-dark border text-xs font-description">

                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-10 w-10 rounded block" />
                </div>
                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>



            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center px-3 py-2 border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center px-3 py-2 border-dark border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>





            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center px-3 py-2 border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center px-3 py-2 border-dark border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>





            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center px-3 py-2 border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center px-3 py-2 border-dark border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>





            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center px-3 py-2 border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center px-3 py-2 border-dark border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>





            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center px-3 py-2 border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center px-3 py-2 border-dark border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>






            <li className="reciver self-start text-sm">
              <div className="user-chat-content flex gap-x-2">

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>

                <div className="user-name w-2/3 bg-white rounded-bl-none rounded-[12px] self-center px-3 py-2 border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

              </div>
            </li>

            <li className="sender self-end text-sm">
              <div className="user-chat-content flex justify-end gap-x-2">

                <div className="user-name w-2/3 bg-dark text-white rounded-br-none rounded-[12px] self-center px-3 py-2 border-dark border text-xs font-inter">
                  <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, ipsa.</h5>
                </div>

                <div className="user-profile self-end">
                  <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="profile-img" className="h-8 w-8 rounded-full" />
                </div>



              </div>
            </li>
          </ul>
        </div>
        <div className="chat-footer border-t border-b border-dark p-2">
          <div className="input-chat-group flex items-center w-full gap-x-3 relative">
            <div className="img-upload start-2 absolute bg-dark text-white h-7 w-7 flex place-content-center items-center rounded-full border border-dark">
              <SlPlus className="text-sm" />
            </div>
            <div className="message-input flex-1">
              <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Type Message ..."
                className="text-xs p-3 px-12 bg-secondary rounded-full outline-none w-full border border-dark" />
            </div>
            <div className="send end-2 absolute bg-dark text-white border border-dark h-7 w-7 flex place-content-center items-center rounded-full">
              <button className="outline-none" onClick={handleSendMessage}><LuSendHorizontal className="text-sm" /></button>
            </div>
          </div>
        </div>
      </div>



      <div className="user-profile w-full col-span-3 border border-dark p-2 overflow-hidden overflow-y-auto h-screen">

        <div className="flex flex-col justify-center items-center">
          <div className="profile-image">
            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="user-profile" className="w-32 h-32 rounded-full" />
          </div>
          <div className="profile-name mt-4">
            <h1 className="name text-3xl font-semibold">Mike Nielsen</h1>
            <p className="text-center">Active 1m ago</p>
          </div>
          <div className="recent-photos grid grid-cols-3 gap-2 w-full borde mt-4 border-t border-dark pt-2">
            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="aspect-square w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />
            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />
            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />
            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />

            <img src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg" alt="" className="w-full h-[100px] object-cover rounded-lg" />
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
