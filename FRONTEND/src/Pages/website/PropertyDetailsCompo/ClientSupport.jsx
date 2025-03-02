import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { LuSendHorizontal } from "react-icons/lu";
import { SlPlus } from "react-icons/sl";
import { useAuth } from "../../../Contexts/AuthContext";
import { motion } from "framer-motion";
import { useChat } from "../../../Contexts/SocketContext";

const ClientSupport = ({ propSellerInfo }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { currentAuth } = useAuth();
  const {
    sendMessage,
    chats,
    senderText,
    setSenderText,
    imagePreview,
    setImagePreview,
    setReceiverId
  } = useChat();
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Set the receiver ID and load chat history when component mounts or seller changes
  useEffect(() => {
    if (!currentAuth?._id || !propSellerInfo?._id) return;
    // Important: Set the correct receiverId in the chat context
    setReceiverId(propSellerInfo._id);
  }, [currentAuth?._id, propSellerInfo?._id, setReceiverId]);

  // Handle sending a message
  const handleEmitMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!senderText.trim() && !imagePreview) return;
      if (!currentAuth?._id || !propSellerInfo?._id) {
        console.error("Missing user or seller information", {
          currentUser: currentAuth?._id,
          seller: propSellerInfo?._id
        });
        return;
      }

      setIsLoading(true);

      const messageInfo = {
        profile: currentAuth?.avatar,
        senderName: currentAuth?.fullName,
        receiverId: propSellerInfo?._id,
        senderId: currentAuth?._id,
        senderText: senderText.trim() || "",
        type: imagePreview ? "image" : "text",
        image: imagePreview || null,
        timestamp: Date.now()
      };

      sendMessage(messageInfo);
      setSenderText("");
      setImagePreview(null);
      setIsLoading(false);
    },
    [currentAuth, propSellerInfo, senderText, imagePreview, sendMessage, setSenderText, setImagePreview]
  );

  // Handle image selection
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, [setImagePreview]);

  // Auto-scroll to bottom when new messages arrive
  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      });
    }
  }, [chats]);

  // Filter chats to show only those relevant to this conversation
  const filteredChats = chats.filter(chat =>
    (chat.senderId === currentAuth?._id && chat.receiverId === propSellerInfo?._id) ||
    (chat.senderId === propSellerInfo?._id && chat.receiverId === currentAuth?._id)
  );

  return (
    <div className="fixed z-40 bottom-0 right-0 w-80">
      <div
        className="bg-white border border-dark border-b-0 w-full flex items-center justify-between space-x-3 h-auto rounded-t-xl p-2 py-1 top-0 z-10 cursor-pointer sticky"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <div className="seller-profile gap-x-3 py-1 flex items-center">
          <img
            src={propSellerInfo?.avatar || "https://via.placeholder.com/40"}
            alt="current-chat"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-lg">{propSellerInfo?.fullName || "Seller Name"}</h4>
            <p className="text-xs">{propSellerInfo?.status || "Online"}</p>
          </div>
        </div>
        <div className="bg-secondary w-8 flex items-center justify-center border border-dark rounded-full h-8">
          <FaAngleDown className={`text-xl transform transition-transform ${isChatOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      <div className={`transition-all duration-500 ${isChatOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div ref={chatContainerRef} className="border h-96 overflow-y-auto border-dark border-b-0 bg-white p-2">
          {filteredChats.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-sm text-center">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            filteredChats.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${message.senderId === currentAuth?._id ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-x-2 mb-3 items-end ${message.senderId === currentAuth?._id ? "flex-row-reverse" : "flex-row"}`}>
                  <img
                    src={message.senderId === currentAuth?._id ? currentAuth?.avatar : message?.profile || propSellerInfo?.avatar || "https://via.placeholder.com/40"}
                    alt="profile-img"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div
                    className={`p-3 rounded-lg w-2/3 max-w-full text-sm ${message.senderId === currentAuth?._id
                      ? "bg-dark text-white rounded-br-none"
                      : "bg-secondary border rounded-bl-none"
                      }`}
                  >
                    {message.type === "image" ? (
                      <img src={message.image} alt="chat-img" className="w-full rounded-lg" />
                    ) : (
                      <p>{message.senderText || message.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="chat-footer border border-dark p-2 bg-white">
          {imagePreview && (
            <div className="mb-2 relative">
              <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          <div className="input-chat-group flex items-center w-full gap-x-3 relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute left-2 opacity-0 w-7 h-7 cursor-pointer"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="img-upload absolute left-2 bg-dark text-white h-7 w-7 flex items-center justify-center rounded-full border border-dark cursor-pointer"
            >
              <SlPlus className="text-sm" />
            </label>

            <input
              type="text"
              placeholder="Type Message ..."
              value={senderText}
              onChange={(e) => setSenderText(e.target.value)}
              className="text-xs p-3 pl-10 pr-10 bg-secondary rounded-full outline-none w-full border border-dark"
              onKeyPress={(e) => e.key === 'Enter' && handleEmitMessage(e)}
            />

            <button
              onClick={handleEmitMessage}
              disabled={isLoading || (!senderText.trim() && !imagePreview)}
              className={`send absolute right-2 ${isLoading || (!senderText.trim() && !imagePreview)
                ? "bg-gray-400"
                : "bg-dark"
                } text-white h-7 w-7 flex items-center justify-center rounded-full cursor-pointer`}
            >
              <LuSendHorizontal className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ClientSupport);