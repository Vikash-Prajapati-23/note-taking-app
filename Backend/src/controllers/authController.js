import { authModel } from "../models/authModel.js";
import { generateOTP } from "../service/generateOtp.js";
import { createToken } from "../service/jwtTokens.js";
import { sendOtpToEmail } from "../service/sendOtp.js";

export const sendOtp = async (req, res) => {
  const { fullName, email, dob } = req.body;

  try {
    const exists = await authModel.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    await OtpModel.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendOtpToEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email", fullName, email });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ message: "Server error", err });
  }
};

export async function verifyOtpAndSignUp(req, res) {
  const { fullName, email, dob, otp } = req.body;

  try {
    const otpEntry = await OtpModel.findOne({ email });
    if (!otpEntry || otpEntry.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpEntry.expiresAt < new Date()) {
      await OtpModel.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    const newUser = await authModel.create({ fullName, email, dob });

    const token = createToken({
      userId: newUser._id.toString(),
      fullName,
      email,
      dob,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:  process.env.NODE_ENV === "production" ? "None" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await OtpModel.deleteOne({ email }); // clear OTP entry

    return res.status(200).json({
      message: "Signup successful!",
      user: { fullName, email, dob },
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    return res.status(500).json({ message: "Server error", err });
  }
}
