import { Admin } from "../Models/Admin.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";



export const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  try {
    const Token = req?.cookies?.adminAccessToken;

    if (!Token) {
      throw new ApiError(401, "Unauthorized request. No token provided.");
    }
    // Verify token
    const decodedToken = jwt.verify(Token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    if (!decodedToken?.id) {
      throw new ApiError(401, "Unauthorized request. Invalid token.");
    }

    // Find admin by decoded token ID
    const admin = await Admin.findById(decodedToken.id).select("-password -token");
    if (!admin) {
      throw new ApiError(401, "Unauthorized request. Admin not found.");
    }
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "INTERNAL SERVER ERROR MIDDLEWARE");
  }
});


export const sendAdminData = asyncHandler(async (req, res, next) => {
  try {
    const admin = req.admin;
    res
      .status(200)
      .json(new ApiResponse(200, admin, "Fetch SuccessFully."));
    next();
  } catch (error) {
    throw new ApiError(error.status, error.message || "INTERNAL SERVER ERROR MIDDLEWARE");
  }
})


export const validateField = asyncHandler(async (req, res, next) => {

  const { adminName, email, password, phoneNumber } = req.body;

  console.log(req.body);


  if (!(adminName && email && password && phoneNumber)) throw new ApiError(401, "All Field are Required.");

  const admin = await Admin.findOne({
    $or: [
      { email: email },
      { adminName: adminName }]
  });

  if (admin) {
    throw new ApiError(401, "Admin Already Exist with this email or username..");
  }
  next();

});