var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const { connectToMongoDB } = require('./config/mongo.connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.router');
var bookingRouter = require('./routes/booking.router');
var classSessionRouter = require('./routes/classSession.router');
var membershipRouter = require('./routes/membership.router');
var notificationsRouter = require('./routes/notifications.router');
var paymentRouter = require('./routes/payment.router');
var facilityAccessRouter = require('./routes/facilityAccess.router');
var faceRecognitionRouter = require('./routes/faceRecognition.router');

var app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/booking', bookingRouter);
app.use('/class-session', classSessionRouter);
app.use('/membership', membershipRouter);
app.use('/notifications', notificationsRouter);
app.use('/payment', paymentRouter);
app.use('/facility-access', facilityAccessRouter);
app.use('/face-recognition', faceRecognitionRouter);

// 404
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err);

    res.status(err.status || 500).json({
        message: err.message
    });
});

// Server
const server = http.createServer(app);

server.listen(process.env.port, () => {
    connectToMongoDB();
    console.log(`serveur demaré sur le port ${process.env.port}`);
});