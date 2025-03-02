import { Server } from "socket.io";
import authSocketMiddleware from "../Socket/Middlewares/authSocketMiddleware.js";
import { Message } from "../Models/Message.model.js";

class UserSocketMap {
  constructor() {
    this.map = new Map();
  }

  set(userId, socketId) {
    if (userId) {
      console.log(`🔗 Mapping user ${userId} to socket ${socketId}`);
      this.map.set(userId, socketId);
    }
  }

  get(userId) {
    return this.map.get(userId);
  }

  delete(socketId) {
    for (let [userId, storedSocketId] of this.map.entries()) {
      if (storedSocketId === socketId) {
        console.log(`🔗 Removing user ${userId} mapping`);
        this.map.delete(userId);
        break;
      }
    }
  }
}

const userSocketMap = new UserSocketMap();

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
    transports: ["websocket", "polling"],
    reconnectionAttempts: 5,
    timeout: 10000,
  });

  io.use((socket, next) => authSocketMiddleware(socket, next));

  io.on("connection", (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Register socket when user connects
    socket.on("registerSocket", ({ senderId }) => {
      if (!senderId) {
        console.warn("⚠️ registerSocket called without senderId");
        return;
      }

      userSocketMap.set(senderId, socket.id);
    });

    // Handle sending messages
    socket.on("send-message", async (data) => {
      await handleMessage(socket, io, data, "chat-message");
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("❌ Socket ERROR:", error);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      userSocketMap.delete(socket.id);
    });
  });

  return io;
};

const handleMessage = async (socket, io, data, event) => {
  try {
    const { profile, senderName, receiverId, senderId, senderText, type, image } = data;

    if (!receiverId || !senderId) {
      console.error("❌ Missing receiverId or senderId in message data:", data);
      return;
    }

    const receiverSocketId = userSocketMap.get(receiverId);

    const messagePayload = {
      profile,
      senderName,
      receiverId,
      senderId,
      senderText,
      type,
      image: image || null,
      delivered: !!receiverSocketId,
      timestamp: Date.now()
    };

    // Save message to database first
    try {
      await new Message({
        avatar: profile,
        name: senderName,
        senderId,
        receiverId,
        message: senderText,
        messageType: type,
        image: image || null,
        delivered: !!receiverSocketId,
        createdAt: new Date()
      }).save();
    } catch (dbError) {
      console.error("❌ Error saving message to database:", dbError);
      // Continue with socket emission even if DB save fails
    }

    // Emit to receiver if online
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(event, messagePayload);
    } else {
      console.warn(`⚠️ Receiver (${receiverId}) is not connected.`);
    }

  } catch (error) {
    console.error("❌ Error handling message:", error);
  }
};

export default setupSocket;