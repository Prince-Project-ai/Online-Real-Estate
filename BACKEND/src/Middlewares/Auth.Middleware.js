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

// signIn form Validation Controller

export const isValidateSignIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email || password)) throw new ApiError(401, "All Field are Required.")

  next();
});


export const isEmailExist = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne(email).select("+_id");
  if (!isExist) throw new ApiError(401, "Email does not Exist.");
  res
    .status(200)
    .json(200, {}, "Email Verifyed Successfully.");
  // next();
  // const reNew = await User.findByIdAndUpdate(isExist._id, {
  //   $set: { password }
  // })
});