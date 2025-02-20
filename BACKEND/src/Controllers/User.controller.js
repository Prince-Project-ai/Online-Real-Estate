import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import cloudinary from "../Config/Cloudinary.js";
import fs from "fs";
import { Transporter } from "../Utils/transporter.js";
import bcrypt from "bcrypt";
import { Property } from "../Models/Property.model.js";
import { Review } from "../Models/Review.model.js";

const options = {
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

// Useer signup profile
export const signUp = asyncHandler(async (req, res) => {
  const { fullName, email, password, crmPassword, phoneNumber, address, role } =
    req.body;
  if (
    !(
      fullName ||
      email ||
      password ||
      crmPassword ||
      phoneNumber ||
      address ||
      role
    )
  ) {
    throw new ApiError(401, "All Fields are Required..");
  }

  if (password !== crmPassword) {
    throw new ApiError(400, "Password is not Same 💫.");
  }

  const user = await User.findOne({ email }).select("+_id");

  if (user) {
    throw new ApiError(401, "User Already Exist..");
  }

  const defaultAvatarUrl =
    "https://res.cloudinary.com/duto9uwjs/image/upload/v1737528548/PropertyFy/profile_imgs/wjlbupipguv7c2ucesdb.jpg";

  const newUser = await User.create({
    fullName,
    email,
    password,
    phoneNumber,
    address,
    role,
    avatar: defaultAvatarUrl,
  });

  const createdUser = await User.findById(newUser._id);
  if (!createdUser) throw new ApiError(400, "User not registered");

  res
    .status(201)
    .json(
      new ApiResponse(201, createdUser, `${role} registration successful.`)
    );
});

// Agent update profile
export const updateAgentProfile = asyncHandler(async (req, res) => {
  try {
    const agentId = req.user._id;
    const updatedField = {};
    const { fullName, email, phoneNumber, address } = req.body;

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
    if (fullName) updatedField.fullName = fullName;
    if (email) updatedField.email = email;
    if (phoneNumber) updatedField.phoneNumber = phoneNumber;
    if (address) updatedField.address = address;

    // Update the agent profile
    const updatedAgent = await User.findByIdAndUpdate(
      agentId,
      {
        $set: updatedField,
      },
      {
        new: true, // Return the updated document
      }
    ).select("-password -refreshToken");

    if (!updatedAgent) {
      throw new ApiError(404, "User not found.");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedAgent,
          "Agent profile updated successfully."
        )
      );
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        new ApiError(
          error.status || 500,
          error.message || "Internal server error while updating agent profile."
        )
      );
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

    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { currentAuth: loggedUser },
          "Welcome back to PropertyFy. Let's get to it!"
        )
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

// reset Password functionality
export const veryfyEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(401, "Please fill the Email");
    }

    const isExist = await User.findOne({ email }).select("+_id +email");

    if (!isExist) throw new ApiError(401, "Email Does Not Exist.");

    const TokenCode = jwt.sign(
      {
        id: isExist._id,
        email: isExist.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );

    const encodedCode = Buffer.from(TokenCode).toString("base64url");

    sendmail(
      isExist.email,
      "Your Reset Password Verification Code",
      `
        ${encodedCode}
      `
    );

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Code Send in Mail, Mail Verifyed."));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "INTERNAL SERVER ERROR FROM VERIFYEMAIL"
    );
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!(token && password)) throw new ApiError(401, "token and password is required");

    const decodeTokenBase64 = Buffer.from(token, "base64url").toString("utf-8");

    const accessToken = jwt.verify(decodeTokenBase64, process.env.ACCESS_TOKEN_SECRET);

    const newPassword = await bcrypt.hash(password, 8);

    const updatePassword = await User.findByIdAndUpdate(accessToken.id,
      {
        $set: { password: newPassword }
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    if (!updatePassword) throw new ApiError(404, "User Not Found");

    res
      .status(200)
      .json(new ApiResponse(200, updatePassword, "Password updated successfully"));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "INTERNAL SERVER ERROR FROM RESET PASSWORD"
    );
  }
});

