import { verifyToken } from "../service/jwtTokens.js";

export function authMiddelware(req, res, next) {
    const token = req.cookies.authToken;

    if(!token) return res.status(401).json({ message: "Unauthrised user." });

    const decode = verifyToken(token);

    if(!decode) return res.status(401).json({ message: "Invalid or expired token" });

    req.user = decode;

    next();
};