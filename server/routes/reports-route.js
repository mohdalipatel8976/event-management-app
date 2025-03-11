const express = require('express');
const router = express.Router();
const BookingModal = require('../models/booking-model');
const validateToken = require("../middlewares/vatlidate-token")

router.post("/get-admin-reports", validateToken, async (req, res) => {
    try {
        const { startDate, endDate, eventId } = req.body;
        let query = {}
        if (eventId) {
            query = { event: eventId }
        }
        if (startDate && endDate) {
            query = { ...query, createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) } }
        }

        const bookings = await BookingModal.find(query);
        const totalBookings = bookings.length;
        const totalTickets = bookings.reduce((acc, booking) => acc + booking.ticketsCount, 0);
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.ticketAmount, 0);

        const responseObject = {
            totalBookings,
            totalTickets,
            totalRevenue
        }

        return res.status(200).json({data: responseObject});


    } catch (error) {
        res.status(400).json({ message: error.message });

    }

})


module.exports = router;