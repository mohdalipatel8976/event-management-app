const express = require('express')
const router = express.Router();
const validateToken = require("../middlewares/vatlidate-token")
const BookingModel = require("../models/booking-model")
const EventModel = require('../models/event-model');

router.post("/create-booking", validateToken, async (req, res) => {
    try {
      req.body.user = req.user._id;
  
      console.log("Request Body:", req.body);
  
      // Create booking
      const booking = await BookingModel.create(req.body);
  
      // Fetch the event
      const event = await EventModel.findById(req.body.event);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Update event tickets
      const updatedTicketTypes = event.ticketTypes.map((ticketType) => {
        if (ticketType.name === req.body.ticketType) {
          ticketType.booked = Number(ticketType.booked || 0) + Number(req.body.ticketsCount);
          ticketType.available = Number(ticketType.available || ticketType.limit) - Number(req.body.ticketsCount);
        }
        return ticketType;
      });
  
      event.ticketTypes = updatedTicketTypes;
      await event.save();
  
      return res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Error creating booking", error: error.message });
    }
  });


module.exports = router;