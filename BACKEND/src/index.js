import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { connectDB } from "./DB/Connection.js";

const PORT = process.env.PORT || 5656;

connectDB();

// server.listen(PORT, () => {
//   console.log(`⚙️💫🤞⚙️ Server is running at PORT: ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`⚙️💫🤞⚙️ App is running at PORT: ${PORT}`);
});
