import { Router } from "express";
import {
  adminSignIn,
  adminSignUp,
  allUserAgentSeller,
  logoutAdmin,
} from "../Controllers/Admin.controller.js";
import {
  sendAdminData,
  validateField,
  verifyAdminJWT,
} from "../Middlewares/AdminAuth.middleware.js";

const router = Router();

router.post("/admin-sign-up", validateField, adminSignUp);
router.post("/admin-sign-in", adminSignIn);
router.get("/current-admin", verifyAdminJWT, sendAdminData);
router.post("/admin-logout", verifyAdminJWT, logoutAdmin);
router.get("/all-users", verifyAdminJWT, allUserAgentSeller);

export default router;
