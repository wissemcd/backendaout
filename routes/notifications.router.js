var express = require('express');
var router = express.Router();
const notificationscontroller = require('../controllers/notifications.controller');
//crud routing for notifications
router.post('/', notificationscontroller.createNotification);
router.get('/', notificationscontroller.getAllNotifications);
router.get('/:id', notificationscontroller.getNotificationById);
router.put('/:id', notificationscontroller.updateNotification);
router.delete('/:id', notificationscontroller.deleteNotification);
router.patch('/:id/mark-as-read', notificationscontroller.markAsRead);
router.post('/send', notificationscontroller.sendNotification);
module.exports = router;