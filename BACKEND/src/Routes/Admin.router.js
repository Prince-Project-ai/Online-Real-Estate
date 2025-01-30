import { Router } from "express";
import {
  adminSignIn,
  adminSignUp,
  allUserAgentSeller,
  logoutAdmin,
  removeAccessAuth,
} from "../Controllers/Admin.controller.js";
import {
  sendAdminData,
  validateField,
  verifyAdminJWT,
} from "../Middlewares/AdminAuth.middleware.js";
import { verifyJWT } from "../Middlewares/Auth.Middleware.js";

const router = Router();

router.post("/admin-sign-up", validateField, adminSignUp);
router.post("/admin-sign-in", adminSignIn);
router.get("/current-admin", verifyAdminJWT, sendAdminData);
router.post("/admin-logout", verifyAdminJWT, logoutAdmin);
router.get("/all-users", verifyAdminJWT, allUserAgentSeller);

/* functionality START ========= [remove the curent user,seller,agent] ========= */

router.delete("/remove-auth/:auth_id", removeAccessAuth);

/* functionality END ========= [remove the curent user,seller,agent] ========= */

export default router;
