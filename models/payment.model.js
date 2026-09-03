const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
amount:{type:Number,required:true},
paymentDate:{type:Date,default:Date.now},
method:{type:String,enum:['credit_card','debit_card','bank_transfer'],required:true},
status:{type:String,enum:['pending','completed','failed'],default:'pending'},
transactionRef:{type:String,unique:true},

     membership :{type:mongoose.Schema.Types.ObjectId,ref:'membership'}

}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
