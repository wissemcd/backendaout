const express = require('express');
const router = express.Router();
const faceRecognitionController = require('../controllers/faceRecognition.controller');

router.post('/', faceRecognitionController.createFaceRecognition);
router.get('/', faceRecognitionController.getAllFaceRecognitions);
router.get('/:id', faceRecognitionController.getFaceRecognitionById);
router.put('/:id', faceRecognitionController.updateFaceRecognition);
router.delete('/:id', faceRecognitionController.deleteFaceRecognition);
router.post('/:id/match', faceRecognitionController.matchFaceRecognition);

module.exports = router;