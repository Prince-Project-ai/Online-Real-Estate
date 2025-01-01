import express from "express";
import cors from "cors";
import errorHandler from "./Utils/errorHandler.js";
import cookieParser from "cookie-parser";

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

app.use(errorHandler);

export { app };
