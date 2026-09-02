const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true , minlength: 6 , maxlength: 20},
    phone: String,
    role: {
        type: String,
        enum: ['user', 'admin','trainer','member'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    //admin
 permissions: String,
//trainer
specialization:String,
bio:String,
experienceYears:Number,
//member
membershipType:String,
emergencyContact:String,
  faceEncoding: {
    type: Buffer
  }
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
