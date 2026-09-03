const mongoose= require('mongoose');
const { seedDefaultUsers } = require('../seeds/user.seed');
const { seedDefaultPayments } = require('../seeds/payment.seed');
const { seedDefaultNotifications } = require('../seeds/notification.seed');
const { seedDefaultMemberships } = require('../seeds/membership.seed');
const { seedDefaultFacilityAccess } = require('../seeds/facility-access.seed');
const { seedDefaultFaceRecognitions } = require('../seeds/face-recognition.seed');
const { seedDefaultClassSessions } = require('../seeds/class-session.seed');
const { seedDefaultBookings } = require('../seeds/booking.seed');
module.exports.connectToMongoDB= async()=>{
    try{
        await mongoose.connect(process.env.mongodb_uri);
        console.log('Connected to MongoDB');
        await seedDefaultUsers();
        await seedDefaultPayments();
        await seedDefaultNotifications();
        await seedDefaultMemberships();
        await seedDefaultFacilityAccess();
        await seedDefaultFaceRecognitions();
        await seedDefaultClassSessions();
        await seedDefaultBookings();
    } catch (error) {
      console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}
