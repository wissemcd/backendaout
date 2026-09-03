const ClassSession = require('../models/classSession.model');
const User = require('../models/user.model');

const defaultClassSessions = [
    {
        name: 'Fitness Cardio',
        description: 'Seance cardio adaptee a tous les niveaux.',
        trainerEmail: 'sarra.trabelsi@aout.tn',
        startTime: new Date('2026-04-06T17:00:00.000Z'),
        endTime: new Date('2026-04-06T18:00:00.000Z'),
        capacity: 20,
        status: 'scheduled'
    },
    {
        name: 'Musculation Debutant',
        description: 'Initiation aux exercices de musculation.',
        trainerEmail: 'walid.ferchichi@aout.tn',
        startTime: new Date('2026-04-07T18:00:00.000Z'),
        endTime: new Date('2026-04-07T19:00:00.000Z'),
        capacity: 12,
        status: 'scheduled'
    },
    {
        name: 'Circuit Training',
        description: 'Entrainement intensif en circuit.',
        trainerEmail: 'sarra.trabelsi@aout.tn',
        startTime: new Date('2026-04-09T16:30:00.000Z'),
        endTime: new Date('2026-04-09T17:30:00.000Z'),
        capacity: 16,
        status: 'scheduled'
    },
    {
        name: 'Preparation Physique',
        description: 'Renforcement et preparation physique generale.',
        trainerEmail: 'walid.ferchichi@aout.tn',
        startTime: new Date('2026-03-12T18:00:00.000Z'),
        endTime: new Date('2026-03-12T19:30:00.000Z'),
        capacity: 15,
        status: 'completed'
    },
    {
        name: 'Cardio Express',
        description: 'Seance cardio rapide de 45 minutes.',
        trainerEmail: 'sarra.trabelsi@aout.tn',
        startTime: new Date('2026-03-15T09:00:00.000Z'),
        endTime: new Date('2026-03-15T09:45:00.000Z'),
        capacity: 18,
        status: 'completed'
    },
    {
        name: 'Atelier Force',
        description: 'Atelier technique autour du developpement de la force.',
        trainerEmail: 'walid.ferchichi@aout.tn',
        startTime: new Date('2026-04-11T10:00:00.000Z'),
        endTime: new Date('2026-04-11T11:30:00.000Z'),
        capacity: 10,
        status: 'cancelled'
    }
];

async function seedDefaultClassSessions() {
    const trainerEmails = [...new Set(defaultClassSessions.map((session) => session.trainerEmail))];
    const trainers = await User.find({
        email: { $in: trainerEmails },
        role: 'trainer'
    }).select('_id email');
    const trainersByEmail = new Map(trainers.map((trainer) => [trainer.email, trainer._id]));

    const missingTrainer = trainerEmails.find((email) => !trainersByEmail.has(email));
    if (missingTrainer) {
        throw new Error(`Coach introuvable pour le seed: ${missingTrainer}`);
    }

    const operations = defaultClassSessions.map((session) => ({
        updateOne: {
            filter: {
                name: session.name,
                startTime: session.startTime
            },
            update: {
                $setOnInsert: {
                    ...session,
                    trainerId: trainersByEmail.get(session.trainerEmail)
                }
            },
            upsert: true
        }
    }));

    await ClassSession.bulkWrite(operations);
    console.log(`${defaultClassSessions.length} seances par defaut verifiees`);
}

module.exports = { seedDefaultClassSessions };