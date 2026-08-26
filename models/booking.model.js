const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notes: { type: String },
}, { timestamps: true });

const booking = mongoose.model('Booking', bookingSchema);

module.exports = booking;
