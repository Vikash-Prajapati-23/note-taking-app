import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const OtpModel = mongoose.model("Otp", otpSchema);
