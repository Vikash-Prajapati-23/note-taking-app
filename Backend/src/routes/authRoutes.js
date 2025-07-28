import express from "express";
import { sendOtp, verifyOtpAndSignUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndSignUp);



export default router;