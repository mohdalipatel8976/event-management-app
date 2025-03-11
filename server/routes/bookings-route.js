const express = require('express')
const router = express.Router();
const validateToken = require("../middlewares/vatlidate-token")
const BookingModel = require("../models/booking-model")
const EventModel = require('../models/event-model');

router.post("/create-booking", validateToken, async (req, res) => {
    try {
      req.body.user = req.user._id;
  
      console.log("Request Body:", req.body);
      const booking = await BookingModel.create(req.body);
      const event = await EventModel.findById(req.body.event);
      const ticketTypes = event.ticketTypes;
      const updatedTicketTypes = ticketTypes.map(ticketType => {
        if (ticketType.name === req.body.ticketType) {
          ticketType.booked = Number(ticketType.booked || 0) + Number(req.body.ticketsCount);
          ticketType.available = Number(ticketType.available || ticketType.limit) - Number(req.body.ticketsCount);
        }
        return ticketType;
      });
      await EventModel.findByIdAndUpdate
      (req.body.event, { ticketTypes: updatedTicketTypes });
      return res.status(200).json({ data: booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Error creating booking", error: error.message });
    }
  });

router.post("/get-user-bookings", validateToken, async (req, res) => {
  try {
    const bookings = await BookingModel.find({ user: req.user._id }).populate("event");
    return res.status(200).json({data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Error getting user bookings", error: error.message});
  }
});

router.get("/get-all-bookings", validateToken, async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate("event").populate("user").sort({ createdAt: -1 });
    return res.status(200).json({data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Error getting all bookings", error: error.message});
  }
});

module.exports = router;