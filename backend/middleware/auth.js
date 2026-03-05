import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const authMiddleware = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization
        // checking if token exist
        if(!authHeader||!authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                message:"not authorized,token missing"
            })
        }
        // extracting token
        const token = authHeader.split(" ")[1];
        // verifying token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // attach user to request WITHOUT PASSWORD
        const user = await userModel.findById(decoded.id).select("-password")
        // checking if user exist
        if (!user) {
            return res.status(401).json({
                success:false,
                message:"user not found"
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