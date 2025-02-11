import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { createServer } from "http";

import { app } from "./app.js";
import { connectDB } from "./DB/Connection.js";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});


io.listen(9998);

io.on("connection", (socket) => {
  console.log("Client connected with socket id : ", socket.id);
  socket.emit("verify", 'You are Connected To Chat');
  socket.on("success", (res) => {
    console.log("Verification successfully.", res);
  });

  socket.on("client", (socket) => {
    console.log("Client Message : ", socket);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});





const PORT = process.env.PORT || 5656;

connectDB();

app.listen(PORT, () => {
  console.log(`⚙️💫🤞⚙️ Server is running at PORT: ${PORT}`);
});
