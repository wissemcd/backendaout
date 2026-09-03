const User = require('../models/user.model');

const defaultUsers = [
    {
        fullname: 'Ahmed Ben Ali',
        email: 'ahmed.benali@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 20 123 456',
        role: 'admin'
    },
    {
        fullname: 'Sarra Trabelsi',
        email: 'sarra.trabelsi@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 21 234 567',
        role: 'trainer',
        specialization: 'Fitness et cardio',
        bio: 'Coach sportive certifiee',
        experienceYears: 6
    },
    {
        fullname: 'Youssef Mansouri',
        email: 'youssef.mansouri@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 22 345 678',
        role: 'member',
        membershipType: 'Premium',
        emergencyContact: '+216 98 111 222'
    },
    {
        fullname: 'Mariem Gharbi',
        email: 'mariem.gharbi@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 23 456 789',
        role: 'member',
        membershipType: 'Standard',
        emergencyContact: '+216 97 222 333'
    },
    {
        fullname: 'Nabil Jaziri',
        email: 'nabil.jaziri@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 24 567 890',
        role: 'user'
    },
    {
        fullname: 'Hanen Bouazizi',
        email: 'hanen.bouazizi@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 25 678 901',
        role: 'member',
        membershipType: 'Premium',
        emergencyContact: '+216 96 333 444'
    },
    {
        fullname: 'Omar Khelifi',
        email: 'omar.khelifi@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 26 789 012',
        role: 'user'
    },
    {
        fullname: 'Amira Saidi',
        email: 'amira.saidi@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 27 890 123',
        role: 'member',
        membershipType: 'Standard',
        emergencyContact: '+216 95 444 555'
    },
    {
        fullname: 'Walid Ferchichi',
        email: 'walid.ferchichi@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 28 901 234',
        role: 'trainer',
        specialization: 'Musculation',
        bio: 'Coach de musculation et preparation physique',
        experienceYears: 8
    },
    {
        fullname: 'Ines Chaabane',
        email: 'ines.chaabane@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 29 012 345',
        role: 'user'
    },
    {
        fullname: 'Karim Mhiri',
        email: 'karim.mhiri@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 30 123 456',
        role: 'member',
        membershipType: 'Premium',
        emergencyContact: '+216 94 555 666'
    },
    {
        fullname: 'Rim Ben Amor',
        email: 'rim.benamor@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 31 234 567',
        role: 'user'
    },
    {
        fullname: 'Fares Dridi',
        email: 'fares.dridi@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 32 345 678',
        role: 'member',
        membershipType: 'Standard',
        emergencyContact: '+216 93 666 777'
    },
    {
        fullname: 'Leila Haddad',
        email: 'leila.haddad@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 33 456 789',
        role: 'user'
    },
    {
        fullname: 'Mehdi Tlili',
        email: 'mehdi.tlili@aout.tn',
        password: 'Tunisia@2026',
        phone: '+216 34 567 890',
        role: 'member',
        membershipType: 'Premium',
        emergencyContact: '+216 92 777 888'
    }
];

async function seedDefaultUsers() {
    const operations = defaultUsers.map((user) => ({
        updateOne: {
            filter: { email: user.email },
            update: { $setOnInsert: user },
            upsert: true
        }
    }));

    await User.bulkWrite(operations);
    console.log(`${defaultUsers.length} utilisateurs tunisiens verifies`);
}

module.exports = { seedDefaultUsers };
