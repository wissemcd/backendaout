const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
amount:{type: Double,required:true},
paymentDate:{type:date,default:date.now},
method:{type:String,enum:['credit_card','debit_card','bank_transfer'],required:true},
status:{type:String,enum:['pending','completed','failed'],default:'pending'},
transactionRef:{type:String,unique:true},

    

}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
