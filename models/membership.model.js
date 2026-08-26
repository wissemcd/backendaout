const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
type:{ type: String, required: true },
startDate:{type:Date,required:true},
endDate:{type:Date,required:true},
price: {type:Double, required: true},
status:{type:String,enum:['active','inactive'],default:'active'},

    

}, { timestamps: true });

const membership = mongoose.model('Membership', paymentSchema);
module.exports = membership;
