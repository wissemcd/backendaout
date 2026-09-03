const FacilityAccess = require('../models/facilityAccess.model');

const defaultFacilityAccess = [
    {
        accessTime: new Date('2026-01-05T08:00:00.000Z'),
        accessType: 'gym_entry',
        accessGranted: true
    },
    {
        accessTime: new Date('2026-01-05T18:30:00.000Z'),
        accessType: 'cardio_room',
        accessGranted: true
    },
    {
        accessTime: new Date('2026-01-08T07:45:00.000Z'),
        accessType: 'gym_entry',
        accessGranted: true
    },
    {
        accessTime: new Date('2026-01-10T19:15:00.000Z'),
        accessType: 'weight_room',
        accessGranted: false
    },
    {
        accessTime: new Date('2026-01-12T09:00:00.000Z'),
        accessType: 'group_class',
        accessGranted: true
    },
    {
        accessTime: new Date('2026-01-15T17:20:00.000Z'),
        accessType: 'gym_entry',
        accessGranted: true
    },
    {
        accessTime: new Date('2026-01-18T20:00:00.000Z'),
        accessType: 'cardio_room',
        accessGranted: false
    },
    {
        accessTime: new Date('2026-02-01T08:15:00.000Z'),
        accessType: 'gym_entry',
        accessGranted: true
    },
    {
        accessTime: new Date('2026-02-05T18:00:00.000Z'),
        accessType: 'group_class',
        accessGranted: true
    },
    {
        accessTime: new Date('2026-02-10T21:30:00.000Z'),
        accessType: 'gym_entry',
        accessGranted: false
    }
];

async function seedDefaultFacilityAccess() {
    const operations = defaultFacilityAccess.map((access) => ({
        updateOne: {
            filter: {
                accessTime: access.accessTime,
                accessType: access.accessType,
                accessGranted: access.accessGranted
            },
            update: { $setOnInsert: access },
            upsert: true
        }
    }));

    await FacilityAccess.bulkWrite(operations);
    console.log(`${defaultFacilityAccess.length} acces aux installations par defaut verifies`);
}

module.exports = { seedDefaultFacilityAccess };