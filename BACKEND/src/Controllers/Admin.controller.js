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
  try {
    const { adminName, email, password } = req.body;
    await Admin.create({
      adminName,
      email,
      password,
    });
    res.status(201).json(new ApiResponse(201, {}, "Registration successful."));
  } catch (error) {
    throw new ApiError(error.status, error.message || "Server Error ADMIN SIGN Up");
  }
});

export const adminSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) throw new ApiError(401, "All fields are required.");

  console.time("Database Query");
  const admin = await Admin.findOne({ email }).select("+password");
  console.timeEnd("Database Query");

  if (!admin) throw new ApiError(401, "Invalid Credentials.");

  console.time("Password Validation");
  const isPasswordValid = await admin.isPasswordCompare(password);
  console.timeEnd("Password Validation");

  if (!isPasswordValid) throw new ApiError(401, "Invalid Credentials.");

  console.time("Token Generation");
  const token = generateAccessToken(admin);
  console.timeEnd("Token Generation");

  res
    .status(200)
    .cookie("adminAccessToken", token, options) // Cookie configuration optimized
    .json(new ApiResponse(200, {}, "Login Successfully..."));
});
