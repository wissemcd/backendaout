var express = require('express');
var router = express.Router();
const membershipController = require('../controllers/membership.controller');

//crud rouating
router.post('/', membershipController.createMembership);
router.get('/', membershipController.getAllMemberships);
router.get('/:id', membershipController.getMembershipById);
router.put('/:id', membershipController.updateMembership);
router.delete('/:id', membershipController.deleteMembership);
router.get('/status/:status', membershipController.isActive);
router.put('/renew/:id', membershipController.renew);
router.put('/cancel/:id', membershipController.cancel);
module.exports = router;