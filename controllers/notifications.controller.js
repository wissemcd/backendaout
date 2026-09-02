
const notificationModel = require('../models/notifications.model');

// Créer une notification
module.exports.createNotification = async (req, res) => {
    try {
        const notification = new notificationModel(req.body);
        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer toutes les notifications
module.exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel.find();

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une notification par son ID
module.exports.getNotificationById = async (req, res) => {
    try {
        const notification = await notificationModel.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: 'Notification introuvable'
            });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier une notification
module.exports.updateNotification = async (req, res) => {
    try {
        const notification = await notificationModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!notification) {
            return res.status(404).json({
                message: 'Notification introuvable'
            });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une notification
module.exports.deleteNotification = async (req, res) => {
    try {
        const notification = await notificationModel.findByIdAndDelete(
            req.params.id
        );

        if (!notification) {
            return res.status(404).json({
                message: 'Notification introuvable'
            });
        }

        res.status(200).json({
            message: 'Notification supprimée avec succès'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.markAsRead = async (req, res) => {
    try {
        const notification = await notificationModel.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                message: 'Notification introuvable'
            });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.sendNotification = async (req, res) => {
    try {
        const notification = new notificationModel(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};