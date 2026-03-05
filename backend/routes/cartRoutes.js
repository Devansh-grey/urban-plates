import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js'

const cartRoutes = express.Router()

cartRoutes.post("/add",authMiddleware,addToCart)
cartRoutes.post("/remove",authMiddleware,removeFromCart)
cartRoutes.get("/get",authMiddleware,getCart)

export default cartRoutes