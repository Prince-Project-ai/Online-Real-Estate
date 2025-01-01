import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const Token = req?.cookies?.accessToken || req?.headers?.Authorization()?.replace("Bearer ");

  if (!Token) {
    throw new ApiError(401, "unAuthorized Request.")
  }

  const decode = jwt.verify(Token, process.env.ACCESS_TOKEN_SECREAT);

  const user = await User.findOne({ _id:decode._id });

  if(!user) {
    throw new ApiError(401,"unAuthorized Request."); 
  }

  req.user = user;
  next();
})


export const isValidateField = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, crmPassword, phoneNumber, addres } =
    req.body;

  if (!(fullName && email && password && crmPassword && phoneNumber && addres)) {
    return ApiError(401, "All Fields are Requireds..");
  }
  const user = await User.findOne({ email });
  if (user) {
    return ApiError(401, "User Already Exist..");
  }
  next();
});
