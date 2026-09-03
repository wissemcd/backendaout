const Membership = require('../models/membership.model');

const defaultMemberships = [
    {
        type: 'Day Pass',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-01'),
        price: 15,
        status: 'active'
    },
    {
        type: 'Monthly Standard',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
        price: 80,
        status: 'active'
    },
    {
        type: 'Monthly Premium',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
        price: 120,
        status: 'active'
    },
    {
        type: 'Quarterly Premium',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-03-31'),
        price: 300,
        status: 'active'
    },
    {
        type: 'Annual Premium',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        price: 1000,
        status: 'active'
    }
];

async function seedDefaultMemberships() {
    const operations = defaultMemberships.map((membership) => ({
        updateOne: {
            filter: {
                type: membership.type,
                startDate: membership.startDate,
                endDate: membership.endDate
            },
            update: { $setOnInsert: membership },
            upsert: true
        }
    }));

    await Membership.bulkWrite(operations);
    console.log(`${defaultMemberships.length} abonnements par defaut verifies`);
}

module.exports = { seedDefaultMemberships };