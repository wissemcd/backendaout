const paymentmodel = require('../models/payment.model');

// Créer un paiement
module.exports.createPayment = async (req, res) => {
    try {
        const payment = new paymentmodel(req.body);
        await payment.save();

        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer tous les paiements
module.exports.getAllPayments = async (req, res) => {
    try {
        const payments = await paymentmodel.find();

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un paiement par son ID
module.exports.getPaymentById = async (req, res) => {
    try {
        const payment = await paymentmodel.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Paiement introuvable' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier un paiement
module.exports.updatePayment = async (req, res) => {
    try {
        const payment = await paymentmodel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!payment) {
            return res.status(404).json({ message: 'Paiement introuvable' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un paiement
module.exports.deletePayment = async (req, res) => {
    try {
        const payment = await paymentmodel.findByIdAndDelete(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Paiement introuvable' });
        }

        res.status(200).json({ message: 'Paiement supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.getreceipt = async (req, res) => {
    try {
        const payment = await paymentmodel.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Paiement introuvable' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.isSuccessful = async (req, res) => {
    try {
        const payment = await paymentmodel.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Paiement introuvable' });
        }
        res.status(200).json({ isSuccessful: payment.isSuccessful });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};