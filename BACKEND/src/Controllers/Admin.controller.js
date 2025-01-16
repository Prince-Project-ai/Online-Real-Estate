import { Admin } from "../Models/Admin.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: true,
};

export const generateAccessToken = (ADMIN) => {
  try {
    return ADMIN.generateAdminAccessToken();
  } catch (error) {
    throw new ApiError(
      error.status,
      error.message || "Something went wrong while generating token"
    );
  }
};

export const adminSignUp = asyncHandler(async (req, res) => {
  const { adminName, email, password } = req.body;
  const admin = await Admin.create({
    adminName,
    email,
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -token"
  );

  if (!createdAdmin) throw new ApiError(401, "Admin Not Registered.");

  res.status(201).json(new ApiResponse(201, {}, "Registration successful."));
});

export const adminSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) throw new ApiError(401, "All Field are required.");

  const admin = await Admin.findOne({ email });

  if (!admin) throw new ApiError(401, "Invalid Credincial.");

  const isPasswordValidate = await admin.isPasswordCompare(password);

  if (!isPasswordValidate) throw new ApiError(401, "Invalid Credincial");
  res
    .status(200)
    .cookie("adminAccessToken", generateAccessToken(admin), options)
    .json(new ApiResponse(200, {}, "Login Successfully..."));
});
