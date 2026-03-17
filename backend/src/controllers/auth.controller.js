import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export async function register(req, res) {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isUserAlready = await userModel.findOne({ email })

        if (isUserAlready) {
            return res.status(409).json({
                message: "User already Exists",
                success: false,
                err: "user already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email,
            password: hashPassword
        })

        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000 //3d
        })

        res.status(201).json({
            message: "User register successful",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log("Error in register controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}


export async function login(req, res) {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                success: false,
                err: "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password or email",
                success: false,
                err: "Incorrect Password"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000 //3d
        })

        res.status(200).json({
            message: "Loggin successful",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log("Error in login controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getMe(req, res) {

    try {
        const id = req.user.id

        const user = await userModel.findById(id)

        res.status(200).json({
            message: "User Data fetched",
            success: true,
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        })
    } catch (error) {
        console.log("Error in getME controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function logout(req, res) {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0) // Cookie ko turant expire karne ke liye
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
}