import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const isValidateField = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, crmPassword, phoneNumber, addres } =
    req.body;

  if (!(fullName && email && password && crmPassword && phoneNumber && addres)) {
    return ApiError(401, "All Fields are Requireds..");
  }
  const user = await User.findOne({ email });
  if (user) {
    return ApiError(401, "User Already Exist..");
  }
  next();
});
