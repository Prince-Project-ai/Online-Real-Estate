import { Admin } from "../Models/Admin.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Transporter } from "../Utils/transporter.js";
import cron from "node-cron";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import { User } from "../Models/User.model.js";
import cloudinary from "../Config/Cloudinary.js";
import fs from "fs";
import { Property } from "../Models/Property.model.js";

// this is options for cookies
const OPTIONS = {
  httpOnly: true,
  secure: true,
};

// mail sending for change password every 4h
const sendmail = async function (to, subject, text, html) {
  await Transporter.sendMail({
    from: "gayatridairy2001@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
};

// generate password for sending mail
const generatePassword = () => {
  // Generate a 16-character password using random bytes
  const randomBytes = CryptoJS.lib.WordArray.random(8); // 8 bytes = 16 characters in hex
  return randomBytes.toString(CryptoJS.enc.Hex);
};

// update password to set getting new mail password JOB
const passwordUpdateJob = cron.schedule(
  "0 0 * * *", // Runs daily at midnight
  () => {
    updatePasswordAndSendEmail();
  },
  {
    scheduled: false, // Do not start automatically
  }
);

// update passwword controller (update password for admin security reason)
const updatePasswordAndSendEmail = async () => {
  try {
    const admins = await Admin.find().select("+password +_id"); // Fetch all admins
    console.log(admins);
    for (const admin of admins) {
      const newPassword = generatePassword(); // Generate a new random password
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      // Update the admin's password in the database
      await Admin.updateOne({ _id: admin._id }, { password: hashedPassword });
      // Send an email with the new (plain text) password
      sendmail(
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

// this controller generate the access Token for accessing resourses
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

// admin signup using post man no fronted required
export const adminSignUp = asyncHandler(async (req, res) => {
  try {
    const { adminName, email, password, phoneNumber } = req.body;
    const newAdmin = await Admin.create({
      adminName,
      email,
      password,
      phoneNumber,
    });
    res.status(201).json(new ApiResponse(201, newAdmin, "Registration successfully."));
  } catch (error) {
    throw new ApiError(
      error.status,
      error.message || "Server Error ADMIN SIGN Up"
    );
  }
});

//admin signin using fronted (Controller)
export const adminSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) throw new ApiError(401, "All fields are required.");

  const admin = await Admin.findOne({ email });

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
    .cookie("adminAccessToken", token, OPTIONS) // Cookie configuration optimized
    .json(new ApiResponse(200, admin, "Login Successfully..."));
});

// admin Logout Controller
export const logoutAdmin = asyncHandler(async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("adminAccessToken", OPTIONS)
      .json(new ApiResponse(200, {}, "Admin Logout Successfully."));
  } catch (error) {
    throw new ApiError(
      error.status,
      error.message || "INTERNAL SERVER ERROR FROM ADMIN CONTROLLER"
    );
  }
});

// that controller is usec for send all USER,AGENT,SELLER 
export const allUserAgentSeller = asyncHandler(async (req, res) => {
  try {
    const data = await User.find().select("-password -refreshToken -__v -createdAt -updatedAt");
    if (!data) {
      throw new ApiError(401, "Data Not Found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, data, "Data Fetch Successfully."));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "INTERNAL SERVER ERROR FROM FETCH ALL DATA FROM DB ADMIN"
    );
  }
});

// remove access [MANUALLY] the USER,AGENT,SELLER

export const removeAccessAuth = asyncHandler(async (req, res) => {
  try {
    const auth_id = req.params.auth_id;
    const deleteAuth = await User.findByIdAndDelete(auth_id);
    if (!deleteAuth) throw new ApiError(401, "Auth Not Found");
    res
      .status(200)
      .clearCookie("accessToken", OPTIONS)
      .clearCookie("refreshToken", OPTIONS)
      .json(new ApiResponse(200, {}, "Auth Delete Successfully"));
  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM REMOVE ACCESS AUTHS [ADMIN SIDE]");
  }
});


export const updateAdminProfile = asyncHandler(async (req, res) => {
  try {
    const adminId = req.admin._id;
    const updatedField = {};
    const { adminName, email, password, phoneNumber } = req.body;


    // Handle file upload for avatar
    if (req.file && req.file.path) {
      const newProfileImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "PropertyFy/profile_imgs",
        transformation: [
          {
            width: 200,
            height: 200,
            crop: "thumb",
            gravity: "face",
          },
        ],
      });

      updatedField.avatar = newProfileImage.secure_url;

      // Unlink the file from the local machine
      fs.unlinkSync(req.file.path, (err) => {
        if (err) {
          console.error("Failed to delete local file : ", err);
        }
      });
    }


    // Add other fields to update if they exist
    if (adminName) updatedField.adminName = adminName;
    if (password) updatedField.password = password;
    if (email) updatedField.email = email;
    if (phoneNumber) updatedField.phoneNumber = phoneNumber;

    console.log(updatedField);


    // Update the agent profile
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      {
        $set: updatedField,
      },
      {
        new: true, // Return the updated document
      }
    ).select("-token");

    if (!updatedAdmin) {
      throw new ApiError(404, "User not found.");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedAdmin,
          "Admin profile updated successfully."
        )
      );
  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM UPDATING ADMIN PROFILE");
  }
});




export const retriveAllPendingApprovals = asyncHandler(async (req, res) => {
  try {

    const propertyList = await Property.find({ approval: "Pending" });
    if (!propertyList || propertyList.length === 0) {
      throw new ApiError(404, "No pending approvals found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, propertyList, "Property Fetched"));

  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM FETCHING PENDING PROPERTY APPROVALS.");
  }
});


export const approveSellerProperty = asyncHandler(async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const { status } = req.body;

    const approvedProperty = await Property.findByIdAndUpdate(
      propertyId,
      {
        $set: { approval: status },
      },
      {
        new: true,
      }
    );
    if (!approvedProperty) {
      throw new ApiError(404, "No pending approvals found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, approvedProperty, "Property Approved"));

  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM APPROVING PENDING PROPERTY.");
  }
});


export const fetchAllProperty = asyncHandler(async (req, res) => {
  try {
    const properties = await Property.find();
    if (!properties || properties.length === 0) throw new ApiError(404, "No property found");
    res
      .status(200)
      .json(new ApiResponse(200, properties, "Property Fetched."));
  } catch (error) {
    console.log(error?.status || 500, error?.message || "INTERNAL SERVER FROM THE FETCHING ALL PROPERTS FROM ADMIN SIDE");
  }
})

// export const retrivedSellerApproaval = async (socket, id) => {
//   try {
//     const approvedProp = await Property.find({
//       $and: [{ adderId: id }, { approval: false }]
//     });
//     if (!approvedProp) {
//       socket.emit('error', 'Approvals not available at the moment');
//     }
//     socket.emit('Properties', approvedProp);

//   } catch (error) {
//     socket.emit('error', error.message || "INTERNAL SERVER ERROR.");
//   }
// };