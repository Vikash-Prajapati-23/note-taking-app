import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(toEmail, otp) {
  try {
    const data = await resend.emails.send({
      from: "Note App <noreply@decodedev.fun>",
      to: toEmail,
      subject: 'Your OTP Code',
      html: `
  <p>Hi ${toEmail},</p>
  <p>Thanks for signing up for Note App!</p>
  <p>Your OTP code is: <strong>${otp}</strong></p>
  <p>This code is valid for <strong>5 minutes</strong>.</p>
  <p>If you did not request this, please ignore this email.</p>
  <br/>
  <p>Vikash Prajapati.</p>
`
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
