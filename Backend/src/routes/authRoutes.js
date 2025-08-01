import express from "express";
import { sendOtp, verifyOtp, handleLogin, handleLogout, fetchUserData } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/handle-sign-in", handleLogin);
router.get("/handle-sign-out", handleLogout);
router.get("/me", fetchUserData);



export default router;