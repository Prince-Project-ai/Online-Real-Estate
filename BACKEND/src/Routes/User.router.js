import { Router } from "express";
import { isValidateField, verifyJWT } from "../Middlewares/Auth.Middleware.js";

import {signUp} from "../Controllers/User.controller.js";


const router = Router();



app.post("/sign-up", isValidateField,signUp);

export default router;
