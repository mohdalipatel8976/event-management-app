const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    organizer: { type: String, required: true },
    guests: [{ type: String }],  // Assuming it is an array of names or emails
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },  // Changed to String to handle leading zeros
    date: { type: String, required: true },
    time: { type: String, required: true },
    media: { type: [String], default: [] },  // Assuming media is an array of URLs or paths
    ticketTypes: { type: [Object], default: [] },  // If tickets are objects, define structure
}, { timestamps: true });

const EventModel = mongoose.model("events", eventSchema);
module.exports = EventModel;