// search Filter functionality
export const searchFilter = asyncHandler(async (req, res) => {
  try {
    const { serviceType, location, propertyType } = req.body;

    if (!serviceType || !location || !propertyType) {
      throw new ApiError(401, "Please fill all fields.");
    }

    const searchFilter = {
      serviceType: serviceType === "Buy" ? "Sell" : serviceType, // Reverse logic for Buy/Sell
      propertyType,
      streetAddress: location,
    };
    const findProperty = await Property.find({
      $and: [
        { listingType: searchFilter.serviceType },
        { propertyType: searchFilter.propertyType },
        { 'location.streetAddress': searchFilter.streetAddress }
      ]
    });

    res.status(200).json(new ApiResponse(200, findProperty, "Data Fetched Successfully."));
  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM SEARCH CONTROLLER");
  }
});


// fetch all property
export const gettingAllProperty = asyncHandler(async (req, res) => {
  try {
    const allProperty = await Property.find();
    if (!allProperty) throw new ApiError(404, "Data Not Found.");
    res.status(200).json(new ApiResponse(200, allProperty, "Data Fetching"));
  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM GETTING ALL PROPERTY");
  }
});

// property by id
export const getPropertyById = asyncHandler(async (req, res) => {
  try {
    const { propertyId } = req.params;
    if (!propertyId) throw new ApiError(400, "PropertyId not Provided.");
    const property = await Property.findOne({ _id: propertyId });
    if (!property) throw new ApiError(404, "Property not Available.");
    res.status(200).json(new ApiResponse(200, property, "Data Fetching"));
  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM GETTING SINGLE PROPERTY");
  }
});

// fetch review by product id
export const allReviewByProId = asyncHandler(async (req, res) => {
  try {
    const { propertyId } = req.params;
    if (!propertyId) throw new ApiError(404, "Product Id Not Found.");

    const reviews = await Review.find({ propertyId });

    if (!reviews.length > 0 || !reviews) throw new ApiError(404, "Review not Available");

    res
      .status(200)
      .json(new ApiResponse(200, reviews, "Revies Fetched"));

  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM FETCHING REVIEW")
  }
});

// add review
export const addReview = asyncHandler(async (req, res) => {
  try {
    const adderId = req.user._id;
    const { propertyId } = req.params;
    const { rating, comment, avatar, name } = req.body;
    if (!(rating && comment && avatar && name)) throw new ApiError(400, "Review and Rating is Mandatory.");

    const review = await Review.create({
      userId: adderId,
      propertyId,
      rating,
      comment,
      avatar,
      name,
    });

    if (!review) throw new ApiError(404, "Review Not Added");

    res
      .status(201)
      .json(new ApiResponse(201, review, "Revies Fetched"));

  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM ADD REVIEW")
  }
});

// delete review
export const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId) throw new ApiError(404, "Review Id not Found");

    const deleteReview = await Review.findByIdAndDelete({ _id: reviewId });

    if (!deleteReview) throw new ApiError(404, "Review not deleted");

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Revies Deleted"));

  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM DELETE REVIEW")
  }
});

// update review
export const updateReview = asyncHandler(async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    if (!reviewId) throw new ApiError(404, "Review Id not Found");

    const updateParticural = {};
    if (rating) updateParticural.rating = rating;
    if (comment) updateParticural.comment = comment;

    const updateReview = await Review.findByIdAndUpdate({ _id: reviewId },
      updateParticural,
      {
        new: true,
      },
    );

    if (!updateReview) throw new ApiError(404, "Review not updated");

    res
      .status(200)
      .json(new ApiResponse(200, updateReview, "Revies Updated"));

  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM UPDATE REVIEW");
  }
});

// fetch seller by property id
export const fetchSellerByProperty = asyncHandler(async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (!sellerId) throw new ApiError(404, "Seller id not found");
    const seller = await User.findById(sellerId);
    if (!seller) throw new ApiError(404, "Seller Not Found.");
    res
      .status(200)
      .json(new ApiResponse(200, seller, "Seller Found."));
  } catch (error) {
    throw new ApiError(error.status || 500, error.message || "INTERNAL SERVER ERROR FROM FETCH SELLER BY PROPERTY");
  }
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
