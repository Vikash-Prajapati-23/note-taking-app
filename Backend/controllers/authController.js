import { authModel } from "../models/authModel";
import { createToken, verifyToken } from "./../service/jwtTokens.js"

export async function handleSignUp(req, res) {
    const { fullName, email, dob } = req.body;

    try {
        const exists = await authModel.findOne({ email });
        if (exists) return res.status(401).json({ message: "Email already exists.!" });

        const newUser = await authModel.create({
            fullName,
            email,
            dob,
        });

        const token = createToken(newUser);

        res.cookies("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        })

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