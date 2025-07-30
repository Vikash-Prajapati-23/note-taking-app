import { authModel } from "../models/authModel.js";
import { OtpModel } from "../models/otpModel.js";
import { generateOTP } from "../service/generateOtp.js";
import { createToken, verifyToken } from "../service/jwtTokens.js";
import { sendOTPEmail } from "../service/sendOtp.js"; 


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store or update OTP
    await OtpModel.findOneAndUpdate(
      { email },
      { email, otp, expiresAt },
      { upsert: true }
    );

    await sendOTPEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, fullName, dob } = req.body;

    const existing = await OtpModel.findOne({ email });
    if (!existing || existing.otp !== otp || existing.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Create new user
    const user = await authModel.create({ fullName, email, dob });

    // Optionally: delete OTP after verification
    await OtpModel.deleteOne({ email });

    // Issue token
    const token = createToken({ userId: user._id, fullName, email, dob });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("OTP Verification error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

