import express from "express";
import {
	userRegister,
	sendUserOtp,
	loginUser,
	forgotPassword,
	resetPassword,
	userVerify,
    uploadFileData
} from "../controllers/userControllers.js";
const router = new express.Router();

router.post("/user/register", userRegister);
router.post("/user/sendotp", sendUserOtp);
router.post("/user/login", loginUser);
router.post("/user/verifyotp", userVerify);
router.post("/user/forgotpassword", forgotPassword);
router.post("/user/resetpassword", resetPassword);
router.post("/user/upload", uploadFileData);

export default router;
