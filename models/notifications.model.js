const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
type: { type: String, required: true },
message: { type: String, required: true },
sentAt: { type: Date, default: Date.now },
isRead: { type: Boolean, default: false },
 classSession:[{type:mongoose.Schema.Types.ObjectId,ref:'classSession'}]

}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
