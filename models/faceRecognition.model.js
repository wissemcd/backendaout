const mongoose = require('mongoose');

const faceRecognitionSchema = new mongoose.Schema({
	image: { type: String, required: true },
	encoding: { type: Buffer, required: true },
	confidenceScore: { type: Number, required: true },
	recognized: { type: Boolean, default: false },
	facilityAccess :{type:mongoose.Schema.Types.ObjectId,ref:'facilityAccess'},
}, { timestamps: true });

faceRecognitionSchema.methods.match = function (encoding) {
	if (!encoding || !this.encoding) return false;

	try {
		const providedEncoding = Buffer.isBuffer(encoding)
			? encoding
			: Buffer.from(encoding);

		return this.encoding.equals(providedEncoding);
	} catch (error) {
		return false;
	}
};


const FaceRecognition = mongoose.model('FaceRecognition', faceRecognitionSchema);
module.exports = FaceRecognition;