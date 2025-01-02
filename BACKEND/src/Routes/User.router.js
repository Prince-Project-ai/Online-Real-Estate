import { Router } from "express";
import { isValidateField, isValidateSignIn, verifyJWT } from "../Middlewares/Auth.Middleware.js";
import { refreshAccessToken, signIn, signUp } from "../Controllers/User.controller.js";
const router = Router();

// Protected Router With Middleware.
router.post("/sign-up", isValidateField, signUp);
router.post("/sign-in", isValidateSignIn, signIn);
router.post("/refresh-token", refreshAccessToken);

export default router;
