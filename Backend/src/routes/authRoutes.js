import express from "express";
import { sendOtp, verifyOtp, handleLogin, handleLogout } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/handle-sign-in", handleLogin);
router.get("/handle-sign-out", handleLogout);



export default router;