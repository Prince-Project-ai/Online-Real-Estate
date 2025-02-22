import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { LuSendHorizontal } from "react-icons/lu";
import { SlPlus } from "react-icons/sl";
import { useSocket } from "../../../Contexts/SocketContext";
import { useAuth } from "../../../Contexts/AuthContext";

const ClientSupport = ({ propSellerInfo }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { currentAuth } = useAuth();
  const { sendMessageSeller, chats, senderText, setSenderText } = useSocket();

  const handleEmitMessage = (e) => {
    
    e.preventDefault();
    sendMessageSeller(senderText, propSellerInfo?._id, currentAuth?._id, "text");
    setSenderText("");
  };

  return (
    <div className="fixed z-40 bottom-0 right-0 w-80">
      <div
        className="bg-white border border-dark border-b-0 w-full flex items-center justify-between space-x-3 h-auto rounded-t-xl p-2 py-1 top-0 z-10 cursor-pointer sticky"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <div className="seller-profile gap-x-3 py-1 flex items-center justify-center relative">
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
                <h4 className="font-semibold text-lg leading-[25px]">{propSellerInfo?.name || "Seller Name"}</h4>
                <p className="text-xs leading-[15px]">{propSellerInfo?.status || "Online"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary w-8 sticky top-0 flex items-center justify-center border border-dark rounded-full h-8">
          <FaAngleDown
            className={`text-xl transform transition-transform duration-300 ${isChatOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${isChatOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border h-96 overflow-y-auto border-dark border-b-0 bg-secondary">
          <div className="message-body flex flex-col w-full p-2 gap-y-1">
            {chats.map((message, i) => (
              <div key={i} className={`flex ${message.senderId === currentAuth?._id ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-x-2 items-end ${message.senderId === currentAuth?._id ? "flex-row-reverse" : "flex-row"}`}>
                  <img
                    src="https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg"
                    alt="profile-img"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className={`p-3 rounded-lg text-xs ${message.senderId === currentAuth?._id ? "bg-dark text-white border-dark rounded-br-none" : "bg-white rounded-bl-none border"}`}>
                    <p>{message.text}</p>
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
              value={senderText}
              name="chat"
              onChange={(e) => setSenderText(e.target.value)}
              className="text-xs p-3 pl-10 pr-10 bg-secondary rounded-full outline-none w-full border border-dark"
            />
            <button onClick={handleEmitMessage} className="send absolute right-2 bg-dark text-white border border-dark h-7 w-7 flex items-center justify-center rounded-full cursor-pointer">
              <LuSendHorizontal className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ClientSupport);
