import { Router } from "express";
import {
  adminSignIn,
  adminSignUp,
  allUserAgentSeller,
  approveSellerProperty,
  fetchAllProperty,
  logoutAdmin,
  removeAccessAuth,
  retriveAllPendingApprovals,
  updateAdminProfile,
} from "../Controllers/Admin.controller.js";
import {
  sendAdminData,
  validateField,
  verifyAdminJWT,
} from "../Middlewares/AdminAuth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = Router();

router.post("/admin-sign-up", validateField, adminSignUp);
router.post("/admin-sign-in", adminSignIn);
router.get("/current-admin", verifyAdminJWT, sendAdminData);
router.post("/admin-logout", verifyAdminJWT, logoutAdmin);
router.get("/all-users", verifyAdminJWT, allUserAgentSeller);
router.get("/fetch-pending-approval", verifyAdminJWT, retriveAllPendingApprovals);

router.get("/fetch-all-property", verifyAdminJWT, fetchAllProperty);

router.patch("/property-approve/:propertyId", verifyAdminJWT, approveSellerProperty);

router.patch("/update-admin-profile", verifyAdminJWT,
  upload
    .single("avatar"),
  updateAdminProfile
);

/* functionality START ========= [remove the curent user,seller,agent] ========= */

router.delete("/remove-auth/:auth_id", removeAccessAuth);

/* functionality END ========= [remove the curent user,seller,agent] ========= */

export default router;
