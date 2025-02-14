const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel"); // Import the Order model

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, eventId, tickets, totalAmount, paymentStatus, shippingAddress } = req.body;

    // Validate required fields
    if (!userId || !eventId || !tickets || !totalAmount || !paymentStatus || !shippingAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the order
    const order = new Order({
      userId,
      eventId,
      tickets,
      totalAmount,
      paymentStatus: "Pending",
      shippingAddress,
      paymentIntentId: paymentIntent.id, // Add the payment intent ID here
    });
    

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
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
