import mongoose from "mongoose";
import { DB_NAME } from "../Constant.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("😍😋😑😶 Connection Successfully.");
  } catch (error) {
    console.error("ERROR IN CONNECTING MONGODB : ", error);
  }
};
