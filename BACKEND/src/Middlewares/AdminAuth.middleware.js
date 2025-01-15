import { Admin } from "../Models/Admin.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  try {
    const Token = req?.cookie?.adminAccessToken;
    if (!Token) throw new ApiError(404, "Token Not Found");
    const decodeToken = jwt.verify(Token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    const admin = await Admin.findById(decodeToken.id).select("-password -token");
    if (!admin) throw new ApiError(401, "UnAuthorized Request.");

    req.admin = admin;
    next();
  } catch (error) {
    ApiError(error.status, "Internal Server ERROR MiddleWare");
    next(error);
  }
});


export const validateField = asyncHandler(async (req, res, next) => {

  const { adminName, email, password } = req.body;
  if (!(adminName && email && password)) throw new ApiError(401, "All Field are Required.");
  const admin = await Admin.findOne({ email });
  if (admin) {
    throw new ApiError(401, "Admin Already Exist with this email..");
  }
  next();

});