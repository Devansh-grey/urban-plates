import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { listOrders, orderStatusStream, placeOrder, updateOrderStatus, userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRoutes = express.Router();

orderRoutes.post("/place",authMiddleware,placeOrder)
orderRoutes.post("/verify",authMiddleware,verifyOrder)
orderRoutes.get("/myorders",authMiddleware,userOrders)
orderRoutes.get("/list",listOrders)
orderRoutes.post("/status",updateOrderStatus)
orderRoutes.get("/stream",authMiddleware,orderStatusStream)


export default orderRoutes