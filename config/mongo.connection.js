const mongoose= require('mongoose');
module.exports.connectToMongoDB= async()=>{
    try{
await mongoose.connect(process.env.mongodb_uri) 
console.log('Connected to MongoDB');
    } catch (error) {
      console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}
