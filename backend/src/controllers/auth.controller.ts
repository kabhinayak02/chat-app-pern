import { Response, Request } from "express"
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Signup Controller 
export const signup = async (req: Request, res: Response) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;

        if(!fullname || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({error: "Please fill all the fields"});
        }

        if(password !== confirmPassword){
            return res.status(400).json({error: "Password don't match"})
        }

        const user = await prisma.user.findUnique({where: {username}});

        if(user){
            return res.status(400).json({error: "Username already exists"})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await prisma.user.create({
            data: {
                fullname,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
            }
        })
        if(newUser){
            generateToken(newUser.id, res);

            res.status(201).json({
                id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }
        else{
            res.status(400).json({error: "Invalid data"})
        }

    } catch (error: any) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

// Login Controller
export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        const user = await prisma.user.findUnique({where: {username}});

        if(!user){
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid Credentials"});
        }

        generateToken(user.id, res);

        res.status(201).json({
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            profilePic: user.profilePic
        })

    } catch (error:any) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

// Logout Controller
export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logout successfull"});

    } catch (error: any) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

// Get my info Controller
export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({where: {id: req.user.id}})

        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json({
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
        
    } catch (error: any) {
        console.log("Error in getme controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}