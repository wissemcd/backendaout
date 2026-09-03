const Notification = require('../models/notifications.model');

const defaultNotifications = [
    {
        type: 'welcome',
        message: 'Bienvenue dans Aout Fitness Club !',
        sentAt: new Date('2026-01-05'),
        isRead: false
    },
    {
        type: 'membership',
        message: 'Votre abonnement Premium est actif.',
        sentAt: new Date('2026-01-10'),
        isRead: false
    },
    {
        type: 'class',
        message: 'Votre séance de fitness commence demain à 18h00.',
        sentAt: new Date('2026-01-14'),
        isRead: true
    },
    {
        type: 'payment',
        message: 'Votre paiement de 120 TND a été confirmé.',
        sentAt: new Date('2026-01-15'),
        isRead: false
    },
    {
        type: 'reminder',
        message: 'N’oubliez pas votre séance de musculation aujourd’hui.',
        sentAt: new Date('2026-01-20'),
        isRead: false
    },
    {
        type: 'promotion',
        message: 'Profitez de 10% de réduction sur votre prochain abonnement.',
        sentAt: new Date('2026-02-01'),
        isRead: true
    },
    {
        type: 'schedule',
        message: 'Le planning des séances du mois de mars est disponible.',
        sentAt: new Date('2026-02-25'),
        isRead: false
    },
    {
        type: 'facility',
        message: 'La salle de cardio sera fermée pour maintenance vendredi.',
        sentAt: new Date('2026-03-03'),
        isRead: false
    },
    {
        type: 'payment',
        message: 'Votre paiement de 80 TND est en attente de confirmation.',
        sentAt: new Date('2026-03-12'),
        isRead: false
    },
    {
        type: 'account',
        message: 'Pensez à compléter vos informations de contact d’urgence.',
        sentAt: new Date('2026-03-20'),
        isRead: true
    }
];

async function seedDefaultNotifications() {
    const operations = defaultNotifications.map((notification) => ({
        updateOne: {
            filter: {
                type: notification.type,
                message: notification.message
            },
            update: { $setOnInsert: notification },
            upsert: true
        }
    }));

    await Notification.bulkWrite(operations);
    console.log(`${defaultNotifications.length} notifications par defaut verifiees`);
}

module.exports = { seedDefaultNotifications };