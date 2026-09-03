const mongoose = require('mongoose');

const facilityAccessSchema = new mongoose.Schema({
	accessTime: { type: Date, default: Date.now },
	accessType: { type: String, required: true },
	accessGranted: { type: Boolean, default: false },

	booking :{type:mongoose.Schema.Types.ObjectId,ref:'booking'},
	faceRecognition :{type:mongoose.Schema.Types.ObjectId,ref:'faceRecognition'},

}, { timestamps: true });

const FacilityAccess = mongoose.model('FacilityAccess', facilityAccessSchema);
module.exports = FacilityAccess;