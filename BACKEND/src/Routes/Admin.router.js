import { Router } from "express";
import { adminSignIn, adminSignUp } from "../Controllers/Admin.controller.js";
import { sendAdminData, validateField, verifyAdminJWT } from "../Middlewares/AdminAuth.middleware.js";

const router = Router();

router.post("/admin-sign-up", validateField, adminSignUp);
router.post("/admin-sign-in", adminSignIn);
router.get("/current-admin", verifyAdminJWT, sendAdminData);

export default router;