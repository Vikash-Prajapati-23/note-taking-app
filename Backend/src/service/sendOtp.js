import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(toEmail, otp) {
  try {
    const data = await resend.emails.send({
      from: "Note App <onboarding@resend.dev>",
      to: toEmail,
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is: <strong>${otp}</strong>. It's valid only for 5 minuts.</p>`,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
