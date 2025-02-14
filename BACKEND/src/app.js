import express from "express";
import compression from "compression";
import cors from "cors";
import errorHandler from "./Utils/errorHandler.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/User.router.js";
import adminRouter from "./Routes/Admin.router.js";
import sellerRouter from "./Routes/Seller.router.js";

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(compression()); // Automatically compresses response bodies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (_, res) => {
  res.send("Welcome to Online Real Estate API");
});

// USER
app.use("/api/v1/propertyfy", userRouter);

// ADMIN
app.use("/api/v1/propertyfy/admin/", adminRouter);

// seller
app.use("/api/v1/propertyfy", sellerRouter);


app.use(errorHandler);

export { app };

/*
=============================================== [API LIST START] ========================================


      ======================= API LIST [ USER ] =================
      http://localhost:9999/api/v1/propertyfy/sign-up
      http://localhost:9999/api/v1/propertyfy/sign-in
      http://localhost:9999/api/v1/propertyfy/refresh-token
      http://localhost:9999/api/v1/propertyfy/logout-user
      http://localhost:9999/api/v1/propertyfy/current-auth
      http://localhost:9999/api/v1/propertyfy/verify-email
      http://localhost:9999/api/v1/propertyfy/search-result
      http://localhost:9999/api/v1/propertyfy/all-property

  
      ======================= API LIST [ AGENT ] =================
      http://localhost:9999/api/v1/propertyfy/seller/update-agent-profile

      
      
      
      
      ======================= API LIST [ SELLER ] =================
      http://localhost:9999/api/v1/propertyfy/add-seller-property
      http://localhost:9999/api/v1/propertyfy/get-all-listing
      http://localhost:9999/api/v1/propertyfy/delete-listing/:deleteId
      http://localhost:9999/api/v1/propertyfy/update-seller-listing/:propertyId



      

      ======================= API LIST [ SOMETING (COMING SOON) ] =================
      http://localhost:9999/api/v1/propertyfy/admin-sign-up
      http://localhost:9999/api/v1/propertyfy/admin-sign-in
      http://localhost:9999/api/v1/propertyfy/current-admin
      http://localhost:9999/api/v1/propertyfy/admin-logout



      ======================= API LIST [ SOMETING (ADMIN) ] =================
      http://localhost:9999/api/v1/propertyfy/admin/all-users
      http://localhost:9999/api/v1/propertyfy/admin/remove-auth



=============================================== [API LIST END] ========================================
*/
