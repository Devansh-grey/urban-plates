import express from 'express'
import { loginUser,registerUser } from '../controllers/userController.js'
import { registerValidation } from '../middleware/validator.js';

const userRoute = express.Router()

userRoute.post("/register",registerValidation,registerUser);
userRoute.post("/login",loginUser);

export default userRoute
