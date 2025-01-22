import { Router } from "express";
import {
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
// import { upload } from "../Middlewares/Multer.middleware.js";

const router = Router();

router.get("/current-auth", verifyJWT, currentAuth);
// Protected Router With Middleware.
// router.post("/sign-up", upload.single('avatar'), signUp);
// router.post("/sign-up", upload.single('avatar'), signUp);
router.post("/sign-up", signUp);
router.post("/sign-in", isValidateSignIn, signIn);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout-user", verifyJWT, userLogOut);

// router.patch("/update-profile",));

// router.patch(
//   "/update-profile-image",
//   verifyJWT,
//   upload.single("avatar"),  // Multer middleware to handle file upload
//   updateProfileImage
// );

export default router;
