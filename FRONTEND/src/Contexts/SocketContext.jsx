import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import { fetchChatMessages } from "../Api/website/HandleUserApi";

export const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("ChatContext must be used within a ChatProvider");
  return context;
};

const SOCKET_URL = "http://localhost:9998";

const ChatProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [senderText, setSenderText] = useState("");
  const [receiverText, setReceiverText] = useState("");
  const [chats, setChats] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [receiverId, setReceiverIdState] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const { currentAuth } = useAuth();

  // Set receiver ID and store in localStorage
  const setReceiverId = useCallback((id) => {
    if (!id) return;
    setReceiverIdState(id);
    localStorage.setItem("receiverId", id);
  }, []);

  // Load receiver ID from localStorage on mount
  useEffect(() => {
    const storedReceiverId = localStorage.getItem("receiverId");
    if (storedReceiverId) {
      setReceiverIdState(storedReceiverId);
    }
  }, []);

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (!currentAuth?._id) {
      console.log("No user authenticated, skipping socket connection");
      return;
    }

    console.log("Initializing socket connection for user:", currentAuth._id);

    // Create socket connection
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket connection events
    newSocket.on("connect", () => {
      console.log("✅ Socket Connected:", newSocket.id);
      setSocketConnected(true);
      // Register user with their ID
      newSocket.emit("registerSocket", { senderId: currentAuth._id });
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket Disconnected:", reason);
      setSocketConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket Connection Error:", error);
      setSocketConnected(false);
    });

    // Handle incoming messages
    const handleIncomingMessage = (data) => {
      // Add message to chat state if it's not already there
      setChats(prev => {
        // Check if this exact message is already in the chat
        const messageExists = prev.some(msg =>
          msg.senderId === data.senderId &&
          msg.senderText === data.senderText &&
          msg.timestamp === data.timestamp
        );

        if (messageExists) {
          return prev;
        }

        return [...prev, data];
      });
    };

    // Register message listener
    newSocket.on("chat-message", handleIncomingMessage);

    // Store socket reference
    socketRef.current = newSocket;

    // Cleanup function
    return () => {
      if (socketRef.current) {
        console.log("🛑 Cleaning up socket connection");
        newSocket.off("chat-message", handleIncomingMessage);
        newSocket.close();
        setSocketConnected(false);
      }
    };
  }, [currentAuth?._id]);

  // Load chat history when receiver changes
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!currentAuth?._id || !receiverId) {
        console.log("Missing user or receiver ID, skipping chat history load");
        return;
      }


      try {
        const messages = await fetchChatMessages(currentAuth._id, receiverId);

        if (Array.isArray(messages)) {
          // Transform messages to consistent format if needed
          const formattedMessages = messages.map(msg => ({
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            senderText: msg.message || msg.senderText || "",
            profile: msg.avatar || msg.profile,
            senderName: msg.name || msg.senderName,
            timestamp: msg.createdAt || msg.timestamp || Date.now(),
            type: msg.messageType || msg.type || "text",
            image: msg.image || null,
          }));

          setChats(formattedMessages);
        } else {
          console.error("Invalid message format received:", messages);
        }
      } catch (error) {
        console.error("❌ Error loading chat history:", error);
      }
    };

    if (receiverId && currentAuth?._id) {
      loadChatHistory();
    }
  }, [currentAuth?._id, receiverId]);

  // Send message function
  const sendMessage = useCallback((message) => {
    if (!socketRef.current || !socketConnected) {
      console.error("Socket not connected, cannot send message");
      return;
    }

    if (!message.receiverId || !message.senderId) {
      console.error("Missing receiverId or senderId in message", message);
      return;
    }

    const fullMessage = {
      profile: message.profile || "",
      senderName: message.senderName || "",
      receiverId: message.receiverId || "",
      senderId: message.senderId || "",
      senderText: message.senderText || "",
      type: message.type || "text",
      image: message.image || null,
      timestamp: message.timestamp || Date.now(),
      delivered: true,
    };

    try {
      // Emit the message to the server
      socketRef.current.emit("send-message", fullMessage);

      // Add the message to local state
      setChats(prev => {
        // Check if this message already exists in the chat
        const messageExists = prev.some(msg =>
          msg.senderId === fullMessage.senderId &&
          msg.senderText === fullMessage.senderText &&
          msg.timestamp === fullMessage.timestamp
        );

        if (messageExists) {
          return prev;
        }

        return [...prev, fullMessage];
      });

      // Reset input fields
      setSenderText("");
      setReceiverText("");
      setImagePreview(null);
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  }, [socketConnected]);

  // Context value
  const contextValue = {
    socket: socketRef.current,
    socketConnected,
    chats,
    senderText,
    receiverText,
    imagePreview,
    receiverId,
    setSenderText,
    setReceiverText,
    setChats,
    setImagePreview,
    setReceiverId,
    sendMessage,
  };

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export default ChatProvider;