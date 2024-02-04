require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Enable CORS for all routes
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Max-Age", "86400");
  res.header("Access-Control-Allow-Origin", "https://www.enactusvitc.com");

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.sendStatus(200);
  } else {
    next();
  }
});

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Updated the amount to use the total price from CartContext
    const options = {
      amount: req.body.totalPrice * 100,
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occurred");

    res.json(order);
  } catch (error) {
    res.status(500).send(error.message || error.toString());
  }
});

router.post("/success", async (req, res) => {
  try {
    console.log("Webhook Received:", req.body); // Log the received webhook payload

    // getting the details back from our front-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpaySignature;

    if (isAuthentic) {
      res.json({
        msg: "success",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });

      // Send razorpayPaymentId to the frontend
      // res.redirect(
      //   `https://www.enactusvitc.com/success/${razorpayPaymentId}`
      // );
      // res.redirect(
      //   `https://www.enactusvitc.com/success`
      // );
      // } else {
      //   res.status(400).json({ msg: "Transaction not legit!" });
    }
  } catch (error) {
    res.status(500).send(error.message || error.toString());
  }
});

module.exports = router;
