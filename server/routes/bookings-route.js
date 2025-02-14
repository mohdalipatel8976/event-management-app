const express = require('express')
const router = express.Router();
const validateToken = require("../middlewares/vatlidate-token")
const BookingModel = require("../models/booking-model")
const EventModel = require('../models/event-model');

router.post("/create-booking", validateToken, async (req, res) => {
    try {
        req.body.user = req.user._id
        //create booking
        const booking = await BookingModel.create(req.body);

        //update event tickets
        const event = await EventModel.findByIdAndUpdate(req.body.event);
        const ticketType = event.ticketTypes
        const updatedTicketTypes = ticketType.map((ticketType) => {
            if (ticketType.name === req.body.ticketType) {
                ticketType.booked = Number(ticketType.booked || 0) + Number(req.body.ticketsCount)
                ticketType.available = Number(ticketType.available || ticketType.limit) - Number(req.body.ticketsCount)
            }
            return ticketType
        })
        await EventModel.findByIdAndUpdate(req.body.event, { ticketTypes: updatedTicketTypes })
        return res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        return res.status(500).json({ message: "Error creating booking", error });
    }
})

module.exports = router;