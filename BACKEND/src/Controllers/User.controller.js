import { User } from "../Models/User.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

//signup controller

export const generateAccessTokenAndRefreshToken = async (id) =>  {
  try {
    const user = await User.findById(id);
    const refreshToken = user.generateRefreshToken()
    const accessToken = user.generateAccessToken()
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});
    return {accessToken,refreshToken};
  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating token");
  }
}

export const signUp = asyncHandler(async (req, res) => {
  req.body;

  const user = await User.create({
    fullName,
    email,
    password,
    crmPassword,
    phoneNumber,
    addres,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser) {
    throw new ApiError(400,"User Not Registered...")
  }
  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registration successfull.."));
});
