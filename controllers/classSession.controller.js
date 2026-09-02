
const classSessionmodel = require('../models/classSession.model');

// Créer une session de cours
module.exports.createClassSession = async (req, res) => {
    try {
        const classSession = new classSessionmodel(req.body);
        await classSession.save();

        res.status(201).json(classSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer toutes les sessions
module.exports.getAllClassSessions = async (req, res) => {
    try {
        const classSessions = await classSessionmodel.find();

        res.status(200).json(classSessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une session par son ID
module.exports.getClassSessionById = async (req, res) => {
    try {
        const classSession = await classSessionmodel.findById(req.params.id);

        if (!classSession) {
            return res.status(404).json({
                message: 'Session de cours introuvable'
            });
        }

        res.status(200).json(classSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier une session
module.exports.updateClassSession = async (req, res) => {
    try {
        const classSession = await classSessionmodel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!classSession) {
            return res.status(404).json({
                message: 'Session de cours introuvable'
            });
        }

        res.status(200).json(classSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une session
module.exports.deleteClassSession = async (req, res) => {
    try {
        const classSession = await classSessionmodel.findByIdAndDelete(
            req.params.id
        );

        if (!classSession) {
            return res.status(404).json({
                message: 'Session de cours introuvable'
            });
        }

        res.status(200).json({
            message: 'Session de cours supprimée avec succès'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.getClassSessionsByTrainerId = async (req, res) => {
    try {
        const classSessions = await classSessionmodel.find({ trainerId: req.params.trainerId });
        res.status(200).json(classSessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }};
    module.exports.availableSports = async (req, res) => {
        try {
            const sports = await classSessionmodel.distinct('sport');
            res.status(200).json(sports);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }};
        module.exports.isFull=async(req,res)=>{
            try{
                const classSession = await classSessionmodel.findById(req.params.id);
                if (!classSession) {
                    return res.status(404).json({ message: 'Session de cours introuvable' });
                }
                const isFull = classSession.currentParticipants >= classSession.maxParticipants;
                res.status(200).json({ isFull });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }}