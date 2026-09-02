const mongoose = require('mongoose');

const classSessionSchema = new mongoose.Schema({
name: { type: String, required: true },
description: { type: String },
trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
startTime: { type: Date, required: true },
endTime: { type: Date, required: true },
capacity: { type: Number, required: true },
status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    

}, { timestamps: true });

const classSession = mongoose.model('ClassSession', classSessionSchema);
module.exports = classSession;