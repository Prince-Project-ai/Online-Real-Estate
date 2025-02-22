import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";

export const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("SocketContext must be used within SocketProvider");
  return context;
}

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [senderText, setSenderText] = useState("");
  const [reciverText, setReciverText] = useState("");
  const [chats, setChats] = useState([]);
  const { currentAuth } = useAuth();

  useEffect(() => {
    const newSocket = io("http://localhost:9998", {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log("Socket Connected.");
      newSocket.emit("registerSocket", { senderId: currentAuth?._id, socketId: newSocket.id });
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket Disconnected:', reason);
    });

    newSocket.on('connect_error', (error) => {
      console.log('Socket Error :', error);
    });

    newSocket.on("send-seller-message", ({ text, senderId, receiverId, type }) => {
      setChats((prev) => [...prev, { text, senderId, receiverId, type }]);
      console.log({ text, senderId, receiverId, type });
    });

    newSocket.on("send-user-chat", ({ text, reciverId, senderId, type, read }) => {
      setChats((prev) => [...prev, { text, senderId, reciverId, type }]);
      console.log({ text, reciverId, senderId, type, read });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [currentAuth]);


  const sendMessageSeller = (text, receiverId, senderId, type) => {
    if (socket) {
      socket.emit('emit-seller-message', { text, receiverId, senderId, type });
      setChats((prev) => [...prev, { text, receiverId, senderId, type }]);
      setSenderText("");
    }
  }

  const sendMessageUser = (text, reciverId, senderId, type, read) => {
    if (socket) {
      socket.emit("send-user-message", { text, reciverId, senderId, type, read });
      setChats((prev) => [...prev, { text, reciverId, senderId, type }]);
      setReciverText("");
    }
  }

  const contextValue = {
    socket,
    sendMessageSeller,
    senderText,
    setSenderText,
    reciverText,
    setReciverText,
    chats,
    sendMessageUser,
    setChats,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
