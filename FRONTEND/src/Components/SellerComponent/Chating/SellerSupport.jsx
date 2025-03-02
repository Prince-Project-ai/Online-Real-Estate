import React, { useState, useEffect, useRef } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FiSend, FiPhone, FiVideo, FiPaperclip, FiSearch, FiArrowLeft, FiInfo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../../Contexts/SocketContext";
import { useAuth } from "../../../Contexts/AuthContext";
import chatBgPatern from "./img/TG_pattern_3_Light.svg"

const SellerSupport = () => {
  const { chats, sendMessage, receiverText, setReceiverText, imagePreview, setImagePreview, setReceiverId } = useChat();
  const { currentAuth } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileView, setMobileView] = useState("users"); // users, chat
  const chatContainerRef = useRef(null);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileView("both");
      } else {
        setMobileView(selectedUser ? "chat" : "users");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedUser]);

  // Process unique users with their latest messages
  useEffect(() => {
    if (!currentAuth?._id || !chats.length) return;

    // Create a map to hold unique users with their latest messages
    const usersMap = {};

    chats.forEach(chat => {
      // Extract data based on whether the current user is the sender or receiver
      if (chat.senderId === currentAuth?._id || chat.receiverId === currentAuth?._id) {
        // Get the ID of the other person in the conversation
        const otherPersonId = chat.senderId === currentAuth?._id ? chat.receiverId : chat.senderId;

        if (!otherPersonId) return;

        const chatName = chat.senderId === currentAuth?._id ? chat.receiverName : chat.senderName;
        const chatProfile = chat.senderId === currentAuth?._id ? chat.receiverProfile : chat.profile;

        // Use message timestamp or created date or current date as fallback
        const messageTimestamp = new Date(chat.timestamp || chat.createdAt || Date.now()).getTime();
        const messageText = chat.senderText || chat.message || "";

        // Only update if this is a newer message or the user doesn't exist yet
        if (!usersMap[otherPersonId] || messageTimestamp > usersMap[otherPersonId].timestamp) {
          usersMap[otherPersonId] = {
            senderId: otherPersonId,
            senderName: chatName || "Unknown User",
            profile: chatProfile || "https://via.placeholder.com/40",
            latestMessage: messageText,
            timestamp: messageTimestamp,
            time: formatMessageTime(messageTimestamp),
            unread: false, // Add unread status
            online: Math.random() > 0.5 // Randomly set online status for demo
          };
        }
      }
    });

    // Convert the map to an array and sort by latest message timestamp
    const sortedUsers = Object.values(usersMap).sort((a, b) => b.timestamp - a.timestamp);

    // Update users only if there's a change
    if (JSON.stringify(sortedUsers) !== JSON.stringify(uniqueUsers)) {
      setUniqueUsers(sortedUsers);

      // If no user is selected and we have users available, select the first one
      if (!selectedUser && sortedUsers.length > 0) {
        setSelectedUser(sortedUsers[0]);
        setReceiverId(sortedUsers[0].senderId);
      }
    }
  }, [chats, currentAuth?._id, selectedUser, setReceiverId]);

  // Helper function to format message time
  const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // If message is from today
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // If message is from yesterday
    else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    // If message is from this year
    else if (messageDate.getFullYear() === today.getFullYear()) {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    // If message is older
    else {
      return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  const handleSellerSendMessage = (e) => {
    e.preventDefault();
    if (!receiverText.trim() && !imagePreview) return;

    const messageInfo = {
      profile: currentAuth?.avatar,
      senderName: currentAuth?.fullName,
      receiverId: selectedUser?.senderId,
      receiverName: selectedUser?.senderName,
      receiverProfile: selectedUser?.profile,
      senderId: currentAuth?._id,
      senderText: receiverText,
      type: imagePreview ? "image" : "text",
      image: imagePreview || null,
      timestamp: Date.now()
    };

    sendMessage(messageInfo);
    setReceiverText("");
    setImagePreview(null); // Clear image preview after sending
  };

  const handleTyping = (e) => {
    setReceiverText(e.target.value);

    // Simulate "typing" indicator
    setIsTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMobileView("chat");
    setReceiverId(user.senderId);
  };

  const handleBackToUsers = () => {
    setMobileView("users");
    setShowProfile(false);
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};

    messages.forEach(message => {
      const date = new Date(message.timestamp || message.createdAt || Date.now());
      const dateStr = date.toLocaleDateString();

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }

      groups[dateStr].push(message);
    });

    return groups;
  };

  // Format date labels
  const formatDateLabel = (dateStr) => {
    const messageDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    }
  };

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  // Filter users based on search term
  const filteredUsers = uniqueUsers.filter(user =>
    user.senderName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get filtered messages for the selected user
  const userMessages = selectedUser ?
    chats.filter((message) =>
      (message.senderId === selectedUser?.senderId && message.receiverId === currentAuth?._id) ||
      (message.receiverId === selectedUser?.senderId && message.senderId === currentAuth?._id)
    ) : [];

  // Group messages by date
  const groupedMessages = groupMessagesByDate(userMessages);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar with user list - hidden on mobile when in chat view */}
      <AnimatePresence mode="wait">
        {(mobileView === "users" || mobileView === "both") && (
          <motion.div
            className={`bg-white border-r ${mobileView === "both" ? "w-1/3 lg:w-1/4 xl:w-1/5" : "w-full"} flex flex-col h-full shadow-sm`}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b flex items-center justify-between bg-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={currentAuth?.avatar || "https://via.placeholder.com/40"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-indigo-500"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{currentAuth?.fullName || "Your Name"}</h3>
                  <p className="text-xs text-gray-500">{currentAuth?.role || "Support Agent"}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <div className="relative rounded-full bg-gray-100 shadow-sm hover:shadow">
                <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="bg-transparent rounded-full p-3 w-full pl-10 text-sm outline-none"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                    <FiSearch className="text-gray-400 text-xl" />
                  </div>
                  <p className="text-gray-600">No contacts found</p>
                  <p className="text-sm text-gray-400">Try a different search term</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <motion.li
                      key={user.senderId}
                      className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${selectedUser?.senderId === user.senderId ? 'bg-indigo-50 border-l-4 border-dark' : ''
                        }`}
                      onClick={() => handleUserClick(user)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={user.profile || "https://via.placeholder.com/40"}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          />
                          {user.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h5 className="text-sm font-semibold truncate">{user.senderName || "Unknown User"}</h5>
                            <p className="text-xs text-gray-500 whitespace-nowrap">{user.time || ""}</p>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-1">{user.latestMessage || "No messages"}</p>
                        </div>
                        {user.unread && (
                          <span className="h-2 w-2 bg-indigo-500 rounded-full flex-shrink-0"></span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat main area - hidden on mobile when in user list view */}
      <AnimatePresence mode="wait">
        {(mobileView === "chat" || mobileView === "both") && (
          <motion.div
            className="flex-1 flex flex-col h-full bg-gray-50"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 flex items-center justify-between p-3 shadow-sm">
              <div className="flex items-center space-x-3">
                {mobileView === "chat" && mobileView !== "both" && (
                  <button
                    onClick={handleBackToUsers}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FiArrowLeft className="text-gray-600" />
                  </button>
                )}
                <div className="relative">
                  <img
                    src={selectedUser?.profile || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  {selectedUser?.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{selectedUser?.senderName || "Select a contact"}</h4>
                  <p className="text-xs text-gray-500">
                    {selectedUser?.online ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      "Offline"
                    )}
                    {isTyping && selectedUser?.senderId === selectedUser?.senderId && (
                      <span className="text-gray-500 ml-2">typing...</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FiPhone className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FiVideo className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FiInfo className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-white"
              style={{
                background: `url(${chatBgPatern})`,
              }}
            >
              {selectedUser ? (
                Object.keys(groupedMessages).map((date) => (
                  <div key={date} className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="h-px bg-gray-300 flex-grow"></div>
                      <div className="mx-4 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {formatDateLabel(date)}
                      </div>
                      <div className="h-px bg-gray-300 flex-grow"></div>
                    </div>

                    {groupedMessages[date].map((message, i) => {
                      const isSender = message.senderId === currentAuth?._id;
                      const showAvatar = i === 0 ||
                        groupedMessages[date][i - 1]?.senderId !== message.senderId;

                      return (
                        <motion.div
                          key={i}
                          className={`flex mb-4 ${isSender ? "justify-end" : "justify-start"}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`flex items-end ${isSender ? "flex-row-reverse" : "flex-row"} max-w-3/4`}>
                            {showAvatar ? (
                              <div className={`flex-shrink-0 ${isSender ? "ml-2" : "mr-2"}`}>
                                <img
                                  src={message.profile || message.avatar || "https://via.placeholder.com/40"}
                                  alt="Profile"
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className={`w-8 ${isSender ? "ml-2" : "mr-2"}`}></div>
                            )}

                            <div className="flex flex-col">
                              <div
                                className={`p-3 rounded-2xl ${isSender
                                  ? "bg-dark text-white rounded-tr-none"
                                  : "bg-white text-gray-800 rounded-tl-none shadow-sm border"
                                  }`}
                              >
                                {message.type === "image" ? (
                                  <img
                                    src={message.image}
                                    alt="chat-img"
                                    className="max-w-xs rounded-lg"
                                  />
                                ) : (
                                  <p className="text-sm">{message.senderText || message.message}</p>
                                )}
                              </div>
                              <span className={`text-xs mt-1 text-gray-500 ${isSender ? "text-right" : "text-left"}`}>
                                {formatMessageTime(message.timestamp || message.createdAt || Date.now())}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiSearch className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No conversation selected</h3>
                  <p className="text-gray-500 max-w-sm">
                    Choose a contact from the list to start a conversation or continue an existing one.
                  </p>
                </div>
              )}
            </div>

            {/* Chat input area */}
            <div className="chat-footer border-t border-gray-200 p-3 bg-white">
              {imagePreview && (
                <div className="mb-2 relative inline-block">
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    id="image-upload"
                    disabled={!selectedUser}
                  />
                  <button
                    className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-50"
                    disabled={!selectedUser}
                  >
                    <FiPaperclip />
                  </button>
                </div>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={selectedUser ? "Type your message..." : "Select a contact to start chatting"}
                    value={receiverText}
                    onChange={handleTyping}
                    className="text-sm p-3 bg-gray-100 rounded-full outline-none w-full pr-12 border border-transparent focus:border-indigo-300 transition-colors"
                    disabled={!selectedUser}
                  />
                </div>

                <button
                  onClick={handleSellerSendMessage}
                  disabled={!selectedUser || (!receiverText.trim() && !imagePreview)}
                  className="p-3 rounded-full bg-dark text-white hover:bg-dark/80 transition-colors disabled:opacity-50 disabled:bg-gray-400"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(SellerSupport);