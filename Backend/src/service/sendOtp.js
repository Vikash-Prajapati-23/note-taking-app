import nodemailer from "nodemailer";

export async function sendOtpToEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Note App" <${process.env.OTP_EMAIL}>`,
    to: email,
    subject: "Your OTP for Signup",
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  });
}
