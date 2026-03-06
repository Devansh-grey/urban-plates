import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from "google-auth-library";
import validator from 'validator'

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist register" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "either password or email is incorrect" });
        }

        const token = createToken(user._id)

        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    )
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // checking if user exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({
                success: false,
                message: "user already exist try logging in"
            })
        }

        // securing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        })

        await user.save()
        const token = createToken(user._id)
        res.status(201).json({ success: true, token, message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// with google
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;
        let user = await userModel.findOne({ email })
        if (!user) {
            const user = new userModel({
                name,
                email,
            })
        }
        const jwtToken = createToken(user._id);
        res.json({
      success: true,
      token: jwtToken
    });


    } catch (error) {
        res.status(500).json({
      success: false,
      message: "Google login failed"
    });
    }
}

const getUser = async (req, res) => {
    try {

        const user = await userModel.findById(req.user._id).select("-password")
        res.json({
            success: true,
            data: user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}

export { loginUser, registerUser, getUser,googleLogin }