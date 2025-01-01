import { asyncHandler } from "../Utils/asyncHandler.js";

export const isValidate = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, crmPassword, phoneNumber, addres } =
    req.body;

    if(!(fullName|| email|| password|| crmPassword|| phoneNumber|| addres)) {
        
    }
});
