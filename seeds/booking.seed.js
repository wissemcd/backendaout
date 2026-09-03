const Booking = require('../models/booking.model');
const User = require('../models/user.model');

const defaultBookings = [
    {
        memberEmail: 'youssef.mansouri@aout.tn',
        bookingDate: new Date('2026-04-06T17:00:00.000Z'),
        status: 'confirmed',
        notes: 'Reservation pour la seance Fitness Cardio.'
    },
    {
        memberEmail: 'mariem.gharbi@aout.tn',
        bookingDate: new Date('2026-04-07T18:00:00.000Z'),
        status: 'confirmed',
        notes: 'Reservation pour la seance Musculation Debutant.'
    },
    {
        memberEmail: 'hanen.bouazizi@aout.tn',
        bookingDate: new Date('2026-04-09T16:30:00.000Z'),
        status: 'pending',
        notes: 'En attente de confirmation.'
    },
    {
        memberEmail: 'amira.saidi@aout.tn',
        bookingDate: new Date('2026-04-11T10:00:00.000Z'),
        status: 'confirmed',
        notes: 'Reservation pour l Atelier Force.'
    },
    {
        memberEmail: 'karim.mhiri@aout.tn',
        bookingDate: new Date('2026-03-15T09:00:00.000Z'),
        status: 'confirmed',
        notes: 'Participation au Cardio Express.'
    },
    {
        memberEmail: 'fares.dridi@aout.tn',
        bookingDate: new Date('2026-03-12T18:00:00.000Z'),
        status: 'cancelled',
        notes: 'Reservation annulee par le membre.'
    },
    {
        memberEmail: 'youssef.mansouri@aout.tn',
        bookingDate: new Date('2026-04-15T18:00:00.000Z'),
        status: 'pending',
        notes: 'Demande de reservation en cours de traitement.'
    },
    {
        memberEmail: 'mariem.gharbi@aout.tn',
        bookingDate: new Date('2026-04-18T09:00:00.000Z'),
        status: 'confirmed',
        notes: 'Reservation pour une seance matinale.'
    }
];

async function seedDefaultBookings() {
    const memberEmails = [...new Set(defaultBookings.map((booking) => booking.memberEmail))];
    const members = await User.find({
        email: { $in: memberEmails },
        role: 'member'
    }).select('_id email');
    const membersByEmail = new Map(members.map((member) => [member.email, member._id]));

    const missingMember = memberEmails.find((email) => !membersByEmail.has(email));
    if (missingMember) {
        throw new Error(`Membre introuvable pour le seed: ${missingMember}`);
    }

    const operations = defaultBookings.map((booking) => ({
        updateOne: {
            filter: {
                memberId: membersByEmail.get(booking.memberEmail),
                bookingDate: booking.bookingDate
            },
            update: {
                $setOnInsert: {
                    ...booking,
                    memberId: membersByEmail.get(booking.memberEmail)
                }
            },
            upsert: true
        }
    }));

    await Booking.bulkWrite(operations);
    console.log(`${defaultBookings.length} reservations par defaut verifiees`);
}

module.exports = { seedDefaultBookings };