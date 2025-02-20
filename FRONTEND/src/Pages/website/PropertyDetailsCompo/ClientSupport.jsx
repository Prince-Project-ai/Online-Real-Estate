import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { LuSendHorizontal } from "react-icons/lu";
import { SlPlus } from "react-icons/sl";

const ClientSupport = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed z-40 bottom-0 right-0 w-80">
      <div
        className="bg-white border border-dark border-b-0 w-full flex items-center justify-between space-x-3 h-auto rounded-t-xl p-2 py-1 sticky top-0 z-10 cursor-pointer"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <div className="seller-profile gap-x-3 py-1 flex items-center justify-center">
          <div className="content">
            <div className="profile-info-content gap-x-2 flex items-center">
              <div className="profile-img-header">
                <img
                  src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg"
                  alt="current-chat"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="userinfo">
                <h4 className="font-semibold text-lg leading-[25px]">Mike Nielsen</h4>
                <p className="text-xs leading-[15px]">Online</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary w-8 flex items-center justify-center border border-dark rounded-full h-8">
          <FaAngleDown
            className={`text-xl transform transition-transform duration-300 ${isChatOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${isChatOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border h-96 overflow-y-auto border-dark border-b-0">
          <div className="message-body flex flex-col w-full p-4 gap-y-3 bg-gray-100">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div className={`flex gap-x-2 items-end ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <img
                    src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg"
                    alt="profile-img"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className={`p-3 rounded-lg  text-xs ${i % 2 === 0 ? "bg-white rounded-bl-none border" : "bg-dark text-white border-dark rounded-br-none"}`}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam accusantium odio corrupti. Alias quos excepturi ea praesentium harum quam debitis?</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-footer border border-dark p-2 bg-white sticky z-10">
          <div className="input-chat-group flex items-center w-full gap-x-3 relative">
            <div className="img-upload absolute left-2 bg-dark text-white h-7 w-7 flex items-center justify-center rounded-full border border-dark cursor-pointer">
              <SlPlus className="text-sm" />
            </div>
            <input
              type="text"
              placeholder="Type Message ..."
              className="text-xs p-3 pl-10 pr-10 bg-secondary rounded-full outline-none w-full border border-dark"
            />
            <div className="send absolute right-2 bg-dark text-white border border-dark h-7 w-7 flex items-center justify-center rounded-full cursor-pointer">
              <LuSendHorizontal className="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSupport;
