import { Router } from "express";
import { isValidateField } from "../Middlewares/Auth.Middleware.js";

const router = Router();

app.post("/sign-in", isValidateField);

export default router;
