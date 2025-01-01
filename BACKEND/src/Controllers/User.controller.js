import { User } from "../Models/User.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

//signup controller

export const generateAccessTokenAndRefreshToken = asyncHandler(async (req, res) => {

})

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

  const generateToken = await generateAccessTokenAndRefreshToken(user._id);

  res
    .status(201)
    .json(new ApiResponse(201, "User Registration successfull.."));


  res.status(201).json(user);
});
