const Payment = require('../models/payment.model');

const defaultPayments = [
    {
        amount: 120,
        paymentDate: new Date('2026-01-15'),
        method: 'credit_card',
        status: 'completed',
        transactionRef: 'AOUT-TN-2026-0001'
    },
    {
        amount: 80,
        paymentDate: new Date('2026-01-22'),
        method: 'debit_card',
        status: 'completed',
        transactionRef: 'AOUT-TN-2026-0002'
    },
    {
        amount: 250,
        paymentDate: new Date('2026-02-03'),
        method: 'bank_transfer',
        status: 'completed',
        transactionRef: 'AOUT-TN-2026-0003'
    },
    {
        amount: 150,
        paymentDate: new Date('2026-02-12'),
        method: 'credit_card',
        status: 'pending',
        transactionRef: 'AOUT-TN-2026-0004'
    },
    {
        amount: 60,
        paymentDate: new Date('2026-02-20'),
        method: 'debit_card',
        status: 'completed',
        transactionRef: 'AOUT-TN-2026-0005'
    },
    {
        amount: 300,
        paymentDate: new Date('2026-03-01'),
        method: 'bank_transfer',
        status: 'completed',
        transactionRef: 'AOUT-TN-2026-0006'
    },
    {
        amount: 95,
        paymentDate: new Date('2026-03-10'),
        method: 'credit_card',
        status: 'failed',
        transactionRef: 'AOUT-TN-2026-0007'
    },
    {
        amount: 180,
        paymentDate: new Date('2026-03-18'),
        method: 'debit_card',
        status: 'completed',
        transactionRef: 'AOUT-TN-2026-0008'
    },
    {
        amount: 75,
        paymentDate: new Date('2026-03-25'),
        method: 'credit_card',
        status: 'pending',
        transactionRef: 'AOUT-TN-2026-0009'
    },
    {
        amount: 220,
        paymentDate: new Date('2026-04-02'),
        method: 'bank_transfer',
        status: 'completed',
        transactionRef: 'AOUT-TN-2026-0010'
    }
];

async function seedDefaultPayments() {
    const operations = defaultPayments.map((payment) => ({
        updateOne: {
            filter: { transactionRef: payment.transactionRef },
            update: { $setOnInsert: payment },
            upsert: true
        }
    }));

    await Payment.bulkWrite(operations);
    console.log(`${defaultPayments.length} paiements par defaut verifies`);
}

module.exports = { seedDefaultPayments };