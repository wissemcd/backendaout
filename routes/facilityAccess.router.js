const express = require('express');
const router = express.Router();
const facilityAccessController = require('../controllers/facilityAccess.controller');

router.post('/', facilityAccessController.createFacilityAccess);
router.get('/', facilityAccessController.getAllFacilityAccess);
router.get('/:id', facilityAccessController.getFacilityAccessById);
router.put('/:id', facilityAccessController.updateFacilityAccess);
router.delete('/:id', facilityAccessController.deleteFacilityAccess);
router.get('/:id/grant', facilityAccessController.grantAccess);
router.get('/:id/deny', facilityAccessController.denyAccess);

module.exports = router;