import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET_TOKEN as string;
if (!secret) {
  throw new Error("JWT_SECRET_TOKEN environment variable is not set.");
}

interface User {
  userId: string;
  email: string;
  dob: Date;
}

export function createToken(user: User) {
  return jwt.sign(
    {
      userId: user.userId,
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
