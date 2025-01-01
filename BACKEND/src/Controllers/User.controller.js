import { User } from "../Models/User.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

//signup controller

export const signUp = asyncHandler(async (req, res) => {
  const { fullName, email, password, crmPassword, phoneNumber, addres } =
    req.body;
  const user = await User.create({
    fullName,
    email,
    password,
    crmPassword,
    phoneNumber,
    addres,
  });
  res.status(201).json(user);
});
