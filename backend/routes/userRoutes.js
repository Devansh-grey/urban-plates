import express from 'express'
import { getUser, googleLogin, loginUser,registerUser } from '../controllers/userController.js'
import { registerValidation } from '../middleware/validator.js';
import authMiddleware from '../middleware/auth.js';

const userRoute = express.Router()

userRoute.post("/register",registerValidation,registerUser);
userRoute.post("/login",loginUser);
userRoute.get("/user-profile",authMiddleware,getUser)
userRoute.post("/google-login", googleLogin);

export default userRoute
