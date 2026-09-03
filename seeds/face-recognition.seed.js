const FaceRecognition = require('../models/faceRecognition.model');

const defaultFaceRecognitions = [
    {
        image: 'https://placehold.co/640x480?text=Ahmed+Ben+Ali',
        encoding: Buffer.from('aout-demo-face-001'),
        confidenceScore: 0.98,
        recognized: true
    },
    {
        image: 'https://placehold.co/640x480?text=Sarra+Trabelsi',
        encoding: Buffer.from('aout-demo-face-002'),
        confidenceScore: 0.95,
        recognized: true
    },
    {
        image: 'https://placehold.co/640x480?text=Youssef+Mansouri',
        encoding: Buffer.from('aout-demo-face-003'),
        confidenceScore: 0.91,
        recognized: true
    },
    {
        image: 'https://placehold.co/640x480?text=Mariem+Gharbi',
        encoding: Buffer.from('aout-demo-face-004'),
        confidenceScore: 0.87,
        recognized: true
    },
    {
        image: 'https://placehold.co/640x480?text=Visiteur+inconnu',
        encoding: Buffer.from('aout-demo-face-005'),
        confidenceScore: 0.42,
        recognized: false
    }
];

async function seedDefaultFaceRecognitions() {
    const operations = defaultFaceRecognitions.map((faceRecognition) => ({
        updateOne: {
            filter: { image: faceRecognition.image },
            update: { $setOnInsert: faceRecognition },
            upsert: true
        }
    }));

    await FaceRecognition.bulkWrite(operations);
    console.log(`${defaultFaceRecognitions.length} reconnaissances faciales par defaut verifiees`);
}

module.exports = { seedDefaultFaceRecognitions };