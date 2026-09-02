const bookingmodel = require('../models/booking.model');

// Créer une réservation
module.exports.createBooking = async (req, res) => {
    try {
        const booking = new bookingmodel(req.body);
        await booking.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer toutes les réservations
module.exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingmodel.find();

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une réservation par son ID
module.exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingmodel.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Réservation introuvable' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier une réservation
module.exports.updateBooking = async (req, res) => {
    try {
        const booking = await bookingmodel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Réservation introuvable' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une réservation
module.exports.deleteBooking = async (req, res) => {
    try {
        const booking = await bookingmodel.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Réservation introuvable' });
        }

        res.status(200).json({
            message: 'Réservation supprimée avec succès'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.getBookingByMemberId = async (req, res) => {
    try {
        const bookings = await bookingmodel.find({ memberId: req.params.memberId });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.rescheduleBooking = async (req, res) => {
    try {
        const booking = await bookingmodel.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Réservation introuvable' });
        }

        booking.date = req.body.date;
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.cancelBooking = async (req, res) => {
    try {
        const booking = await bookingmodel.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Réservation introuvable' });
        }

        booking.status = 'cancelled';
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.isUpcoming = async (req, res) => {
    try {
        const bookings = await bookingmodel.find({ date: { $gt: new Date() } });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};