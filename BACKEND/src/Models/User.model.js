import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    address: {
      type: String,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["User", "Seller", "Agent"],
      default: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) throw new Error("Password not set for this user");
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET, // Fixed typo
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m", // Fallback expiration time
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET, // Fixed typo
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d", // Fallback expiration time
    }
  );
};

export const User = mongoose.model("User", userSchema);
