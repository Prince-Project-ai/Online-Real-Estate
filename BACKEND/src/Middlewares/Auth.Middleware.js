import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const Token =
      req.cookies?.accessToken ||
      req?.header("Authorization")?.replace("Bearer ", "");
    if (!Token) throw new ApiError(401, "unAuthorized Request.");
    const decode = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decode.id).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, "unAuthorized Request.");
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Request");
  }
});

export const isValidateField = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, crmPassword, phoneNumber, addres } =
    req.body;

  if (
    !(fullName || email || password || crmPassword || phoneNumber || addres)
  ) {
    throw new ApiError(401, "All Fields are Requireds..");
  }

  if (password !== crmPassword) {
    throw new ApiError(400, "Password is not Same.");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(401, "User Already Exist..");
  }

  next();
});

// signIn form Validation Controller

export const isValidateSignIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email || password)) throw new ApiError(401, "All Field are Required.");

  next();
});
