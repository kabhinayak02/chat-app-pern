import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res:Response) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none", //  strict will block cookie to sent for cross-origin requests.
        secure: true
    })

    return token;
}

export default generateToken;