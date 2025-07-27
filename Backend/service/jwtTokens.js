import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET_TOKEN;

export function creteToken(user) {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token) {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (error) {
    return null;
  }
}
