const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

router.post("/", async (req, res) => {
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100, // Convert INR to paisa
      currency: "inr",
      description: "Planaroma Event Payment",
      payment_method_types: ["card"], // Add this field
    });    

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
