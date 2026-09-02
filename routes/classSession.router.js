var express = require('express');
var router = express.Router();
const bookingcontroller = require('../controllers/classSession.controller');
//crud routing for booking
router.post('/', bookingcontroller.createClassSession);
router.get('/', bookingcontroller.getAllClassSessions);
router.get('/:id', bookingcontroller.getClassSessionById);
router.put('/:id', bookingcontroller.updateClassSession);
router.delete('/:id', bookingcontroller.deleteClassSession);
router.get('/trainer/:trainerId', bookingcontroller.getClassSessionsByTrainerId);
router.get('/sports', bookingcontroller.availableSports);
router.get('/full/:id', bookingcontroller.isFull);
module.exports = router;