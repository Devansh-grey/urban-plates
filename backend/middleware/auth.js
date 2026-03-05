import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const authMiddleware = async (req, res, next) => {
    try {
        let token;

        const authHeader = req.headers.authorization;

        // token from header
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // token from query (for SSE)
        if (!token && req.query.token) {
            token = req.query.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing"
            });
        }
        // verifying token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // attach user to request WITHOUT PASSWORD
        const user = await userModel.findById(decoded.id).select("-password")
        // checking if user exist
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })

        }

        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export default authMiddleware