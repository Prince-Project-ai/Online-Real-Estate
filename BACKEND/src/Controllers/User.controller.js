import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
};
// accessToken and refreshToken generator function
export const generateAccessTokenAndRefreshToken = async (user) => {
  try {
    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    return { newRefreshToken, newAccessToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

// Signup Controller
export const signUp = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, addres, role } = req.body;

    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
      addres,
      role,
    });

    const createdUser = await User.findById(user._id).select(
      "+_id"
    );
    if (!createdUser) throw new ApiError(400, "User Not Registered...");
    res
      .status(201)
      .json(
        new ApiResponse(201, {}, `${role} Registration successfull..`)
      );
  } catch (error) {
    throw new ApiError(error.status, error.message || "Something went wrong..");
  }
});

// Sign-In Controller
export const signIn = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throw new ApiError(401, "Invalid User Credincial");

    const isPasswordValidate = await user.isPasswordCorrect(password);

    if (!isPasswordValidate) throw new ApiError(401, "Invalid User Credincial");

    const { newRefreshToken, newAccessToken } =
      await generateAccessTokenAndRefreshToken(user);

    res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(200, {}, "Welcome back to PropertyFy. Let's get to it!")
      );
  } catch (err) {
    throw new ApiError(err.status, err.message || "Internal server Error.");
  }
});

// refresh access token controller
export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const inComingRefreshToken = req?.cookies?.refreshToken;
    if (!inComingRefreshToken)
      throw new ApiError(401, "UnAuthorized User Requrest.");
    const decodeToken = jwt.verify(
      inComingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodeToken.id);
    if (!user) throw new ApiError(401, "Invalid Refresh Token.");
    if (inComingRefreshToken !== user.refreshToken)
      throw new ApiError(401, "Invalid Token OR Expire Token.");
    const { newRefreshToken, newAccessToken } =
      await generateAccessTokenAndRefreshToken(user._id);
    res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { token: { newAccessToken, newRefreshToken } },
          "AccessToken Refresh SuccessFully."
        )
      );
  } catch (error) {
    throw new ApiError(error.status, error.message || "Internal Server Error.");
  }
});

// get Current User
export const currentAuth = asyncHandler(async (req, res) => {
  const currentUser = req?.user;
  res
    .status(200)
    .json(new ApiResponse(200, currentUser, "Current Auth Authorized."));
});

// logout current user
export const userLogOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logout SuccessFully."));
});

// signin Controller
// 1) seprate the part for accessing
// 2) for fetch the email from database is available or not
// 3) compaire with password is same or not
// 4) generate the access token and refresh token
// 5) save the refresh token in the db
// 6) REMOVE THE PASSWORD AND REFRESH TOKEN IN THAT REPONSE.
// 7) SAVE IN THE COOKIE OF THE CLIENT BROWSER WITH HTTPONLYTRUE AND SECURETRUE
// FINNALY YOU ARE SIGN IN OK WOW

// refresh the access token mainly is used for save un neccessry db calling by user when user session are expried that time its display a pop then you are say that login now ok when that click on that button that time refresh the access token that is very nice techniqu to prevent the db calling that made porject production grade. let's start...
// control flow of process
// 1) get the cookie access refresh token.
// 2) decode that refresh token and create a db call.
// 2) compare that cookie token with db access token
// 3) generate both token using calling a function.
// 4) is token is not availalbe that called it anauthoruzed
// 5) user generate access toke nad refresh genrating new tokens ok lets start coding...
// await is fucking keyword mother f

// controll flow of logOut process

// 1) fetch the accessToken
// 2) set the null of the accessToken
// 3) remove the token from cookis
// 5) and
