var express = require('express');
var router = express.Router();
const bookingcontroller = require('../controllers/booking.controller');
//crud routing for booking
router.post('/', bookingcontroller.createBooking);
router.get('/', bookingcontroller.getAllBookings);
router.get('/:id', bookingcontroller.getBookingById);
router.put('/:id', bookingcontroller.updateBooking);
router.delete('/:id', bookingcontroller.deleteBooking);
router.get('/member/:memberId', bookingcontroller.getBookingByMemberId);
router.put('/reschedule/:id', bookingcontroller.rescheduleBooking);
router.put('/cancel/:id', bookingcontroller.cancelBooking);
router.get('/upcoming', bookingcontroller.isUpcoming);
module.exports = router;