require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

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
    res.status(500).send(error);
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

    // Creating our own digest
    const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

    const dataForDigestCalculation = `${orderCreationId}|${razorpayPaymentId}`;
    console.log("Data for Digest Calculation:", dataForDigestCalculation);

    shasum.update(dataForDigestCalculation);

    const digest = shasum.digest("hex");

    console.log("Calculated Digest:", digest);

    // comparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
