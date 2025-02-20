import { Server } from "socket.io";
import authSocketMiddleware from "../Socket/Middlewares/authSocketMiddleware.js";
import { retrivedSellerApproaval } from "../Socket/SocketController/SellerSocket.controller.js";

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true, // Ensure credentials are allowed
        }
    });

    io.use((socket, next) => authSocketMiddleware(socket, next));

    io.on("connection", (socket) => {
        console.log("Client Connected: ", socket.id);
        console.log('Authenticated user: ', socket.user);

        socket.on("retrivedNotApprovalProperty", (id) => {
            retrivedSellerApproaval(socket, id);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
}

export default setupSocket;
