import express from "express";
import cors from "cors";
import errorHandler from "./Utils/errorHandler.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(errorHandler);

export { app };
