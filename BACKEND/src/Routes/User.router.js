import { Router } from "express";
import {
  isValidateSignIn,
  verifyJWT,
} from "../Middlewares/Auth.Middleware.js";

import {
  addReview,
  allReviewByProId,
  currentAuth,
  deleteReview,
  getPropertyById,
  gettingAllProperty,
  refreshAccessToken,
  resetPassword,
  searchFilter,
  signIn,
  signUp,
  updateAgentProfile,
  updateReview,
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
router.get("/property-details/:propertyId", verifyJWT, getPropertyById);


// REVIE MODULE
router.post("/post-review/:propertyId", verifyJWT, addReview);
router.get("/revies/:propertyId", verifyJWT, allReviewByProId);
router.patch("/update-revies/:reviewId", verifyJWT, updateReview);
router.delete("/delete-review/:reviewId", verifyJWT, deleteReview);

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
