const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
type:{ type: String, required: true },
startDate:{type:Date,required:true},
endDate:{type:Date,required:true},
price: {type:Number, required: true},
status:{type:String,enum:['active','inactive'],default:'active'},

      userMember :{type:mongoose.Schema.Types.ObjectId,ref:'member'},
       payment :[{type:mongoose.Schema.Types.ObjectId,ref:'payment'}]

}, { timestamps: true });

const membership = mongoose.model('Membership', membershipSchema);
module.exports = membership;
