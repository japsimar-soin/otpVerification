import express from "express";
import { userRegister, sendUserOtp, userLogin } from "../controllers/userControllers.js";
const router = new express.Router();

router.post("/user/register", userRegister);
router.post("/user/sendotp", sendUserOtp);
router.post("/user/login", userLogin);

export default router;
