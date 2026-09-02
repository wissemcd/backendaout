const FacilityAccessModel = require('../models/facilityAccess.model');

module.exports.createFacilityAccess = async (req, res) => {
	try {
		const facilityAccess = new FacilityAccessModel(req.body);
		await facilityAccess.save();
		res.status(201).json(facilityAccess);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.getAllFacilityAccess = async (req, res) => {
	try {
		const facilityAccess = await FacilityAccessModel.find();
		res.status(200).json(facilityAccess);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports.getFacilityAccessById = async (req, res) => {
	try {
		const facilityAccess = await FacilityAccessModel.findById(req.params.id);
		if (!facilityAccess) {
			return res.status(404).json({ message: 'Facility access not found' });
		}
		res.status(200).json(facilityAccess);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.updateFacilityAccess = async (req, res) => {
	try {
		const facilityAccess = await FacilityAccessModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!facilityAccess) {
			return res.status(404).json({ message: 'Facility access not found' });
		}
		res.status(200).json(facilityAccess);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.deleteFacilityAccess = async (req, res) => {
	try {
		const facilityAccess = await FacilityAccessModel.findByIdAndDelete(req.params.id);
		if (!facilityAccess) {
			return res.status(404).json({ message: 'Facility access not found' });
		}
		res.status(200).json({ message: 'Facility access deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.grantAccess = async (req, res) => {
	try {
		const facilityAccess = await FacilityAccessModel.findByIdAndUpdate(
			req.params.id,
			{ accessGranted: true },
			{ new: true, runValidators: true }
		);
		if (!facilityAccess) {
			return res.status(404).json({ message: 'Facility access not found' });
		}
		res.status(200).json(facilityAccess);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.denyAccess = async (req, res) => {
	try {
		const facilityAccess = await FacilityAccessModel.findByIdAndUpdate(
			req.params.id,
			{ accessGranted: false },
			{ new: true, runValidators: true }
		);
		if (!facilityAccess) {
			return res.status(404).json({ message: 'Facility access not found' });
		}
		res.status(200).json(facilityAccess);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
