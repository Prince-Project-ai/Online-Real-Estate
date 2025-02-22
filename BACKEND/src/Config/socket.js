import { Server } from "socket.io";
import authSocketMiddleware from "../Socket/Middlewares/authSocketMiddleware.js";
import { retrivedSellerApproaval } from "../Socket/SocketController/SellerSocket.controller.js";
import { Message } from "../Models/Message.model.js";

const userSocketMap = new Map();

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    }
  });

  io.use((socket, next) => authSocketMiddleware(socket, next));

  io.on("connection", (socket) => {
    console.log("connection ready");

    socket.on("registerSocket", ({ senderId, socketId }) => {
      userSocketMap.set(senderId, socketId);
      console.log(`User ${senderId} registered with socket ID ${socketId}`);
    });

    socket.on("retrivedNotApprovalProperty", (id) => {
      retrivedSellerApproaval(socket, id);
    });

    socket.on("emit-seller-message", async ({ text, receiverId, senderId, type }) => {
      const receiverSocketId = userSocketMap.get(receiverId);

      console.log("Message Sending Data : ", text, receiverId, senderId, type);

      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("send-seller-message", { text, senderId, receiverId, type });
      } else {
        console.log(`Receiver (seller) ${receiverId} is not connected.`);
      }

      const message = new Message({
        senderId,
        receiverId,
        message: text,
        messageType: type,
      });

      await message.save();
    });


    socket.on("send-user-message", async ({ text, reciverId, senderId, type, read }) => {
      console.log({ text, reciverId, senderId, type, read });

      const receiverSocketId = userSocketMap.get(reciverId);

      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("send-user-chat", { text, reciverId, senderId, type, read });
      } else {
        console.log(`Receiver (user) ${reciverId} is not connected.`);
      }

      const message = new Message({
        senderId,
        receiverId: reciverId,
        message: text,
        messageType: type,
      });

      await message.save();
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

export default setupSocket;
