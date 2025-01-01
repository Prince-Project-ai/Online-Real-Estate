import { Router } from "express";
import { isValidateField, verifyJWT } from "../Middlewares/Auth.Middleware.js";

const router = Router();

app.post("/sign-up", isValidateField);

export default router;
