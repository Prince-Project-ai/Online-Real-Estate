import express from "express";
import cors from "cors";
import errorHandler from "./Utils/errorHandler.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/User.router.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (_, res) => {
  res.send("Welcome to Online Real Estate API");
});


// http://localhost:9999/api/v1/propertyfy/sign-up
app.use("/api/v1/propertyfy", userRouter); 
app.use(errorHandler);

export { app };
// user apis
