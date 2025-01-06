import { Router } from "express";
import {
  isValidateField,
  isValidateSignIn,
  verifyJWT,
} from "../Middlewares/Auth.Middleware.js";

import {
  currentAuth,
  refreshAccessToken,
  signIn,
  signUp,
  userLogOut,
} from "../Controllers/User.controller.js";

const router = Router();

router.get("/current-auth", verifyJWT, currentAuth);
// Protected Router With Middleware.
router.post("/sign-up", isValidateField, signUp);
router.post("/sign-in", isValidateSignIn, signIn);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout-user", verifyJWT, userLogOut);

export default router;
