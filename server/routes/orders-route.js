const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// ✅ Bypass Stripe and Directly Store Order
router.post("/", async (req, res) => {
  try {
    console.log("Received Order Payload:", req.body);

    const { users, event, tickets, totalAmount, paymentStatus, shippingAddress } = req.body;
    if (!users || !event || !tickets.length || !totalAmount || !paymentStatus || !shippingAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const order = new Order({
      users,
      event,
      tickets,
      totalAmount,
      paymentStatus: "Paid", // ✅ Always set to Paid
      shippingAddress,
      paymentIntentId: req.body.paymentIntentId || "bypass_stripe", // ✅ Fake Stripe ID
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to create the order" });
  }
});

// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
