const FaceRecognitionModel = require('../models/faceRecognition.model');

module.exports.createFaceRecognition = async (req, res) => {
	try {
		const faceRecognition = new FaceRecognitionModel(req.body);
		await faceRecognition.save();
		res.status(201).json(faceRecognition);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.getAllFaceRecognitions = async (req, res) => {
	try {
		const faceRecognitions = await FaceRecognitionModel.find();
		res.status(200).json(faceRecognitions);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports.getFaceRecognitionById = async (req, res) => {
	try {
		const faceRecognition = await FaceRecognitionModel.findById(req.params.id);
		if (!faceRecognition) {
			return res.status(404).json({ message: 'Face recognition not found' });
		}
		res.status(200).json(faceRecognition);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.updateFaceRecognition = async (req, res) => {
	try {
		const faceRecognition = await FaceRecognitionModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!faceRecognition) {
			return res.status(404).json({ message: 'Face recognition not found' });
		}
		res.status(200).json(faceRecognition);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.deleteFaceRecognition = async (req, res) => {
	try {
		const faceRecognition = await FaceRecognitionModel.findByIdAndDelete(req.params.id);
		if (!faceRecognition) {
			return res.status(404).json({ message: 'Face recognition not found' });
		}
		res.status(200).json({ message: 'Face recognition deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.matchFaceRecognition = async (req, res) => {
    try {
        const faceRecognition = await FaceRecognitionModel.findById(req.params.id);
        if (!faceRecognition) {
            return res.status(404).json({ message: 'Face recognition not found' });
        }

        const match = faceRecognition.match(req.body.encoding);
        res.status(200).json({ match });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

