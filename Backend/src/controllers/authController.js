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

    // Delete OTP after verification
    await OtpModel.deleteOne({ email });

    // Issue token
    const token = createToken(user);
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("OTP Verification error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export async function handleLogin(req, res) {
  const { email, otp } = req.body;
  try {
    // Checking for otp stored in otp model.
    const existing = await OtpModel.findOne({ email });
    if (!existing || existing.otp !== otp || existing.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Checking for user email stored in auth model to find out if the user exists or not in the DB with this email.
    const user = await authModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email does not exist!" });

    const token = createToken(user);

    await OtpModel.deleteOne({ email });

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Sign in successfull.!",
      user: {
        // userId: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Sign in failed.");
    return res.status(500).json({ message: "Internal server error." });
  }
}

export function handleLogout(req, res) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(400).json({ message: "Token not found." });
  }

  if (token) {
    res.clearCookie("authToken", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ message: "Logout successfully." });
  } else {
    console.error("Logout failed.");
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function fetchUserData(req, res) {
  const token = req.cookies.authToken;

  try {
    if (!token) return res.status(400).json({ message: "Token not found." });

    const userData = verifyToken(token);

    return res.status(200).json({
      userData: {
        fullName: userData.fullName,
        email: userData.email,
      },
      message: "Data sent successfully.!",
    });
  } catch (error) {
    console.error("Enternal server error.", error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
}
