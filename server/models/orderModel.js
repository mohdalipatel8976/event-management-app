const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the user making the order
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events", // Reference to the event being booked
      required: true,
    },
    tickets: [
      {
        ticketType: {
          type: String, // Type of ticket (e.g., VIP, General)
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentIntentId: {
      type: String, // Stripe payment intent ID
      required: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Completed"],
      default: "Confirmed",
    },
    shippingAddress: {
      type: Object,
      required: true,
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
