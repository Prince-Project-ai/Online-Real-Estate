import { Admin } from "../Models/Admin.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

const options = {
  httpOnly: true,
  secure: true,
};

const generatePassword = function () {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
  let password = "";
  const randomBytes = CryptoJS.lib.WordArray.random(16); // Generate random bytes
  const base64Str = randomBytes.toString(CryptoJS.enc.Base64);
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(base64Str.charCodeAt(i) % chars.length); // Ensure valid character selection
  }

  return password;
};

// Generate Access Token for Admin
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

  // const { newAccessToken } = await generateAccessToken(admin._id);

  if (!createdAdmin) throw new ApiError(401, "Admin Not Registered.");
  // await transporter.sendMail({
  //   from: "bavishiprince90@gmail.com",
  //   to: email,
  //   subject: "New Admin AccessToken.",
  //   text: "Copy this token and use for login",
  //   html: `Copy : <strong>${generatePassword()}</strong>`,
  // });

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
