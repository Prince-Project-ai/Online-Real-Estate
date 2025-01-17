import { Admin } from "../Models/Admin.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Transporter } from "../Utils/transporter.js";
import cron from "node-cron";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";

const sendmail = async function (to, subject, text, html) {
  await Transporter.sendMail({
    from: "gayatridairy2001@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
}

const generatePassword = () => {
  // Generate a 16-character password using random bytes
  const randomBytes = CryptoJS.lib.WordArray.random(8); // 8 bytes = 16 characters in hex
  return randomBytes.toString(CryptoJS.enc.Hex);
};

const passwordUpdateJob = cron.schedule(
  "0 0 * * *", // Runs daily at midnight
  () => {
    updatePasswordAndSendEmail();
  },
  {
    scheduled: false, // Do not start automatically
  }
);

const updatePasswordAndSendEmail = async () => {
  try {
    const admins = await Admin.find(); // Fetch all admins
    for (const admin of admins) {
      const newPassword = generatePassword(); // Generate a new random password
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      // Update the admin's password in the database
      await Admin.updateOne({ _id: admin._id }, { password: hashedPassword });
      // Send an email with the new (plain text) password
      await sendmail(
        admin.email,
        "Your New Password",
        `Hello,\n\nYour new password is: ${newPassword}\n\nPlease use this password to log in.`
      );
    }
    console.log("Passwords updated and emails sent successfully!");
  } catch (err) {
    console.error("Error updating passwords or sending emails:", err);
  }
};


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

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) throw new ApiError(401, "Invalid Credentials.");

  const isPasswordValid = await admin.isPasswordCompare(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid Credentials.");

  const token = generateAccessToken(admin);

  if (!passwordUpdateJob.running) {
    console.log("Starting password update cron job...");
    passwordUpdateJob.start();
  }

  res
    .status(200)
    .cookie("adminAccessToken", token, options) // Cookie configuration optimized
    .json(new ApiResponse(200, {}, "Login Successfully..."));
});
