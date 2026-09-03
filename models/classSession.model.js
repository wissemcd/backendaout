const mongoose = require('mongoose');

const classSessionSchema = new mongoose.Schema({
name: { type: String, required: true },
description: { type: String },
trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
startTime: { type: Date, required: true },
endTime: { type: Date, required: true },
capacity: { type: Number, required: true },
trainerName: { type: String, required: true },
status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
 booking :[{type:mongoose.Schema.Types.ObjectId,ref:'booking'}],
  notification:[{type:mongoose.Schema.Types.ObjectId,ref:'notification'}],
    userTrainer :{type:mongoose.Schema.Types.ObjectId,ref:'trainer'},

}, { timestamps: true });

const classSession = mongoose.model('ClassSession', classSessionSchema);
module.exports = classSession;