import { Admin } from "../Models/Admin.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import nodemailer from "nodemailer";

const options = {
  httpOnly: true,
  secure: true,
}

// Generate Access Token for Admin
export const generateAccessToken = async (id) => {
  try {
    const admin = await Admin.findById(id);
    const newAccessToken = admin.generateAdminAccessToken();
    admin.token = newAccessToken;
    await admin.save({ validateBeforeSave: false });
    return { newAccessToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bavishiprince90@gmail.com",
    pass: "jwoo oigr braf kipn",
  },
});

// Admin SignUp Route Handler
export const adminSignUp = asyncHandler(async (req, res) => {
  try {
    const { adminName, email, password } = req.body;

    // Create Admin in the database
    const admin = await Admin.create({
      adminName,
      email,
      password,
    });

    const createdAdmin = await Admin.findById(admin._id).select("-password -token");

    // Generate Access Token for Admin
    const { newAccessToken } = await generateAccessToken(admin._id);

    if (!createdAdmin) throw new ApiError(401, "Admin Not Registered.");

    // Send Access Token via Email
    const info = await transporter.sendMail({
      from: 'bavishiprince90@gmail.com',
      to: email,
      subject: "New Admin AccessToken.",
      text: "Copy this token and use for login",
      html: `Copy : <strong>${newAccessToken}</strong>`,
    });

    res
      .status(201)
      .json(new ApiResponse(201, createdAdmin, "Registration successful."));
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong..");
  }
});


export const adminSignIn = asyncHandler(async (req, res) => {
  try {
    const { email, password, token } = req.body;
    if (!(email && password && token)) throw new ApiError(401, "All Field are required.");
    const userExist = await Admin.findOne({ email });
    if (!userExist) throw new ApiError(401, "Invalid Credincial.");
    const isPasswordValidate = await userExist.isPasswordCompare(password);
    if (!isPasswordValidate) throw new ApiError(401, "Invalid Credincial");
    if (token !== userExist.token) throw new ApiError(401, "Invalid Credincial");
    const loggedAdmin = await Admin.findById(userExist._id).select("-password -token");
    res
      .status(200)
      .cookie("adminAccessToken", userExist.token, options)
      .json(new ApiResponse(200, { token }, "Login Successfully..."))
  } catch (error) {
    throw new ApiError(error.status, error.message || "Something went wrong..");
  }
});
