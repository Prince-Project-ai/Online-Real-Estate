import { Router } from "express";
import {
  isValidateSignIn,
  verifyJWT,
} from "../Middlewares/Auth.Middleware.js";

import {
  currentAuth,
  gettingAllProperty,
  refreshAccessToken,
  resetPassword,
  searchFilter,
  signIn,
  signUp,
  updateAgentProfile,
  userLogOut,
  veryfyEmail,
} from "../Controllers/User.controller.js";

import { upload } from "../Middlewares/multer.middleware.js";

const router = Router();

router.get("/current-auth", verifyJWT, currentAuth);
// Protected Router With Middleware.
// router.post("/sign-up", upload.single('avatar'), signUp);
// router.post("/sign-up", upload.single('avatar'), signUp);

// USER ROUTES
router.post("/sign-up", signUp);
router.post("/sign-in", isValidateSignIn, signIn);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout-user", verifyJWT, userLogOut);
router.post("/verify-email", veryfyEmail);
router.patch("/reset-password", resetPassword);
router.post("/search-result", verifyJWT, searchFilter);
router.get("/all-property", verifyJWT, gettingAllProperty);

// AGENT ROUTES

router.patch(
  "/update-agent-profile",
  verifyJWT,
  upload.single("avatar"),
  updateAgentProfile
);



// SELLER ROUTES

// router.patch("/update-profile",));

// router.patch(
//   "/update-profile-image",
//   verifyJWT,
//   upload.single("avatar"),  // Multer middleware to handle file upload
//   updateProfileImage
// );

export default router;
