import { Server } from "socket.io";
import authSocketMiddleware from "../Socket/Middlewares/authSocketMiddleware.js";
import { retrivedSellerApproaval } from "../Socket/SocketController/SellerSocket.controller.js";
import { Message } from "../Models/Message.model.js";

// const userSocketMap = new Map();

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

        console.log("user Data :");
        console.log("user Data : ", socket.user);

        // console.log("Client Connected: ", socket.id);

        socket.on("retrivedNotApprovalProperty", (id) => {
            retrivedSellerApproaval(socket, id);
        });


        // chating seller start
        socket.on("emit-message", async ({ text, reciverId, senderId, type }) => {
            console.log(text, reciverId, senderId);
            const message = new Message(
                {
                    senderId,
                    receiverId: reciverId,
                    message: text,
                    messageType: type,
                }
            )
            await message.save();
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
}

export default setupSocket;
