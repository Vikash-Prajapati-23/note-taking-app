import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET_TOKEN as string;
if (!secret) {
  throw new Error("JWT_SECRET_TOKEN environment variable is not set.");
}

interface User {
  userId: String;
  fullName: String,
  email: String;
  dob: String;
}

export function createToken(user: User) {
  return jwt.sign(
    {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      dob: user.dob,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token: string) {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (error) {
    return null;
  }
}
