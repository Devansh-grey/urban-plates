import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { razorpay } from "../config/razorpay.config.js";
import crypto from "crypto";

/* =========================
   PLACE ORDER
========================= */
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const order = await orderModel.create({
      userId: req.user._id,
      items,
      amount,
      address,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    });

    return res.status(201).json({
      success: true,
      orderId: order._id,
      razorpayOrder,
    });

  } catch (error) {
    console.error("Place Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* =========================
   VERIFY PAYMENT
========================= */
const verifyOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Food preparing",
    });

    await userModel.findByIdAndUpdate(req.user._id, {
      cartData: {},
    });

    return res.json({
      success: true,
      message: "Payment verified",
    });

  } catch (error) {
    console.error("Verify Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


/* =========================
   GET USER ORDERS
========================= */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user._id })
      .sort({ date: -1 });

    return res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.error("Fetch Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

/* =========================
   list all ORDERS
========================= */
const listOrders = async (req,res) => {
  try {
    const orders = await orderModel
      .find({})

    return res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.error("Fetch Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }

}
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findByIdAndUpdate(orderId, { status },{returnDocument:'after'});

    clients.forEach(client =>{
      if (client.userId === order.userId.toString()) {
        client.res.write(`data: ${JSON.stringify(order)}\n\n`)
      }
    })

    res.json({
      success: true,
      message: "Status updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

let clients =[]
const orderStatusStream =(req,res) => {
  res.setHeader("Content-Type","text/event-stream")
  res.setHeader("Cache-Control","no-cache")
  res.setHeader("Connection", "keep-alive")
  res.flushHeaders();

  const newClient ={
    userId:req.user._id.toString(),
    res
  };
  clients.push(newClient);

  req.on("close",()=>{
    clients = clients.filter(
      client => client.res !== res
    )
  })

}

export { placeOrder, verifyOrder, userOrders,listOrders,updateOrderStatus,orderStatusStream };