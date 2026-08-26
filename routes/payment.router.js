var express = require('express');
var router = express.Router();
const paymentcontroller = require('../controllers/payment.controller');
//crud routing for payment
router.post('/', paymentcontroller.createPayment);
router.get('/', paymentcontroller.getAllPayments);
router.get('/:id', paymentcontroller.getPaymentById);
router.put('/:id', paymentcontroller.updatePayment);
router.delete('/:id', paymentcontroller.deletePayment);
router.get('/:id/receipt', paymentcontroller.getreceipt);
router.get('/:id/is-successful', paymentcontroller.isSuccessful);
module.exports = router;