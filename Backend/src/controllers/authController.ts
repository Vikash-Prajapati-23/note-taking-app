import { Request, Response } from "express";
import { authModel } from "../../src/models/authModel";
import { createToken } from "../service/jwtTokens";

 // change from Date to string
interface User {
  userId: string;
  fullName: string;
  email: string;
  dob: string;
}

export async function handleSignUp(req: Request, res: Response) {
  const { fullName, email, dob } = req.body;

  try {
    const exists = await authModel.findOne({ email });
    if (exists) {
      return res.status(401).json({ message: "Email already exists.!" });
    }

    const newUser = await authModel.create({
      fullName,
      email,
      dob,
    });

    const token = createToken({
      userId: newUser._id.toString(),
      fullName: newUser.fullName,
      email: newUser.email,
      dob: newUser.dob,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Signup successfully.!",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        dob: newUser.dob,
      },
    });
  } catch (error) {
    console.error("Internal server error", error);
    return res.status(500).json({ message: "Server error.", error });
  }
}
